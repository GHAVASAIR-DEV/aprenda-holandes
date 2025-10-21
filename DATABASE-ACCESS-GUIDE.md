# 🗄️ Guia de Acesso ao Banco de Dados

## Métodos para Visualizar o Banco de Dados

---

## Método 1: Script de Visualização (Mais Rápido) ✅

Já criei um script que mostra todo o conteúdo do banco de dados:

```bash
cd /home/ubuntu/aprenda-holandes
npx tsx scripts/view-database.ts
```

**O que mostra:**
- ✅ Estatísticas gerais (módulos, lições, exercícios, vocabulário)
- ✅ Lista de todos os módulos com descrições
- ✅ Tipos de exercícios e quantidades
- ✅ Exemplos de lições, exercícios e vocabulário
- ✅ Usuários e progresso

---

## Método 2: Drizzle Studio (Interface Visual) 🎨

Drizzle Studio é uma interface web para visualizar e editar o banco de dados.

### Passo 1: Adicionar script ao package.json

```bash
cd /home/ubuntu/aprenda-holandes
```

Edite `package.json` e adicione na seção `"scripts"`:

```json
"db:studio": "drizzle-kit studio"
```

### Passo 2: Iniciar Drizzle Studio

```bash
pnpm run db:studio
```

Isso abrirá uma interface web em `https://local.drizzle.studio`

**Recursos:**
- ✅ Visualizar todas as tabelas
- ✅ Editar dados diretamente
- ✅ Executar queries SQL
- ✅ Ver relacionamentos entre tabelas

---

## Método 3: MySQL CLI (Linha de Comando)

Se você tem acesso direto ao MySQL:

```bash
# Conectar ao banco
mysql -h HOST -u USUARIO -p BANCO_DE_DADOS

# Ou usando a DATABASE_URL
mysql $(echo $DATABASE_URL | sed 's/mysql:\/\///' | sed 's/:/ -u/' | sed 's/@/ -h/' | sed 's/:/ -P/' | sed 's/\// /')
```

**Comandos úteis:**

```sql
-- Ver todas as tabelas
SHOW TABLES;

-- Ver estrutura de uma tabela
DESCRIBE modules;

-- Contar registros
SELECT COUNT(*) FROM exercises;

-- Ver módulos
SELECT * FROM modules;

-- Ver lições de um módulo
SELECT * FROM lessons WHERE moduleId = 'mod-1';

-- Ver exercícios de uma lição
SELECT * FROM exercises WHERE lessonId = 'lesson-1-1' LIMIT 5;

-- Ver vocabulário
SELECT dutch, portuguese, category FROM vocabulary LIMIT 10;

-- Ver progresso dos usuários
SELECT u.name, u.email, COUNT(up.id) as completed_lessons
FROM users u
LEFT JOIN userProgress up ON u.id = up.userId AND up.completed = 1
GROUP BY u.id;
```

---

## Método 4: Script Personalizado para Consultas Específicas

Crie scripts TypeScript para consultas específicas:

```typescript
// scripts/query-lessons.ts
import { drizzle } from 'drizzle-orm/mysql2';
import { lessons, exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function queryLessons() {
  const allLessons = await db
    .select()
    .from(lessons)
    .where(eq(lessons.moduleId, 'mod-1'));
  
  console.log(JSON.stringify(allLessons, null, 2));
}

queryLessons();
```

Execute:
```bash
npx tsx scripts/query-lessons.ts
```

---

## Método 5: Ferramentas de Cliente MySQL (Desktop)

Use ferramentas gráficas como:

### TablePlus (Mac/Windows/Linux)
- Download: https://tableplus.com
- Conecte usando a `DATABASE_URL`

### DBeaver (Gratuito, Open Source)
- Download: https://dbeaver.io
- Suporta MySQL e muitos outros bancos

### MySQL Workbench (Oficial MySQL)
- Download: https://dev.mysql.com/downloads/workbench/
- Interface completa para MySQL

**Configuração de Conexão:**
- **Host:** Extrair de `DATABASE_URL`
- **Port:** 3306 (padrão)
- **Username:** Extrair de `DATABASE_URL`
- **Password:** Extrair de `DATABASE_URL`
- **Database:** Extrair de `DATABASE_URL`

---

## Estrutura do Banco de Dados

### Tabelas Principais:

1. **`modules`** - Módulos do curso
   - `id` (VARCHAR) - Identificador único
   - `title` (VARCHAR) - Título do módulo
   - `description` (TEXT) - Descrição
   - `level` (VARCHAR) - Nível CEFR (A1, A2)
   - `order` (INT) - Ordem de exibição

2. **`lessons`** - Lições dentro dos módulos
   - `id` (VARCHAR) - Identificador único
   - `moduleId` (VARCHAR) - FK para modules
   - `title` (VARCHAR) - Título da lição
   - `description` (TEXT) - Descrição
   - `content` (TEXT) - Conteúdo em JSON
   - `order` (INT) - Ordem dentro do módulo

3. **`exercises`** - Exercícios das lições
   - `id` (VARCHAR) - Identificador único
   - `lessonId` (VARCHAR) - FK para lessons
   - `type` (VARCHAR) - Tipo: multiple_choice, fill_blank, matching
   - `question` (TEXT) - Pergunta
   - `options` (TEXT) - Opções em JSON
   - `correctAnswer` (VARCHAR) - Resposta correta
   - `explanation` (TEXT) - Explicação
   - `order` (INT) - Ordem dentro da lição

4. **`vocabulary`** - Palavras de vocabulário
   - `id` (VARCHAR) - Identificador único
   - `lessonId` (VARCHAR) - FK para lessons
   - `dutch` (VARCHAR) - Palavra em holandês
   - `pronunciation` (VARCHAR) - Pronúncia fonética
   - `portuguese` (VARCHAR) - Tradução em português
   - `category` (VARCHAR) - Categoria (substantivo, verbo, etc.)
   - `example` (TEXT) - Exemplo de uso

5. **`users`** - Usuários do sistema
   - `id` (VARCHAR) - Identificador único
   - `email` (VARCHAR) - Email do usuário
   - `name` (VARCHAR) - Nome do usuário
   - `createdAt` (TIMESTAMP) - Data de criação

6. **`userProgress`** - Progresso dos usuários
   - `id` (VARCHAR) - Identificador único
   - `userId` (VARCHAR) - FK para users
   - `lessonId` (VARCHAR) - FK para lessons
   - `completed` (BOOLEAN) - Lição concluída
   - `score` (INT) - Pontuação
   - `completedAt` (TIMESTAMP) - Data de conclusão

---

## Estatísticas Atuais do Banco

```
Total Modules: 8
Total Lessons: 46
Total Exercises: 505
Total Vocabulary Words: 541
Total Users: 2
Total Progress Records: 7

Exercise Types:
- multiple_choice: 378
- fill_blank: 126
- matching: 1
```

---

## Exportar Dados do Banco

### Exportar para JSON:

```bash
cd /home/ubuntu/aprenda-holandes
npx tsx scripts/view-database.ts > database-export.txt
```

### Exportar para SQL (backup):

```bash
mysqldump -h HOST -u USER -p DATABASE > backup.sql
```

### Importar backup:

```bash
mysql -h HOST -u USER -p DATABASE < backup.sql
```

---

## Consultas Úteis

### Ver todas as lições com contagem de exercícios:

```sql
SELECT 
  l.id,
  l.title,
  l.moduleId,
  COUNT(e.id) as exercise_count
FROM lessons l
LEFT JOIN exercises e ON l.id = e.lessonId
GROUP BY l.id
ORDER BY l.moduleId, l.order;
```

### Ver progresso de um usuário específico:

```sql
SELECT 
  l.title,
  up.completed,
  up.score,
  up.completedAt
FROM userProgress up
JOIN lessons l ON up.lessonId = l.id
WHERE up.userId = 'USER_ID'
ORDER BY up.completedAt DESC;
```

### Ver palavras de vocabulário por categoria:

```sql
SELECT 
  category,
  COUNT(*) as word_count
FROM vocabulary
GROUP BY category
ORDER BY word_count DESC;
```

---

## Dicas de Segurança

⚠️ **IMPORTANTE:**
- Nunca compartilhe a `DATABASE_URL` publicamente
- Faça backups regulares do banco de dados
- Use usuários com permissões limitadas em produção
- Mantenha logs de acesso ao banco

---

## Troubleshooting

### Erro: "Cannot connect to database"

**Solução:**
1. Verifique se a `DATABASE_URL` está configurada corretamente
2. Teste a conexão: `mysql -h HOST -u USER -p`
3. Verifique firewall/whitelist do servidor

### Erro: "Table doesn't exist"

**Solução:**
1. Execute as migrações: `pnpm run db:push`
2. Verifique se está conectado ao banco correto

---

**Pronto!** Agora você tem várias formas de visualizar e gerenciar o banco de dados do curso de holandês! 🎉


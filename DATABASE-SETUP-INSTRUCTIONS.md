# 🗄️ Configuração do Banco de Dados - Aprenda Holandês

## ⚠️ IMPORTANTE: O Banco de Dados NÃO está incluído no repositório

Por razões de segurança e boas práticas, o repositório GitHub contém:

✅ **Incluído no Repositório:**
- Schema do banco de dados (`drizzle/schema.ts`)
- Migrações do banco (`drizzle/0000_*.sql`, `drizzle/0001_*.sql`)
- Scripts de seed com todos os dados (`scripts/seed-*.ts`)
- Configuração do Drizzle ORM (`drizzle.config.ts`)
- Código do servidor (`server/db.ts`)

❌ **NÃO Incluído (por segurança):**
- Arquivo `.env` com credenciais
- `DATABASE_URL` com senha do banco
- Dados reais do banco de dados

---

## 🚀 Como Configurar o Banco de Dados

### Opção 1: Usar o Banco de Dados Existente (Recomendado)

Se você já tem o banco de dados MySQL configurado:

1. **Configure a variável de ambiente:**

```bash
# No Vercel ou servidor de produção
DATABASE_URL=mysql://usuario:senha@host:3306/nome_do_banco
```

2. **Execute as migrações:**

```bash
pnpm run db:push
```

3. **Pronto!** O banco já tem todos os dados (8 módulos, 46 lições, 505 exercícios, 541 palavras)

---

### Opção 2: Criar um Novo Banco de Dados do Zero

Se você quer criar um banco de dados novo:

#### Passo 1: Criar Banco MySQL

```sql
CREATE DATABASE aprenda_holandes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Passo 2: Configurar DATABASE_URL

Crie um arquivo `.env` na raiz do projeto:

```bash
DATABASE_URL=mysql://usuario:senha@localhost:3306/aprenda_holandes
```

#### Passo 3: Executar Migrações

```bash
pnpm install
pnpm run db:push
```

Isso criará todas as tabelas:
- `modules` - 8 módulos
- `lessons` - 46 lições
- `exercises` - 505 exercícios
- `vocabulary` - 541 palavras
- `users` - Usuários
- `userProgress` - Progresso dos usuários

#### Passo 4: Popular com Dados (Seed)

Execute os scripts de seed na ordem:

```bash
# Script principal com módulos 1-4
npx tsx scripts/seed-data.ts

# Expandir módulos 1-4
npx tsx scripts/seed-expand-modules-1-4.ts

# Adicionar módulos 5-8
npx tsx scripts/seed-modules-5-8.ts

# Conteúdo adicional
npx tsx scripts/seed-more-content.ts
```

**Ou execute todos de uma vez:**

```bash
npx tsx scripts/seed-data.ts && \
npx tsx scripts/seed-expand-modules-1-4.ts && \
npx tsx scripts/seed-modules-5-8.ts && \
npx tsx scripts/seed-more-content.ts
```

---

### Opção 3: Serviços de Banco de Dados em Nuvem

#### PlanetScale (MySQL Serverless - Gratuito)

1. Acesse https://planetscale.com
2. Crie uma conta gratuita
3. Crie um novo banco de dados
4. Copie a `DATABASE_URL`
5. Configure no Vercel ou `.env`
6. Execute `pnpm run db:push`
7. Execute os scripts de seed

#### Railway (MySQL - Gratuito)

1. Acesse https://railway.app
2. Crie um projeto
3. Adicione MySQL
4. Copie a `DATABASE_URL`
5. Configure e execute migrações + seed

#### Supabase (PostgreSQL - Gratuito)

**Nota:** O projeto usa MySQL, mas pode ser adaptado para PostgreSQL:

1. Acesse https://supabase.com
2. Crie um projeto
3. Ajuste o schema para PostgreSQL
4. Execute migrações

---

## 📊 Estrutura do Banco de Dados

### Tabelas Criadas:

```
modules (8 registros)
├── id: VARCHAR (PK)
├── title: VARCHAR
├── description: TEXT
├── level: VARCHAR (A1, A2)
└── order: INT

lessons (46 registros)
├── id: VARCHAR (PK)
├── moduleId: VARCHAR (FK → modules)
├── title: VARCHAR
├── description: TEXT
├── content: TEXT (JSON)
└── order: INT

exercises (505 registros)
├── id: VARCHAR (PK)
├── lessonId: VARCHAR (FK → lessons)
├── type: VARCHAR (multiple_choice, fill_blank, matching)
├── question: TEXT
├── options: TEXT (JSON)
├── correctAnswer: VARCHAR
├── explanation: TEXT
└── order: INT

vocabulary (541 registros)
├── id: VARCHAR (PK)
├── lessonId: VARCHAR (FK → lessons)
├── dutch: VARCHAR
├── pronunciation: VARCHAR
├── portuguese: VARCHAR
├── category: VARCHAR
└── example: TEXT

users
├── id: VARCHAR (PK)
├── email: VARCHAR (UNIQUE)
├── name: VARCHAR
└── createdAt: TIMESTAMP

userProgress
├── id: VARCHAR (PK)
├── userId: VARCHAR (FK → users)
├── lessonId: VARCHAR (FK → lessons)
├── completed: BOOLEAN
├── score: INT
└── completedAt: TIMESTAMP
```

---

## 🔐 Variáveis de Ambiente Necessárias

### Para Desenvolvimento Local:

```bash
# .env
DATABASE_URL=mysql://usuario:senha@localhost:3306/aprenda_holandes
NODE_ENV=development
```

### Para Produção (Vercel):

Configure no dashboard do Vercel:

```
DATABASE_URL=mysql://usuario:senha@host:3306/banco
NODE_ENV=production
```

---

## ✅ Verificar se o Banco está Funcionando

Após configurar, execute:

```bash
# Ver estatísticas do banco
pnpm run db:view
```

Deve mostrar:
```
Total Modules: 8
Total Lessons: 46
Total Exercises: 505
Total Vocabulary Words: 541
```

---

## 🆘 Troubleshooting

### Erro: "Cannot connect to database"

**Solução:**
1. Verifique se a `DATABASE_URL` está correta
2. Teste a conexão: `mysql -h HOST -u USER -p`
3. Verifique firewall/whitelist do servidor

### Erro: "Table doesn't exist"

**Solução:**
1. Execute as migrações: `pnpm run db:push`
2. Verifique se está conectado ao banco correto

### Banco vazio após migrações

**Solução:**
1. Execute os scripts de seed (ver Opção 2, Passo 4)
2. Verifique se os scripts rodaram sem erros

### Erro: "Duplicate entry"

**Solução:**
1. O banco já tem dados
2. Para limpar e recriar: DROP todas as tabelas e execute novamente
3. Ou use um banco novo

---

## 📝 Resumo Rápido

**Para usar o banco existente:**
```bash
# Configure DATABASE_URL
export DATABASE_URL="mysql://..."

# Execute migrações
pnpm run db:push

# Pronto!
```

**Para criar novo banco:**
```bash
# 1. Crie o banco MySQL
# 2. Configure DATABASE_URL
# 3. Execute migrações
pnpm run db:push

# 4. Popule com dados
npx tsx scripts/seed-data.ts
npx tsx scripts/seed-expand-modules-1-4.ts
npx tsx scripts/seed-modules-5-8.ts
npx tsx scripts/seed-more-content.ts
```

---

## 🎯 Conteúdo do Banco de Dados

Após executar todos os seeds, você terá:

- ✅ **8 Módulos A1** completos
- ✅ **46 Lições** com conteúdo rico
- ✅ **505 Exercícios** únicos e validados
- ✅ **541 Palavras** de vocabulário com pronúncia
- ✅ Sistema de progresso funcional
- ✅ Autenticação de usuários

**Tudo pronto para ensinar holandês para brasileiros!** 🇳🇱🇧🇷


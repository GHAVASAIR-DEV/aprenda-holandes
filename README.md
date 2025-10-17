# Aprenda Holandês - Curso Interativo A1-A2

Curso interativo de holandês para brasileiros, do nível iniciante (A1) ao básico intermediário (A2).

## 🎯 Sobre o Curso

Este é um curso completo de holandês desenvolvido especificamente para falantes nativos de português brasileiro. O curso oferece:

- **12 Módulos Progressivos**: Do alfabeto básico até conversação intermediária
- **Áudio de Pronúncia**: Todas as palavras e frases com pronúncia nativa usando Web Speech API
- **Exercícios Interativos**: Múltipla escolha, preenchimento de lacunas e exercícios de correspondência
- **Acompanhamento de Progresso**: Sistema completo para rastrear seu avanço
- **Situações Reais**: Vocabulário e frases para uso no dia a dia

## 📚 Estrutura do Curso

### Nível A1 (Iniciante)

1. **Módulo 1: Primeiros Passos**
   - O Alfabeto Holandês
   - Saudações e Apresentações
   - Números 0-20

2. **Módulo 2: Sobre Você**
   - Pronomes Pessoais
   - Família e Relações
   - Informações Pessoais

3. **Módulo 3: Vida Cotidiana**
   - Cores e Objetos
   - Alimentos e Bebidas
   - Rotina Diária

4. **Módulo 4: Na Cidade**
   - Lugares na Cidade
   - Transporte Público
   - Pedindo Direções

### Nível A2 (Básico Intermediário)

5. **Módulo 5: Trabalho e Estudo**
6. **Módulo 6: Tempo e Clima**
7. **Módulo 7: Compras**
8. **Módulo 8: Saúde**
9. **Módulo 9: Lazer e Hobbies**
10. **Módulo 10: Viagens**
11. **Módulo 11: Comunicação**
12. **Módulo 12: Cultura Holandesa**

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **Backend**: Express 4, tRPC 11
- **Banco de Dados**: MySQL com Drizzle ORM
- **Autenticação**: Manus OAuth
- **Áudio**: Web Speech API para pronúncia
- **UI Components**: shadcn/ui

## 🎨 Design

O curso utiliza um esquema de cores laranja e azul, criando uma experiência visual acolhedora e motivadora para o aprendizado.

## 📝 Funcionalidades

### Para Estudantes

- ✅ Navegação intuitiva por módulos e lições
- ✅ Exercícios interativos com feedback imediato
- ✅ Áudio de pronúncia para todas as palavras
- ✅ Sistema de progresso com estatísticas
- ✅ Conquistas e medalhas
- ✅ Vocabulário organizado por lição

### Para Administradores

- ✅ Estrutura de dados flexível para adicionar conteúdo
- ✅ Sistema de autenticação integrado
- ✅ Rastreamento de progresso dos usuários

## 🔧 Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 22+
- MySQL/TiDB database
- pnpm

### Configuração

1. Clone o repositório
2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente (já configuradas automaticamente no ambiente Manus)

4. Execute as migrações do banco de dados:
   ```bash
   pnpm db:push
   ```

5. Popule o banco de dados com conteúdo inicial:
   ```bash
   npx tsx scripts/seed-data.ts
   npx tsx scripts/seed-more-content.ts
   ```

6. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

- **modules**: Módulos do curso (A1, A2)
- **lessons**: Lições dentro de cada módulo
- **exercises**: Exercícios para cada lição
- **vocabulary**: Vocabulário organizado por lição
- **userProgress**: Progresso individual dos usuários
- **users**: Dados dos usuários autenticados

## 🎯 Roadmap Futuro

- [ ] Adicionar mais módulos (A2 completo)
- [ ] Implementar sistema de flashcards
- [ ] Adicionar exercícios de escrita
- [ ] Criar testes de nível
- [ ] Implementar gamificação avançada
- [ ] Adicionar modo offline
- [ ] Criar aplicativo móvel

## 📖 Como Usar

1. **Acesse o curso** através do link fornecido
2. **Faça login** para acompanhar seu progresso
3. **Escolha um módulo** na página inicial
4. **Complete as lições** em ordem
5. **Pratique com exercícios** ao final de cada lição
6. **Acompanhe seu progresso** na página "Meu Progresso"

## 🎓 Metodologia de Ensino

O curso segue o **Quadro Europeu Comum de Referência para Línguas (CEFR)** e utiliza:

- **Aprendizado Contextual**: Vocabulário apresentado em situações reais
- **Repetição Espaçada**: Revisão de conteúdo em intervalos otimizados
- **Feedback Imediato**: Correção instantânea nos exercícios
- **Progressão Gradual**: Do simples ao complexo
- **Imersão Guiada**: Explicações em português com exposição ao holandês

## 🌟 Diferenciais

- ✨ **100% em Português**: Todas as explicações e instruções em português brasileiro
- ✨ **Comparações Relevantes**: Explicações que fazem sentido para brasileiros
- ✨ **Pronúncia Autêntica**: Áudio com sotaque holandês nativo
- ✨ **Gratuito**: Acesso completo sem custos
- ✨ **Progressivo**: Aprenda no seu ritmo

## 📞 Suporte

Para dúvidas ou sugestões sobre o curso, entre em contato através da plataforma.

## 📄 Licença

© 2025 Aprenda Holandês. Todos os direitos reservados.

---

**Veel succes met je studie!** (Boa sorte nos seus estudos!)


# Guia de Deploy - Curso de Holandês A1

Este guia fornece instruções completas para fazer o deploy do curso de holandês em produção.

---

## Opção 1: Deploy com Vercel (Recomendado)

O Vercel é a plataforma recomendada para este projeto, pois oferece:
- Deploy automático
- HTTPS gratuito
- CDN global
- Banco de dados MySQL integrado

### Passo a Passo:

#### 1. Preparar o Projeto

O projeto já está pronto para deploy. Certifique-se de que está no diretório correto:

```bash
cd /home/ubuntu/aprenda-holandes
```

#### 2. Instalar Vercel CLI

```bash
pnpm add -g vercel
```

#### 3. Fazer Login no Vercel

```bash
vercel login
```

Siga as instruções no navegador para fazer login com sua conta Vercel (GitHub, GitLab, ou email).

#### 4. Deploy Inicial

```bash
vercel
```

O CLI irá perguntar:
- **Set up and deploy?** → Yes
- **Which scope?** → Selecione sua conta/organização
- **Link to existing project?** → No
- **Project name?** → `aprenda-holandes` (ou o nome que preferir)
- **Directory?** → `.` (diretório atual)
- **Override settings?** → No

#### 5. Configurar Variáveis de Ambiente

Após o primeiro deploy, você precisa configurar o banco de dados:

**No Dashboard do Vercel:**

1. Acesse seu projeto em https://vercel.com/dashboard
2. Vá em **Settings** → **Environment Variables**
3. Adicione a variável:
   - **Name:** `DATABASE_URL`
   - **Value:** Sua string de conexão MySQL
   - **Environment:** Production, Preview, Development

**Formato da DATABASE_URL:**
```
mysql://usuario:senha@host:3306/nome_do_banco
```

**Opção A: Usar PlanetScale (Recomendado)**
- Crie uma conta gratuita em https://planetscale.com
- Crie um novo banco de dados
- Copie a connection string
- Cole como `DATABASE_URL` no Vercel

**Opção B: Usar Vercel Postgres**
- No dashboard do Vercel, vá em **Storage**
- Crie um novo **Postgres Database**
- A `DATABASE_URL` será configurada automaticamente

#### 6. Deploy de Produção

```bash
vercel --prod
```

Isso criará o deploy de produção com a URL final do seu curso.

#### 7. Popular o Banco de Dados

Após o deploy, você precisa popular o banco com os dados do curso:

```bash
# Conecte-se ao banco de produção
# Execute os scripts de seed
```

---

## Opção 2: Deploy com Replit

Se preferir uma solução mais simples:

#### 1. Criar Conta no Replit

Acesse https://replit.com e crie uma conta gratuita.

#### 2. Importar Projeto

1. Clique em **+ Create Repl**
2. Selecione **Import from GitHub**
3. Ou faça upload manual do diretório `/home/ubuntu/aprenda-holandes`

#### 3. Configurar Variáveis de Ambiente

No painel lateral do Replit:
1. Clique no ícone de **Secrets** (🔒)
2. Adicione `DATABASE_URL` com sua string de conexão

#### 4. Executar

Clique em **Run** e o Replit automaticamente:
- Instalará as dependências
- Iniciará o servidor
- Fornecerá uma URL pública

---

## Opção 3: Deploy Manual com VPS

Se você tem um servidor VPS (DigitalOcean, AWS, etc.):

#### 1. Preparar o Servidor

```bash
# Instalar Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar pnpm
npm install -g pnpm

# Instalar PM2 para gerenciamento de processos
npm install -g pm2
```

#### 2. Transferir Arquivos

```bash
# No seu computador local
scp -r /home/ubuntu/aprenda-holandes usuario@seu-servidor:/var/www/
```

#### 3. Configurar no Servidor

```bash
cd /var/www/aprenda-holandes

# Instalar dependências
pnpm install

# Configurar variável de ambiente
export DATABASE_URL="mysql://..."

# Iniciar com PM2
pm2 start "pnpm run dev" --name aprenda-holandes
pm2 save
pm2 startup
```

#### 4. Configurar Nginx

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo systemctl restart nginx
```

---

## Checklist Pós-Deploy

Após fazer o deploy, verifique:

- [ ] ✅ Site carrega corretamente
- [ ] ✅ Todas as 46 lições estão visíveis
- [ ] ✅ Exercícios funcionam (múltipla escolha, fill-blank)
- [ ] ✅ Áudio de pronúncia funciona
- [ ] ✅ Sistema de progresso salva corretamente
- [ ] ✅ Login/registro funciona
- [ ] ✅ Design responsivo em mobile
- [ ] ✅ Menu mobile funciona
- [ ] ✅ Página de gramática carrega
- [ ] ✅ Não há erros no console do navegador

---

## Configuração do Banco de Dados

### Estrutura do Banco

O banco de dados já está populado com:
- 8 módulos
- 46 lições
- 505 exercícios únicos
- 541 palavras de vocabulário
- 7 tabelas de conjugação verbal

### Backup do Banco

Para fazer backup dos dados:

```bash
# Exportar dados
mysqldump -u usuario -p nome_do_banco > backup.sql

# Importar dados
mysql -u usuario -p nome_do_banco < backup.sql
```

---

## Domínio Personalizado

### Conectar Domínio no Vercel

1. Vá em **Settings** → **Domains**
2. Adicione seu domínio (ex: `aprenda-holandes.com`)
3. Configure os registros DNS conforme instruído:
   - **Type:** A
   - **Name:** @
   - **Value:** 76.76.21.21

### SSL/HTTPS

O Vercel configura HTTPS automaticamente com Let's Encrypt.

---

## Monitoramento e Analytics

### Adicionar Google Analytics

1. Crie uma propriedade no Google Analytics
2. Copie o ID de medição (G-XXXXXXXXXX)
3. Adicione ao arquivo `client/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Troubleshooting

### Problema: Site não carrega

**Solução:**
- Verifique se `DATABASE_URL` está configurada corretamente
- Verifique os logs: `vercel logs` ou no dashboard
- Certifique-se de que o banco de dados está acessível

### Problema: Exercícios não aparecem

**Solução:**
- Verifique se os dados foram populados no banco
- Execute os scripts de seed novamente
- Verifique a conexão com o banco de dados

### Problema: Áudio não funciona

**Solução:**
- O áudio usa Web Speech API do navegador
- Funciona apenas em HTTPS (não em HTTP)
- Alguns navegadores podem bloquear áudio automático

### Problema: Progresso não salva

**Solução:**
- Verifique se o usuário está logado
- Verifique as permissões do banco de dados
- Verifique os logs de erro no console do navegador

---

## Contato e Suporte

Para questões sobre o deploy ou problemas técnicos:

1. Verifique os logs de erro
2. Consulte a documentação do Vercel: https://vercel.com/docs
3. Revise os arquivos de configuração do projeto

---

## Próximos Passos Após Deploy

1. **Testar Completamente:** Navegue por todas as lições e teste todos os exercícios
2. **Coletar Feedback:** Compartilhe com usuários beta e colete feedback
3. **Monitorar Performance:** Use Google Analytics e Vercel Analytics
4. **Otimizar SEO:** Adicione meta tags, sitemap, robots.txt
5. **Marketing:** Compartilhe nas redes sociais, fóruns de aprendizado de idiomas

---

**Boa sorte com o deploy! 🚀**

O curso está completo, validado e pronto para produção com 505 exercícios únicos e 541 palavras de vocabulário em conformidade com CEFR A1.


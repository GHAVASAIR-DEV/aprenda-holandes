# Deploy Rápido - Curso de Holandês A1

## 🚀 Deploy em 3 Passos

### 1. Instalar Vercel CLI

```bash
npm install -g vercel
```

### 2. Fazer Login

```bash
vercel login
```

### 3. Deploy

```bash
cd /home/ubuntu/aprenda-holandes
vercel --prod
```

---

## 📋 Configuração Necessária

Após o primeiro deploy, configure a variável de ambiente no dashboard do Vercel:

**Variável:** `DATABASE_URL`  
**Valor:** Sua connection string MySQL

**Exemplo:**
```
mysql://usuario:senha@host:3306/banco
```

### Opções de Banco de Dados:

**🌟 PlanetScale (Recomendado - Gratuito)**
1. Crie conta em https://planetscale.com
2. Crie novo database
3. Copie a connection string
4. Cole no Vercel como `DATABASE_URL`

**⚡ Vercel Postgres**
1. No dashboard Vercel → Storage → Create Database
2. A `DATABASE_URL` é configurada automaticamente

---

## ✅ Status do Projeto

- ✅ 505 exercícios únicos (sem duplicatas)
- ✅ 541 palavras de vocabulário
- ✅ 46 lições em 8 módulos
- ✅ Conformidade CEFR A1
- ✅ Todos os testes de qualidade passaram
- ✅ Pronto para produção

---

## 📱 URL Atual de Desenvolvimento

https://3000-i0ssjpfiz7s1ee1w97fv3-8e2f3c42.manusvm.computer

---

## 📚 Documentação Completa

Veja `DEPLOYMENT-GUIDE.md` para instruções detalhadas e opções alternativas de deploy.

---

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs: `vercel logs`
2. Confirme que `DATABASE_URL` está configurada
3. Consulte o guia completo de deployment


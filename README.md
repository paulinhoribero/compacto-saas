# Orçamentos — Compacto Imóveis

Página interna para a equipe gerar 3 orçamentos padronizados (uma folha por empresa) a partir
do texto recebido no WhatsApp. A IA organiza serviços e valores de cada cotação real colada.

## Estrutura
- `index.html` — a página (front-end), com logos e assinaturas embutidos.
- `api/organizar.js` — backend serverless que guarda a chave da Anthropic e chama a IA com segurança.
- `package.json` — config mínima (ESM).

---

## Passo a passo: GitHub + Vercel + online

### 1. Criar o repositório no GitHub
**Sem terminal (mais fácil):** crie um repositório novo em https://github.com/new →
na tela do repo, clique em **"uploading an existing file"** e arraste os arquivos desta pasta.

**Com terminal:**
```bash
git remote add origin https://github.com/SEU_USUARIO/orcamentos-compacto.git
git branch -M main
git push -u origin main
```

### 2. Conectar na Vercel
1. Acesse https://vercel.com → **Add New… > Project**.
2. **Import** o repositório do GitHub.
3. Framework Preset: **Other** (não precisa de build). Clique em **Deploy**.

### 3. Configurar a chave da IA (obrigatório p/ o botão "Organizar com IA")
1. Pegue uma chave em https://console.anthropic.com (API Keys) — começa com `sk-ant-...`.
2. Na Vercel: **Project > Settings > Environment Variables** → adicione:
   - **Name:** `ANTHROPIC_API_KEY`  · **Value:** sua chave
   - (opcional) **Name:** `MODELO` · **Value:** `claude-sonnet-4-6`
3. Vá em **Deployments** → no último deploy, **Redeploy** (pra carregar a variável).

Pronto: a URL `https://SEU-PROJETO.vercel.app` fica online pra equipe testar.

---

## Continuar editando (com a equipe testando online)
- Toda vez que você der **push** no GitHub, a Vercel **re-publica sozinha**.
- Para testar uma mudança **sem afetar a versão das funcionárias**: crie uma branch
  (`git checkout -b ajustes`) e dê push — a Vercel gera uma **URL de preview** só daquela branch.
  Quando aprovar, junte na `main`.
- Editar pelo navegador: dá pra abrir qualquer arquivo no GitHub e clicar no lápis (editar) — ao salvar, re-publica.

## Observações
- A chave fica **só no servidor** (Env Var). Nunca aparece no navegador.
- Cada clique em "Organizar com IA" consome tokens da API (cobrança na sua conta Anthropic).
- Abrir o `index.html` direto no PC (sem servidor) faz tudo funcionar **menos** a IA — o botão
  "Organizar com IA" só responde quando publicado na Vercel (ou rodando `vercel dev`).

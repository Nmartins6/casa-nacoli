# Deploy na Vercel

O site é gerado estaticamente pelo Astro. Não é necessário instalar `@astrojs/vercel` nem manter um `vercel.json` enquanto não houver renderização sob demanda, funções ou outra configuração específica da plataforma.

## Configuração do projeto

Ao importar o repositório na Vercel, use:

- Framework Preset: `Astro`;
- Node.js: `24.x`, também declarado em `package.json`;
- Install Command: detectado automaticamente pelo lockfile;
- Build Command: `pnpm build`;
- Output Directory: `dist`;
- Production Branch: `main`.

O projeto fixa `pnpm@11.13.0` no campo `packageManager`. Para a Vercel respeitar essa versão via Corepack, adicione `ENABLE_EXPERIMENTAL_COREPACK=1` aos ambientes Production, Preview e Development do projeto.

Não há variáveis de ambiente da aplicação nesta versão. Contato, domínio e conteúdo público vêm dos arquivos validados em `seed/`.

## Fluxo recomendado

1. Importe o repositório na Vercel sem sobrescrever as configurações detectadas do Astro.
2. Configure `ENABLE_EXPERIMENTAL_COREPACK=1`.
3. Gere um Preview Deployment a partir da branch da alteração.
4. Revise as rotas principais, o catálogo, os formulários e os links do WhatsApp no preview.
5. Faça merge em `main` somente depois dos checks e das confirmações comerciais.
6. Adicione `www.casanacoli.com.br` ao projeto e siga exatamente os registros DNS informados pela Vercel.
7. Adicione também `casanacoli.com.br` e configure seu redirecionamento para `www.casanacoli.com.br`, evitando duas versões indexáveis do site.

Preview Deployments padrão da Vercel recebem proteção contra indexação. Não associe um domínio público a uma branch de preview sem revisar essa proteção.

## Verificações antes da produção

- confirmar o número oficial do WhatsApp: hoje `contact.whatsappNumber` diverge de `contact.whatsappDisplay` e `links.whatsapp` em `seed/site-config.json`;
- executar `pnpm validate:seed` e `pnpm validate`;
- confirmar que canonical, sitemap e `robots.txt` apontam para `https://www.casanacoli.com.br`;
- testar navegação por teclado e as larguras 360, 390, 768, 1024 e 1440 px;
- verificar se o domínio está validado e se o certificado HTTPS foi emitido;
- revisar o deployment de produção antes de divulgar o endereço.

## Rollback

Se uma publicação apresentar problema, use a tela de Deployments da Vercel para promover novamente o último deployment de produção aprovado. Depois, corrija a causa em uma nova branch e passe pelos checks antes de republicar.

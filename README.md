# Casa Nacoli

Site institucional e catálogo da Casa Nacoli. O projeto entrega uma home responsiva, catálogo pesquisável, páginas das quatro categorias e páginas individuais geradas estaticamente para os 26 produtos validados.

## Stack

- Astro 7 com TypeScript estrito;
- Tailwind CSS 4 pelo plugin Vite;
- dados JSON validados com Zod;
- ESLint e Prettier;
- Vitest;
- Playwright e axe;
- pnpm 11.

## Desenvolvimento local

Requisitos: Node.js 24 e pnpm 11.13.0.

```bash
pnpm install
pnpm dev
```

O servidor local informa a URL disponível no terminal.

## Comandos

| Comando              | Função                                         |
| -------------------- | ---------------------------------------------- |
| `pnpm dev`           | inicia o ambiente de desenvolvimento           |
| `pnpm build`         | gera o site estático em `dist/`                |
| `pnpm preview`       | serve o build localmente                       |
| `pnpm format`        | aplica a formatação nos arquivos do aplicativo |
| `pnpm format:check`  | verifica a formatação                          |
| `pnpm lint`          | executa o ESLint                               |
| `pnpm typecheck`     | executa o diagnóstico do Astro e TypeScript    |
| `pnpm validate:seed` | verifica referências básicas do seed           |
| `pnpm test`          | executa testes unitários                       |
| `pnpm test:e2e`      | executa Playwright e axe                       |
| `pnpm validate`      | executa a validação completa                   |

Antes do primeiro e2e em uma máquina nova:

```bash
pnpm exec playwright install --with-deps chromium
```

## Estrutura principal

```text
src/
├── assets/
│   ├── brand/
│   └── products/<slug>/
├── components/
├── data/
│   ├── assets.ts
│   ├── catalog.ts
│   └── schemas.ts
├── layouts/
├── pages/
│   ├── categorias/[slug].astro
│   ├── produtos/[slug].astro
│   └── produtos/index.astro
├── scripts/
├── styles/
├── types/
└── utils/
seed/
tests/
├── e2e/
└── unit/
```

Os arquivos em `seed/` são a fonte de verdade comercial. Componentes não contêm preços nem avaliações literais.

## Atualizar o catálogo

1. Edite `seed/products.json`, preservando IDs e slugs existentes.
2. Use uma categoria e subcategoria presentes em `seed/categories.json`.
3. Para fotos, crie `src/assets/products/<slug>/` e use nomes descritivos iniciados pelo slug.
4. Valide os textos alternativos gerados e a ordem alfabética das imagens.
5. Execute `pnpm validate:seed`, `pnpm test` e `pnpm build`.

O carregador em `src/data/assets.ts` encontra arquivos pela pasta do slug. As rotas dinâmicas usam os seeds para gerar as páginas, então categorias, produtos e fotos podem ser adicionados sem criar componentes específicos. O procedimento completo está em [`docs/CATALOG_MAINTENANCE.md`](docs/CATALOG_MAINTENANCE.md).

Produtos retirados do catálogo devem receber um redirect em `astro.config.ts`. As páginas antigas de DTF em rolo e DTF por arte apontam para a categoria de impressões.

## Configuração comercial

Marca, domínio, contato, links, SEO e regras de publicação ficam em `seed/site-config.json`. Produtos com `needsPriceConfirmation: true` nunca expõem os valores enquanto `publishUnconfirmedPrices` for `false`.

Existe uma inconsistência a confirmar: `contact.whatsappNumber` não contém os mesmos dígitos de `contact.whatsappDisplay` e `links.whatsapp`. A interface usa temporariamente `links.whatsapp`, que coincide com o número de exibição, sem alterar o seed.

Também continuam pendentes prazos de produção, retirada/entrega, regiões atendidas, regras exatas de desconto, alterações de arte e políticas de troca, cancelamento ou devolução. Essas informações não são publicadas.

## Assets

O inventário completo está em [`docs/ASSET_INVENTORY.md`](docs/ASSET_INVENTORY.md). Originais permanecem em `incoming-assets/`; somente associações confirmadas foram copiadas para `src/assets/`.

O placeholder oficial está em `public/images/placeholders/product-placeholder.svg` e deve ser usado quando não houver foto real.

## Qualidade e CI

O workflow `.github/workflows/quality.yml` executa instalação com lockfile, formatação, lint, tipos, testes, build, Playwright e axe. A meta de acessibilidade é WCAG 2.2 AA.

## Deploy

O projeto está preparado para deploy estático na Vercel, sem adapter de servidor. A plataforma detecta o Astro e gera a pasta `dist/` com `pnpm build`.

Antes de publicar em produção, faça um Preview Deployment e conclua as confirmações comerciais documentadas, principalmente o número correto do WhatsApp. O passo a passo, as configurações e a estratégia de rollback estão em [`docs/VERCEL_DEPLOYMENT.md`](docs/VERCEL_DEPLOYMENT.md).

# Catálogo e páginas de produtos

## Objetivo

Evoluir a fundação aprovada para um catálogo completo, estático, pesquisável e orientado a conversas qualificadas no WhatsApp, preservando a home e os dados comerciais existentes.

## Escopo entregue

- `/produtos` com 27 produtos, busca normalizada, filtros pelas quatro categorias, contador, URL compartilhável, estado vazio e limpeza.
- Quatro páginas estáticas em `/categorias/[slug]`.
- Vinte e sete páginas estáticas em `/produtos/[slug]`.
- Galeria responsiva com imagens Astro, miniaturas acessíveis quando necessárias e placeholder sem foto.
- Preço único, inicial, variantes, faixas, matrizes e consulta representados a partir do seed.
- Formulário que monta produto, modelo, quantidade, detalhes e URL antes de abrir o WhatsApp.
- Home, cabeçalho, menu mobile e rodapé conectados às rotas reais.
- Metadados exclusivos, canonical, Open Graph, breadcrumbs, JSON-LD e sitemap.
- Eventos desacoplados para visualização, variante, WhatsApp, busca e filtro, sem instalar analytics.

## Arquitetura

- Seeds permanecem como fonte de verdade e são validados no carregamento.
- `src/data/catalog.ts` concentra consultas puras e relações.
- `src/data/assets.ts` resolve fotos pela pasta do slug.
- Rotas dinâmicas usam `getStaticPaths`, sem API, banco ou SPA.
- Componentes Astro renderizam todo o conteúdo; JavaScript cliente fica restrito a busca/filtros, galeria, menu e montagem da conversa.
- `src/utils/structured-data.ts`, `search.ts` e `whatsapp.ts` concentram regras reutilizadas.

## Dados preservados

- 4 categorias: 9 personalizados, 6 itens de vestuário, 2 brindes corporativos e 10 itens de gráfica e impressões.
- 27 produtos ativos e 29 avaliações reais, sem alteração de conteúdo comercial.
- 40 fotos confirmadas em 9 produtos.
- 18 produtos sem foto confirmada usam o placeholder.
- 39 fotos recebidas continuam sem associação automática.
- Os valores pendentes de lixo car permanecem ocultos; a página e o JSON-LD indicam consulta sem oferta numérica.

## Qualidade verificada

- Busca por nome, categoria, palavras-chave e variantes.
- Todas as 31 rotas dinâmicas respondendo no preview de produção.
- Produto com várias fotos, uma foto e nenhuma foto.
- Produto com preço, variantes, sob consulta e preço pendente.
- Breadcrumbs, mensagem contextual, navegação mobile e links do catálogo.
- Axe sem violações críticas ou sérias nas páginas representativas em desktop e mobile.
- Sem overflow nas rotas representativas em 360 px; home também verificada em 360, 390, 768, 1024 e 1440 px.

## Fora de escopo

- Carrinho, checkout, estoque, disponibilidade e envio automático de mensagens.
- Analytics real, CMS, autenticação, banco de dados, deploy, PR e push.
- Páginas institucionais individuais ainda representadas por seções da home.
- Associação das imagens pendentes sem confirmação.

## Pendências reais

- Confirmar a divergência entre `contact.whatsappNumber`, o número exibido e `links.whatsapp`; a interface mantém o link seguro já aprovado.
- Confirmar o escopo e os valores do lixo car.
- Informar prazos, retirada/entrega, regiões atendidas, descontos, alterações de arte e políticas comerciais antes de qualquer publicação desses dados.
- Revisar comercialmente as 39 imagens não associadas e, se necessário, criar produtos correspondentes nos seeds.

## Validação

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
pnpm validate
git diff --check
git status
```

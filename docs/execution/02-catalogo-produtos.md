# Catálogo e páginas de produtos

## Objetivo

Evoluir a fundação aprovada para um catálogo completo, estático, pesquisável e orientado a conversas qualificadas no WhatsApp, preservando a home e os dados comerciais existentes.

## Escopo entregue

- `/produtos` com 46 produtos, busca normalizada, filtros pelas quatro categorias, contador, URL compartilhável, estado vazio e limpeza.
- Quatro páginas estáticas em `/categorias/[slug]`.
- Quarenta e seis páginas estáticas em `/produtos/[slug]`.
- Galeria responsiva com imagens Astro, miniaturas acessíveis quando necessárias e placeholder sem foto.
- Preço único, inicial, variantes, faixas, matrizes e consulta representados a partir do seed.
- Formulário que monta produto, modelo, quantidade, detalhes e URL antes de abrir o WhatsApp.
- Home, cabeçalho, menu mobile e rodapé conectados às rotas reais.
- Metadados exclusivos, canonical, Open Graph, breadcrumbs, JSON-LD e sitemap.
- Eventos desacoplados para visualização, variante, WhatsApp, busca e filtro, sem instalar analytics.

## Arquitetura

- Seeds permanecem como fonte de verdade e são validados no carregamento.
- `src/data/catalog.ts` concentra consultas puras e relações.
- `src/data/assets.ts` resolve fotos pela pasta informada em `imageFolder`.
- Rotas dinâmicas usam `getStaticPaths`, sem API, banco ou SPA.
- Componentes Astro renderizam todo o conteúdo; JavaScript cliente fica restrito a busca/filtros, galeria, menu e montagem da conversa.
- `src/utils/structured-data.ts`, `search.ts` e `whatsapp.ts` concentram regras reutilizadas.

## Dados preservados

- 4 categorias: 17 personalizados, 6 itens de vestuário, 7 brindes corporativos e 16 itens de gráfica e impressões.
- 46 produtos ativos e 29 avaliações reais.
- 250 fotos confirmadas, organizadas em 39 pastas e usadas por 45 produtos.
- Apenas Plastificação continua sem foto confirmada e usa o placeholder.
- 10 fotos marcadas como “não adicionar ainda” permanecem fora do catálogo.
- Os valores pendentes de lixo car permanecem ocultos; a página e o JSON-LD indicam consulta sem oferta numérica.

## Qualidade verificada

- Busca por nome, categoria, palavras-chave e variantes.
- Todas as 50 rotas dinâmicas respondendo no preview de produção.
- Produto com várias fotos, uma foto e nenhuma foto.
- Produto com preço, variantes, sob consulta e preço pendente.
- Breadcrumbs, mensagem contextual, navegação mobile e links do catálogo.
- Axe sem violações críticas ou sérias nas páginas representativas em desktop e mobile.
- Sem overflow nas rotas representativas em 360 px; home também verificada em 360, 390, 768, 1024 e 1440 px.
- Lighthouse da página de caneca de polímero: 100 em Performance, Acessibilidade, Boas Práticas e SEO; LCP de 1,4 s, CLS 0 e TBT 0 ms.

## Atualização do catálogo em 2026-08-28

- Caneca de cerâmica preserva o slug existente e agrupa branca, preta, mágica, alça de coração, colorida e xícara.
- Caneca de polímero possui produto próprio e três fotos reais identificadas pelos arquivos de origem.
- Placa de MDF agrupa os tamanhos 15 × 20 cm e 20 × 30 cm, ambos com suporte.
- Chaveiro em MDF agrupa frente e frente e verso.
- DTF em rolo e DTF por arte foram removidos; as URLs antigas redirecionam para a categoria de impressões.
- Valores não fornecidos para novas variantes permanecem como `Consultar`.

## Atualização das fotos e produtos em 2026-08-28

- A nova árvore de imagens foi revisada em todas as pastas e subpastas.
- A imagem sem sufixo numérico de cada conjunto foi preservada como capa; no destino, ela recebe o nome `00-capa.webp`.
- Foram criados 20 produtos confirmados pelas fotos: bottons, blocos, cadernos, cestas, kits, foto ímã, topo de bolo, magnetos, mousepad, porta-copos, sacolas de papel, squeeze, display de mesa, dois calendários, fotos estilo Polaroid, ventarolas, lapelas, etiquetas escolares e rótulos.
- As canecas de 100 ml e 180 ml foram adicionadas como variações da caneca de cerâmica.
- A pasta antiga foi preservada e os arquivos `Zone.Identifier` foram excluídos do versionamento.

## Fora de escopo

- Carrinho, checkout, estoque, disponibilidade e envio automático de mensagens.
- Analytics real, CMS, autenticação, banco de dados, deploy, PR e push.
- Páginas institucionais individuais ainda representadas por seções da home.
- Inclusão das pastas explicitamente marcadas como “não adicionar ainda”.

## Pendências reais

- Confirmar a divergência entre `contact.whatsappNumber`, o número exibido e `links.whatsapp`; a interface mantém o link seguro já aprovado.
- Confirmar o escopo e os valores do lixo car.
- Informar prazos, retirada/entrega, regiões atendidas, descontos, alterações de arte e políticas comerciais antes de qualquer publicação desses dados.
- Enviar uma foto real de plastificação para substituir o único placeholder restante.

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

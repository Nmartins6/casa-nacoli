# Fundação e página inicial

## Objetivo

Entregar uma fundação estática, tipada, testável e acessível em Astro, com uma primeira versão responsiva e navegável da página inicial da Casa Nacoli.

## Contexto lido

- `AGENTS.md`, `CODEX_MASTER_PROMPT.md`, `START_HERE.md` e `PLANS.md`.
- Todos os guias em `docs/` e todas as skills locais em `.agents/skills/`.
- Todos os dados em `seed/`, incluindo 4 categorias, 27 produtos e 29 avaliações.
- Inventário técnico e visual de `incoming-assets/`.

## Escopo

- Astro estático com TypeScript estrito, Tailwind CSS 4 e pnpm.
- ESLint, Prettier, Vitest, Playwright e axe.
- Tipos de domínio e schemas de validação para configurações, catálogo e avaliações.
- Dados importados do seed sem duplicação nos componentes.
- Tokens visuais, tipografia de sistema, componentes essenciais e estados de foco.
- Logo e fotos comprovadamente associáveis organizados em `src/assets/`.
- Layout global, menu mobile progressivo, rodapé e CTA de WhatsApp.
- Home com hero curto, proposta de valor, categorias, destaques, personalizados, empresas, processo, avaliações e CTAs.
- Metadados globais, favicon, Open Graph, robots e sitemap.
- Testes mínimos de regras, acessibilidade e navegação da home.

## Fora de escopo

- Catálogo completo, busca e filtros.
- Páginas de categoria, produto e páginas institucionais individuais.
- CMS, banco de dados, autenticação, carrinho, checkout, analytics real e deploy.
- Publicação dos preços pendentes do lixo car.

## Arquitetura e mapa desta etapa

- `/` será a única página de conteúdo implementada nesta etapa.
- Links para rotas futuras terão indicação clara de disponibilidade futura ou apontarão para seções reais da home; não haverá links quebrados simulando páginas prontas.
- `src/data/` carregará e validará JSONs com Zod, expondo seletores tipados para componentes.
- `src/types/` conterá os contratos de categorias, produtos, variantes, preços, imagens e avaliações.
- `src/components/` terá componentes Astro pequenos para header, cards, CTA, avaliações e rodapé.
- `src/layouts/BaseLayout.astro` concentrará documento, metadados e estrutura global.
- `src/styles/global.css` concentrará tokens Tailwind/CSS e estilos-base.
- `src/assets/brand/` e `src/assets/products/<slug>/` guardarão apenas associações confirmadas.
- `public/` guardará arquivos servidos sem pipeline, como `robots.txt` e placeholder SVG.

## Componentes principais

- `BaseLayout`
- `Header` e navegação mobile
- `WhatsAppLink`
- `CategoryCard`
- `ProductCard`
- `PlaceholderImage`
- `ReviewCard`
- `Footer`

## Passos

- [x] Ler toda a especificação, seeds e skills locais.
- [x] Inspecionar formatos, dimensões e duplicidades dos assets.
- [x] Inicializar Astro e configurar ferramentas de qualidade.
- [x] Criar tipos, schemas, validadores e seletores de dados.
- [x] Organizar logo e imagens de produtos com associação segura.
- [x] Implementar tokens, estilos-base e componentes.
- [x] Implementar layout e home responsiva.
- [x] Implementar SEO técnico desta etapa.
- [x] Adicionar testes unitários, e2e e axe.
- [x] Validar, revisar em viewports-alvo e atualizar este plano.

## Riscos e decisões

- O único logo recebido é JPEG sobre fundo claro. Ele será preservado sem criar artificialmente uma versão escura; superfícies de uso do logo serão claras.
- Não existe símbolo isolado confirmado. O favicon será uma derivação simples do arquivo recebido, sem redesenho.
- Quatro pares de fotos são duplicatas binárias entre pastas; apenas uma cópia será importada por associação.
- Fotos de calendários, papelaria, quadros e outros itens sem produto correspondente no seed ficarão em `incoming-assets/` e serão registradas como não associadas.
- Informações sobre prazo, retirada, entrega e políticas continuam ausentes e não serão exibidas.
- O contato permanece centralizado em `site-config.json`; somente campos coerentes serão exibidos.
- `contact.whatsappNumber` diverge do número exibido e de `links.whatsapp`; até a confirmação, o destino usa o link `wa.me` fornecido, que coincide com o número de exibição.
- `lixo-car-personalizado` não terá os valores de variantes publicados enquanto `needsPriceConfirmation` for verdadeiro.

## Verificação

- `pnpm format:check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:e2e`
- `pnpm build`
- Home em 360, 390, 768, 1024 e 1440 px.
- Teclado, menu mobile, foco visível, links e axe na home.

## Commits planejados

- `chore: inicializa projeto astro`
- `chore: configura ferramentas de qualidade`
- `feat: adiciona estrutura tipada do catálogo`
- `feat: organiza identidade e imagens do catálogo`
- `feat: implementa design system e layout global`
- `feat: implementa página inicial responsiva`
- `test: adiciona testes da fundação`
- `docs: documenta fundação e inventário de assets`

## Resultado

A etapa entregou uma home estática responsiva, sistema visual, dados tipados e validados, imagens locais otimizadas, navegação mobile, WhatsApp contextual, SEO global, sitemap, robots, testes e CI.

Evidências finais:

- seed válido com 4 categorias, 27 produtos e 29 avaliações;
- 79 fotos recebidas inventariadas e 40 associações confirmadas organizadas;
- 2 arquivos de teste unitário com 6 casos aprovados;
- 6 cenários Playwright aprovados e 2 skips intencionais por projeto;
- axe sem violações críticas ou sérias em desktop e mobile;
- sem overflow horizontal em 360, 390, 768, 1024 e 1440 px;
- inspeção visual por capturas completas em 390 e 1440 px;
- formatação, lint, typecheck e build sem erros ou avisos relevantes.

Desvio de ambiente: o Chromium local exigiu bibliotecas ausentes na imagem Linux. Como o `sudo` não estava disponível, `libnspr4`, `libnss3` e `libasound2` foram extraídas temporariamente em `/tmp` apenas para a execução local. O workflow de CI usa a instalação oficial `playwright install --with-deps`.

Pendências mantidas: confirmação dos valores de lixo car, divergência no número de WhatsApp, prazos, entrega/retirada, regiões atendidas, descontos, regras de arte e políticas comerciais. Catálogo e páginas individuais permanecem fora desta etapa.

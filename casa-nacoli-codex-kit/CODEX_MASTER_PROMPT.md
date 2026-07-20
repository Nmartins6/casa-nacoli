# Prompt mestre para o Codex

Crie do zero o site da Casa Nacoli usando este repositório como especificação.

Antes de alterar arquivos:

1. Leia `AGENTS.md`, `START_HERE.md`, `PLANS.md`, todos os arquivos em `docs/`, `seed/*.json` e as skills em `.agents/skills/`.
2. Inspecione `incoming-assets/brand/` e `incoming-assets/products/`.
3. Liste as informações comerciais ainda pendentes e garanta que nenhuma seja inventada.
4. Crie `docs/execution/01-site-inicial.md` seguindo `PLANS.md`.
5. Apresente no plano a arquitetura final, o mapa de páginas, os componentes principais e a sequência de commits.

Depois implemente o projeto completo em etapas, sem pedir confirmação para decisões técnicas já definidas na documentação.

## Resultado obrigatório

- Astro com TypeScript estrito e Tailwind CSS 4.
- Site estático, mobile first, responsivo e acessível.
- Home com navegação clara, categorias, produtos em destaque, prova social, processo de pedido, FAQ e CTA.
- Catálogo com busca por nome, categoria, subcategoria e palavras-chave.
- Páginas de categoria e páginas individuais para todos os produtos ativos.
- Variações e faixas de preço apresentadas sem duplicar produtos semelhantes no grid.
- Fotos organizadas por slug; placeholder para produto sem foto.
- WhatsApp contextual por produto e CTA fixo mobile sem obstruir conteúdo.
- Design baseado na paleta fornecida e no logo real.
- Copy humana, simples e específica.
- SEO técnico, sitemap, robots, canonical, OG, JSON-LD e metadados exclusivos.
- Testes de regras, e2e e acessibilidade.
- CI no GitHub Actions para lint, typecheck, testes e build.
- README final com instalação, manutenção de catálogo, importação de fotos, configuração e deploy estático.
- Commits locais pequenos conforme `AGENTS.md`.

## Restrições

- Não usar template pronto sem adaptação profunda.
- Não adicionar CMS, banco de dados, autenticação, carrinho ou checkout nesta versão.
- Não usar React apenas para filtros ou menus simples.
- Não criar preços ou descontos não fornecidos.
- Não usar avaliações como dados estruturados de estrelas da própria empresa.
- Não criar imagens artificiais para substituir fotos reais.
- Não encerrar enquanto os comandos de qualidade falharem, salvo bloqueio externo documentado.

Ao final, entregue um resumo com:

- páginas criadas;
- decisões de UX;
- como adicionar produto, categoria e fotos;
- pendências comerciais;
- comandos executados e resultados;
- commits criados;
- próximos passos recomendados.

---
name: seo-performance-accessibility
description: Implementar ou auditar SEO técnico, dados estruturados, imagens, Core Web Vitals e WCAG 2.2 AA no site Casa Nacoli. Usar em novas páginas, mudanças de layout, imagens, navegação e preparação de release.
---

Leia `docs/SEO_PERFORMANCE_ACCESSIBILITY.md` e `docs/ACCEPTANCE_CRITERIA.md`.

## Fluxo

1. Verifique HTML semântico e headings.
2. Crie metadados exclusivos.
3. Adicione canonical, OG e links internos.
4. Gere JSON-LD apenas com dados visíveis e confirmados.
5. Otimize imagens e dimensões.
6. Reduza JavaScript.
7. Teste teclado, foco, contraste e movimento reduzido.
8. Rode axe, Lighthouse e build.
9. Documente exceções.

## Proibições

- Sem `AggregateRating` próprio em LocalBusiness/Organization.
- Sem Offer fictício.
- Sem conteúdo essencial apenas em imagem.
- Sem imagem sem alt apropriado.
- Sem animação obrigatória para compreender ou usar.

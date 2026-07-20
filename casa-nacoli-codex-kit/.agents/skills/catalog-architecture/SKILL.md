---
name: catalog-architecture
description: Criar, validar, migrar ou manter categorias, produtos, variantes, preços, fotos e geração de páginas do catálogo Casa Nacoli. Usar sempre que dados ou páginas de produto forem alterados.
---

Leia `seed/product.schema.json`, `seed/categories.json`, `seed/products.json` e `docs/INFORMATION_ARCHITECTURE.md`.

## Fluxo

1. Validar IDs, slugs e referências.
2. Agrupar variações do mesmo conceito em um produto.
3. Normalizar preço sem perder a forma comercial de exibição.
4. Garantir mensagem de WhatsApp contextual.
5. Associar fotos com evidência.
6. Gerar página estática.
7. Adicionar links internos.
8. Criar ou atualizar testes.
9. Atualizar documentação de manutenção.

## Regras

- Dados são fonte de verdade.
- Componente não contém preço literal.
- Produto `quote` não recebe preço zero.
- Produto com `needsPriceConfirmation` não publica valor.
- Slugs não mudam sem redirect.
- Produto arquivado não aparece no catálogo, mas deve ter estratégia de URL.

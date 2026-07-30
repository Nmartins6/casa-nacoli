# Manutenção do catálogo

## Fonte de verdade

- `seed/categories.json`: categorias, subcategorias, slugs e ordem.
- `seed/products.json`: conteúdo, preço, variantes, personalização, SEO e estado dos produtos.
- `seed/site-config.json`: contato, regras de publicação, domínio e eventos.
- `src/assets/products/<slug>/`: fotografias confirmadas de cada produto.

Os arquivos são validados por Zod em `src/data/schemas.ts`. `src/data/catalog.ts` expõe as consultas compartilhadas e as rotas dinâmicas geram páginas estáticas. Não é necessário editar componentes para cadastrar uma categoria ou um produto compatível com o contrato existente.

## Adicionar uma categoria

1. Inclua o registro em `seed/categories.json` com `id`, `name`, `slug`, `description`, `sortOrder` e ao menos uma subcategoria.
2. Use IDs e slug únicos, estáveis e em kebab-case.
3. Associe produtos usando `categoryId` e `subcategoryId` existentes.
4. Execute `pnpm validate:seed`, `pnpm typecheck`, `pnpm test` e `pnpm build`.
5. Confira a nova rota `/categorias/<slug>`, o filtro em `/produtos`, o menu mobile e o sitemap.

A página da categoria, seu breadcrumb e seus metadados são gerados automaticamente. Uma nova função visual de cor só deve ser adicionada quando houver uma decisão editorial; o fallback atual mantém uma superfície azul clara acessível.

## Adicionar um produto

1. Inclua o objeto em `seed/products.json` seguindo o schema existente.
2. Defina `categoryId` e `subcategoryId` válidos, `slug` único, `status`, ordem e textos naturais.
3. Escolha o tipo de preço correto: `fixed`, `starting_at`, `variants`, `tiered`, `quote` ou `matrix_quote`.
4. Só informe `amount` e preços de variantes quando confirmados. Use `needsPriceConfirmation: true` para bloquear valores ainda pendentes.
5. Descreva variantes no próprio produto, em vez de criar cards duplicados para modelos do mesmo item.
6. Preencha título e descrição de SEO exclusivos, CTA, palavras-chave e notas somente com informações confirmadas.
7. Execute as validações e confira `/produtos/<slug>`, a categoria correspondente, busca, relacionados e mensagem do WhatsApp.

Produtos com `status: "active"` entram automaticamente no catálogo, na categoria, no sitemap e na geração de rotas. O campo `featured` continua disponível para decisões de destaque orientadas por dados; a curadoria atual da home é deliberadamente distribuída entre as quatro categorias.

## Associar uma ou várias fotos

1. Confirme visual e comercialmente que a foto pertence ao produto.
2. Crie `src/assets/products/<slug>/`, usando exatamente o slug do seed.
3. Nomeie os arquivos como `<slug>-exemplo-01.webp`, `<slug>-exemplo-02.webp` e assim por diante.
4. Preserve os originais em `incoming-assets/` e não importe duplicatas binárias.
5. Use a ordem numérica desejada: o carregador ordena os nomes em português e a primeira foto se torna a principal e a imagem Open Graph.
6. Execute `pnpm build` para confirmar otimização, dimensões e `srcset`; depois revise recorte, ordem e texto alternativo.

Com uma foto, a página não cria miniaturas artificiais. Com várias, a galeria permite troca por botão e teclado. Sem uma pasta associada, o placeholder oficial é usado automaticamente.

## Busca e filtros

A busca normaliza caixa, acentos e pontuação e considera nome, resumo, descrição, categoria, subcategoria, palavras-chave e nomes de variantes. O filtro usa `categoryId`. Ambos atualizam os parâmetros `q` e `categoria` da URL sem transformar o catálogo em SPA.

Ao incluir termos, prefira vocabulário realmente usado pelo cliente. Não repita listas artificiais nem adicione característica que o seed não confirme.

## Verificação mínima

```bash
pnpm validate:seed
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

Antes de publicar uma mudança comercial, confirme preços pendentes, WhatsApp, textos, fotos e variantes com a Casa Nacoli.

# Casa Nacoli — kit de direção para o Codex

Este pacote não é o site pronto. Ele é a base de produto, conteúdo, design, arquitetura e execução para o Codex criar o site do zero com menos improviso e mais consistência.

## O que existe aqui

- `AGENTS.md`: regras permanentes do repositório para o Codex.
- `PLANS.md`: formato obrigatório de planejamento e execução.
- `CODEX_MASTER_PROMPT.md`: prompt inicial para começar o projeto.
- `.agents/skills/`: cinco skills especializadas para marca, UX, catálogo, SEO e qualidade.
- `docs/`: decisões de produto, arquitetura, design, copy, SEO, assets e critérios de aceite.
- `seed/`: catálogo, categorias, avaliações e configurações iniciais em JSON.
- `incoming-assets/`: local para colocar logo e fotos antes da organização.
- `prompts/`: prompts menores para executar o projeto por etapas.

## Antes de rodar o Codex

1. Copie todo este conteúdo para a raiz de uma pasta vazia.
2. Coloque logos em `incoming-assets/brand/`.
3. Coloque fotos em `incoming-assets/products/`.
4. Edite `seed/site-config.json` e substitua os campos `CONFIRMAR`, especialmente WhatsApp, Instagram, cidade e endereço.
5. Revise os dois preços de `lixo-car-personalizado`, marcados como pendentes de confirmação.
6. Inicie um repositório Git.
7. Abra o Codex na raiz e use o conteúdo de `CODEX_MASTER_PROMPT.md`.

## Resultado esperado

Um site estático e rápido, construído com Astro, TypeScript e Tailwind CSS, com:

- home orientada à conversão;
- catálogo por categorias;
- busca e filtros simples;
- páginas individuais para os produtos;
- galeria com fotos reais ou placeholder;
- chamadas para WhatsApp com mensagem contextual;
- depoimentos reais;
- SEO técnico e dados estruturados;
- acessibilidade, responsividade e testes;
- estrutura simples para adicionar novos produtos.

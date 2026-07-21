# Arquitetura de informação

## Mapa de páginas

- `/` — Home
- `/catalogo/` — todos os produtos
- `/catalogo/[categoria]/` — página de categoria
- `/produto/[slug]/` — página individual
- `/sobre/` — história, atendimento e forma de trabalho
- `/empresas/` — uniformes, brindes e materiais gráficos
- `/como-pedir/` — processo, envio de arte e orçamento
- `/contato/` — canais, horário, localização e WhatsApp
- `/politica-de-privacidade/`
- `/404`

## Navegação principal

No mobile:

1. Catálogo
2. Personalizados
3. Vestuário
4. Para empresas
5. Gráfica e impressões
6. Como pedir
7. Contato

No desktop, agrupar categorias em um menu simples. Não criar mega menu nesta versão.

## Home

Ordem recomendada:

1. Header compacto.
2. Hero curto com proposta de valor, CTA para WhatsApp e link para catálogo.
3. Atalhos visuais para as quatro categorias principais.
4. Produtos em destaque.
5. Bloco “Tem uma ideia e não sabe por onde começar?”.
6. Para empresas e pedidos em quantidade.
7. Como funciona em três ou quatro passos.
8. Avaliações reais.
9. FAQ.
10. CTA final.
11. Rodapé completo.

As categorias devem aparecer cedo, sem um banner alto empurrando a navegação para baixo.

## Catálogo

- campo de busca;
- chips de categoria;
- filtros de subcategoria quando necessário;
- contador de resultados;
- botão para limpar filtros;
- estado vazio com sugestões;
- grid de uma coluna em telas estreitas, duas em mobile amplo e mais colunas progressivamente;
- preservar filtros na URL quando possível;
- cada card mostra foto, categoria, nome, resumo curto, preço de referência e CTA.

## Página de categoria

- breadcrumb;
- H1 direto;
- descrição curta;
- atalhos de subcategoria;
- produtos;
- texto complementar útil abaixo da lista;
- CTA contextual.

## Página de produto

- breadcrumb;
- galeria;
- nome e resumo;
- preço, “a partir de” ou “consultar”;
- variantes;
- campos auxiliares para montar a mensagem: quantidade, variante e observação;
- CTA principal;
- o que pode ser personalizado;
- informações necessárias para orçamento;
- processo;
- FAQ específico quando houver;
- produtos relacionados;
- CTA final.

## Taxonomia

Os cards devem representar um produto conceitual, e não cada variação. Exemplo: “Canecas personalizadas” é um card; branca, preta e mágica são variantes na página.

Isso reduz repetição, melhora a leitura e facilita a comparação.

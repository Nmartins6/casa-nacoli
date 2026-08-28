# Importação de logos e fotos

## Entrada

Antes da primeira organização, use uma pasta de entrada ou uma cópia de segurança separada do diretório carregado pelo site:

- logos em `incoming-assets/brand/`;
- fotos em `incoming-assets/products/`.

O Codex deve inspecionar os arquivos e criar um inventário em `docs/ASSET_INVENTORY.md`.

## Destino

- `src/assets/brand/`
- `src/assets/products/<slug>/`

## Associação

Ordem de decisão:

1. nome do arquivo contém o slug ou nome do produto;
2. conteúdo visual identifica claramente o produto;
3. contexto de pastas indica a categoria;
4. se houver dúvida, manter fora do carregamento do catálogo e registrar a pendência.

Não associar uma foto apenas por semelhança vaga.

## Nomenclatura

Formato:

`<ordem>-<descricao-curta>.<ext>`

Exemplo:

`00-capa.webp` e `01-exemplo.webp`

A imagem sem sufixo numérico recebida para cada conjunto deve ser tratada como capa e renomeada para `00-capa.webp`. O campo `imageFolder` do produto aponta para a pasta confirmada e permite compartilhamento somente entre produtos equivalentes.

## Tratamento

- preservar o arquivo original fora do repositório ou em pasta documentada;
- corrigir orientação;
- remover metadados desnecessários;
- não alterar arte, logo, cor do produto ou conteúdo impresso;
- não aplicar fundo artificial sem pedido;
- não cortar o produto principal;
- gerar versões otimizadas pelo pipeline do Astro;
- registrar alt text no dado do produto.

## Placeholder

Criar um placeholder da marca, simples e neutro, com:

- fundo `cream`;
- contorno ou detalhe `terracotta`;
- ícone de imagem em `espresso`;
- texto `Foto em breve`.

Não gerar uma falsa foto de produto.

## Logo

- manter proporção;
- criar versões necessárias para fundo claro e escuro apenas a partir dos arquivos recebidos;
- não redesenhar;
- não trocar tipografia;
- não adicionar sombra ou efeito;
- produzir favicon e ícones derivados com cuidado.

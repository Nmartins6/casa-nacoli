# Inventário de assets

Inventário revisado em 28 de agosto de 2026 após a substituição da pasta de fotos de produtos. A pasta de segurança `src/assets/products antigo/` foi preservada sem alterações e está ignorada pelo Git.

## Identidade visual

| Arquivo | Formato | Dimensões | Uso |
| --- | --- | --- | --- |
| `src/assets/brand/casa-nacoli-logo.png` | PNG | 2124 × 1748 px | Logo principal no cabeçalho |
| `public/favicon.png` | PNG | Derivado do logo | Ícone do site |
| `public/images/og/casa-nacoli.png` | PNG | Derivado do logo | Compartilhamento social padrão |

Não há versão vetorial, escura ou símbolo isolado. O logo não deve ser redesenhado, distorcido ou substituído por geração artificial.

## Revisão das fotos recebidas

Foram conferidas visualmente 250 fotos WebP aprovadas, distribuídas em 39 pastas de produto. Elas totalizam aproximadamente 43,7 MiB.

| Dimensões | Quantidade |
| --- | ---: |
| 1536 × 2048 px | 223 |
| 3024 × 4032 px | 10 |
| 3120 × 4160 px | 4 |
| 1200 × 1600 px | 3 |
| 1440 × 1440 px | 2 |
| 3840 × 2160 px | 2 |
| 960 × 1280 px | 2 |
| Outras dimensões | 4 |

As fotos foram associadas somente quando pasta, nome e inspeção visual confirmaram o produto.

## Fotos organizadas por produto

| Pasta em `src/assets/products/` | Fotos |
| --- | ---: |
| `azulejo-personalizado-15x15/` | 3 |
| `blocos-personalizados/` | 5 |
| `bone-dtf-personalizado/` | 10 |
| `bottons-personalizados/` | 3 |
| `cadernos-personalizados/` | 8 |
| `calendario-geladeira-personalizado/` | 6 |
| `calendario-parede-personalizado/` | 2 |
| `camisetas-personalizadas/` | 21 |
| `caneca-polimero-personalizada/` | 6 |
| `canecas-personalizadas/` | 41 |
| `cartoes-de-visita/` | 11 |
| `cestas-personalizadas/` | 5 |
| `chaveiro-mdf-5cm/` | 9 |
| `cueca-personalizada/` | 2 |
| `display-de-mesa-personalizado/` | 6 |
| `ecobag-tnt-80g-personalizada/` | 8 |
| `etiquetas-escolares-personalizadas/` | 4 |
| `etiquetas-personalizadas/` | 9 |
| `foto-ima-personalizada/` | 5 |
| `fotos-polaroid-personalizadas/` | 2 |
| `ima-geladeira-mdf-5cm/` | 14 |
| `kits-personalizados/` | 2 |
| `lapelas-personalizadas/` | 3 |
| `lixo-car-personalizado/` | 2 |
| `magnetos-personalizados/` | 2 |
| `meia-personalizada/` | 3 |
| `moletons-personalizados/` | 2 |
| `mousepad-personalizado/` | 3 |
| `panfletos/` | 2 |
| `placa-mdf-15x20/` | 8 |
| `porta-chaves-mdf/` | 5 |
| `porta-copos-personalizado/` | 6 |
| `quebra-cabeca-personalizado/` | 6 |
| `rotulos-personalizados/` | 5 |
| `sacolas-papel-personalizadas/` | 5 |
| `squeeze-personalizado/` | 1 |
| `tags-personalizadas/` | 5 |
| `topo-de-bolo-personalizado/` | 8 |
| `ventarolas-personalizadas/` | 2 |

O arquivo `00-capa.webp` é sempre a foto principal. Os demais arquivos usam prefixos numéricos para manter a ordem da galeria. Quando um produto reúne variações — como canecas de cerâmica e camisetas — a capa geral permanece primeiro e as capas recebidas para cada variação continuam identificadas dentro da sequência.

## Produtos que compartilham um conjunto confirmado

O campo `imageFolder` permite reutilizar um conjunto real sem duplicar arquivos:

- kit de imãs usa as fotos do imã de MDF;
- kit de chaveiros usa as fotos do chaveiro em MDF;
- boné sublimado usa o conjunto recebido na pasta genérica de bonés;
- encadernação usa os exemplos encadernados do conjunto de cadernos;
- impressões em papel e adesivo e adesivo vinil usam os exemplos de etiquetas adesivas.

Com isso, 45 dos 46 produtos ativos possuem ao menos uma foto real confirmada.

## Produto ainda sem foto confirmada

`Plastificação` continua com o placeholder oficial. Não foi recebida uma imagem específica desse serviço, e nenhuma foto semelhante foi usada para evitar uma associação enganosa.

O placeholder fica em `public/images/placeholders/product-placeholder.svg` e aparece nos cards e na página do produto.

## Arquivos preservados fora do catálogo

As pastas abaixo foram mantidas intactas porque o próprio nome solicita que ainda não sejam adicionadas:

- `src/assets/products/impressoes/impressoes_diversas(nao adcionar ainda)/`: 4 fotos;
- `src/assets/products/lembrancinhas_diversas(nao adcionar ainda)/`: 6 fotos.

Essas pastas são ignoradas pelo Git e excluídas do carregamento de imagens. Os 260 arquivos auxiliares `Zone.Identifier` também são ignorados, pois não são imagens do catálogo.

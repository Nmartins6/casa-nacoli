# Inventário de assets

Inventário realizado em 20 de julho de 2026. Os originais permanecem intactos em `incoming-assets/`.

## Identidade visual

| Arquivo recebido | Formato | Dimensões | Observação |
| --- | --- | --- | --- |
| `incoming-assets/brand/logo.jpeg` | JPEG | 1600 × 1316 px | Logo completo sobre fundo claro, com símbolo, nome e assinatura |

- Não foi recebida versão vetorial.
- Não foi recebida versão transparente, escura ou símbolo isolado.
- O arquivo foi copiado sem alteração para `src/assets/brand/casa-nacoli-logo.jpeg`.
- O mesmo original serve temporariamente como favicon e base da imagem Open Graph, sem redesenho.
- O logo deve permanecer em superfícies claras para preservar sua leitura.

## Fotos de produtos recebidas

Foram encontrados 79 arquivos WebP, totalizando aproximadamente 16 MB, distribuídos assim:

| Grupo de origem | Arquivos |
| --- | ---: |
| Brindes Executivos | 13 |
| Calendários | 5 |
| Camisetas | 3 |
| Canecas | 19 |
| Cartões de Visita | 2 |
| Chaveiros personalizados | 7 |
| Ecobags | 7 |
| Papelaria | 12 |
| Porta-chaves | 3 |
| Presentes | 5 |
| Decoração | 3 |

### Dimensões

| Dimensões | Quantidade |
| --- | ---: |
| 960 × 1280 px | 51 |
| 3024 × 4032 px | 20 |
| 4032 × 3024 px | 2 |
| 1054 × 1280 px | 1 |
| 1200 × 1600 px | 1 |
| 1432 × 1600 px | 1 |
| 1440 × 1440 px | 1 |
| 1440 × 1604 px | 1 |
| 720 × 1280 px | 1 |

Todas as fotos recebidas são WebP com codificação VP8. A maioria está em orientação vertical, adequada para cards com recorte controlado.

## Duplicidades confirmadas

Quatro pares são cópias binárias, confirmadas por SHA-256:

- `Brindes Executivos/Calendário_corporativo.webp` e `Calendários/Calendário_corporativo.webp`.
- `Brindes Executivos/Calendário_corporativo_geladeira.webp` e `Calendários/Calendário_corporativo_geladeira.webp`.
- `Brindes Executivos/Caneca preta.webp` e `Canecas/Caneca preta.webp`.
- `Presentes/azulejo_personalizado.webp` e `decoração/azulejo_personalizado.webp`.

Há ainda séries com nomes e composições semelhantes — especialmente canecas, ecobags, chaveiros, calendários e quebra-cabeças — que são fotos distintas e não foram tratadas como duplicatas.

## Arquivos organizados

Foram importadas 40 fotos cuja associação ao produto do seed foi confirmada por pasta, nome e inspeção visual:

| Produto | Destino | Fotos |
| --- | --- | ---: |
| Canecas personalizadas | `src/assets/products/canecas-personalizadas/` | 19 |
| Camisetas personalizadas | `src/assets/products/camisetas-personalizadas/` | 3 |
| Cartões de visita | `src/assets/products/cartoes-de-visita/` | 2 |
| Chaveiro em MDF 5 cm | `src/assets/products/chaveiro-mdf-5cm/` | 1 |
| Ecobag de TNT 80 g personalizada | `src/assets/products/ecobag-tnt-80g-personalizada/` | 7 |
| Lixo car personalizado | `src/assets/products/lixo-car-personalizado/` | 1 |
| Porta-chaves personalizado em MDF | `src/assets/products/porta-chaves-mdf/` | 3 |
| Azulejo personalizado | `src/assets/products/azulejo-personalizado-15x15/` | 1 |
| Quebra-cabeça personalizado | `src/assets/products/quebra-cabeca-personalizado/` | 3 |

Os arquivos receberam nomes normalizados no padrão `<slug>-exemplo-<sequência>.webp`. O Astro localiza as imagens pela pasta do slug e gera variantes otimizadas no build; nenhum caminho de foto foi duplicado dentro de componentes.

## Não associados nesta etapa

Permanecem apenas em `incoming-assets/`:

- calendários, pois não há produto correspondente no seed;
- mouse pad e composições genéricas de brindes executivos;
- polaroids, displays, sacolas e papelaria sem correspondência inequívoca;
- etiquetas escolares, que são mais específicas que o produto genérico do seed;
- quadros decorativos, sem produto correspondente;
- fotos corporativas de canecas já cobertas pela série principal;
- fotos adicionais de chaveiros cujo vínculo entre produto unitário e kits não é inequívoco.

Esses arquivos não devem ser associados automaticamente sem revisão comercial do catálogo.

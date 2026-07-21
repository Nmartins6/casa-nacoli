# Design system

## Direção visual

Minimalista, acolhedora e artesanal sem parecer rústica. O site deve equilibrar a delicadeza dos personalizados com a organização necessária para serviços gráficos e pedidos empresariais.

Evitar:

- gradientes chamativos;
- glassmorphism;
- sombras pesadas;
- excesso de cantos arredondados;
- ilustrações 3D genéricas;
- ícones coloridos sem função;
- seções com frases vagas e grandes áreas vazias;
- aparência de landing page produzida por gerador automático.

## Paleta

| Token | RGB | Hex | Uso |
|---|---:|---:|---|
| `sky` | 180, 204, 234 | `#B4CCEA` | fundos leves, detalhes e estados informativos |
| `sage` | 146, 152, 116 | `#929874` | apoio natural, categorias e detalhes |
| `honey` | 221, 183, 94 | `#DDB75E` | destaque moderado e detalhes afetivos |
| `terracotta` | 193, 118, 75 | `#C1764B` | CTA principal e ênfase |
| `espresso` | 73, 66, 56 | `#494238` | texto principal e elementos escuros |
| `cream` | 250, 238, 222 | `#FAEEDE` | fundo principal e superfícies |

## Contraste

Combinações seguras para texto normal:

- `espresso` sobre `cream`;
- `espresso` sobre `sky`;
- `espresso` sobre `honey`;
- branco sobre `espresso`.

`terracotta` com branco e `sage` com branco ficam próximos do limite e não devem ser usados para textos pequenos sem validação. Para botões, preferir fundo `espresso` com texto branco ou fundo `terracotta` com texto `espresso` quando o contraste for validado no tamanho real.

## Tipografia

Usar fontes legíveis e sem aparência excessivamente “editorial de luxo”.

Sugestão:

- títulos: `Fraunces` com moderação, ou uma serifada semelhante se o logo combinar;
- corpo e interface: `Inter`, `Manrope` ou fonte de sistema.

Baixar e hospedar localmente apenas pesos realmente usados. Não usar mais que duas famílias.

Escala recomendada:

- corpo: 16–18 px;
- labels: mínimo 14 px;
- H1 mobile: 36–44 px, com comprimento controlado;
- H1 desktop: 52–64 px;
- linha do corpo: 1.55–1.7.

## Layout

- largura de conteúdo: aproximadamente 1180–1240 px;
- padding mobile: 16–20 px;
- padding desktop: 32 px;
- sistema de espaçamento em múltiplos de 4;
- seções com ritmo, não blocos idênticos;
- cards com imagem dominante e informações fáceis de escanear;
- bordas finas e sombras discretas apenas quando ajudam a separação.

## Componentes

- Header
- MobileNav
- WhatsAppButton
- CategoryCard
- ProductCard
- PriceDisplay
- VariantTable
- ProductGallery
- SearchAndFilters
- ReviewCard
- ProcessSteps
- FAQ
- Breadcrumbs
- EmptyState
- PlaceholderImage
- SEOHead
- JsonLd
- Footer

## Imagens

- manter proporções naturais na galeria;
- usar recorte consistente nos cards sem cortar o produto principal;
- definir `object-position` por imagem quando necessário;
- evitar texto embutido em imagem;
- utilizar `<Image />` ou `<Picture />` do Astro;
- gerar alt text específico;
- nunca ampliar arquivo pequeno de modo que fique visivelmente ruim.

## Movimento

- transições de 160–280 ms;
- opacidade e pequenos deslocamentos;
- nada deve bloquear a interação;
- desativar ou reduzir animações com `prefers-reduced-motion`;
- não usar carrossel automático de avaliações ou produtos.

Tokens semânticos centralizam os estados de interação: `--color-card-border`,
`--color-card-border-hover`, `--color-card-surface`, `--shadow-card-hover`,
`--motion-duration-fast`, `--motion-duration-card`,
`--motion-ease-standard`, `--motion-card-lift` e `--motion-image-scale`.
Cards de produto usam elevação de no máximo 3 px e zoom de imagem de 1.02
somente em dispositivos com hover preciso. Foco por teclado reforça borda e
sombra sem ocultar o contorno de foco do link.

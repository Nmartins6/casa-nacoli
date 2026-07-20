# SEO, performance e acessibilidade

## SEO técnico

Obrigatório:

- HTML semântico;
- um H1 por página;
- títulos e descrições únicos;
- canonical;
- Open Graph;
- sitemap;
- robots;
- URLs legíveis;
- breadcrumbs visíveis e em JSON-LD;
- página 404 útil;
- links internos entre categoria, produto e conteúdos institucionais.

## Dados estruturados

- `Organization` ou subtipo adequado de `LocalBusiness`, apenas com dados confirmados;
- `Product` em páginas de produto;
- `Offer` somente quando houver preço publicável;
- para “consultar”, não inventar preço;
- `BreadcrumbList`;
- não usar `AggregateRating` para avaliações da própria Casa Nacoli em `LocalBusiness` ou `Organization`;
- validar no Rich Results Test.

## Conteúdo para busca

Cada página de produto precisa ter texto útil e específico, não apenas imagem e preço. Cada categoria deve explicar o que o visitante encontra, usar termos que clientes realmente procuram e criar links para os produtos relevantes.

## Imagens

- nomes descritivos;
- alt text;
- largura e altura declaradas;
- formatos modernos;
- `srcset` e `sizes`;
- lazy loading abaixo da dobra;
- imagem principal prioritária apenas quando for realmente o LCP;
- evitar imagens em `public/` quando poderiam ser processadas pelo Astro.

## Performance

Metas de laboratório para páginas representativas:

- Performance Lighthouse mobile: 90 ou mais;
- Accessibility: 95 ou mais;
- Best Practices: 95 ou mais;
- SEO: 95 ou mais.

Metas de experiência:

- LCP até 2,5 s;
- INP até 200 ms;
- CLS até 0,1.

Tratar essas metas como orçamento de qualidade, não como garantia universal.

## JavaScript

- zero JavaScript por padrão;
- scripts pequenos para menu, busca, filtros e montagem da mensagem;
- não hidratar componentes estáticos;
- não adicionar biblioteca de animação sem necessidade;
- não carregar pacote completo de ícones.

## Acessibilidade

Alvo: WCAG 2.2 AA.

Obrigatório:

- navegação por teclado;
- foco visível;
- skip link;
- labels reais;
- mensagens de erro associadas;
- contraste validado;
- alvos de toque adequados;
- texto alternativo;
- estrutura correta de headings;
- dialog acessível quando houver;
- `aria-live` apenas quando necessário;
- respeito a movimento reduzido;
- não depender só de cor;
- zoom e texto ampliado sem quebra funcional.

## Testes

Automatizar:

- geração de todas as páginas ativas;
- links de WhatsApp;
- formatação de preço;
- busca sem acento;
- filtros;
- página de produto;
- navegação mobile;
- ausência de overflow horizontal;
- axe em home, catálogo, categoria e produto.

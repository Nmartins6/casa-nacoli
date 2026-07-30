# Critérios de aceite

## Catálogo

- [ ] Todos os produtos ativos de `seed/products.json` aparecem no catálogo.
- [ ] Variantes não geram cards duplicados.
- [ ] Toda categoria ativa possui URL.
- [ ] Todo produto ativo possui URL.
- [ ] Busca funciona sem diferenciar acentos.
- [ ] Filtros podem ser limpos.
- [ ] Estado vazio oferece saída.
- [ ] Adicionar um produto exige apenas dado, foto e build.

## Preços

- [ ] Valores fixos usam formato brasileiro.
- [ ] “A partir de” é usado corretamente.
- [ ] Produtos sob orçamento não exibem preço falso.
- [ ] Descontos não informados não são inventados.
- [ ] Preços pendentes de confirmação não são publicados.

## WhatsApp

- [ ] Número vem de configuração.
- [ ] Mensagem contém produto e URL.
- [ ] Variante e quantidade entram na mensagem quando preenchidas.
- [ ] Links abrem corretamente.
- [ ] CTA fixo não cobre conteúdo.
- [ ] Eventos são enviados pela abstração de analytics.

## Design

- [ ] Paleta aplicada por tokens.
- [ ] Logo não foi alterado.
- [ ] Não há aparência genérica de template.
- [ ] Fotos reais são prioridade.
- [ ] Placeholder é claramente um placeholder.
- [ ] Animações são discretas e reduzidas conforme preferência do sistema.

## Mobile

- [ ] 360 px sem overflow horizontal.
- [ ] Menu acessível.
- [ ] Categorias visíveis cedo.
- [ ] Cards legíveis.
- [ ] Botões fáceis de tocar.
- [ ] Formulários funcionam com teclado virtual.

## SEO

- [ ] Títulos e descrições únicos.
- [ ] Canonical.
- [ ] Sitemap.
- [ ] Robots.
- [ ] OG.
- [ ] Product JSON-LD sem preços inventados.
- [ ] Breadcrumb JSON-LD.
- [ ] Organization/LocalBusiness apenas com dados confirmados.
- [ ] Sem AggregateRating próprio em LocalBusiness/Organization.
- [ ] Imagens com alt e nomes úteis.

## Acessibilidade

- [ ] Skip link.
- [ ] Foco visível.
- [ ] Navegação por teclado.
- [ ] Contraste AA.
- [ ] Ordem de headings.
- [ ] Labels.
- [ ] Movimento reduzido.
- [ ] Axe sem violações críticas ou sérias.

## Engenharia

- [ ] TypeScript estrito.
- [ ] Dados validados.
- [ ] Sem duplicação de catálogo em templates.
- [ ] Sem dependências desnecessárias.
- [ ] Build estático.
- [ ] CI passa.
- [ ] README de manutenção existe.
- [ ] Histórico de commits é revisável.

# AGENTS.md — Casa Nacoli

## Missão do repositório

Construir e manter o site institucional e catálogo da Casa Nacoli, uma gráfica de produtos personalizados. O site deve facilitar a descoberta dos produtos, transmitir cuidado real no atendimento e transformar visitas em conversas qualificadas no WhatsApp.

## Fonte de verdade

Leia antes de implementar:

1. `START_HERE.md`
2. `docs/PRODUCT_BRIEF.md`
3. `docs/INFORMATION_ARCHITECTURE.md`
4. `docs/DESIGN_SYSTEM.md`
5. `docs/UX_CONVERSION.md`
6. `docs/SEO_PERFORMANCE_ACCESSIBILITY.md`
7. `docs/COPY_GUIDE.md`
8. `docs/ACCEPTANCE_CRITERIA.md`
9. `seed/*.json`

Não invente informações comerciais ausentes. Use configuração centralizada, placeholders claros ou omita a informação.

## Stack obrigatória

- Astro, instalado pela versão estável disponível no momento da criação.
- TypeScript com modo estrito.
- Tailwind CSS 4 pelo plugin Vite recomendado pelo Astro.
- Content Collections ou camada de dados validada por schema.
- `@astrojs/sitemap`.
- `@lucide/astro`, importando somente os ícones usados.
- Vitest para regras e utilitários.
- Playwright para fluxos principais.
- `@axe-core/playwright` para auditoria automatizada de acessibilidade.
- ESLint, Prettier e `prettier-plugin-astro`.
- pnpm como gerenciador.

Evite React, Vue ou outra biblioteca de UI nesta primeira versão. Adicione JavaScript no cliente apenas quando necessário.

## Arquitetura

- Páginas estáticas por padrão.
- Catálogo gerado a partir de dados, nunca duplicado manualmente em componentes.
- Um produto pode ter várias variantes e faixas de preço.
- Fotos locais devem ficar em `src/assets/products/<slug>/`.
- Logos devem ficar em `src/assets/brand/`.
- Arquivos em `public/` apenas quando não precisarem de otimização.
- Todo produto ativo deve gerar uma URL própria.
- Toda categoria ativa deve ter página própria.
- Preços, contatos e textos institucionais devem vir de dados/configuração.

## Experiência e design

- Projetar primeiro para telas de 360–430 px.
- Não esconder conteúdo essencial no mobile.
- Mostrar categorias e caminhos de compra cedo; não usar um hero gigante.
- Usar uma ação principal por contexto: conversar no WhatsApp.
- Não usar pop-up agressivo, contagem regressiva falsa, urgência inventada, carrossel automático ou excesso de badges.
- Animações devem ser discretas e respeitar `prefers-reduced-motion`.
- Não criar ilustrações genéricas de IA.
- Priorizar fotos reais dos produtos.
- Usar placeholder consistente quando não houver foto.
- Não redesenhar nem distorcer o logo recebido.

## Copy

- Português brasileiro.
- Frases curtas e naturais.
- Não usar clichês vazios como “experiência única”, “eleve sua marca” ou “transformamos sonhos em realidade”.
- Não inventar garantias, prazos, materiais, técnicas ou capacidades.
- Não exagerar em exclamações.
- A marca deve soar atenciosa, competente e próxima.
- Sempre explicar o próximo passo.

## WhatsApp

- Gerar links `wa.me` com telefone em formato internacional.
- Usar mensagem pré-preenchida específica por produto.
- Incluir produto, variante, quantidade e campo de observação quando disponíveis.
- Codificar a mensagem corretamente.
- Registrar evento de clique por uma abstração de analytics que funcione mesmo com analytics desativado.
- O botão fixo mobile não pode cobrir conteúdo, rodapé, cookies ou controles.

## SEO

- Título e descrição exclusivos.
- Canonical.
- Open Graph e Twitter cards.
- Sitemap e robots.
- JSON-LD para Organization/LocalBusiness, BreadcrumbList e Product quando aplicável.
- Não criar `Offer` com preço inexistente.
- Não marcar avaliações da própria empresa com `AggregateRating` em LocalBusiness/Organization.
- Usar HTML semântico e links reais.
- Slugs legíveis e estáveis.
- Nomes de arquivos de imagem e textos alternativos descritivos.

## Qualidade

Antes de concluir qualquer etapa relevante, execute:

- `pnpm format:check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:e2e`
- `pnpm build`

Também verifique:

- sem links quebrados;
- sem `TODO` não documentado;
- sem erros ou avisos relevantes no console;
- navegação por teclado;
- contraste;
- foco visível;
- layout em 360, 390, 768, 1024 e 1440 px;
- Lighthouse ou PageSpeed em páginas representativas.

## Git

- Inicialize Git se necessário.
- Nunca trabalhe diretamente em `main` depois do primeiro commit.
- Use branch `feat/site-inicial`.
- Commits pequenos, coerentes e no padrão Conventional Commits.
- Não faça um único commit com o site inteiro.
- Não faça push nem abra PR sem remoto configurado e autorização explícita.
- Não reescreva histórico público.

Sequência sugerida:

1. `chore: initialize astro project`
2. `feat: add brand tokens and base layout`
3. `feat: add validated catalog data model`
4. `feat: build catalog and category pages`
5. `feat: build product detail pages`
6. `feat: add whatsapp conversion flows`
7. `feat: add testimonials and trust content`
8. `feat: add seo and structured data`
9. `test: add accessibility and user flow coverage`
10. `docs: document content and maintenance workflow`

## Definition of done

Uma tarefa só está pronta quando:

- atende aos critérios de aceite relacionados;
- mantém o catálogo orientado a dados;
- funciona no mobile;
- tem estados vazios e erros tratados;
- não publica informação inventada;
- passou pelos checks;
- foi revisada no navegador;
- possui commit claro e documentação atualizada.

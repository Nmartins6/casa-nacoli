# UX e conversão

## Conversão principal

Uma conversão é uma conversa no WhatsApp com contexto suficiente para o atendimento continuar sem recomeçar do zero.

## CTA

Texto preferencial:

- `Pedir pelo WhatsApp`
- `Solicitar orçamento`
- `Falar sobre este produto`
- `Enviar minha ideia`

Evitar:

- `Saiba mais` quando a ação é contato;
- `Comprar agora`, pois não existe checkout;
- `Quero isso!` em todos os lugares;
- linguagem de urgência sem base real.

## Mensagem contextual

A mensagem deve incluir:

- origem no site;
- produto;
- variante, quando escolhida;
- quantidade;
- observação livre;
- URL da página.

Exemplo:

> Olá! Vim pelo site da Casa Nacoli e gostaria de um orçamento para Canecas personalizadas. Modelo: caneca mágica. Quantidade: 2. Detalhes: gostaria de usar duas fotos. Página: …

## Formulário antes do WhatsApp

Na página do produto, usar poucos campos opcionais para preparar a mensagem, sem exigir cadastro:

- variante;
- quantidade;
- detalhes.

Não criar um formulário longo. O objetivo é reduzir atrito, não substituir o atendimento.

## Prova social

- exibir avaliações reais com nome e comentário;
- selecionar avaliações variadas e específicas;
- não mostrar todas as avaliações em um carrossel automático;
- permitir ver mais avaliações;
- manter o texto original, corrigindo apenas problemas técnicos de exibição;
- indicar a origem como Google quando houver link confirmado;
- não transformar as avaliações da própria empresa em estrelas de dados estruturados de LocalBusiness.

## Confiança

Elementos úteis:

- fotos reais;
- preços claros;
- explicação do processo;
- indicação de que a arte é conferida;
- prazos e retirada apenas quando confirmados;
- identidade e contato da empresa;
- avaliações específicas;
- exemplos de trabalho;
- mensagens honestas sobre orçamento.

## Mobile

- CTA principal visível sem dominar a tela;
- barra fixa inferior opcional com área segura;
- alvos de toque confortáveis;
- filtros em painel simples;
- teclado não pode esconder botão de fechar ou aplicar;
- não usar hover como única forma de revelar informação;
- não forçar instalação de aplicativo.

## Busca

A busca deve:

- ignorar maiúsculas, acentos e pontuação;
- buscar em nome, categoria, subcategoria e palavras-chave;
- aceitar termos comuns como “caneca com foto”, “cartão”, “adesivo” e “uniforme”;
- mostrar estado vazio útil;
- não exigir biblioteca de busca pesada para este catálogo.

## Métricas

Criar uma camada de eventos, desativada por padrão, com:

- `whatsapp_click`;
- `product_view`;
- `category_view`;
- `catalog_search`;
- `filter_apply`.

Nunca acoplar componentes diretamente a um provedor de analytics.

export interface WhatsAppMessageOptions {
  product?: string;
  variant?: string;
  quantity?: string | number;
  details?: string;
  pageUrl?: string;
}

export function buildWhatsAppMessage({
  product,
  variant,
  quantity,
  details,
  pageUrl,
}: WhatsAppMessageOptions = {}): string {
  const parts = [
    "Olá! Vim pelo site da Casa Nacoli e gostaria de conversar sobre um pedido.",
  ];

  if (product) parts.push(`Produto: ${product}.`);
  if (variant) parts.push(`Modelo: ${variant}.`);
  if (quantity) parts.push(`Quantidade: ${quantity}.`);
  if (details) parts.push(`Detalhes: ${details}.`);
  if (pageUrl) parts.push(`Página: ${pageUrl}`);

  return parts.join(" ");
}

export function createWhatsAppUrl(
  numberOrUrl: string,
  message: string,
): string {
  const urlNumber = numberOrUrl.match(/wa\.me\/(\d+)/)?.[1];
  const normalizedNumber = urlNumber ?? numberOrUrl.replace(/\D/g, "");
  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
}

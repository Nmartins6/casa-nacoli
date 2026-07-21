import { describe, expect, it } from "vitest";
import {
  buildWhatsAppMessage,
  createWhatsAppUrl,
} from "../../src/utils/whatsapp";

describe("WhatsApp", () => {
  it("monta mensagem contextual com os dados informados", () => {
    const message = buildWhatsAppMessage({
      product: "Canecas personalizadas",
      variant: "Caneca mágica",
      quantity: 2,
      details: "Usar duas fotos",
      pageUrl: "https://casanacoli.com.br/#destaques",
    });

    expect(message).toContain("Produto: Canecas personalizadas.");
    expect(message).toContain("Modelo: Caneca mágica.");
    expect(message).toContain("Quantidade: 2.");
    expect(message).toContain("Detalhes: Usar duas fotos.");
    expect(message).toContain("Página: https://casanacoli.com.br/#destaques");
  });

  it("normaliza o telefone e codifica a mensagem", () => {
    const url = createWhatsAppUrl("+55 (51) 99979-5488", "Olá & tudo bem?");

    expect(url).toBe(
      "https://wa.me/5551999795488?text=Ol%C3%A1%20%26%20tudo%20bem%3F",
    );
  });

  it("preserva o número de um link wa.me configurado", () => {
    const url = createWhatsAppUrl(
      "https://wa.me/5551999795488",
      "Quero um orçamento",
    );

    expect(url).toContain("wa.me/5551999795488?text=");
  });
});

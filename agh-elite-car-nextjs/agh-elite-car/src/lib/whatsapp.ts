const WA_NUMBER = "212664443173";

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WA_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function reserveCarMessage(carName: string, year: number, price: number): string {
  return `Bonjour AGH Elite Car 👋\nJe souhaite réserver la ${carName} ${year} (${price} DH/jour).\nMerci de me confirmer la disponibilité.`;
}

export function contactMessage(): string {
  return "Bonjour AGH Elite Car 👋\nJe souhaite obtenir des informations sur vos véhicules.";
}

export const CONTACT = {
  phone: "+212 6 64 44 31 73",
  phoneRaw: "+212664443173",
  email: "agh.elitecar@gmail.com",
  address: "32 Rue de Cologne, Fès, Maroc",
  hours: "Lun - Dim : 8h00 - 22h00",
  whatsapp: WA_NUMBER,
};

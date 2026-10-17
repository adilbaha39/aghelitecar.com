"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/whatsapp";

type Props = {
  labels: {
    name: string;
    phone: string;
    message: string;
    submit: string;
  };
};

export default function ContactForm({ labels }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = [
      "Bonjour AGH Elite Car 👋",
      name && `Nom: ${name}`,
      phone && `Téléphone: ${phone}`,
      message && `Message: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="sr-only">
          {labels.name}
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={labels.name}
          required
          autoComplete="name"
          className="w-full rounded-xl border border-[#e8dfcc] px-4 py-3 text-sm bg-[#faf7f1] focus:outline-none focus:border-[#b8893a]"
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className="sr-only">
          {labels.phone}
        </label>
        <input
          id="contact-phone"
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={labels.phone}
          required
          autoComplete="tel"
          className="w-full rounded-xl border border-[#e8dfcc] px-4 py-3 text-sm bg-[#faf7f1] focus:outline-none focus:border-[#b8893a]"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="sr-only">
          {labels.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={labels.message}
          required
          rows={4}
          className="w-full rounded-xl border border-[#e8dfcc] px-4 py-3 text-sm bg-[#faf7f1] focus:outline-none focus:border-[#b8893a] resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#e9cf94] to-[#c9993f] text-[#2a1e07] rounded-full px-6 py-3 font-semibold text-sm hover:-translate-y-0.5 transition-transform"
      >
        {labels.submit} →
      </button>
    </form>
  );
}

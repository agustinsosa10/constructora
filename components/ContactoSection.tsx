"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactoSection() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Placeholder — Resend integration in a future task
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  };

  return (
    <section id="contacto" className="bg-white py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <ScrollReveal delay={0}>
          <div className="w-10 h-0.5 bg-[#C41230] mb-3" />
          <p className="text-[#C41230] text-xs font-bold tracking-[0.3em] uppercase mb-2">
            Contacto
          </p>
          <h2 className="text-[#1A1A1A] font-extrabold text-4xl md:text-5xl tracking-tight mb-12">
            Hablemos de<br />tu proyecto
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: map + contact info */}
          <ScrollReveal delay={100}>
            <div>
              {/* Google Maps embed */}
              <div className="w-full aspect-video mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.517939830691!2d-65.40860242463184!3d-24.77771217798342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc3eb795a3cf1%3A0x73da9b4df4d3d24e!2sIES%20Desarrollos%20Inmobiliarios!5e0!3m2!1ses-419!2sar!4v1775310137571!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold tracking-widest text-[#C41230] uppercase mb-1">
                    Dirección
                  </p>
                  <p className="text-[#1A1A1A] text-sm">Salta Capital, Argentina</p>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-[#C41230] uppercase mb-1">
                    Teléfono / WhatsApp
                  </p>
                  <a
                    href="https://wa.me/5493874000000"
                    className="text-[#1A1A1A] text-sm hover:text-[#C41230] transition-colors"
                  >
                    +54 9 387 400-0000
                  </a>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-[#C41230] uppercase mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:info@iesdesarrollos.com.ar"
                    className="text-[#1A1A1A] text-sm hover:text-[#C41230] transition-colors"
                  >
                    info@iesdesarrollos.com.ar
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: form */}
          <ScrollReveal delay={200}>
            <div>
              {status === "sent" ? (
                <div className="flex flex-col items-start justify-center h-full gap-4">
                  <div className="w-10 h-0.5 bg-[#C41230]" />
                  <p className="text-[#1A1A1A] font-bold text-xl">
                    ¡Mensaje enviado!
                  </p>
                  <p className="text-[#595959] text-sm">
                    Te contactaremos a la brevedad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-[#595959] uppercase mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="w-full bg-white border border-[#e0e0e0] px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-[#595959] uppercase mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white border border-[#e0e0e0] px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-[#595959] uppercase mb-2">
                      Mensaje
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.mensaje}
                      onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      className="w-full bg-white border border-[#e0e0e0] px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none"
                      placeholder="¿En qué proyecto estás interesado?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-[#C41230] text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-red-800 transition-colors disabled:opacity-60"
                  >
                    {status === "sending" ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

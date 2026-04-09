"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactoSection() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

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
            Hablemos de
            <br />
            tu proyecto
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
                  <p className="text-[#1A1A1A] text-sm">
                    Salta Capital, Argentina
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-[#C41230] uppercase mb-1">
                    Teléfono / WhatsApp
                  </p>
                  <a
                    href="https://wa.me/5493874509304"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1A1A1A] text-sm hover:text-[#C41230] transition-colors"
                  >
                    +54 9 387 450-9304
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
                <div>
                  <p className="text-xs font-bold tracking-widest text-[#C41230] uppercase mb-1">
                    Redes sociales
                  </p>
                  <div className="flex gap-2 mt-2">
                    <a
                      href="https://www.instagram.com/ies.desarrollos.ok"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 border border-[#e0e0e0] flex items-center justify-center text-[#595959] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                      aria-label="Instagram"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61574219910871"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 border border-[#e0e0e0] flex items-center justify-center text-[#595959] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                      aria-label="Facebook"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/@iesdesarrolloinmobiliario7157"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 border border-[#e0e0e0] flex items-center justify-center text-[#595959] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                      aria-label="YouTube"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/ies-desarrollos/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 border border-[#e0e0e0] flex items-center justify-center text-[#595959] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.tiktok.com/@ies.desarrollos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 border border-[#e0e0e0] flex items-center justify-center text-[#595959] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                      aria-label="TikTok"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                      </svg>
                    </a>
                  </div>
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
                      onChange={(e) =>
                        setForm({ ...form, nombre: e.target.value })
                      }
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
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
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
                      onChange={(e) =>
                        setForm({ ...form, mensaje: e.target.value })
                      }
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

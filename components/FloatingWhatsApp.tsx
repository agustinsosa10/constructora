"use client";

import { useParams, usePathname } from "next/navigation";

const PHONE = "5493874509304";
const GENERIC_MSG =
  "Hola, me comunico desde el sitio web de IES Desarrollos. Me gustaría recibir más información sobre sus proyectos.";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const params = useParams();

  let mensaje = GENERIC_MSG;

  if (pathname.startsWith("/proyectos/") && params.slug) {
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    mensaje = `Hola, me comunico desde el sitio web de IES Desarrollos. Me gustaría recibir más información sobre el proyecto "${slug}".`;
  }

  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="hidden md:flex fixed bottom-6 right-6 z-50 items-center justify-center w-14 h-14 rounded-full bg-[#1A1A1A] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform duration-200 hover:scale-110"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="#25D366"
        aria-hidden="true"
      >
        <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.469 2.018 7.77L0 32l8.454-2.217A15.93 15.93 0 0 0 16 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.77-1.852l-.485-.288-5.017 1.315 1.34-4.887-.317-.502A13.226 13.226 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.199-2.355-1.162-2.72-1.295-.365-.133-.631-.199-.897.199-.266.398-1.03 1.295-1.263 1.561-.232.266-.465.299-.863.1-.398-.2-1.681-.619-3.202-1.977-1.183-1.056-1.982-2.36-2.214-2.758-.232-.398-.025-.613.175-.811.18-.178.398-.465.597-.698.2-.232.266-.398.399-.664.133-.266.066-.498-.033-.697-.1-.2-.897-2.162-1.23-2.96-.324-.777-.652-.672-.897-.684l-.764-.013c-.266 0-.697.1-1.063.498-.365.398-1.395 1.362-1.395 3.322 0 1.96 1.428 3.854 1.627 4.12.2.266 2.81 4.29 6.81 6.017.952.411 1.695.657 2.274.841.956.304 1.826.261 2.514.158.767-.114 2.355-.962 2.688-1.891.333-.93.333-1.726.232-1.892-.1-.165-.365-.265-.763-.464z" />
      </svg>
    </a>
  );
}

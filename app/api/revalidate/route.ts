import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookBody = {
  _type: string
  slug?: { current: string }
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookBody>(
      req,
      process.env.SANITY_WEBHOOK_SECRET,
    )

    if (!isValidSignature) {
      return new NextResponse('Firma inválida', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    // Revalida el home y la página de todos los proyectos
    revalidatePath('/', 'layout')
    revalidatePath('/proyectos', 'layout')

    // Si el webhook incluye el slug, revalida también la página individual
    if (body.slug?.current) {
      revalidatePath(`/proyectos/${body.slug.current}`)
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error('Error en webhook de revalidación:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

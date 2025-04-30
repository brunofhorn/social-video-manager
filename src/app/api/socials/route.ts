import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const socials = await prisma.social.findMany({ orderBy: { name: 'asc' } })
    return NextResponse.json(socials)
  } catch (error) {
    console.error('[GET /api/socials]', error)
    return NextResponse.json({ error: 'Erro ao listar redes sociais.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, url } = body

    if (!name) {
      return NextResponse.json({ error: 'O nome da rede social é obrigatório.' }, { status: 400 })
    }

    const social = await prisma.social.create({ data: { name, url } })
    return NextResponse.json(social, { status: 201 })
  } catch (error) {
    console.error('[POST /api/socials]', error)
    return NextResponse.json({ error: 'Erro ao cadastrar rede social.' }, { status: 500 })
  }
}
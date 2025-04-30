import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const socials = await prisma.social.findMany({ orderBy: { name: 'asc' } });
    return NextResponse.json(socials);
  } catch (error) {
    console.error('[GET /api/socials]', error);
    return NextResponse.json({ error: 'Erro ao listar redes sociais.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, url, icon } = await req.json();
    if (!name) {
      return NextResponse.json({ error: 'O nome da rede social é obrigatório.' }, { status: 400 });
    }
    const social = await prisma.social.create({ data: { name, url, icon } });
    return NextResponse.json(social, { status: 201 });
  } catch (error) {
    console.error('[POST /api/socials]', error);
    return NextResponse.json({ error: 'Erro ao cadastrar rede social.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'ID não informado.' }, { status: 400 });

  try {
    const relatedPosts = await prisma.post.findFirst({ where: { social_id: id } });
    if (relatedPosts) {
      return NextResponse.json({ error: 'Esta rede social está vinculada a um vídeo e não pode ser removida.' }, { status: 409 });
    }
    await prisma.social.delete({ where: { id } });
    return NextResponse.json({ message: 'Removido com sucesso.' });
  } catch (error) {
    console.error('[DELETE /api/socials]', error);
    return NextResponse.json({ error: 'Erro ao remover rede social.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, url, icon } = await req.json();
    if (!id || !name) {
      return NextResponse.json({ error: 'ID e nome são obrigatórios.' }, { status: 400 });
    }
    const updated = await prisma.social.update({
      where: { id },
      data: { name, url, icon },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('[PUT /api/socials]', error);
    return NextResponse.json({ error: 'Erro ao atualizar rede social.' }, { status: 500 });
  }
}
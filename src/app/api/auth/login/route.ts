import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { email, senha } = await req.json();

    if (!email || !senha) {
        return new Response(JSON.stringify({ error: 'Credenciais obrigatórias' }), { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return new Response(JSON.stringify({ error: 'Usuário não encontrado' }), { status: 401 });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.password);

    if (!senhaCorreta) {
        return new Response(JSON.stringify({ error: 'Senha incorreta' }), { status: 401 });
    }

    const res = NextResponse.json({ message: 'Autenticado com sucesso' }, { status: 200 });
    res.cookies.set('auth', 'true', {
        path: '/',
        maxAge: 60 * 60 * 24,
    });
    return res;
}

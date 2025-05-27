import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_TOKEN_SECRET = process.env.NEXT_JWT_TOKEN_SECRET!;

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return new Response(JSON.stringify({ error: 'Credenciais obrigatórias' }), { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return new Response(JSON.stringify({ error: 'Usuário não encontrado' }), { status: 401 });
    }

    const encryptedPassword = await bcrypt.compare(password, user.password);

    if (!encryptedPassword) {
        return new Response(JSON.stringify({ error: 'Senha incorreta' }), { status: 401 });
    }

    const token = jwt.sign(
        { email },
        JWT_TOKEN_SECRET,
        { expiresIn: '20d' }
    );

    const res = NextResponse.json({ message: 'Autenticado com sucesso' }, { status: 200 });

    res.cookies.set('token', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 20,
    });
    
    return res;
}

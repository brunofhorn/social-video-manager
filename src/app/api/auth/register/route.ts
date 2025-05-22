import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
        return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
        return NextResponse.json({ error: 'E-mail já cadastrado' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return NextResponse.json({ message: 'Usuário cadastrado com sucesso' }, { status: 201 });
}

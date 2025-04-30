import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const videos = await prisma.video.findMany({
            include: {
                posts: {
                    include: {
                        social: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });
        return NextResponse.json(videos);
    } catch (error) {
        console.error('[GET /api/videos]', error);
        return NextResponse.json({ error: 'Erro ao listar vídeos.' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, description, posts } = body;

        console.log("BODY: ", body);

        if (!title || !posts || !Array.isArray(posts)) {
            return NextResponse.json({ error: 'Título e postagens são obrigatórios.' }, { status: 400 });
        }

        console.log("QUERY: ", JSON.stringify({
            title,
            description,
            posts: {
                create: posts.map((post: any) => ({
                    social: {
                        connect: { id: post.social_id },
                    },
                    link: post.link,
                    post_date: new Date(post.post_date),
                })),
            },
        }));

        const novoVideo = await prisma.video.create({
            data: {
                title,
                description,
                posts: {
                    create: posts.map((post: any) => ({
                        social: {
                            connect: { id: post.social_id },
                        },
                        link: post.link,
                        post_date: new Date(post.post_date),
                    })),
                },
            },
            include: {
                posts: true,
            },
        });

        return NextResponse.json(novoVideo, { status: 201 });
    } catch (error) {
        console.error('[POST /api/videos]', error);
        return NextResponse.json({ error: 'Erro ao cadastrar vídeo.' }, { status: 500 });
    }
}
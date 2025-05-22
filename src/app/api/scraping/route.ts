import { scrapingTask } from '@/function/scraping';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const videoId = req.nextUrl.searchParams.get('videoId');

    if (!videoId) {
        return new Response('Missing videoId', { status: 400 });
    }

    try {
        await scrapingTask(Number(videoId));
        return new Response('Tarefas de scraping criadas', { status: 200 });
    } catch (err) {
        return new Response('Erro ao criar tarefas', { status: 500 });
    }
}
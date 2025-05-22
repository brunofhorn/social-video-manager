import prisma from '@/lib/prisma';
import puppeteer from 'puppeteer';

export async function processarFila() {
    const tasks = await prisma.videoMetricTask.findMany({
        where: { status: 'PENDENTE' },
        take: 10,
    });

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    for (const task of tasks) {
        try {
            await page.goto(task.postUrl, { waitUntil: 'networkidle2', timeout: 15000 });
            await page.waitForSelector('span.x193iq5w', { timeout: 7000 });

            const views = await page.evaluate(() => {
                const span = document.querySelector('span.x193iq5w');
                return span?.textContent?.replace(/\D/g, '') || '0';
            });

            await prisma.videoMetricTask.update({
                where: { id: task.id },
                data: {
                    views: parseInt(views),
                    status: 'OK',
                    error: null,
                }
            });
        } catch (err: any) {
            await prisma.videoMetricTask.update({
                where: { id: task.id },
                data: {
                    status: 'FALHA',
                    error: err.message,
                }
            });
        }
    }

    await browser.close();
}

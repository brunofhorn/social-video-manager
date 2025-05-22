import prisma from "@/lib/prisma";

export async function scrapingTask(videoId: number) {
    const video = await prisma.video.findUnique({
        where: { id: videoId },
        include: { posts: true },
    });

    if (!video) return;

    const tasks = video.posts.map(post => ({
        video_id: video.id,
        postUrl: post.link,
        social_id: post.social_id,
        status: 'PENDENTE',
    }));

    await prisma.videoMetricTask.createMany({ data: tasks });
}
-- CreateTable
CREATE TABLE "videos" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reposted" BOOLEAN NOT NULL DEFAULT false,
    "boosted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_metric_tasks" (
    "id" SERIAL NOT NULL,
    "video_id" INTEGER NOT NULL,
    "social_id" INTEGER NOT NULL,
    "postUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "views" INTEGER,
    "error" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "video_metric_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socials" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "icon" TEXT,

    CONSTRAINT "socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "video_id" INTEGER NOT NULL,
    "social_id" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "post_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "socials_name_key" ON "socials"("name");

-- CreateIndex
CREATE UNIQUE INDEX "posts_video_id_social_id_key" ON "posts"("video_id", "social_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "video_metric_tasks" ADD CONSTRAINT "video_metric_tasks_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_metric_tasks" ADD CONSTRAINT "video_metric_tasks_social_id_fkey" FOREIGN KEY ("social_id") REFERENCES "socials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_social_id_fkey" FOREIGN KEY ("social_id") REFERENCES "socials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reposted" BOOLEAN NOT NULL DEFAULT false,
    "boosted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "icon" TEXT,

    CONSTRAINT "socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "social_id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "post_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "socials_name_key" ON "socials"("name");

-- CreateIndex
CREATE UNIQUE INDEX "posts_video_id_social_id_key" ON "posts"("video_id", "social_id");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_social_id_fkey" FOREIGN KEY ("social_id") REFERENCES "socials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


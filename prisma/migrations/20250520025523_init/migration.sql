-- CreateTable
CREATE TABLE "videos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reposted" BOOLEAN NOT NULL DEFAULT false,
    "boosted" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "video_metric_tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "video_id" INTEGER NOT NULL,
    "social_id" INTEGER NOT NULL,
    "postUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "views" INTEGER,
    "error" TEXT,
    "updated_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "video_metric_tasks_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "video_metric_tasks_social_id_fkey" FOREIGN KEY ("social_id") REFERENCES "socials" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "socials" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "icon" TEXT
);

-- CreateTable
CREATE TABLE "posts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "video_id" INTEGER NOT NULL,
    "social_id" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "post_date" DATETIME NOT NULL,
    CONSTRAINT "posts_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "posts_social_id_fkey" FOREIGN KEY ("social_id") REFERENCES "socials" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "socials_name_key" ON "socials"("name");

-- CreateIndex
CREATE UNIQUE INDEX "posts_video_id_social_id_key" ON "posts"("video_id", "social_id");

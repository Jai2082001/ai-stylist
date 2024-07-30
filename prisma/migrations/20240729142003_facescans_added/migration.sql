-- CreateTable
CREATE TABLE "FaceScans" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "FaceScans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FaceScans" ADD CONSTRAINT "FaceScans_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

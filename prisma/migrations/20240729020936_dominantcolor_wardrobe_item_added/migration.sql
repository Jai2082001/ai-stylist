-- CreateTable
CREATE TABLE "WardrobeItem" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "dominantColorId" INTEGER NOT NULL,

    CONSTRAINT "WardrobeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DominantColor" (
    "id" SERIAL NOT NULL,
    "blue" INTEGER NOT NULL,
    "red" INTEGER NOT NULL,
    "green" INTEGER NOT NULL,

    CONSTRAINT "DominantColor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WardrobeItem" ADD CONSTRAINT "WardrobeItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WardrobeItem" ADD CONSTRAINT "WardrobeItem_dominantColorId_fkey" FOREIGN KEY ("dominantColorId") REFERENCES "DominantColor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

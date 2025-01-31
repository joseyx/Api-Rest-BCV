-- CreateTable
CREATE TABLE "Exchange_Rate" (
    "id" SERIAL NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exchange_Rate_pkey" PRIMARY KEY ("id")
);

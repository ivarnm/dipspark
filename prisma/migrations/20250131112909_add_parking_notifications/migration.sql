-- CreateTable
CREATE TABLE "ParkingAvailableSubscription" (
    "token" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParkingAvailableSubscription_pkey" PRIMARY KEY ("token","date")
);

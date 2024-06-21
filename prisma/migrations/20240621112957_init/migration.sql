-- CreateTable
CREATE TABLE "Student" (
    "record_id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("record_id")
);

-- CreateTable
CREATE TABLE "Question" (
    "q_id" SERIAL NOT NULL,
    "difficulty" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "choices" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("q_id")
);

-- CreateTable
CREATE TABLE "Test" (
    "test_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "questions" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("test_id")
);

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `gender` ENUM('male', 'female') NOT NULL,
    `workoutGoal` ENUM('lose_weight', 'increase_strength', 'bulk', 'try_test') NOT NULL,
    `workoutDays` INTEGER NOT NULL,
    `workoutPlace` ENUM('home', 'gym') NOT NULL,
    `healthCondition` JSON NOT NULL,
    `focusPart` JSON NOT NULL,
    `height` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `idealWeight` INTEGER NOT NULL,
    `birthDate` VARCHAR(191) NOT NULL,
    `bodyForm` ENUM('thin', 'obese') NOT NULL,
    `bodyImage` VARCHAR(191) NULL,
    `dietPlan` BOOLEAN NOT NULL DEFAULT false,
    `interestSport` ENUM('running', 'trx', 'hiking', 'skating', 'biking', 'body_building') NOT NULL,
    `userPlan` ENUM('one_month', 'six_months', 'twelve_months') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

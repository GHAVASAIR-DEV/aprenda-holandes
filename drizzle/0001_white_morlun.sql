CREATE TABLE `exercises` (
	`id` varchar(64) NOT NULL,
	`lessonId` varchar(64) NOT NULL,
	`type` enum('multiple_choice','fill_blank','matching','listening','speaking') NOT NULL,
	`question` text NOT NULL,
	`options` text,
	`correctAnswer` text NOT NULL,
	`explanation` text,
	`audioUrl` varchar(512),
	`orderIndex` varchar(10) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `exercises_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` varchar(64) NOT NULL,
	`moduleId` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`content` text,
	`orderIndex` varchar(10) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `lessons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `modules` (
	`id` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`level` enum('A1','A2') NOT NULL,
	`orderIndex` varchar(10) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `modules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userProgress` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`lessonId` varchar(64) NOT NULL,
	`completed` varchar(10) NOT NULL DEFAULT 'false',
	`score` varchar(10),
	`lastAccessedAt` timestamp DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `userProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vocabulary` (
	`id` varchar(64) NOT NULL,
	`lessonId` varchar(64) NOT NULL,
	`dutch` varchar(255) NOT NULL,
	`portuguese` varchar(255) NOT NULL,
	`pronunciation` varchar(255),
	`audioUrl` varchar(512),
	`example` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `vocabulary_id` PRIMARY KEY(`id`)
);

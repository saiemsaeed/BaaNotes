CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`is_completed` integer DEFAULT false NOT NULL
);

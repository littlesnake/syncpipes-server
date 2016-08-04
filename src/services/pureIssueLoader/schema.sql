CREATE TABLE IF NOT EXISTS `projects` (
	`id` SERIAL,
	`github_id` INT NOT NULL,
	`name` VARCHAR(512) NOT NULL,
	`full_name` VARCHAR(512) NOT NULL,
	`description` TEXT NULL,
	`language` VARCHAR(512) NULL,
	`git_url` VARCHAR(512) NOT NULL,
	`watcher_count` INT NOT NULL DEFAULT 0,
	`stars_count` INT NOT NULL DEFAULT 0,
	`created_at` VARCHAR(512) NOT NULL,
	`updated_at` VARCHAR(512) NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `issues` (
	`id` SERIAL,
	`github_id` INT NOT NULL,
	`project_id` BIGINT UNSIGNED,
	`number` INT NOT NULL,
	`title` VARCHAR(512) NOT NULL,
	`body` TEXT NOT NULL,
	`user` VARCHAR(512) NOT NULL,
	`state` VARCHAR(512) NOT NULL,
	`created_at` VARCHAR(512) NOT NULL,
	`updated_at` VARCHAR(512) NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `comments` (
	`id` SERIAL,
    `github_id` INT NOT NULL,
	`issue_id` BIGINT UNSIGNED,
	`body` TEXT NOT NULL,
	`user` VARCHAR(512) NOT NULL,
	`created_at` VARCHAR(512) NOT NULL,
	`updated_at` VARCHAR(512) NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`issue_id`) REFERENCES `issues`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

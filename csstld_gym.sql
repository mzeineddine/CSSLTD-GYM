-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2025 at 11:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `csstld_gym`
--

-- --------------------------------------------------------

--
-- Table structure for table `access`
--

CREATE TABLE `access` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `page` varchar(255) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_deleted` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `access`
--

INSERT INTO `access` (`id`, `user_id`, `page`, `action`, `created_by`, `created_on`, `is_deleted`) VALUES
(1, 1, 'balance', '4', NULL, '2025-06-04 15:08:15', 0),
(2, 1, 'access', '1', NULL, '2025-06-04 15:08:15', 0),
(3, 1, 'access', '2', NULL, '2025-06-04 15:08:15', 0),
(4, 1, 'access', '4', NULL, '2025-06-04 15:08:15', 0),
(5, 1, 'access', '3', NULL, '2025-06-04 15:08:15', 0),
(6, 1, 'coach', '1', NULL, '2025-06-04 15:08:15', 0),
(7, 1, 'coach', '2', NULL, '2025-06-04 15:08:15', 0),
(8, 1, 'expense', '1', NULL, '2025-06-04 15:08:15', 0),
(9, 1, 'expense', '2', NULL, '2025-06-04 15:08:15', 0),
(10, 1, 'expense', '3', NULL, '2025-06-04 15:08:15', 0),
(11, 1, 'staff', '1', NULL, '2025-06-04 15:08:15', 0),
(12, 1, 'staff', '2', NULL, '2025-06-04 15:08:15', 0),
(13, 1, 'staff', '3', NULL, '2025-06-04 15:08:15', 0),
(14, 1, 'staff', '4', NULL, '2025-06-04 15:08:15', 0),
(15, 1, 'calendar', '2', NULL, '2025-06-04 15:08:15', 0),
(16, 1, 'calendar', '3', NULL, '2025-06-04 15:08:15', 0),
(17, 1, 'category', '2', NULL, '2025-06-04 15:08:15', 0),
(18, 1, 'category', '3', NULL, '2025-06-04 15:08:15', 0),
(19, 1, 'category', '4', NULL, '2025-06-04 15:08:15', 0),
(20, 1, 'coach', '4', NULL, '2025-06-04 15:08:15', 0),
(21, 1, 'coach', '3', NULL, '2025-06-04 15:08:15', 0),
(22, 1, 'calendar', '1', NULL, '2025-06-04 15:08:15', 0),
(23, 1, 'calendar', '4', NULL, '2025-06-04 15:08:15', 0),
(24, 1, 'balance', '3', NULL, '2025-06-04 15:08:15', 0),
(25, 1, 'expense', '4', NULL, '2025-06-04 15:08:15', 0),
(26, 1, 'member_payment', '2', NULL, '2025-06-04 15:08:15', 0),
(27, 1, 'member_payment', '3', NULL, '2025-06-04 15:08:15', 0),
(28, 1, 'member_payment', '1', NULL, '2025-06-04 15:08:15', 0),
(29, 1, 'account_payment', '4', NULL, '2025-06-04 15:08:15', 0),
(30, 1, 'account', '1', NULL, '2025-06-04 15:08:15', 0),
(31, 1, 'account', '2', NULL, '2025-06-04 15:08:15', 0),
(32, 1, 'account_payment', '2', NULL, '2025-06-04 15:08:15', 0),
(33, 1, 'account_payment', '1', NULL, '2025-06-04 15:08:15', 0),
(34, 1, 'account_payment', '3', NULL, '2025-06-04 15:08:15', 0),
(35, 1, 'account', '4', NULL, '2025-06-04 15:08:15', 0),
(36, 1, 'account', '3', NULL, '2025-06-04 15:08:15', 0),
(37, 1, 'balance', '2', NULL, '2025-06-04 15:08:15', 0),
(38, 1, 'balance', '1', NULL, '2025-06-04 15:08:15', 0),
(39, 1, 'member_payment', '4', NULL, '2025-06-04 15:08:15', 0),
(40, 1, 'member', '1', NULL, '2025-06-04 15:08:15', 0),
(41, 1, 'member', '2', NULL, '2025-06-04 15:08:15', 0),
(42, 1, 'member', '3', NULL, '2025-06-04 15:08:15', 0),
(43, 1, 'log', '1', NULL, '2025-06-04 15:08:15', 0),
(44, 1, 'log', '2', NULL, '2025-06-04 15:08:15', 0),
(45, 1, 'log', '3', NULL, '2025-06-04 15:08:15', 0),
(46, 1, 'log', '4', NULL, '2025-06-04 15:08:15', 0),
(47, 1, 'settings', '1', NULL, '2025-06-04 15:08:15', 0),
(48, 1, 'settings', '2', NULL, '2025-06-04 15:08:15', 0),
(49, 1, 'member', '4', NULL, '2025-06-04 15:08:15', 0),
(50, 1, 'category', '1', NULL, '2025-06-04 15:08:15', 0),
(51, 1, 'settings', '3', NULL, '2025-06-04 15:08:15', 0),
(52, 1, 'settings', '4', NULL, '2025-06-04 15:08:15', 0),
(53, 1, 'subscription', '1', NULL, '2025-06-04 15:08:15', 0),
(54, 1, 'subscription', '2', NULL, '2025-06-04 15:08:15', 0),
(55, 1, 'subscription', '3', NULL, '2025-06-04 15:08:15', 0),
(56, 1, 'subscription', '4', NULL, '2025-06-04 15:08:15', 0);

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `coach_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `end_date` timestamp NOT NULL DEFAULT `start_date`,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` tinyint(4) NOT NULL,
  `price` double DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `coaches`
--

CREATE TABLE `coaches` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  `bill_amount` double DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Table structure for table `payment_accounts`
--

CREATE TABLE `payment_accounts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `cost` double DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Table structure for table `subscription_payments`
--

CREATE TABLE `subscription_payments` (
  `id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscription_payments`
--

INSERT INTO `subscription_payments` (`id`, `member_id`, `amount`, `created_on`, `created_by`, `is_deleted`) VALUES
(1, 2, 20, '2025-05-14 15:08:17', 1, 1),
(2, 630, 568.71, '2025-05-15 06:42:20', 1, 0),
(3, 936, 983.33, '2025-05-15 06:42:20', 1, 0),
(4, 111, 604.8, '2025-05-15 06:42:20', 1, 0),
(5, 675, 571.26, '2025-05-15 06:42:20', 1, 0),
(6, 814, 370.72, '2025-05-15 06:42:20', 1, 0),
(7, 384, 822.36, '2025-05-15 06:42:20', 1, 0),
(8, 955, 318.44, '2025-05-15 06:42:20', 1, 0),
(9, 695, 539.12, '2025-05-15 06:42:20', 1, 0),
(10, 592, 357.29, '2025-05-15 06:42:20', 1, 0),
(11, 982, 856.49, '2025-05-15 06:42:20', 1, 0),
(12, 332, 97.73, '2025-05-15 06:42:20', 1, 0),
(13, 452, 988.38, '2025-05-15 06:42:20', 1, 0),
(14, 590, 979.59, '2025-05-15 06:42:20', 1, 0),
(15, 132, 716.81, '2025-05-15 06:42:20', 1, 0),
(16, 180, 753.07, '2025-05-15 06:42:20', 1, 0),
(17, 219, 837.04, '2025-05-15 06:42:20', 1, 0),
(18, 526, 126.18, '2025-05-15 06:42:20', 1, 0),
(20, 1002, 20, '2025-05-15 07:26:14', 1, 0),
(21, 2, 20, '2025-05-27 08:47:26', 1, 0),
(22, 2, 10, '2025-05-27 09:01:44', 1, 1),
(23, 2, 20, '2025-05-27 09:02:18', 1, 0),
(24, 2, 5, '2025-05-27 09:02:22', 1, 0),
(25, 2, 10, '2025-05-27 09:02:33', 1, 1),
(26, 1013, 20, '2025-06-02 07:17:01', 1001, 0),
(27, 1013, 10, '2025-06-02 07:19:18', 1001, 0),
(28, 1013, 10, '2025-06-02 07:19:36', 1001, 0),
(29, 1013, 10, '2025-06-02 07:21:19', 1001, 0),
(30, 1014, 45, '2025-06-02 08:29:50', 1, 0),
(31, 1015, 50, '2025-06-02 08:43:04', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `access_level` int(11) DEFAULT 0,
  `contact` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` tinyint(255) DEFAULT 0,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_deleted` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `title`, `access_level`, `contact`, `address`, `status`, `created_on`, `is_deleted`) VALUES
(1, 'test@gmail.com', '$2y$10$KXm8TC29XGrY80/VVoa0Gu9HUDMRGRo8Pxbt47C.E77MSI0eFtET6', 'test', 'admin', 0, 'test contact', 'test address', 0, '2025-04-23 09:56:46', 0),

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access`
--
ALTER TABLE `access`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `coach_id` (`coach_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coach_id` (`coach_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `class_members`
--
ALTER TABLE `class_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `class_member_attendances`
--
ALTER TABLE `class_member_attendances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_member_id` (`class_member_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `coaches`
--
ALTER TABLE `coaches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `expense_payments`
--
ALTER TABLE `expense_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `fk_account_id` (`account_id`);

--
-- Indexes for table `global_settings`
--
ALTER TABLE `global_settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `payment_accounts`
--
ALTER TABLE `payment_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `subscription_payments`
--
ALTER TABLE `subscription_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `access`
--
ALTER TABLE `access`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3832;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1003;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `class_members`
--
ALTER TABLE `class_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `class_member_attendances`
--
ALTER TABLE `class_member_attendances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `coaches`
--
ALTER TABLE `coaches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1001;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `expense_payments`
--
ALTER TABLE `expense_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `global_settings`
--
ALTER TABLE `global_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=406;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1017;

--
-- AUTO_INCREMENT for table `payment_accounts`
--
ALTER TABLE `payment_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `subscription_payments`
--
ALTER TABLE `subscription_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1016;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `access`
--
ALTER TABLE `access`
  ADD CONSTRAINT `access_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `access_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`id`),
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`id`),
  ADD CONSTRAINT `classes_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `class_members`
--
ALTER TABLE `class_members`
  ADD CONSTRAINT `class_members_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  ADD CONSTRAINT `class_members_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `class_members_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `class_member_attendances`
--
ALTER TABLE `class_member_attendances`
  ADD CONSTRAINT `class_member_attendances_ibfk_1` FOREIGN KEY (`class_member_id`) REFERENCES `class_members` (`id`),
  ADD CONSTRAINT `class_member_attendances_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `coaches`
--
ALTER TABLE `coaches`
  ADD CONSTRAINT `coaches_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `payment_accounts` (`id`),
  ADD CONSTRAINT `expenses_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `expense_payments`
--
ALTER TABLE `expense_payments`
  ADD CONSTRAINT `expense_payments_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `expenses` (`id`),
  ADD CONSTRAINT `expense_payments_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_account_id` FOREIGN KEY (`account_id`) REFERENCES `payment_accounts` (`id`);

--
-- Constraints for table `global_settings`
--
ALTER TABLE `global_settings`
  ADD CONSTRAINT `global_settings_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `members_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `payment_accounts`
--
ALTER TABLE `payment_accounts`
  ADD CONSTRAINT `payment_accounts_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `subscriptions_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `subscriptions_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `subscription_payments`
--
ALTER TABLE `subscription_payments`
  ADD CONSTRAINT `subscription_payments_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `subscription_payments_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

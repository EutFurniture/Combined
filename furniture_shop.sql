-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2021 at 06:04 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `furniture_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `totalprice` int(11) NOT NULL,
  `date` date NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `name`, `date`) VALUES
(1, 'dining set', '2021-09-05'),
(2, 'Table', '2021-09-05'),
(3, 'Chair', '2021-09-05'),
(4, 'sofa', '2021-09-05'),
(5, 'bed', '2021-09-05'),
(6, 'gift', '2021-09-05'),
(7, 'customized', '2021-09-05');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `address` varchar(100) NOT NULL,
  `password` varchar(25) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `nic` varchar(13) NOT NULL,
  `points` int(50) NOT NULL,
  `date` date NOT NULL,
  `order_frequency` varchar(50) NOT NULL,
  `star` int(11) NOT NULL,
  `feedback` varchar(255) NOT NULL,
  `proimg` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customized_products`
--

CREATE TABLE `customized_products` (
  `cus_product_id` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `color` varchar(50) NOT NULL,
  `material` varchar(50) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `quantity` varchar(20) NOT NULL,
  `design` varchar(100) NOT NULL,
  `measurement` varchar(200) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `NIC` varchar(10) NOT NULL,
  `email` varchar(500) NOT NULL,
  `phone_no` varchar(10) NOT NULL,
  `job_start_date` date NOT NULL,
  `password` varchar(600) NOT NULL,
  `confirm_password` varchar(600) NOT NULL,
  `address` varchar(200) NOT NULL,
  `role` varchar(50) NOT NULL,
  `emp_img` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `order_id` int(255) NOT NULL,
  `product_id` int(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `o_date` date NOT NULL,
  `status` varchar(50) NOT NULL,
  `order_last_date` date NOT NULL,
  `advance_price` int(10) NOT NULL,
  `total_price` int(10) NOT NULL,
  `order_description` varchar(200) NOT NULL,
  `order_type` varchar(50) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `Bill_image` varchar(50) NOT NULL,
  `o_priority` int(10) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `payment_status` varchar(50) NOT NULL,
  `pBill_image` varchar(200) NOT NULL,
  `order_id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `currency` varchar(2) NOT NULL,
  `price` int(20) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `quantity` varchar(10) NOT NULL,
  `material` varchar(50) NOT NULL,
  `product_img` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `measurement` varchar(255) NOT NULL,
  `color` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `currency`, `price`, `product_name`, `quantity`, `material`, `product_img`, `category_id`, `description`, `measurement`, `color`) VALUES
(1, 'Rs', 1200, 'Plastic chair', '5', 'wooden', '/c7.jpg\r\n', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(2, 'Rs', 1800, 'chair', '5', 'wooden', '/c5.jpg', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(3, 'Rs', 1300, 'Garden Dining Chair', '5', 'Iron', '/ch1.jpg', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(4, 'Rs', 1500, 'Side chair', '5', 'plastic', '/ch2.jpg', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(5, 'Rs', 18000, 'Dining chair', '5', 'wood', '/ch3.jpg', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(6, 'Rs', 800, 'Sunshine chair', '5', 'plastic', '/ch4.jpg', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(7, 'Rs', 8000, 'computer chair', '5', 'plastic', '/c4.jpg', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(8, 'Rs', 5000, 'Fabric chair', '5', 'wood', '/c2.jpg', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(9, 'Rs', 25000, 'Dining set', '5', 'wooden', '/d5.jpg', 1, '', '', ''),
(10, 'Rs', 35000, 'Dining set', '5', '', '/d4.jpg', 1, '', '', ''),
(11, 'Rs', 20000, 'plastic dining set', '5', '', '/d6.jpg', 1, '', '', ''),
(12, 'Rs', 25999, 'Bistro & Dining set', '5', '', '/d8.jpg', 1, '', '', ''),
(13, 'Rs', 32999, 'Glass Dining set', '5', '', '/d11.jpg', 1, '', '', ''),
(14, 'Rs', 32000, 'Patio Sets ', '5', '', '/d10.jpg', 1, '', '', ''),
(15, 'Rs', 27000, 'Dining set', '5', '', '/d2.jpg', 1, '', '', ''),
(16, 'Rs', 50999, 'Rectangular set', '5', '', '/d12.jpeg\r\n', 1, '', '', ''),
(17, 'Rs', 120000, '', '5', '', '/s1.jpg', 4, '', '', ''),
(18, 'Rs', 47500, '', '5', '', '/s2.jpg', 4, '', '', ''),
(19, 'Rs', 56999, '3 piece patio', '5', '', '/s3.png', 4, '', '', ''),
(20, 'Rs', 45999, 'Havertys kara sofa', '5', '', '/s4.jpg', 4, '', '', ''),
(21, 'Rs', 1599, 'Low Pot Table Lamp', '5', '', '/g1.jpg', 6, '', '', ''),
(22, 'Rs', 2199, 'Wailea outdoor chair', '5', '', '/g2.jpg', 6, '', '', ''),
(23, 'Rs', 3799, 'Dog Bed', '5', '', '/g3.jpg', 6, '', '', ''),
(24, 'Rs', 3999, 'BookShelf', '5', '', '/g4.jpg', 6, '', '', ''),
(25, 'Rs', 1999, 'child Table', '5', '', '/g5.jpg', 6, '', '', ''),
(26, 'Rs', 3999, 'CupBoard ', '5', '', '/g6.jpg', 6, '', '', ''),
(27, 'Rs', 3199, 'Bamboo Round Table', '5', '', '/g7.jpg', 6, '', '', ''),
(28, 'Rs', 5490, 'Book Smarts', '5', '', '/g8.jpg', 6, '', '', ''),
(29, 'Rs', 82500, '', '5', '', '/s5.jpg', 4, '', '', ''),
(30, 'Rs', 45999, '', '5', '', '/s6.jpg', 4, '', '', ''),
(31, 'Rs', 43999, '', '5', '', '/s7.png\r\n\r\n', 4, '', '', ''),
(32, 'Rs', 25000, 'Dipan Minimalis', '5', 'wooden', '/b1.jpg', 5, '', '', ''),
(33, 'Rs', 35000, 'vicente Bed', '5', '', '/b2.jpg', 5, '', '', ''),
(34, 'Rs', 20000, 'Distrikt Bed', '5', '', '/b3.jpg', 5, '', '', ''),
(35, 'Rs', 25999, 'Bistro & Dining set', '5', '', '/b4.jpg', 5, '', '', ''),
(36, 'Rs', 32999, 'double bed set', '5', '', '/b5.png', 5, '', '', ''),
(37, 'Rs', 32000, 'Patio Sets ', '5', '', '/b6.jpeg', 5, '', '', ''),
(38, 'Rs', 32000, 'Patio Sets ', '5', '', '/b7.jpg', 5, '', '', ''),
(39, 'Rs', 32000, 'Patio Sets ', '5', '', '/b8.jpeg\r\n', 5, '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `return_item`
--

CREATE TABLE `return_item` (
  `return_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `reason` varchar(200) NOT NULL,
  `reschedule_date` date NOT NULL,
  `return_status` varchar(100) NOT NULL,
  `o_priority` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `userlogin`
--

CREATE TABLE `userlogin` (
  `u_email` varchar(100) NOT NULL,
  `u_name` varchar(100) NOT NULL,
  `u_password` varchar(600) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_role` varchar(50) NOT NULL,
  `u_otp` int(20) NOT NULL,
  `u_verify` int(10) NOT NULL,
  `reset_otp` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `cart1` (`customer_id`),
  ADD KEY `cart2` (`product_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `customized_products`
--
ALTER TABLE `customized_products`
  ADD PRIMARY KEY (`cus_product_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `return_item`
--
ALTER TABLE `return_item`
  ADD PRIMARY KEY (`return_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `userlogin`
--
ALTER TABLE `userlogin`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customized_products`
--
ALTER TABLE `customized_products`
  MODIFY `cus_product_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `return_item`
--
ALTER TABLE `return_item`
  MODIFY `return_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userlogin`
--
ALTER TABLE `userlogin`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart1` FOREIGN KEY (`customer_id`) REFERENCES `category` (`category_id`),
  ADD CONSTRAINT `cart2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `customized_products`
--
ALTER TABLE `customized_products`
  ADD CONSTRAINT `customized_products_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`);

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `orderitem` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderitem2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

--
-- Constraints for table `return_item`
--
ALTER TABLE `return_item`
  ADD CONSTRAINT `return_item_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  ADD CONSTRAINT `return_item_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `return_item_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

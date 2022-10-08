/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `balance` double NOT NULL DEFAULT '1000',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `accounts` VALUES (1,1000,'2022-06-03 21:52:53','2022-06-04 19:38:24',2),(2,1000,'2022-06-03 22:23:20','2022-06-03 22:23:20',3),(3,1000,'2022-06-03 22:49:29','2022-06-03 22:49:29',4),(4,1000,'2022-06-03 22:50:28','2022-06-03 22:50:28',5),(5,1000,'2022-06-03 22:54:23','2022-06-03 22:54:23',6),(6,1000,'2022-06-03 23:03:07','2022-06-03 23:03:07',7),(7,1000,'2022-06-03 23:05:48','2022-06-03 23:05:48',8),(8,1000,'2022-06-03 23:30:42','2022-06-03 23:30:42',9),(9,1000,'2022-06-04 00:19:31','2022-06-04 00:19:31',10),(10,1000,'2022-06-04 05:24:37','2022-06-04 05:24:37',11),(11,1000,'2022-06-04 05:30:30','2022-06-04 05:30:30',12),(12,1000,'2022-06-04 05:31:20','2022-06-04 05:31:20',13),(13,1000,'2022-06-04 05:33:35','2022-06-04 05:33:35',14),(14,1000,'2022-06-04 05:35:45','2022-06-04 05:35:45',15),(15,1000,'2022-06-04 05:39:21','2022-06-04 05:39:21',16),(16,1000,'2022-06-04 19:29:24','2022-06-04 19:29:24',17),(17,1000,'2022-06-04 19:30:09','2022-06-04 19:30:09',18),(18,1000,'2022-06-04 19:32:32','2022-06-04 19:32:32',19),(19,1000,'2022-06-04 19:36:39','2022-06-04 19:39:53',20),(20,1000,'2022-06-04 20:01:01','2022-06-04 20:01:01',21),(21,1000,'2022-06-04 20:25:47','2022-06-04 20:25:47',22),(22,1000,'2022-06-06 13:39:03','2022-06-06 13:39:03',23),(23,1000,'2022-06-06 13:57:32','2022-06-06 13:57:32',24),(24,1000,'2022-06-06 15:51:00','2022-06-06 15:51:00',25),(25,1000,'2022-06-08 13:58:07','2022-06-08 13:58:07',26),(26,999,'2022-06-08 14:03:39','2022-06-08 14:12:13',27),(27,1000,'2022-06-08 14:23:39','2022-06-08 14:23:39',28),(28,1000,'2022-06-08 14:34:44','2022-06-08 14:34:44',29),(29,1000,'2022-06-08 14:35:14','2022-06-08 14:35:14',30),(30,1000,'2022-06-08 15:15:24','2022-06-08 15:15:24',31);
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `body` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `help` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `body` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `seen` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `notifications` VALUES (1,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-03 21:53:18','2022-06-03 21:53:18'),(2,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-03 21:53:19','2022-06-03 21:53:19'),(3,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-03 21:53:20','2022-06-03 21:53:20'),(4,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-03 21:53:48','2022-06-03 21:53:48'),(5,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-03 22:30:27','2022-06-03 22:30:27'),(6,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-03 22:38:56','2022-06-03 22:38:56'),(7,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-03 22:48:18','2022-06-03 22:48:18'),(8,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-03 22:48:19','2022-06-03 22:48:19'),(9,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-03 22:48:20','2022-06-03 22:48:20'),(10,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-03 22:48:21','2022-06-03 22:48:21'),(11,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-03 22:48:22','2022-06-03 22:48:22'),(12,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-03 22:48:23','2022-06-03 22:48:23'),(13,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-03 22:48:57','2022-06-03 22:48:57'),(14,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-04 00:21:38','2022-06-04 00:21:38'),(15,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-04 00:28:17','2022-06-04 00:28:17'),(16,'blu bla','new notification','There is A NEW feature check it out you guys',0,'2022-06-04 00:30:45','2022-06-04 00:30:45'),(17,'Quis aliqua Fugiat','Doloribus ut rerum v','Eveniet quae commod',0,'2022-06-08 13:56:01','2022-06-08 13:56:01'),(18,'Fugiat id sint aut ','Anim magna quasi mol','Voluptas deserunt re',0,'2022-06-08 15:15:58','2022-06-08 15:15:58'),(19,'Fugiat id sint aut ','Anim magna quasi mol','Voluptas deserunt re',0,'2022-06-08 15:16:00','2022-06-08 15:16:00'),(20,'Fugiat id sint aut ','Anim magna quasi mol','Voluptas deserunt re',0,'2022-06-08 15:17:28','2022-06-08 15:17:28');
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ammount` double NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` double NOT NULL,
  `quantity` double NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `sold` tinyint(1) DEFAULT '0',
  `reserved` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `products` VALUES (1,'46e9f271-4e61-4bd8-bc12-9eb6bb89be46-three.jpg','Chloe Ortiz','Minus veniam aliqua',933,30,7.0503742,38.4955043,0,0,'2022-06-03 22:51:26','2022-06-03 22:51:26',5),(2,'01ecf2c7-e1d4-48d1-8ab2-9617c012d2b9-one.jpg','Gabriel Neal','const phoneRegExp = /^((\\\\+[1-9]{1,4}[ \\\\-]*)|(\\\\([0-9]{2,3}\\\\)[ \\\\-]*)|([0-9]{2,4})[ \\\\-]*)*?[0-9]{3,4}?[ \\\\-]*[0-9]{3,4}?$/\r\nconst phoneRegExp = /^((\\\\+[1-9]{1,4}[ \\\\-]*)|(\\\\([0-9]{2,3}\\\\)[ \\\\-]*)|([0-9]{2,4})[ \\\\-]*)*?[0-9]{3,4}?[ \\\\-]*[0-9]{3,4}?$/\r\n',121,4545,7.0503742,38.4955043,0,0,'2022-06-04 05:40:59','2022-06-04 05:40:59',14),(3,'66231b4e-0c95-4cb9-91df-855e72d221e6-one.jpg','Katelyn Mcknight','const phoneRegExp = /^((\\\\+[1-9]{1,4}[ \\\\-]*)|(\\\\([0-9]{2,3}\\\\)[ \\\\-]*)|([0-9]{2,4})[ \\\\-]*)*?[0-9]{3,4}?[ \\\\-]*[0-9]{3,4}?$/\r\n',121.54,454,7.0503742,38.4955043,0,0,'2022-06-04 05:44:21','2022-06-04 05:44:21',14),(4,'f72e3207-4493-4305-a543-8d71b0cf9be2-two.jpg','Yerosen Diriba','7.0503742,38.49550437.0503742,38.49550437.0503742,38.49550437.0503742,38.49550437.0503742,38.49550437.0503742,38.4955043',200,213,7.0436401,38.4983957,0,0,'2022-06-04 05:48:20','2022-06-04 05:48:20',14),(5,'56f41f9c-0517-4437-815e-d6137ede2f71-picture1.jpg','JFKSJLIJEIORNVIER','asjdfvnreavjeifaj',273,23452345,7.053673,38.499767,0,1,'2022-06-04 06:07:13','2022-06-04 19:32:50',14),(6,'cf417217-f541-4cdb-944d-2353ac31b0a3-text-sign-showing-advertising-promotion-conceptual-photo-controlled-paid-marketing-activity-media-128740541.jpg','Sonia Hebert','Quis cillum mollit e',562,25,0,0,0,1,'2022-06-04 19:29:42','2022-06-04 19:32:59',17),(7,'fa8a483f-0475-4a06-a561-91f0ed6a7f2d-three.jpg','Vladimir Hancock','Officia voluptas dig',333,993,0,0,0,0,'2022-06-04 19:37:04','2022-06-04 19:37:04',20),(8,'5297addd-8351-491b-a5bf-c0ffbe70b892-three.jpg','Darrel Ramos','Quis rerum iste arch',353,439,0,0,0,0,'2022-06-04 19:38:24','2022-06-04 19:38:24',20),(9,'1b700a73-caaf-465b-92dd-b2fd5c47ddc0-three.jpg','Mikayla Huber','Pariatur Neque in m',143,5,0,0,0,0,'2022-06-04 19:39:09','2022-06-04 19:39:09',20),(10,'d6a88d82-7655-4c5b-b199-ba766eba8e91-three.jpg','Orlando Kelly','Repellendus Error i',908,313,0,0,0,0,'2022-06-04 19:39:44','2022-06-04 19:39:44',20),(11,'c76412bc-af84-46dc-9f26-1f4607c28b4a-three.jpg','Casey Holmes','Eius consequat Nost',47,90,0,0,0,0,'2022-06-04 19:39:53','2022-06-04 19:39:53',20),(12,'17480532-beda-483c-a3ce-c71a3909620f-four.jpg','Madaline Rice','Necessitatibus maxim',760,359,7.5460377,40.6346851,0,0,'2023-05-08 14:12:13','2022-06-08 14:12:13',27);
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `roles` VALUES (1,'seller','2022-06-03 21:52:11','2022-06-03 21:52:11'),(2,'admin','2022-06-03 21:52:11','2022-06-03 21:52:11'),(3,'buyer','2022-06-03 21:52:11','2022-06-03 21:52:11');
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usernotifications` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `seen` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `NotificationId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `NotificationId` (`NotificationId`),
  CONSTRAINT `usernotifications_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `usernotifications_ibfk_2` FOREIGN KEY (`NotificationId`) REFERENCES `notifications` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `usernotifications` VALUES (1,0,'2022-06-03 22:38:56','2022-06-03 22:38:56',1,6),(2,0,'2022-06-03 22:38:56','2022-06-03 22:38:56',2,6),(3,1,'2022-06-03 22:38:56','2022-06-03 22:48:47',3,6),(4,0,'2022-06-03 22:48:18','2022-06-03 22:48:18',1,7),(5,0,'2022-06-03 22:48:18','2022-06-03 22:48:18',2,7),(6,1,'2022-06-03 22:48:18','2022-06-03 22:48:47',3,7),(7,0,'2022-06-03 22:48:19','2022-06-03 22:48:19',1,8),(8,0,'2022-06-03 22:48:19','2022-06-03 22:48:19',2,8),(9,1,'2022-06-03 22:48:19','2022-06-03 22:48:47',3,8),(10,0,'2022-06-03 22:48:20','2022-06-03 22:48:20',1,9),(11,0,'2022-06-03 22:48:20','2022-06-03 22:48:20',2,9),(12,1,'2022-06-03 22:48:20','2022-06-03 22:48:47',3,9),(13,0,'2022-06-03 22:48:21','2022-06-03 22:48:21',1,10),(14,0,'2022-06-03 22:48:21','2022-06-03 22:48:21',2,10),(15,1,'2022-06-03 22:48:21','2022-06-03 22:48:47',3,10),(16,0,'2022-06-03 22:48:22','2022-06-03 22:48:22',1,11),(17,0,'2022-06-03 22:48:22','2022-06-03 22:48:22',2,11),(18,1,'2022-06-03 22:48:22','2022-06-03 22:48:47',3,11),(19,0,'2022-06-03 22:48:23','2022-06-03 22:48:23',1,12),(20,0,'2022-06-03 22:48:23','2022-06-03 22:48:23',2,12),(21,1,'2022-06-03 22:48:23','2022-06-03 22:48:47',3,12),(22,0,'2022-06-03 22:48:57','2022-06-03 22:48:57',1,13),(23,0,'2022-06-03 22:48:57','2022-06-03 22:48:57',2,13),(24,0,'2022-06-03 22:48:57','2022-06-03 22:48:57',3,13),(25,0,'2022-06-04 00:21:38','2022-06-04 00:21:38',1,14),(26,0,'2022-06-04 00:21:38','2022-06-04 00:21:38',4,14),(27,0,'2022-06-04 00:21:38','2022-06-04 00:21:38',2,14),(28,0,'2022-06-04 00:21:38','2022-06-04 00:21:38',3,14),(29,0,'2022-06-04 00:21:38','2022-06-04 00:21:38',5,14),(30,0,'2022-06-04 00:21:38','2022-06-04 00:21:38',6,14),(31,0,'2022-06-04 00:21:38','2022-06-04 00:21:38',7,14),(32,0,'2022-06-04 00:21:38','2022-06-04 00:21:38',8,14),(33,0,'2022-06-04 00:21:38','2022-06-04 00:21:38',9,14),(34,1,'2022-06-04 00:21:38','2022-06-04 00:30:54',10,14),(35,0,'2022-06-04 00:28:18','2022-06-04 00:28:18',1,15),(36,0,'2022-06-04 00:28:18','2022-06-04 00:28:18',2,15),(37,0,'2022-06-04 00:28:18','2022-06-04 00:28:18',3,15),(38,0,'2022-06-04 00:28:18','2022-06-04 00:28:18',4,15),(39,0,'2022-06-04 00:28:18','2022-06-04 00:28:18',5,15),(40,0,'2022-06-04 00:28:18','2022-06-04 00:28:18',6,15),(41,0,'2022-06-04 00:28:18','2022-06-04 00:28:18',7,15),(42,0,'2022-06-04 00:28:18','2022-06-04 00:28:18',8,15),(43,0,'2022-06-04 00:28:18','2022-06-04 00:28:18',9,15),(44,1,'2022-06-04 00:28:18','2022-06-04 00:30:54',10,15),(45,0,'2022-06-04 00:30:45','2022-06-04 00:30:45',1,16),(46,0,'2022-06-04 00:30:45','2022-06-04 00:30:45',2,16),(47,0,'2022-06-04 00:30:45','2022-06-04 00:30:45',4,16),(48,0,'2022-06-04 00:30:45','2022-06-04 00:30:45',5,16),(49,0,'2022-06-04 00:30:45','2022-06-04 00:30:45',6,16),(50,0,'2022-06-04 00:30:45','2022-06-04 00:30:45',7,16),(51,0,'2022-06-04 00:30:45','2022-06-04 00:30:45',3,16),(52,0,'2022-06-04 00:30:45','2022-06-04 00:30:45',8,16),(53,0,'2022-06-04 00:30:45','2022-06-04 00:30:45',9,16),(54,1,'2022-06-04 00:30:45','2022-06-04 00:30:54',10,16),(55,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',1,17),(56,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',3,17),(57,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',5,17),(58,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',2,17),(59,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',6,17),(60,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',7,17),(61,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',8,17),(62,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',4,17),(63,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',9,17),(64,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',10,17),(65,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',11,17),(66,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',12,17),(67,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',13,17),(68,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',14,17),(69,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',16,17),(70,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',15,17),(71,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',17,17),(72,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',18,17),(73,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',19,17),(74,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',20,17),(75,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',21,17),(76,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',22,17),(77,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',23,17),(78,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',24,17),(79,0,'2022-06-08 13:56:01','2022-06-08 13:56:01',25,17),(80,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',3,18),(81,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',2,18),(82,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',4,18),(83,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',5,18),(84,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',1,18),(85,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',6,18),(86,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',7,18),(87,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',8,18),(88,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',9,18),(89,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',10,18),(90,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',11,18),(91,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',12,18),(92,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',13,18),(93,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',14,18),(94,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',15,18),(95,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',16,18),(96,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',17,18),(97,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',18,18),(98,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',19,18),(99,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',20,18),(100,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',21,18),(101,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',22,18),(102,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',23,18),(103,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',24,18),(104,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',25,18),(105,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',26,18),(106,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',27,18),(107,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',28,18),(108,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',29,18),(109,0,'2022-06-08 15:15:58','2022-06-08 15:15:58',30,18),(110,1,'2022-06-08 15:15:58','2022-06-08 15:17:42',31,18),(111,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',1,19),(112,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',2,19),(113,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',3,19),(114,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',4,19),(115,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',5,19),(116,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',6,19),(117,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',7,19),(118,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',8,19),(119,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',9,19),(120,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',10,19),(121,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',11,19),(122,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',12,19),(123,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',13,19),(124,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',14,19),(125,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',15,19),(126,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',16,19),(127,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',17,19),(128,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',18,19),(129,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',19,19),(130,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',20,19),(131,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',21,19),(132,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',22,19),(133,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',23,19),(134,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',24,19),(135,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',25,19),(136,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',26,19),(137,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',27,19),(138,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',28,19),(139,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',29,19),(140,0,'2022-06-08 15:16:00','2022-06-08 15:16:00',30,19),(141,1,'2022-06-08 15:16:00','2022-06-08 15:17:42',31,19),(142,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',1,20),(143,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',3,20),(144,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',4,20),(145,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',5,20),(146,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',6,20),(147,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',2,20),(148,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',7,20),(149,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',8,20),(150,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',9,20),(151,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',10,20),(152,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',11,20),(153,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',12,20),(154,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',13,20),(155,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',14,20),(156,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',15,20),(157,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',16,20),(158,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',17,20),(159,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',18,20),(160,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',19,20),(161,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',20,20),(162,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',21,20),(163,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',22,20),(164,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',23,20),(165,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',24,20),(166,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',25,20),(167,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',26,20),(168,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',27,20),(169,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',28,20),(170,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',29,20),(171,0,'2022-06-08 15:17:29','2022-06-08 15:17:29',30,20),(172,1,'2022-06-08 15:17:29','2022-06-08 15:17:42',31,20);
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userroles` (
  `UserId` int(11) NOT NULL,
  `RoleId` int(11) NOT NULL,
  PRIMARY KEY (`UserId`,`RoleId`),
  KEY `RoleId` (`RoleId`),
  CONSTRAINT `userroles_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userroles_ibfk_2` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `userroles` VALUES (5,1),(6,1),(7,1),(8,1),(11,1),(12,1),(14,1),(15,1),(17,1),(20,1),(25,1),(27,1),(28,1),(30,1),(1,2),(2,3),(3,3),(4,3),(9,3),(10,3),(13,3),(16,3),(18,3),(19,3),(21,3),(22,3),(23,3),(24,3),(26,3),(29,3),(31,3);
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `login_status` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `users` VALUES (1,NULL,'Leakemariam','Getu','aadmin','Hawassa ,Ethiopia','leakemariam@gmail.com','0921686420','$2b$10$YIzv1biun9dtagQfeFYXF.GHB4Xtb7yplKU26hJ.hWkQnok6gGOPq',0,'2022-06-03 21:52:11','2022-06-03 21:52:11'),(2,NULL,'Hedyh','Fischer','jokyzo','Magna voluptas ad de','daqavyfeno@mailinator.com','+1 (221) 734-4123','$2b$10$SqmGCIYUZQjaLvrveFx3.eQYi1J5QqsWdrfVxhVCAyMDodCqXub9a',0,'2022-06-03 21:52:53','2022-06-03 21:52:53'),(3,NULL,'Raejj','Baldwin','sokojih','Quam iure aut modi o','lepus@mailinator.com','+1 (713) 313-2807','$2b$10$aJp9T77fBjkwdsmuvQcd/.mQLbwvcFOMeSkPkmoXIKtMQjBEY5cLK',0,'2022-06-03 22:23:19','2022-06-03 22:23:19'),(4,NULL,'Ramona','Hines','hujebuv','Velit itaque excepte','pydarasi@mailinator.com','+1 (644) 459-8726','$2b$10$HH6T0YM7xLgKPvBRTcwvqejLL.YBPJ6ynzotjyOvT2Ct3K7lUAW9C',0,'2022-06-03 22:49:29','2022-06-03 22:49:29'),(5,NULL,'Lavinia','Morrow','nylacynyl','Fugiat obcaecati fug','nipyqijovu@mailinator.com','+1 (646) 702-3779','$2b$10$70ZhbXHYYyb5WF9cx1STd.h5n.GIZ3DJWTehitSjNToQsufxtJM9O',0,'2022-06-03 22:50:28','2022-06-03 22:50:28'),(6,NULL,'Sigourney','Figueroa','zitasa','Sit exercitation est','furata@mailinator.com','+1 (917) 898-8827','$2b$10$WJebFdzJCSLode1ZHKtni.jVVxJyc2VV8JrxSdWYTHJ3aJ4K3pKwO',0,'2022-06-03 22:54:23','2022-06-03 22:54:23'),(7,NULL,'Sigourney','Sheppard','wehak','Maiores iusto cillum','qosocivute@mailinator.com','+1 (175) 196-2398','$2b$10$jj9UMVgMb1afPf5ObNltMOZHSPcKW2aJx5dX5uF1xvvbjZBJ5F7dG',0,'2022-06-03 23:03:07','2022-06-03 23:03:07'),(8,NULL,'Victoria','Cortez','lanexakyg','Necessitatibus magni','bicyju@mailinator.com','+1 (161) 217-3359','$2b$10$ErqUS58Smc838Mcu/NpP7.K3mTPqZ4FG5TWTUhkJVX1xbrZPBQCpO',0,'2022-06-03 23:05:48','2022-06-03 23:05:48'),(9,NULL,'Serina','Patterson','mubiwyd','Doloribus nobis qui ','sepyqy@mailinator.com','+1 (758) 435-6369','$2b$10$mHZcXELuzWqO.ChttTRslOl.OqfYDbKNALW1Znb8X8vqS0bFiRnYK',0,'2022-06-03 23:30:42','2022-06-03 23:30:42'),(10,NULL,'Nyssa','Wilkerson','korugih','Eu dolore ipsum aut','qoroco@mailinator.com','+1 (109) 953-5089','$2b$10$S0Recv6jqP2ospMbp7uakOaTxqYnYNjAJZjW4xfzmBqZlgj0K9zRa',0,'2022-06-04 00:19:31','2022-06-04 00:19:31'),(11,NULL,'Alika','Monroe','fedygi','Similique suscipit i','legarubego@mailinator.com','+1 (966) 492-3999','$2b$10$zRffXcSbEqrywLjFz8pRCeXYezufEh7eiOa6OqIAdBGQafj0.v1yG',0,'2022-06-04 05:24:37','2022-06-04 05:24:37'),(12,NULL,'Lilah','Hayes','xulyxa','Omnis id consectetur','zalevub@mailinator.com','0918922548','$2b$10$sdPnQno4dgpbIQjTxIzxKeVTIFB8KYOE2fpRW/lFXqlIn2.dzm/ge',0,'2022-06-04 05:30:30','2022-06-04 05:30:30'),(13,NULL,'Nicole','Baird','qaxamozy','Nisi labore error ea','muce@mailinator.com','0918922548','$2b$10$XAM.vRQfYfmCPwasDQKkIOmYWUJUM1t4FMAtTVblcN7.B0AQJWbFS',0,'2022-06-04 05:31:20','2022-06-04 05:31:20'),(14,NULL,'Germaine','Garrison','abukaa','Deserunt ut est arch','cokejep@mailinator.com','0915453545','$2b$10$9MI77HFhDEsYijNxIUz6Y.N/u4EwjYQylZ7l4xYvvwa73lU43yaza',0,'2022-06-04 05:33:35','2022-06-04 05:33:35'),(15,NULL,'Keiko','Copeland','buyerbuyer','Harum quo blanditiis','xireb@mailinator.com','0918545248413','$2b$10$R6UHdOvWjJz1oHo9HsdnmeVepJ5l0YDwEBMZbHBNdo7edVfrqmhGq',0,'2022-06-04 05:35:45','2022-06-04 05:35:45'),(16,NULL,'Zephr','Allen','ameleshega','Ullamco quaerat nesc','momevec@mailinator.com','0915457862','$2b$10$i2hNzRykvG/k6jozhH/puuWNERVBSz2SScva7oR7wbWYwCyqnsypq',0,'2022-06-04 05:39:21','2022-06-04 05:39:21'),(17,NULL,'Karina','Dunnu','woqysysuz','Omnis culpa ut id a','jekify@mailinator.com','09184517854','$2b$10$LCG7OzXnB7Opd2cnDuMth.1sC3eaJtOm8PtDI8Do8qedPvj8p0gsK',0,'2022-06-04 19:29:24','2022-06-04 19:29:24'),(18,NULL,'Zorita','Foley','joqufef','Harum elit suscipit','nami@mailinator.com','0918181818','$2b$10$Pg/K3WodhmrL7jjJzJCWt.5Bc8JSbP0Ra8TVG7r3yGshWtteg5Dea',0,'2022-06-04 19:30:09','2022-06-04 19:30:09'),(19,NULL,'Lynns','Douglas','hehaqiby','Alias voluptatibus r','kulig@mailinator.com','090909090909','$2b$10$8b/VBQfQLsM9CEgK1a.zyeZLdaJWWeWXHx4ikzBFogYjerYRtcwAO',0,'2022-06-04 19:32:32','2022-06-04 19:32:32'),(20,NULL,'Lacyu','Phillips','tifivazyx','Velit numquam ab dol','zaxaqon@mailinator.com','0918922548','$2b$10$lMRYM33zb4ZYLHeWRp1di.LnyRCHQzqTrqmeDEpT6yAua6jb1RRtG',0,'2022-06-04 19:36:39','2022-06-04 19:36:39'),(21,NULL,'Kyrak','Robbins','kowulur','Rerum corporis volup','vilylymy@mailinator.com','0918181818','$2b$10$cMZPLqqW240YwuTo74RHyeLKy.3Bg6JmZCS/L0i7xboaoEDKiI/DK',0,'2022-06-04 20:01:01','2022-06-04 20:01:01'),(22,NULL,'Kessie','Figueroa','zibelym','Ut velit impedit no','nahyb@mailinator.com','09189922548','$2b$10$Sl3GkUH7KFTpMHpEC6jjGuiXAHEosfVlPlzM3/DFIXe09yNHYRMrC',0,'2022-06-04 20:25:47','2022-06-04 20:25:47'),(23,NULL,'Velma','Stokes','diricafida','Et illo autem amet ','hytik@mailinator.com','091919191919','$2b$10$ZQkprqza4ptbi7UqABf.v.XpjAr2LA4OOvuSqfdVPfYR/M6CAZ.x.',0,'2022-06-06 13:39:01','2022-06-06 13:39:01'),(24,'2400a004-e004-47fe-8350-f7b98bb04bce-text-sign-showing-advertising-promotion-conceptual-photo-controlled-paid-marketing-activity-media-128740541.jpg','Zepha','Guerrero','pagegy','Sunt omnis corporis ','qiwafojyx@mailinator.com','0909090909','$2b$10$FNWm.M3lxThe.tsnBHozIu1/.JIVSz4KJB9vFs2ssAYQFeK4b6fFW',0,'2022-06-06 13:57:32','2022-06-06 15:42:43'),(25,NULL,'Jacob','Barton','qyfefu','Alias praesentium id','lylugidupu@mailinator.com','09189922548','$2b$10$AoujyJpHcnXyqLxgFlHkKOt03nr23vakUhFIWJDaJm6vOfnWaaRKW',0,'2022-06-06 15:50:59','2022-06-06 15:50:59'),(26,NULL,'Toddyo','Lancaster','hugecybica','Elit dolores amet ','qoburixi@mailinator.com','0943904389','$2b$10$O5h7pbvfXd.32joFzUi8Fu7BdiTdPxBK2uPs.kEQDIkfuftLCkHSy',0,'2022-06-08 13:58:07','2022-06-08 13:58:07'),(27,'790d29f2-caa0-443c-8845-86c9f7a12b0f-hwu-logo.png','Hermion','Kramer','tukagogo','Odit est quos offic','gyge@mailinator.com','0943904389','$2b$10$c/5x5aub6U2iPX3xgrEhR.Hxg2HzyZ47bGW6OfnVxbdSpbDFiQ72W',0,'2022-06-08 14:03:39','2022-06-08 14:18:01'),(28,'024d774f-e3e5-477e-9795-a37fe097bf5e-hwu-logo.png','McTomminay','Paced','ganyq','Laboris ipsa lorem Ipusum','ryvyjoxuzo@mailinator.com','0915458445','$2b$10$Wxfcn0Um3aWXXdhypUD4huiHw.CC91aMJLX0N8zaUH4iphNPApCQm',0,'2022-06-08 14:23:39','2022-06-08 15:11:01'),(29,NULL,'Alvin','Newton','tiwidabum','Dolorum laborum volu','vuny@mailinator.com','0915151515','$2b$10$MuCVxyVs9WDfGLklqQS8EOzXdHclQr0yoQ6DroUYgasRgT5vMQQZ6',0,'2022-06-08 14:34:44','2022-06-08 14:34:44'),(30,NULL,'Hillary','Wise78','lumalofi','Ipsam earum doloribu','hojumy@mailinator.com','0916161616','$2b$10$IBQ3qkjbSswhPA7K1krBuOOvaQyOHsKO3YzstUQpZv/lMB5Rgt7l6',0,'2022-06-08 14:35:14','2022-06-08 14:35:14'),(31,NULL,'Camden','Dominguez','hacaberunu','Qui excepturi adipis','cyhyzili@mailinator.com','0918291546','$2b$10$IZC9EVuYyevAk3Uk9WhFguElndZZr4HNsCR.u1k9Y.5BZL2FyCgBW',0,'2022-06-08 15:15:24','2022-06-08 15:15:24');
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webchatbots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cbid` int(11) NOT NULL,
  `message` text NOT NULL,
  `trigger` bigint(20) NOT NULL,
  `options` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

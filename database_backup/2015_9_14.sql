-- MySQL dump 10.13  Distrib 5.6.26, for osx10.10 (x86_64)
--
-- Host: localhost    Database: koablog
-- ------------------------------------------------------
-- Server version	5.6.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `koablog_article`
--

DROP TABLE IF EXISTS `koablog_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `koablog_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `tag_id` int(11) NOT NULL,
  `createAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `user_article_1_n` (`user_id`),
  KEY `article_tag` (`tag_id`),
  CONSTRAINT `article_tag` FOREIGN KEY (`tag_id`) REFERENCES `koablog_tag` (`id`),
  CONSTRAINT `user_article_1_n` FOREIGN KEY (`user_id`) REFERENCES `koablog_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `koablog_article`
--

LOCK TABLES `koablog_article` WRITE;
/*!40000 ALTER TABLE `koablog_article` DISABLE KEYS */;
INSERT INTO `koablog_article` VALUES (1,'About iPod touch 6',1,'mac shit Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n\nDonec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',1,'2015-08-10 21:03:18'),(2,'Mac shit',1,'mac shit Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n\nDonec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',1,'2015-08-10 22:03:18'),(3,'iOS8 shit1',2,'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n\nDonec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',2,'2015-08-10 23:03:18'),(4,'iOS8 shit2',2,'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n\nDonec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',2,'2015-08-11 01:03:18'),(6,'references test',1,'asdasdasdCras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n\nDonec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',3,'2015-08-11 03:03:18'),(8,'autotest1',1,'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n\nDonec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',3,'2015-08-11 05:03:18'),(9,'autotest2',1,'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n\nDonec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',3,'2015-08-11 06:03:18'),(10,'at',1,'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n\nDonec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',3,'2015-08-11 07:03:18'),(11,'中文字体测试',1,'中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试',3,'2015-08-12 07:03:18'),(13,'123123123',1,'123123123123',1,'2015-08-13 21:03:18'),(15,'at3',1,'123123123123',1,'2015-08-13 10:03:18'),(16,'at4',1,'123123123123',1,'2015-08-13 12:03:18'),(17,'test20',1,'fddfasdz dsfgd adfadf  sdfasdfdsfdf adfsaf asdfsdf adfasdf',1,'2015-08-13 14:03:18'),(19,'test21',1,'123efgsdfgcvzxsgfd dssadf asdfwfsd sdfg',1,'2015-08-13 18:03:18'),(20,'testadd',1,'tserfbsedgszdsrzxsedtzsedzxehxazgazs',1,'2015-09-13 16:04:55');
/*!40000 ALTER TABLE `koablog_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `koablog_group`
--

DROP TABLE IF EXISTS `koablog_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `koablog_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `description` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `koablog_group`
--

LOCK TABLES `koablog_group` WRITE;
/*!40000 ALTER TABLE `koablog_group` DISABLE KEYS */;
INSERT INTO `koablog_group` VALUES (1,'root','this is root group , have top permission'),(2,'manager','this is manager group , it can manage article tag '),(3,'author','this is author , it can only add article or delete self\'s article'),(4,'test','this is test group');
/*!40000 ALTER TABLE `koablog_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `koablog_permission`
--

DROP TABLE IF EXISTS `koablog_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `koablog_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `description` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `koablog_permission`
--

LOCK TABLES `koablog_permission` WRITE;
/*!40000 ALTER TABLE `koablog_permission` DISABLE KEYS */;
INSERT INTO `koablog_permission` VALUES (1,'addUser','add a user'),(2,'deleteUser','delete a user'),(3,'updateUser','update a user'),(4,'lookUser','look a user'),(5,'addArticle','add a article'),(6,'deleteArticle','delete a article , Whoever\'s article'),(7,'updateArticle','update a article , Whoever\'s article'),(8,'lookArticle','look a article , Whoever\'s article'),(9,'addTag','add a tag'),(10,'deleteTag','Generally , you\'re not going to delete a tag'),(11,'updateTag','Generally , you\'re not going to update a tag'),(12,'lookTag','always do it'),(13,'deleteSelfArticle','author can delete their own article');
/*!40000 ALTER TABLE `koablog_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `koablog_permission_to_group`
--

DROP TABLE IF EXISTS `koablog_permission_to_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `koablog_permission_to_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `permission_id` (`permission_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `group_id` FOREIGN KEY (`group_id`) REFERENCES `koablog_group` (`id`),
  CONSTRAINT `permission_id` FOREIGN KEY (`permission_id`) REFERENCES `koablog_permission` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `koablog_permission_to_group`
--

LOCK TABLES `koablog_permission_to_group` WRITE;
/*!40000 ALTER TABLE `koablog_permission_to_group` DISABLE KEYS */;
INSERT INTO `koablog_permission_to_group` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,1),(5,5,1),(6,6,1),(7,7,1),(8,8,1),(9,9,1),(10,10,1),(11,11,1),(12,12,1);
/*!40000 ALTER TABLE `koablog_permission_to_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `koablog_tag`
--

DROP TABLE IF EXISTS `koablog_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `koablog_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `koablog_tag`
--

LOCK TABLES `koablog_tag` WRITE;
/*!40000 ALTER TABLE `koablog_tag` DISABLE KEYS */;
INSERT INTO `koablog_tag` VALUES (2,'apple'),(3,'microsoft'),(1,'test'),(4,'test1'),(13,'test10'),(14,'test11'),(15,'test12'),(16,'test13'),(5,'test2'),(6,'test3'),(7,'test4'),(8,'test5'),(9,'test6'),(10,'test7'),(11,'test8'),(12,'test9');
/*!40000 ALTER TABLE `koablog_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `koablog_user`
--

DROP TABLE IF EXISTS `koablog_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `koablog_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `password` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `pen_name` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `introduce` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `pen_name` (`pen_name`),
  KEY `group_to_user_1_n` (`group_id`),
  CONSTRAINT `group_to_user_1_n` FOREIGN KEY (`group_id`) REFERENCES `koablog_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `koablog_user`
--

LOCK TABLES `koablog_user` WRITE;
/*!40000 ALTER TABLE `koablog_user` DISABLE KEYS */;
INSERT INTO `koablog_user` VALUES (1,'dzxx0563zh@126.com','e10adc3949ba59abbe56e057f20f883e','Summer','/images/1-1.jpg','Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.',1),(2,'xzsf2012zh@gmail.com','e10adc3949ba59abbe56e057f20f883e','test','/images/1-2.jpg','Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gr',1),(3,'rootTest','e10adc3949ba59abbe56e057f20f883e','rootTest',NULL,'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.',1),(4,'managerTest','e10adc3949ba59abbe56e057f20f883e','managerTest',NULL,'中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试',1),(6,'managerTest-2','e10adc3949ba59abbe56e057f20f883e','managerTest-2',NULL,'<script src=\"http://cdn.bootcss.com/jqueasdfasdfasdfry/1.11.3/jquery.min.js\"></script><br>asdfadfasdfsadf',1),(7,'managerTest-3','e10adc3949ba59abbe56e057f20f883e','managerTest-3',NULL,'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.',1),(8,'managerTest-4','e10adc3949ba59abbe56e057f20f883e','managerTest-4',NULL,'中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试',1),(9,'authorTest-1','e10adc3949ba59abbe56e057f20f883e','authorTest-1',NULL,'123123123123123123123123123123123123',1),(11,'authorTest-2','e10adc3949ba59abbe56e057f20f883e','authorTest-2',NULL,'segijofka adsjadfjsdjf adfjadkfj sdfsdf',1);
/*!40000 ALTER TABLE `koablog_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `koablog_view_article`
--

DROP TABLE IF EXISTS `koablog_view_article`;
/*!50001 DROP VIEW IF EXISTS `koablog_view_article`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `koablog_view_article` AS SELECT
 1 AS `id`,
 1 AS `title`,
 1 AS `author`,
 1 AS `content`,
 1 AS `createAt`,
 1 AS `tag`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `koablog_view_article`
--

/*!50001 DROP VIEW IF EXISTS `koablog_view_article`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `koablog_view_article` AS select `a`.`id` AS `id`,`a`.`title` AS `title`,`u`.`pen_name` AS `author`,`a`.`content` AS `content`,`a`.`createAt` AS `createAt`,`t`.`name` AS `tag` from ((`koablog_article` `a` join `koablog_user` `u`) join `koablog_tag` `t`) where ((`a`.`user_id` = `u`.`id`) and (`a`.`tag_id` = `t`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-09-14 21:59:54

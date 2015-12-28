-- MySQL dump 10.13  Distrib 5.6.19, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: koablog
-- ------------------------------------------------------
-- Server version	5.6.19-0ubuntu0.14.04.1

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
  KEY `user_article_1_n` (`user_id`),
  KEY `article_tag` (`tag_id`),
  CONSTRAINT `article_tag` FOREIGN KEY (`tag_id`) REFERENCES `koablog_tag` (`id`),
  CONSTRAINT `user_article_1_n` FOREIGN KEY (`user_id`) REFERENCES `koablog_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `koablog_article`
--

LOCK TABLES `koablog_article` WRITE;
/*!40000 ALTER TABLE `koablog_article` DISABLE KEYS */;
INSERT INTO `koablog_article` VALUES (1,'About iPod touch 6',1,'mac shit Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n\nDonec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',1,'2015-08-10 21:03:18'),(2,'Mac shit',1,'mac shit Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n\nDonec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',1,'2015-08-10 22:03:18'),(3,'iOS8 shit1',2,'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n\nDonec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',2,'2015-08-10 23:03:18'),(4,'iOS8 shit2',2,'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n\nDonec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',2,'2015-08-11 01:03:18'),(11,'中文字体测试',1,'中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试',3,'2015-08-12 07:03:18'),(24,'长标题测试长标题测试长标题测试长标题测试长标题测试长标题测试长标题测试长标题测试',1,'<p>why i leave osx</p>\n',21,'2015-10-11 02:46:39'),(26,'JavaScript test',1,'<pre>\n<code class=\"language-javascript\">let a = 1;\nlet b = function () {};</code></pre>\n\n<p>sss</p>\n',22,'2015-10-11 04:06:09'),(34,'test3ss',9,'<p>11111werwer</p>\n',29,'2015-10-28 08:01:28'),(35,'before transaction test',1,'<p>sdfsdfsdf</p>\n',30,'2015-11-06 04:58:51'),(36,'transactions test',1,'<p>transaction test</p>\n',1,'2015-11-06 05:41:41'),(37,'transactions test2',1,'<p>transaction test</p>\n',1,'2015-11-06 05:53:57'),(38,'transactions test3',1,'<p>transaction test</p>\n',1,'2015-11-06 06:14:41'),(40,'transactions test4',1,'<p>transaction test4 4444</p>\n',1,'2015-11-06 06:17:28'),(45,'img test2',1,'<p><img alt=\"\" src=\"/images/921ae8b0-8679-11e5-95a9-0d58a76f3bee.jpeg\" style=\"height:384px; width:512px\" /></p>\n\n<p>图片测试</p>\n\n<p>图片测试</p>\n\n<p>软件项目开发管理系统</p>\n\n<p>一、核心概念界定</p>\n\n<p>软件项目开发是一件非常复杂的工作，他需要各种软件开发人员投入到这个开发大军来，相互协调配合，相互提升。而对众多的软件公司或开发团队来说，有效的管理和控制软件项目是非常重要的。为了给这一复杂而重要的工程带来可操作性的简便和准确的数据信息。Software Projects Exploitation Management System就是为着这一目的开发出来的。</p>\n\n<p>软件项目管理系统主要用来帮助软件公司架构规范的软件项目开发管理过程（项目计划管理、监督与跟踪、需求管理、测试管理、缺陷管理&hellip;）包括：</p>\n\n<p>1、帮助软件公司进行有效的项目数据度量管理（针对SEI CMM3/CMMI3的标准）；</p>\n\n<p>2、帮助各软件公司长效实施组织过程体系规范（ISO9001、SEI CMM/CMMI）；</p>\n\n<p>3、帮助软件公司建立项目过程数据库和知识库等。故本综述分别从基于B/S模式数据库的设计方法、分析，设计对软件项目管理系统进行综述。</p>\n\n<p>4、提高过程透明度，加强对项目的监督和管理（针对项目的进度、成本、质量、资源、活动等）；</p>\n\n<p>5、支持软件公司的多级管理模式，包括：企业高层、质量部、项目经理、程序员；</p>\n\n<p>6、支持项目组内、异地的开发组间、异地的客户与组间的协同工作模式，突</p>\n\n<p>破地域障碍；</p>\n\n<p>&nbsp;</p>\n\n<p>二、国内外研究现状</p>\n\n<p>因特网是一个巨大的全球性的信息服务中心。随着互联网的发展，网上交易、电子商务的逐渐繁荣，各行各业的规模不断发展与状大，这就更需要一个安全的，可靠的，高效的管理系统来管理，因此，软件项目开发管理系统的设计就变得尤为重要。</p>\n\n<p>国外项目管理软件有: Primavera 公司的P3、Artemis 公司Artemis Viewer、NIKU 公司的Open WorkBench、Welcom 公司的OpenPlan等软件, 这些软件适合大型、复杂项目的项目管理工作; 而Sciforma 公司的ProjectScheduler ( PS) 、Primavera 公司的SureTrak、Microsoft 公司的Project、IMSI 公司的TurboProject 等则是适合中小型项目管理的软件。值得一提的是, SAP 公司的ProjectSystems( PS)Module 也是一种不错的企业级项目管理软件。 　　</p>\n\n<p>国内的工程项目管理软件功能较为完善的有: 新中大软件、邦永科技PM2、建文软件、三峡工程管理系统TGPMS、易建工程项目管理软件等，基本上是在借鉴国外项目管理软件的基础上, 按照我国标准或习惯实现上述功能, 并增强了产品的易用性。 　　</p>\n\n<p>非工程类项目管理软件全球知名的有微软project系列PM软件，目前最新版project 2010已经推出，功能很强大，国内项目管理软件企业中发展比较快的有深圳市捷为科技有限公司的iMIS PM等软件，而更值得一提的是8thmanagePM项目管理软件，他们公司是跨国企业，客户遍布中国，东南亚，北美。美国洛克西德.马丁公司，美国首都医疗集团，加拿大蒙特利尔银行， Forida Limited ，ParaDM，新加坡地铁公司，和记环球电讯，中国移动，安利，中联集团，清华大学 8thManagePM。</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>三、选题意义</p>\n\n<p>在二十一世纪信息迅猛发展的时代， 网络的普及使网络和企业很自然地走到了一起,而如今通信最杰出功劳之一，则是软件项目开发管理系统的广泛应用与飞速发展。未来个人或企业管理可以很方便，快捷，高效的进行管理。</p>\n\n<p>随着Internet技术的发展，它对我们工作和生活显得更加重要，尤其是现在项目软件，应用软件不断推陈出新的今天，各企业对管理不同项目，来应用软件迫切的需要高效性，规范性，安全性、及时性。而基于B/S模式下的数据库所设计而成的软件项目开发管理系统刚好提供了这些功能。本系统就是一个能够让用户能及时有效地对软件项目开发管理系统进行操控，并且是在安全的前提下进行的。在网上实现对软件项目的任何时间，任何地点安全有效的管理这是软件项目开发管理系统的发展方向。</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>四、研究价值</p>\n\n<p>1.项目就是组织变革、组织成长和组织创新的过程：</p>\n\n<p>在这个竞争激烈的世界上，至关重要的是，组织能够成功地采取新举措，推出新产品，倡导新理念，并提高满足客户需求的能力。所有这些都必须依靠项目来实现。&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>2.项目管理就是企业效益：</p>\n\n<p>项目管理已受到国际一流企业的极大重视。项目管理在运作方式和思维模式上最大限度的改善了管理人员的工作流程，提高了工作效率。&ldquo;项目管理是提升企业的战略竞争力的关键&rdquo;已成为世界一流企业的广泛共识。美国《财富》杂志断言&ldquo;项目管理将成为21世纪核心管理模式&rdquo;。事实上，项目管理水平的高低，已经成为衡量一个企业综合管理水平的标志！&nbsp;不同的组织在不同的时候会有着重不同的事情。寻找&ldquo;有效契合&rdquo;的挑战之一就是，既要了解组织当前所着重的事情，也要了解组织在局势变化时的价值取向。&ldquo;探究项目管理的价值&rdquo;的全球研发团队和实践小组还是发现了项目管理（兼指项目、项目集和项目组合管理）能够给组织带来许多有价值的东西。这些东西大多可归纳于以下三类：学习、整合与执行。</p>\n\n<p>&nbsp;</p>\n\n<p>3.&nbsp;帮助企业建立成为学习型组织&nbsp;：</p>\n\n<p>项目就是组织学习与进步的途径。在今天瞬息万变、充满竞争的商业环境中，要保持领先地位，就必须不断创新。任何变革，如开发新产品或实现新理念，任何一个项目，因为项目就是为创造独特的产品、服务或成果而进行的临时性工作。&nbsp;项目管理促进组织学习。首先，如果组织真正了解自己的能力，就能够做出更有针对性的决策。其次，用规范的方法做事，有助于组织学习并改进管理项目的方法。最后，人们可以通过项目评审材料、经验教训总结和其他相关文档，来了解项目的成败之处。在新项目启动，以及项目逐渐变成运营的过程中，这些信息都有助于组织高效运转。&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>4.高效整合企业内部关键资源&nbsp;：</p>\n\n<p>当然，如果离开有效沟通、整合和校正，就不可能获取信息并向组织中其他人传递信息。项目管理对改善沟通有着重要作用，它可以改善组织内部的沟通，组织与组织之间的沟通，组织与供应商、承包商和客户等外部干系人之间的沟通，以及战略制定者与战略执行者之间的沟通。&nbsp;</p>\n\n<p>项目管理本质上就是跨职能的。它既不是单兵作战，也不是简单按&ldquo;组织结构图&rdquo;行事。一个典型的项目管理团队拥有来自组织各个层级以及诸多不同领域的成员，包括战略制定者。项目发起人和外部干系人也会参与其中。项目管理团队要想取得成功，各方之间必须保持良好沟通。&nbsp;<br />\n高效的项目管理能够强化组织内部、组织与组织之间、组织与干系人之间的整合。一旦对目标的共同承诺超越了单兵作战的&ldquo;公事公办逻辑&rdquo;，组织就能够取得非凡业绩。&nbsp;<br />\n&nbsp;</p>\n\n<p>5.保证执行的有力工具&nbsp;：</p>\n\n<p>项目管理最终就是要提升执行力&mdash;&mdash;用正确的方法取得正确的结果。尽管有时被忽视，但只有通过成功的项目执行，才能够促进组织变革，推动组织战略实现。项目就是开发新产品、拓展市场、建立新的项目链和变革组织的各种过程。没有执行力，组织战略就无力创造商业价值。&nbsp;<br />\n<br />\n&nbsp;</p>\n\n<p>6.总结：</p>\n\n<p>项目管理是企业成熟的商业发展加速器&nbsp;项目管理越来越被视为一种核心学科，如同工程学、会计学或通用管理学。这些学科都对组织有积极影响&mdash;&mdash;其投资回报率很难也不必量化，运用成熟、&ldquo;契合&rdquo;的项目管理应用体系，组织就能够更灵敏地应对变化，更好地协调战略与战术，更加有的放矢，并更好的创造价值。总而言之，项目管理是一种成熟的商业发展加速器，帮助组织在开展新业务时取得成功。&nbsp;</p>\n\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n',31,'2015-11-07 06:35:15');
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `koablog_group`
--

LOCK TABLES `koablog_group` WRITE;
/*!40000 ALTER TABLE `koablog_group` DISABLE KEYS */;
INSERT INTO `koablog_group` VALUES (1,'root','this is root group , have top permission'),(3,'author','this is author , it can only add article or delete self\'s article'),(4,'test','this is test group');
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `koablog_permission`
--

LOCK TABLES `koablog_permission` WRITE;
/*!40000 ALTER TABLE `koablog_permission` DISABLE KEYS */;
INSERT INTO `koablog_permission` VALUES (1,'create_users','add a user'),(2,'delete_users','delete a user'),(3,'update_users','update a user'),(4,'read_users','look a user'),(5,'create_articles','add a article'),(6,'delete_articles','delete a article , Whoever\'s article'),(7,'update_articles','update a article , Whoever\'s article'),(8,'read_articles','look a article , Whoever\'s article, every one have this permission even tourist'),(9,'create_tags','add a tag'),(10,'delete_tags','Generally , you\'re not going to delete a tag'),(11,'update_tags','Generally , you\'re not going to update a tag'),(12,'read_tags','every one even tourist have this permission'),(13,'delete_private_articles','author can delete their own article'),(14,'update_private_articles','author can update their own article'),(15,'update_private_users','user can update their own infomation such as password avatar and introduce'),(16,'upload_files','can upload something'),(17,'create_groups','create a new group'),(18,'delete_groups','delete a group'),(19,'update_groups','update a group'),(20,'read_groups','read groups'),(21,'promote_users','change user\'s group');
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `koablog_permission_to_group`
--

LOCK TABLES `koablog_permission_to_group` WRITE;
/*!40000 ALTER TABLE `koablog_permission_to_group` DISABLE KEYS */;
INSERT INTO `koablog_permission_to_group` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,1),(5,5,1),(6,6,1),(7,7,1),(8,8,1),(9,9,1),(10,10,1),(11,11,1),(12,12,1),(13,5,3),(14,13,3),(15,14,3),(16,9,3),(17,15,3),(18,16,3),(19,21,1),(20,16,1),(21,17,1),(22,18,1),(23,19,1),(24,20,1),(25,8,3),(26,12,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `koablog_tag`
--

LOCK TABLES `koablog_tag` WRITE;
/*!40000 ALTER TABLE `koablog_tag` DISABLE KEYS */;
INSERT INTO `koablog_tag` VALUES (22,'JavaScript'),(21,'OSX'),(25,'adsfadfsfsd'),(2,'apple'),(27,'fuck'),(28,'fucks'),(31,'image'),(3,'microsoft'),(23,'permission test'),(1,'test'),(29,'test fuck'),(4,'test1'),(13,'test10'),(20,'test10000'),(19,'test10086'),(14,'test11'),(15,'test12'),(16,'test13'),(5,'test2'),(6,'test3'),(7,'test4'),(8,'test5'),(9,'test6'),(10,'test7'),(11,'test8'),(12,'test9'),(26,'testss'),(30,'transactions test'),(24,'uuuuuuu');
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
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `koablog_user`
--

LOCK TABLES `koablog_user` WRITE;
/*!40000 ALTER TABLE `koablog_user` DISABLE KEYS */;
INSERT INTO `koablog_user` VALUES (1,'dzxx0563zh@126.com','e10adc3949ba59abbe56e057f20f883e','Summer','/images/1-1.jpg','update root account\'s introduce must be ok',1),(2,'xzsf2012zh@gmail.com','e10adc3949ba59abbe56e057f20f883e','test','/images/1-2.jpg','Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gr',1),(3,'rootTest','e10adc3949ba59abbe56e057f20f883e','rootTest',NULL,'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.',1),(4,'managerTest','e10adc3949ba59abbe56e057f20f883e','managerTest',NULL,'中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试',1),(6,'managerTest-2','e10adc3949ba59abbe56e057f20f883e','managerTest-2',NULL,'<script src=\"http://cdn.bootcss.com/jqueasdfasdfasdfry/1.11.3/jquery.min.js\"></script><br>asdfadfasdfsadf',1),(7,'managerTest-3','e10adc3949ba59abbe56e057f20f883e','managerTest-3',NULL,'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.',1),(8,'managerTest-4','e10adc3949ba59abbe56e057f20f883e','managerTest-4',NULL,'中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试中文字体测试',1),(9,'author1@test.com','e10adc3949ba59abbe56e057f20f883e','authorTest-1',NULL,'123123123123123123123123123123123123',3),(11,'author2@test.com','e10adc3949ba59abbe56e057f20f883e','authorTest-2',NULL,'segijofka adsjadfjsdjf adfjadkfj sdfsdf',3),(14,'author3@test.com','e10adc3949ba59abbe56e057f20f883e','authorTest-3','','',3),(16,'author4@test.com','e10adc3949ba59abbe56e057f20f883e','authorTest-4',NULL,'',3);
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

-- Dump completed on 2015-12-28 19:08:30

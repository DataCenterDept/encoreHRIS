-- MariaDB dump 10.19  Distrib 10.4.20-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: eisdb
-- ------------------------------------------------------
-- Server version	10.4.20-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblallowancetype`
--

DROP TABLE IF EXISTS `tblallowancetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblallowancetype` (
  `ALLOWANCE_TYPE_ID` varchar(50) NOT NULL,
  `ALLOWANCE` varchar(200) NOT NULL,
  `TAX_TYPE` varchar(30) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ALLOWANCE_TYPE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblallowancetype`
--

LOCK TABLES `tblallowancetype` WRITE;
/*!40000 ALTER TABLE `tblallowancetype` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblallowancetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblapplicationsettings`
--

DROP TABLE IF EXISTS `tblapplicationsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblapplicationsettings` (
  `SETTINGS_ID` int(11) NOT NULL,
  `LOGIN_BG` varchar(500) DEFAULT NULL,
  `LOGO_LIGHT` varchar(500) DEFAULT NULL,
  `LOGO_DARK` varchar(500) DEFAULT NULL,
  `LOGO_ICON_LIGHT` varchar(500) DEFAULT NULL,
  `LOGO_ICON_DARK` varchar(500) DEFAULT NULL,
  `FAVICON` varchar(500) DEFAULT NULL,
  `CURRENCY` varchar(30) NOT NULL,
  `TIMEZONE` varchar(100) NOT NULL,
  `DATE_FORMAT` varchar(10) NOT NULL,
  `TIME_FORMAT` varchar(10) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`SETTINGS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblapplicationsettings`
--

LOCK TABLES `tblapplicationsettings` WRITE;
/*!40000 ALTER TABLE `tblapplicationsettings` DISABLE KEYS */;
INSERT INTO `tblapplicationsettings` VALUES (1,'./assets/images/application-settings/login-bg.jpg','./assets/images/application-settings/logo-light.png','./assets/images/application-settings/logo-dark.png','./assets/images/application-settings/logo-icon-light.png','./assets/images/application-settings/logo-icon-dark.png','./assets/images/application-settings/favicon.png','PHP','Asia/Singapore','d D M Y','g:i a','UPD->LDAGULTO->2021-10-26 03:48:37');
/*!40000 ALTER TABLE `tblapplicationsettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblattendanceadustment`
--

DROP TABLE IF EXISTS `tblattendanceadustment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblattendanceadustment` (
  `ADJUSTMENT_ID` varchar(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `ATTENDANCE_ID` varchar(50) NOT NULL,
  `TIME_IN_DATE` date DEFAULT NULL,
  `TIME_IN_ORG` varchar(10) DEFAULT NULL,
  `TIME_IN_ADJ` varchar(10) NOT NULL,
  `TIME_OUT_DATE_ORG` date DEFAULT NULL,
  `TIME_OUT_DATE_ADJ` date DEFAULT NULL,
  `TIME_OUT_ORG` varchar(10) DEFAULT NULL,
  `TIME_OUT_ADJ` varchar(10) DEFAULT NULL,
  `STATUS` int(1) NOT NULL,
  `ATTACHMENT` varchar(500) DEFAULT NULL,
  `REASON` varchar(500) DEFAULT NULL,
  `FILE_DATE` date DEFAULT NULL,
  `FILE_TIME` varchar(10) DEFAULT NULL,
  `DECISION_DATE` date DEFAULT NULL,
  `DECISION_TIME` varchar(10) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ADJUSTMENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblattendanceadustment`
--

LOCK TABLES `tblattendanceadustment` WRITE;
/*!40000 ALTER TABLE `tblattendanceadustment` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblattendanceadustment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblattendancerecord`
--

DROP TABLE IF EXISTS `tblattendancerecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblattendancerecord` (
  `ATTENDANCE_ID` varchar(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `LOCKED` int(1) NOT NULL,
  `TIME_IN_DATE` date NOT NULL,
  `TIME_IN` varchar(10) NOT NULL,
  `TIME_IN_LAT` double DEFAULT NULL,
  `TIME_IN_LONG` double DEFAULT NULL,
  `TIME_IN_IP` varchar(20) DEFAULT NULL,
  `TIME_IN_BY` varchar(50) DEFAULT NULL,
  `TIME_OUT_DATE` date DEFAULT NULL,
  `TIME_OUT` varchar(10) DEFAULT NULL,
  `TIME_OUT_LAT` double DEFAULT NULL,
  `TIME_OUT_LONG` double DEFAULT NULL,
  `TIME_OUT_IP` varchar(20) DEFAULT NULL,
  `TIME_OUT_BY` varchar(50) DEFAULT NULL,
  `LATE` double DEFAULT NULL,
  `EARLY_LEAVING` double DEFAULT NULL,
  `OVERTIME` double DEFAULT NULL,
  `TOTAL_HOURS` double DEFAULT NULL,
  `REMARKS` varchar(500) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ATTENDANCE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblattendancerecord`
--

LOCK TABLES `tblattendancerecord` WRITE;
/*!40000 ALTER TABLE `tblattendancerecord` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblattendancerecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblbranch`
--

DROP TABLE IF EXISTS `tblbranch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblbranch` (
  `BRANCH_ID` varchar(50) NOT NULL,
  `BRANCH` varchar(200) DEFAULT NULL,
  `EMAIL` varchar(30) DEFAULT NULL,
  `PHONE` varchar(30) DEFAULT NULL,
  `TELEPHONE` varchar(30) DEFAULT NULL,
  `ADDRESS` varchar(500) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`BRANCH_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblbranch`
--

LOCK TABLES `tblbranch` WRITE;
/*!40000 ALTER TABLE `tblbranch` DISABLE KEYS */;
INSERT INTO `tblbranch` VALUES ('BRANCH1','Main Office','','','','Cabanatuan','INS->ADMIN->2021-06-14 01:46:24'),('BRANCH2','Pampanga Branch','','','','2nd Floor Ameluz Bldg., no. 92, Sto. Entierro, Angeles, Pampanga','INS->ADMIN->2021-07-12 09:01:48'),('BRANCH3','Tarlac Branch','','','','Virtual Office','INS->ADMIN->2021-07-12 10:42:05');
/*!40000 ALTER TABLE `tblbranch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblcompany`
--

DROP TABLE IF EXISTS `tblcompany`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblcompany` (
  `COMPANY_ID` int(11) NOT NULL,
  `COMPANY_NAME` varchar(300) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PHONE` varchar(30) DEFAULT NULL,
  `TELEPHONE` varchar(30) NOT NULL,
  `WEBSITE` varchar(100) DEFAULT NULL,
  `ADDRESS` varchar(500) NOT NULL,
  `WORKING_DAYS` int(11) DEFAULT NULL,
  `START_WORKING_HOURS` varchar(10) DEFAULT NULL,
  `END_WORKING_HOURS` varchar(10) DEFAULT NULL,
  `START_LUNCH_BREAK` varchar(10) DEFAULT NULL,
  `END_LUNCH_BREAK` varchar(10) DEFAULT NULL,
  `MONTHLY_WORKING_DAYS` int(11) DEFAULT NULL,
  `HALF_DAY_MARK` varchar(10) DEFAULT NULL,
  `LATE_MARK` int(11) DEFAULT NULL,
  `MAX_CLOCK_IN` int(11) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`COMPANY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcompany`
--

LOCK TABLES `tblcompany` WRITE;
/*!40000 ALTER TABLE `tblcompany` DISABLE KEYS */;
INSERT INTO `tblcompany` VALUES (1,'Encore Leasing and Finance Corporation','customercare@encorefinancials.com','09178389361','0449405625','http://www.encorefinancials.com','Km 114, Maharlika Highway, Dicarma, Cabanatuan City, Nueva Ecija',31,'08:30','17:30','12:30','13:30',22,'12:30',1,1,'UPD->ADMIN->2021-07-05 11:48:04');
/*!40000 ALTER TABLE `tblcompany` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbldeductionamount`
--

DROP TABLE IF EXISTS `tbldeductionamount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbldeductionamount` (
  `DEDUCTION_TYPE_ID` varchar(50) DEFAULT NULL,
  `START_RANGE` double NOT NULL,
  `END_RANGE` double NOT NULL,
  `DEDUCTION_AMOUNT` double NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbldeductionamount`
--

LOCK TABLES `tbldeductionamount` WRITE;
/*!40000 ALTER TABLE `tbldeductionamount` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbldeductionamount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbldeductiontype`
--

DROP TABLE IF EXISTS `tbldeductiontype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbldeductiontype` (
  `DEDUCTION_TYPE_ID` varchar(50) NOT NULL,
  `DEDUCTION` varchar(200) NOT NULL,
  `CATEGORY` varchar(50) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`DEDUCTION_TYPE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbldeductiontype`
--

LOCK TABLES `tbldeductiontype` WRITE;
/*!40000 ALTER TABLE `tbldeductiontype` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbldeductiontype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbldepartment`
--

DROP TABLE IF EXISTS `tbldepartment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbldepartment` (
  `DEPARTMENT_ID` varchar(50) NOT NULL,
  `DEPARTMENT` varchar(200) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`DEPARTMENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbldepartment`
--

LOCK TABLES `tbldepartment` WRITE;
/*!40000 ALTER TABLE `tbldepartment` DISABLE KEYS */;
INSERT INTO `tbldepartment` VALUES ('DEPT1','Data Center','INS->ADMIN->2021-06-14 01:45:58'),('DEPT10','General Manager','INS->LDAGULTO->2021-10-05 04:02:39'),('DEPT2','HR and Admin','INS->ADMIN->2021-07-12 08:55:23'),('DEPT3','Operations','UPD->ADMIN->2021-07-12 08:55:34'),('DEPT4','CI and Collection','INS->ADMIN->2021-07-12 08:55:41'),('DEPT5','Sales','INS->ADMIN->2021-07-12 08:55:49'),('DEPT6','Finance','INS->ADMIN->2021-07-12 08:55:57'),('DEPT7','Executive','INS->ADMIN->2021-07-12 08:56:02'),('DEPT8','CRCP','INS->ADMIN->2021-07-12 08:56:10');
/*!40000 ALTER TABLE `tbldepartment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbldesignation`
--

DROP TABLE IF EXISTS `tbldesignation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbldesignation` (
  `DESIGNATION_ID` varchar(50) NOT NULL,
  `DESIGNATION` varchar(200) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`DESIGNATION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbldesignation`
--

LOCK TABLES `tbldesignation` WRITE;
/*!40000 ALTER TABLE `tbldesignation` DISABLE KEYS */;
INSERT INTO `tbldesignation` VALUES ('DES1','Data Center Staff','INS->ADMIN->2021-06-14 01:46:09'),('DES10','Sales Staff','INS->ADMIN->2021-07-12 09:00:01'),('DES11','Finance Head','INS->ADMIN->2021-07-12 09:00:07'),('DES12','Finance Staff','INS->ADMIN->2021-07-12 09:00:12'),('DES13','CRCP Head','INS->ADMIN->2021-07-12 09:00:28'),('DES14','President/CEO','INS->ADMIN->2021-07-12 09:49:18'),('DES15','Security Guard','INS->ADMIN->2021-07-12 09:52:34'),('DES16','Executive Staff','INS->ADMIN->2021-07-12 10:22:40'),('DES2','Data Center Head','INS->ADMIN->2021-07-12 08:54:35'),('DES3','HR and Admin Head','INS->ADMIN->2021-07-12 08:59:12'),('DES4','HR and Admin Staff','INS->ADMIN->2021-07-12 08:59:18'),('DES5','Operations Head','INS->ADMIN->2021-07-12 08:59:24'),('DES6','Operations Staff','INS->ADMIN->2021-07-12 08:59:30'),('DES7','CI and Collection Head','INS->ADMIN->2021-07-12 08:59:44'),('DES8','CI and Collection Staff','INS->ADMIN->2021-07-12 08:59:50'),('DES9','Sales Head','INS->ADMIN->2021-07-12 08:59:57');
/*!40000 ALTER TABLE `tbldesignation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbldocument`
--

DROP TABLE IF EXISTS `tbldocument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbldocument` (
  `DOCUMENT_ID` varchar(50) NOT NULL,
  `DOCUMENT_NAME` varchar(500) NOT NULL,
  `AUTHOR` varchar(100) NOT NULL,
  `DEPARTMENT` varchar(50) DEFAULT NULL,
  `DOCUMENT_PATH` varchar(500) NOT NULL,
  `DOCUMENT_CATEGORY` varchar(50) NOT NULL,
  `DOCUMENT_EXTENSION` varchar(10) NOT NULL,
  `DOCUMENT_SIZE` double DEFAULT NULL,
  `DESCRIPTION` varchar(500) DEFAULT NULL,
  `UPLOAD_DATE` date DEFAULT NULL,
  `UPLOAD_TIME` varchar(10) DEFAULT NULL,
  `PUBLISH` int(1) NOT NULL,
  `PUBLISH_BY` varchar(100) DEFAULT NULL,
  `PUBLISH_DATE` date DEFAULT NULL,
  `PUBLISH_TIME` varchar(10) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`DOCUMENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbldocument`
--

LOCK TABLES `tbldocument` WRITE;
/*!40000 ALTER TABLE `tbldocument` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbldocument` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbldocumentauthorizer`
--

DROP TABLE IF EXISTS `tbldocumentauthorizer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbldocumentauthorizer` (
  `DEPARTMENT` varchar(50) DEFAULT NULL,
  `AUTHORIZER` varchar(100) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbldocumentauthorizer`
--

LOCK TABLES `tbldocumentauthorizer` WRITE;
/*!40000 ALTER TABLE `tbldocumentauthorizer` DISABLE KEYS */;
INSERT INTO `tbldocumentauthorizer` VALUES ('DEPT1','15','INS->gtbonita->2021-10-14 04:12:57'),('DEPT1','2','INS->gtbonita->2021-10-14 04:12:57'),('DEPT4','10','INS->LDAGULTO->2021-10-26 11:48:59'),('DEPT8','20','INS->LDAGULTO->2021-10-26 11:49:04'),('DEPT7','15','INS->LDAGULTO->2021-10-26 11:49:29'),('DEPT6','15','INS->LDAGULTO->2021-10-26 11:50:30'),('DEPT10','9','INS->LDAGULTO->2021-10-26 11:50:38'),('DEPT2','20','INS->LDAGULTO->2021-10-26 11:50:43'),('DEPT3','8','INS->LDAGULTO->2021-10-26 11:50:51'),('DEPT5','9','INS->LDAGULTO->2021-10-26 11:51:02');
/*!40000 ALTER TABLE `tbldocumentauthorizer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbldocumentdepartmentpermission`
--

DROP TABLE IF EXISTS `tbldocumentdepartmentpermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbldocumentdepartmentpermission` (
  `DOCUMENT_ID` varchar(50) NOT NULL,
  `DEPARTMENT_ID` varchar(50) NOT NULL,
  `PERMISSION` varchar(1) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbldocumentdepartmentpermission`
--

LOCK TABLES `tbldocumentdepartmentpermission` WRITE;
/*!40000 ALTER TABLE `tbldocumentdepartmentpermission` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbldocumentdepartmentpermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbldocumentemployeepermission`
--

DROP TABLE IF EXISTS `tbldocumentemployeepermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbldocumentemployeepermission` (
  `DOCUMENT_ID` varchar(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `PERMISSION` varchar(1) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbldocumentemployeepermission`
--

LOCK TABLES `tbldocumentemployeepermission` WRITE;
/*!40000 ALTER TABLE `tbldocumentemployeepermission` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbldocumentemployeepermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbldocumentfiletype`
--

DROP TABLE IF EXISTS `tbldocumentfiletype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbldocumentfiletype` (
  `SETTINGS_ID` int(11) DEFAULT NULL,
  `FILE_TYPE` varchar(50) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbldocumentfiletype`
--

LOCK TABLES `tbldocumentfiletype` WRITE;
/*!40000 ALTER TABLE `tbldocumentfiletype` DISABLE KEYS */;
INSERT INTO `tbldocumentfiletype` VALUES (1,'pdf','INS->LDAGULTO->2021-09-21 11:24:32');
/*!40000 ALTER TABLE `tbldocumentfiletype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbldocumentsettings`
--

DROP TABLE IF EXISTS `tbldocumentsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbldocumentsettings` (
  `SETTINGS_ID` int(11) NOT NULL,
  `MAX_FILE_SIZE` double DEFAULT NULL,
  `AUTHORIZATION` int(1) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`SETTINGS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbldocumentsettings`
--

LOCK TABLES `tbldocumentsettings` WRITE;
/*!40000 ALTER TABLE `tbldocumentsettings` DISABLE KEYS */;
INSERT INTO `tbldocumentsettings` VALUES (1,15,1,'UPD->LDAGULTO->2021-09-21 11:24:32');
/*!40000 ALTER TABLE `tbldocumentsettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblemailrecipient`
--

DROP TABLE IF EXISTS `tblemailrecipient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblemailrecipient` (
  `RECIPIENT_ID` int(50) NOT NULL,
  `NOTIFICATION_ID` varchar(50) NOT NULL,
  `EMAIL` varchar(30) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`RECIPIENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblemailrecipient`
--

LOCK TABLES `tblemailrecipient` WRITE;
/*!40000 ALTER TABLE `tblemailrecipient` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblemailrecipient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblemployeedocument`
--

DROP TABLE IF EXISTS `tblemployeedocument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblemployeedocument` (
  `DOCUMENT_ID` varchar(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `DOCUMENT_NAME` varchar(100) NOT NULL,
  `DOCUMENT_PATH` varchar(200) NOT NULL,
  `DOCUMENT_DATE` date DEFAULT NULL,
  `UPLOAD_DATE` date DEFAULT NULL,
  `UPLOAD_TIME` varchar(10) DEFAULT NULL,
  `UPLOAD_BY` varchar(50) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`DOCUMENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblemployeedocument`
--

LOCK TABLES `tblemployeedocument` WRITE;
/*!40000 ALTER TABLE `tblemployeedocument` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblemployeedocument` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblemployeeprofile`
--

DROP TABLE IF EXISTS `tblemployeeprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblemployeeprofile` (
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `USERNAME` varchar(50) DEFAULT NULL,
  `ID_NUMBER` varchar(100) DEFAULT NULL,
  `FIRST_NAME` varchar(100) NOT NULL,
  `LAST_NAME` varchar(100) NOT NULL,
  `MIDDLE_NAME` varchar(100) DEFAULT NULL,
  `SUFFIX` varchar(5) DEFAULT NULL,
  `BIRTHDAY` date NOT NULL,
  `EMPLOYEMENT_TYPE` varchar(20) DEFAULT NULL,
  `EMPLOYMENT_STATUS` int(1) DEFAULT NULL,
  `JOIN_DATE` date DEFAULT NULL,
  `EXIT_DATE` date DEFAULT NULL,
  `EXIT_REASON` longtext DEFAULT NULL,
  `PROFILE_IMAGE` varchar(500) DEFAULT NULL,
  `EMAIL` varchar(30) NOT NULL,
  `PHONE` varchar(30) DEFAULT NULL,
  `TELEPHONE` varchar(30) DEFAULT NULL,
  `DEPARTMENT` varchar(20) DEFAULT NULL,
  `BRANCH` varchar(20) DEFAULT NULL,
  `DESIGNATION` varchar(20) DEFAULT NULL,
  `GENDER` varchar(20) NOT NULL,
  `ADDRESS` varchar(500) NOT NULL,
  `PAYROLL_PERIOD` varchar(50) DEFAULT NULL,
  `BASIC_PAY` double DEFAULT NULL,
  `DAILY_RATE` double DEFAULT NULL,
  `HOURLY_RATE` double DEFAULT NULL,
  `MINUTE_RATE` double DEFAULT NULL,
  `SSS` varchar(50) DEFAULT NULL,
  `TIN` varchar(50) DEFAULT NULL,
  `PHILHEALTH` varchar(50) DEFAULT NULL,
  `PAGIBIG` varchar(50) DEFAULT NULL,
  `DRIVERS_LICENSE` varchar(50) DEFAULT NULL,
  `ACCOUNT_NAME` varchar(100) DEFAULT NULL,
  `ACCOUNT_NUMBER` varchar(20) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`EMPLOYEE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblemployeeprofile`
--

LOCK TABLES `tblemployeeprofile` WRITE;
/*!40000 ALTER TABLE `tblemployeeprofile` DISABLE KEYS */;
INSERT INTO `tblemployeeprofile` VALUES ('10','MAGARSULA','9','Mark','Garsula','','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'mgarsula@encorefinancials.com','1','','DEPT4','BRANCH1','DES7','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Mark Garsula','1','UPD->LDAGULTO->2021-10-26 11:08:48'),('11','CSRIVERA','41','Carlo','Rivera','','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'csrivera@encorefinancials.com','1','','DEPT5','BRANCH1','DES9','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Carlo Rivera','1','UPD->LDAGULTO->2021-10-26 11:19:37'),('12','ADDUCLAYAN','46','Ariel','Duclayan','','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'adduclayan@encorefinancials.co','','','DEPT4','BRANCH1','DES8','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Ariel Duclayan','1','UPD->ADMIN->2021-10-14 04:58:01'),('13',NULL,'7','Francisco','Fernandez','','','1990-10-01','PERMANENT',0,'2021-10-01','2021-10-01',NULL,NULL,'ffernandez@encorefinancials.co','1','','DEPT5','BRANCH1','DES9','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Francisco Fernandez','1','INS->ADMIN->2021-10-14 11:39:25'),('14',NULL,'35','Camille','Reyes','','','1990-10-01','PERMANENT',0,'2021-10-01','2021-10-01',NULL,NULL,'creyes@encorefinancials.com','1','','DEPT5','BRANCH1','DES10','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Camille Reyes','1','INS->ADMIN->2021-10-14 11:40:24'),('15','ACADIZ','5','Anjeli','Cadiz-Baena','','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'ascadiz@encorefinancials.com','1','','DEPT6','BRANCH1','DES11','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Anjeli Cadiz-Baena','1','UPD->LDAGULTO->2021-10-26 11:21:57'),('16','JCADIZJR','1','Jose','Cadiz','Imperial','JR','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'jscadiz@encorefinancials.com','1','','DEPT7','BRANCH1','DES14','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Jose ','1','UPD->LDAGULTO->2021-10-26 11:19:05'),('17',NULL,'68','Alyssa Keith','Cajucom','Sarondo','','1990-10-01','PERMANENT',0,'2021-10-01','2021-10-01',NULL,NULL,'ascajucom@encorefinancials.com','1','','DEPT5','BRANCH1','DES10','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Alyssa Keith Cajucom','1','INS->ADMIN->2021-10-14 11:43:38'),('19',NULL,'71','Melvin','Santiago','','','1990-10-01','PERMANENT',0,'2021-10-01','2021-10-01',NULL,NULL,'mbsantiago@encorefinancials.co','1','','DEPT4','BRANCH2','DES8','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Melvin Santiago','1','INS->ADMIN->2021-10-14 11:45:01'),('2','GTBONITA','8','Glen','Bonita','','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'gtbonita@encorefinancials.com','1','','DEPT1','BRANCH1','DES2','MALE','1','SEMIMONTHLY',2000,45.45,5.68,0.09,'','','','','','Glen Bonita','1','UPD->LDAGULTO->2021-10-26 10:54:42'),('20','ADELAFUENTE','4','Albert','Dela Fuente','','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'adelafuente@encorefinancials.c','1','','DEPT2','BRANCH1','DES3','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Albert Dela Fuente','1','UPD->ADMIN->2021-10-14 04:52:36'),('21','RFDELACRUZII','37','Rogelio','Dela Cruz','','II','1990-10-01','PERMANENT',1,'2021-09-30',NULL,NULL,NULL,'rfdelacruz@encorefinancials.co','1','','DEPT4','BRANCH1','DES8','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Rogelio Dela Cruz','1','UPD->ADMIN->2021-10-14 05:04:17'),('27',NULL,'73','Kristine','Ganias','','','1990-10-01','PROVISIONAL',0,'2021-10-01','2021-10-01',NULL,NULL,'ksganias@encorefinancials.com','1','','DEPT2','BRANCH1','DES3','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Kristine Ganias','1','INS->ADMIN->2021-10-14 11:56:45'),('28','NRGUTIERREZ','69','Nadine Mickaela','Gutierrez','','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'ngutierrez@encorefinancials.co','1','','DEPT6','BRANCH1','DES12','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Nadine Mickaela Gutierrez','1','UPD->ADMIN->2021-10-14 05:03:30'),('29','ABJUANANI','54','Alejandro','Juanani','','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'abjuanani@encorefinancials.com','1','','DEPT4','BRANCH1','DES8','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Alejandro Juanani','1','UPD->ADMIN->2021-10-14 04:56:39'),('3',NULL,'34','Jedd','Alejo','','','1990-10-01','PERMANENT',0,'2021-10-01','2021-10-01',NULL,NULL,'jbalejo@encorefinancials.com','1','','DEPT2','BRANCH1','DES4','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Jedd Alejo','1','INS->ADMIN->2021-10-14 11:24:03'),('31',NULL,'74','Marvic','Lopez','','','1990-10-01','PROVISIONAL',0,'2021-10-01','2021-10-01',NULL,NULL,'mclopez@encorefinancials.com','1','','DEPT5','BRANCH1','DES9','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Marvic Lopez','1','INS->ADMIN->2021-10-14 12:00:39'),('32',NULL,'40','Gidget','Pangilinan','','','1990-10-01','PERMANENT',0,'2021-10-01','2021-10-01',NULL,NULL,'gbpangilinan@encorefinancials.','1','','DEPT5','BRANCH2','DES10','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Gidget Pangilinan','1','INS->ADMIN->2021-10-14 12:01:34'),('33','LPUNSALAN','3','Lynn','Punsalan','','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'ltpunsalan@encorefinancials.co','1','','DEPT5','BRANCH2','DES9','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Lynn Punsalan','1','UPD->LDAGULTO->2021-10-26 11:20:09'),('35','NCSANPEDRO','33','Niña Camille','San Pedro','Corpuz','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'ncsanpedro@encorefinancials.co','1','','DEPT6','BRANCH1','DES12','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Niña Camille San Pedro','1','UPD->ADMIN->2021-10-14 05:03:46'),('36','KSVILLAR','20','Karla','Villar','','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'ksvillar@encorefinancials.com','1','','DEPT6','BRANCH1','DES12','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Karla Villar','1','UPD->LDAGULTO->2021-10-26 11:22:11'),('37','MKCADIZ','84','Ma. Kristine','Cadiz','Santos','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'mkcadiz@encorefinancials.com','1','','DEPT7','BRANCH1','DES16','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Ma. Kristine Cadiz','1','UPD->LDAGULTO->2021-10-26 11:23:13'),('38','CBPALO','75','Charlene','Palo','Baltazar','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'cbpalo@encorefinancials.com','1','','DEPT3','BRANCH2','DES6','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Charlene Palo','1','UPD->ADMIN->2021-10-14 04:58:38'),('39',NULL,'77','Jerucel','Quimzon','Cobarrubias','','1990-10-01','PROVISIONAL',0,'2021-10-01','2021-10-01',NULL,NULL,'jcquimzon@encorefinancials.com','1','','DEPT5','BRANCH1','DES10','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Jerucel Quimzon','1','INS->ADMIN->2021-10-14 01:12:20'),('4',NULL,'50','Bernadeth','Puno','','','1990-10-01','PERMANENT',0,'2021-10-01','2021-10-01',NULL,NULL,'bdpuno@encorefinancials.com','1','','DEPT3','BRANCH1','DES6','FEMALE','1','SEMIMONTHLY',10000,454.55,56.82,0.95,'','','','','','Bernadeth Puno','1','INS->ADMIN->2021-10-14 11:25:27'),('40',NULL,'76','Mariah Angelika','Mateo','Alfaro','','1990-10-01','PROVISIONAL',0,'2021-10-01','2021-10-02',NULL,NULL,'mamateo@encorefinancials.com','1','','DEPT2','BRANCH1','DES4','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Mariah Angelika Mateo','1','INS->ADMIN->2021-10-14 01:13:22'),('41',NULL,'78','Jessa','Quiruben','Victorio','','1990-10-01','PROVISIONAL',0,'2021-10-01','2021-10-01',NULL,NULL,'jvquiruben@encorefinancials.co','1','','DEPT4','BRANCH1','DES8','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Jessa Quiruben','1','INS->ADMIN->2021-10-14 01:14:13'),('42','JYYALUNG','79','James','Yalung','Yumul','','1990-10-01','PROVISIONAL',1,'2021-10-01',NULL,NULL,NULL,'yalungjames14@gmail.com','1','','DEPT4','BRANCH2','DES8','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','James Yalung','1','UPD->ADMIN->2021-10-14 05:00:23'),('43','PBLORENZO','80','Pamela Louie','Lorenzo','Blas','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'pblorenzo@encorefinancials.com','1','','DEPT3','BRANCH1','DES6','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Pamela Louie Lorenzo','1','UPD->ADMIN->2021-10-14 05:04:07'),('44','FCARREON','81','Fatine','Carreon','Pascua','','1990-10-01','PROVISIONAL',1,'2021-10-01',NULL,NULL,NULL,'fcarreon@encorefinancials.com','1','','DEPT5','BRANCH3','DES10','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Fatine Carreon','1','UPD->ADMIN->2021-10-14 04:59:33'),('45',NULL,'82','Ron Joseph','Javier','Monje','','1990-10-01','PROVISIONAL',0,'2021-10-01','2021-10-01',NULL,NULL,'rmjavier@encorefinancials.com','1','','DEPT4','BRANCH1','DES8','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Ron Joseph Javier','1','INS->ADMIN->2021-10-14 01:18:48'),('46','HPMESINA','83','Honey Pearl','Mesina','Parungao','','1990-10-01','PROVISIONAL',1,'2021-10-01',NULL,NULL,NULL,'hpmesina@encorefinancials.com','1','','DEPT5','BRANCH2','DES10','FEMALE','Prk 4 San Mateo Arayat Pampanga','SEMIMONTHLY',1000,45.45,5.68,0.09,'3505286339','730206140','072504459706','','','Honey Pearl Mesina','1','UPD->ADMIN->2021-10-14 04:59:50'),('47',NULL,'85','Rhodora Margaret','Ibay','Reyes','','1990-10-01','PROVISIONAL',0,'2021-10-01','2021-10-01',NULL,NULL,'rribay@encorefinancials.com','1','','DEPT2','BRANCH1','DES3','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Rhodora Margaret Ibay','1','INS->ADMIN->2021-10-14 01:21:01'),('48','CAGUILAR','86','Christopher','Aguilar','','','1990-10-01','PROVISIONAL',1,'2021-10-01',NULL,NULL,NULL,'caguilar@encorefinancials.com','1','','DEPT4','BRANCH1','DES8','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Christopher Aguilar','1','UPD->ADMIN->2021-10-14 04:58:52'),('49','CRONQUILLO','87','Crispina','Ronquillo','Sanchez','','1990-10-01','PROVISIONAL',1,'2021-10-01',NULL,NULL,NULL,'csronquillo@encorefinancials.c','1','','DEPT5','BRANCH1','DES10','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Crispina Ronquillo','1','UPD->LDAGULTO->2021-10-26 11:21:04'),('5',NULL,'63','Rellie Ann','Dela Cruz','','','1990-10-01','PERMANENT',0,'2021-10-01','2021-10-01',NULL,NULL,'rsdelacruz@encorefinancials.co','1','','DEPT3','BRANCH1','DES6','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Rellie Ann Dela Cruz','1','INS->ADMIN->2021-10-14 11:26:53'),('50','ALRIVERA','88','Annalyn','Rivera','Lacsina','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'alrivera.ftcleasing@gmail.com','1','','DEPT2','BRANCH1','DES4','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Annalyn Rivera','1','UPD->ADMIN->2021-10-14 04:57:40'),('51','LPAMADORA','89','Levy','Amadora','Patricio','JR','1990-10-01','PROVISIONAL',1,'2021-10-01',NULL,NULL,NULL,'lpamadora@encorefinancials.com','1','','DEPT4','BRANCH1','DES8','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Levy Amadora','1','UPD->LDAGULTO->2021-10-26 01:15:42'),('6','LVMICAYAS','70','Lemar Bill','Micayas','','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'lmicayas@encorefinancials.com','1','','DEPT1','BRANCH1','DES1','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Lemar Bill Micayas','1','UPD->LDAGULTO->2021-10-26 10:51:54'),('7','LDAGULTO','53','Lawrence','Agulto','','','1995-08-03','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'ldagulto@encorefinancials.com','1','','DEPT1','BRANCH1','DES1','MALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Lawrence Agulto','1','UPD->LDAGULTO->2021-10-26 10:55:36'),('8','SDLIM','15','Sarah Jane','Lim','','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'sjmdejesus@encorefinancials.co','1','','DEPT3','BRANCH1','DES5','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Sarah Jane Lim','1','UPD->LDAGULTO->2021-10-26 11:05:45'),('9','MSONIGA','6','Mary Ann','Soniga','','','1990-10-01','PERMANENT',1,'2021-10-01',NULL,NULL,NULL,'msoniga@encorefinancials.com','1','','DEPT5','BRANCH1','DES9','FEMALE','1','SEMIMONTHLY',1000,45.45,5.68,0.09,'','','','','','Mary Ann Soniga','1','UPD->LDAGULTO->2021-10-26 11:20:16'),('USER-GUARD','guard',NULL,'Encore','Security','','','1990-07-01','PERMANENT',1,'1990-07-01',NULL,NULL,NULL,'guard@encorefinancials.com','09321651874','','DEPT9','BRANCH1','DES15','MALE','Address',NULL,5000,227.27,28.41,0.47,'1','1','1','1','',NULL,NULL,'UPD->LDAGULTO->2021-10-04 01:18:03'),('USER-wg1xs8lm7orn786nc4so','ADMIN',NULL,'Encore','Administrator','','','0000-00-00',NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,'','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'UPD->ADMIN->2021-10-12 10:52:15');
/*!40000 ALTER TABLE `tblemployeeprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblemployeesubordinate`
--

DROP TABLE IF EXISTS `tblemployeesubordinate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblemployeesubordinate` (
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `SUBORDINATE_ID` varchar(20) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblemployeesubordinate`
--

LOCK TABLES `tblemployeesubordinate` WRITE;
/*!40000 ALTER TABLE `tblemployeesubordinate` DISABLE KEYS */;
INSERT INTO `tblemployeesubordinate` VALUES ('2','6','INS->LDAGULTO->2021-10-26 10:54:43'),('2','7','INS->LDAGULTO->2021-10-26 10:55:37'),('8','38','INS->LDAGULTO->2021-10-26 11:05:46'),('8','43','INS->LDAGULTO->2021-10-26 11:05:47'),('10','29','INS->LDAGULTO->2021-10-26 11:08:49'),('10','12','INS->LDAGULTO->2021-10-26 11:08:49'),('10','48','INS->LDAGULTO->2021-10-26 11:08:49'),('10','42','INS->LDAGULTO->2021-10-26 11:08:49'),('10','21','INS->LDAGULTO->2021-10-26 11:08:50'),('33','46','INS->LDAGULTO->2021-10-26 11:20:09'),('16','9','INS->LDAGULTO->2021-10-26 11:20:17'),('9','11','INS->LDAGULTO->2021-10-26 11:20:17'),('9','44','INS->LDAGULTO->2021-10-26 11:20:17'),('9','33','INS->LDAGULTO->2021-10-26 11:20:17'),('9','10','INS->LDAGULTO->2021-10-26 11:20:17'),('9','8','INS->LDAGULTO->2021-10-26 11:20:17'),('9','49','INS->LDAGULTO->2021-10-26 11:21:05'),('16','15','INS->LDAGULTO->2021-10-26 11:21:57'),('15','2','INS->LDAGULTO->2021-10-26 11:21:57'),('15','36','INS->LDAGULTO->2021-10-26 11:22:12'),('36','28','INS->LDAGULTO->2021-10-26 11:22:12'),('36','35','INS->LDAGULTO->2021-10-26 11:22:12'),('16','37','INS->LDAGULTO->2021-10-26 11:23:13'),('10','51','INS->LDAGULTO->2021-10-26 11:53:52');
/*!40000 ALTER TABLE `tblemployeesubordinate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblemployeesuperior`
--

DROP TABLE IF EXISTS `tblemployeesuperior`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblemployeesuperior` (
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `SUPERIOR_ID` varchar(20) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`EMPLOYEE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblemployeesuperior`
--

LOCK TABLES `tblemployeesuperior` WRITE;
/*!40000 ALTER TABLE `tblemployeesuperior` DISABLE KEYS */;
INSERT INTO `tblemployeesuperior` VALUES ('10','9','INS->LDAGULTO->2021-10-26 11:20:17'),('11','9','INS->LDAGULTO->2021-10-26 11:20:17'),('12','10','INS->LDAGULTO->2021-10-26 11:08:49'),('15','16','INS->LDAGULTO->2021-10-26 11:21:57'),('2','15','INS->LDAGULTO->2021-10-26 11:21:58'),('21','10','INS->LDAGULTO->2021-10-26 11:08:50'),('28','36','INS->LDAGULTO->2021-10-26 11:22:12'),('29','10','INS->LDAGULTO->2021-10-26 11:08:49'),('33','9','INS->LDAGULTO->2021-10-26 11:20:17'),('35','36','INS->LDAGULTO->2021-10-26 11:22:12'),('36','15','INS->LDAGULTO->2021-10-26 11:22:12'),('37','16','INS->LDAGULTO->2021-10-26 11:23:13'),('38','8','INS->LDAGULTO->2021-10-26 11:05:47'),('42','10','INS->LDAGULTO->2021-10-26 11:08:50'),('43','8','INS->LDAGULTO->2021-10-26 11:05:47'),('44','9','INS->LDAGULTO->2021-10-26 11:20:17'),('46','33','INS->LDAGULTO->2021-10-26 11:20:09'),('48','10','INS->LDAGULTO->2021-10-26 11:08:49'),('49','9','INS->LDAGULTO->2021-10-26 11:21:05'),('51','10','INS->LDAGULTO->2021-10-26 11:53:52'),('6','2','INS->LDAGULTO->2021-10-26 10:54:43'),('7','2','INS->LDAGULTO->2021-10-26 10:55:36'),('8','9','INS->LDAGULTO->2021-10-26 11:20:18'),('9','16','INS->LDAGULTO->2021-10-26 11:20:17');
/*!40000 ALTER TABLE `tblemployeesuperior` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblholiday`
--

DROP TABLE IF EXISTS `tblholiday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblholiday` (
  `HOLIDAY_ID` varchar(50) NOT NULL,
  `HOLIDAY` varchar(200) NOT NULL,
  `HOLIDAY_DATE` date NOT NULL,
  `HOLIDAY_TYPE` varchar(20) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`HOLIDAY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblholiday`
--

LOCK TABLES `tblholiday` WRITE;
/*!40000 ALTER TABLE `tblholiday` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblholiday` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblleave`
--

DROP TABLE IF EXISTS `tblleave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblleave` (
  `LEAVE_ID` varchar(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `LEAVE_TYPE` varchar(50) NOT NULL,
  `LEAVE_DATE` datetime NOT NULL,
  `START_TIME` varchar(10) DEFAULT NULL,
  `END_TIME` varchar(10) DEFAULT NULL,
  `REASON` varchar(500) DEFAULT NULL,
  `STATUS` int(1) DEFAULT NULL,
  `DECISION_DATE` date DEFAULT NULL,
  `DECISION_TIME` varchar(10) DEFAULT NULL,
  `CANCELATION_REASON` varchar(500) DEFAULT NULL,
  `REJECTION_REASON` varchar(500) DEFAULT NULL,
  `FILED_BY` varchar(50) DEFAULT NULL,
  `FILE_DATE` date DEFAULT NULL,
  `FILE_TIME` varchar(10) DEFAULT NULL,
  `DECISION_BY` varchar(50) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`LEAVE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblleave`
--

LOCK TABLES `tblleave` WRITE;
/*!40000 ALTER TABLE `tblleave` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblleave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblleaveentitlement`
--

DROP TABLE IF EXISTS `tblleaveentitlement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblleaveentitlement` (
  `LEAVE_ENTITLEMENT_ID` varchar(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `LEAVE_TYPE` varchar(50) NOT NULL,
  `NO_LEAVES` float DEFAULT NULL,
  `ACQUIRED_NO_LEAVES` float DEFAULT NULL,
  `START_DATE` date NOT NULL,
  `END_DATE` date NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`LEAVE_ENTITLEMENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblleaveentitlement`
--

LOCK TABLES `tblleaveentitlement` WRITE;
/*!40000 ALTER TABLE `tblleaveentitlement` DISABLE KEYS */;
INSERT INTO `tblleaveentitlement` VALUES ('LVENT1','2','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:38:16'),('LVENT10','7','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:40:18'),('LVENT100','49','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:43'),('LVENT101','50','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:52'),('LVENT102','50','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:56'),('LVENT103','50','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:59'),('LVENT104','50','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:47:02'),('LVENT105','51','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:54:18'),('LVENT106','51','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:54:22'),('LVENT107','51','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:54:26'),('LVENT108','51','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:54:30'),('LVENT11','7','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:40:21'),('LVENT12','7','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:40:26'),('LVENT13','8','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:40:31'),('LVENT14','8','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:40:35'),('LVENT15','8','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:40:38'),('LVENT16','8','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:40:42'),('LVENT17','9','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:40:48'),('LVENT18','9','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:40:53'),('LVENT19','9','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:40:58'),('LVENT2','2','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:38:21'),('LVENT20','9','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:41:02'),('LVENT21','10','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:41:18'),('LVENT22','10','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:41:22'),('LVENT23','10','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:41:26'),('LVENT24','10','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:41:29'),('LVENT25','11','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:41:34'),('LVENT26','11','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:41:37'),('LVENT27','11','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:41:40'),('LVENT28','11','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:41:43'),('LVENT29','12','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:41:48'),('LVENT3','2','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:38:24'),('LVENT30','12','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:41:52'),('LVENT31','12','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:41:56'),('LVENT32','12','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:41:59'),('LVENT33','15','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:42:03'),('LVENT34','15','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:42:06'),('LVENT35','15','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:42:09'),('LVENT36','15','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:42:13'),('LVENT37','16','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:42:17'),('LVENT38','16','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:42:20'),('LVENT39','16','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:42:23'),('LVENT4','2','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:38:32'),('LVENT40','16','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:42:26'),('LVENT41','20','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:42:39'),('LVENT42','20','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:42:43'),('LVENT43','20','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:42:47'),('LVENT44','20','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:42:51'),('LVENT45','21','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:42:58'),('LVENT46','21','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:43:01'),('LVENT47','21','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:43:06'),('LVENT48','21','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:43:09'),('LVENT49','28','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:43:18'),('LVENT5','6','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:39:46'),('LVENT50','28','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:43:21'),('LVENT51','28','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:43:25'),('LVENT52','28','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:43:28'),('LVENT53','29','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:43:32'),('LVENT54','29','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:43:35'),('LVENT55','29','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:43:39'),('LVENT56','29','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:43:43'),('LVENT57','33','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:43:47'),('LVENT58','33','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:43:50'),('LVENT59','33','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:43:54'),('LVENT6','6','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:39:51'),('LVENT60','33','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:43:57'),('LVENT61','35','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:44:09'),('LVENT62','35','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:44:13'),('LVENT63','35','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:44:16'),('LVENT64','35','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:44:19'),('LVENT65','36','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:44:24'),('LVENT66','36','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:44:27'),('LVENT67','36','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:44:30'),('LVENT68','36','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:44:35'),('LVENT69','37','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:44:39'),('LVENT7','6','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:39:56'),('LVENT70','37','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:44:43'),('LVENT71','37','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:44:46'),('LVENT72','37','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:44:50'),('LVENT73','38','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:44:54'),('LVENT74','38','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:44:57'),('LVENT75','38','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:45:03'),('LVENT76','38','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:45:06'),('LVENT77','42','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:45:13'),('LVENT78','42','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:45:15'),('LVENT79','42','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:45:18'),('LVENT8','6','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:40:01'),('LVENT80','42','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:45:21'),('LVENT81','43','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:45:35'),('LVENT82','43','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:45:38'),('LVENT83','43','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:45:41'),('LVENT84','43','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:45:45'),('LVENT85','44','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:45:49'),('LVENT86','44','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:45:53'),('LVENT87','44','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:45:57'),('LVENT88','44','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:00'),('LVENT89','46','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:04'),('LVENT9','7','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:40:14'),('LVENT90','46','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:08'),('LVENT91','46','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:11'),('LVENT92','46','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:15'),('LVENT93','48','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:19'),('LVENT94','48','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:22'),('LVENT95','48','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:26'),('LVENT96','48','LEAVETP4',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:29'),('LVENT97','49','LEAVETP3',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:33'),('LVENT98','49','LEAVETP8',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:37'),('LVENT99','49','LEAVETP9',365,0,'2021-01-01','2021-12-31','INS->LDAGULTO->2021-10-26 11:46:40');
/*!40000 ALTER TABLE `tblleaveentitlement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblleavetype`
--

DROP TABLE IF EXISTS `tblleavetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblleavetype` (
  `LEAVE_TYPE_ID` varchar(50) NOT NULL,
  `LEAVE_NAME` varchar(100) NOT NULL,
  `NO_LEAVES` int(11) DEFAULT NULL,
  `PAID_STATUS` varchar(20) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`LEAVE_TYPE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblleavetype`
--

LOCK TABLES `tblleavetype` WRITE;
/*!40000 ALTER TABLE `tblleavetype` DISABLE KEYS */;
INSERT INTO `tblleavetype` VALUES ('LEAVETP1','Vacation Leave',5,'PAID','INS->ADMIN->2021-06-17 04:51:47'),('LEAVETP10','Mandatory Leave',365,'UNPAID','INS->LDAGULTO->2021-09-09 05:18:06'),('LEAVETP2','Sick Leave',5,'PAID','INS->ADMIN->2021-06-29 10:29:13'),('LEAVETP3','Leave Without Pay (LWOP)',365,'UNPAID','INS->LDAGULTO->2021-08-18 11:38:29'),('LEAVETP4','Special Non-Working Holiday',365,'UNPAID','INS->LDAGULTO->2021-08-25 04:42:34'),('LEAVETP5','Emergency Leave',365,'UNPAID','INS->LDAGULTO->2021-09-09 01:12:47'),('LEAVETP6','Maternity Leave',105,'UNPAID','UPD->LDAGULTO->2021-09-09 01:14:07'),('LEAVETP7','Paternity Leave',7,'PAID','INS->LDAGULTO->2021-09-09 01:13:43'),('LEAVETP8','Official Business (Paid)',365,'PAID','UPD->LDAGULTO->2021-09-09 05:15:11'),('LEAVETP9','Official Business (Unpaid)',365,'UNPAID','INS->LDAGULTO->2021-09-09 05:15:26');
/*!40000 ALTER TABLE `tblleavetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbllocation`
--

DROP TABLE IF EXISTS `tbllocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbllocation` (
  `RECORD_ID` varchar(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `LOCATION_DATE` date NOT NULL,
  `LOCATION_TIME` varchar(10) NOT NULL,
  `LATITUDE` double DEFAULT NULL,
  `LONGITUDE` double DEFAULT NULL,
  `REMARKS` varchar(500) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`RECORD_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbllocation`
--

LOCK TABLES `tbllocation` WRITE;
/*!40000 ALTER TABLE `tbllocation` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbllocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblmailconfig`
--

DROP TABLE IF EXISTS `tblmailconfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblmailconfig` (
  `MAIL_ID` int(50) NOT NULL,
  `MAIL_HOST` varchar(100) NOT NULL,
  `PORT` int(11) NOT NULL,
  `SMTP_AUTH` int(1) DEFAULT NULL,
  `SMTP_AUTO_TLS` int(1) DEFAULT NULL,
  `USERNAME` varchar(200) NOT NULL,
  `PASSWORD` varchar(200) NOT NULL,
  `MAIL_ENCRYPTION` varchar(20) DEFAULT NULL,
  `MAIL_FROM_NAME` varchar(200) DEFAULT NULL,
  `MAIL_FROM_EMAIL` varchar(200) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`MAIL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmailconfig`
--

LOCK TABLES `tblmailconfig` WRITE;
/*!40000 ALTER TABLE `tblmailconfig` DISABLE KEYS */;
INSERT INTO `tblmailconfig` VALUES (1,'smtp.gmail.com',587,1,1,'encorefinancials@gmail.com','f35cc4c177c0c4d06a93aae3','tls','Encore Notification','encorefinancials@gmail.com','UPD->LDAGULTO->2021-07-15 03:53:37');
/*!40000 ALTER TABLE `tblmailconfig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblnotificationsetting`
--

DROP TABLE IF EXISTS `tblnotificationsetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblnotificationsetting` (
  `NOTIFICATION_ID` int(50) NOT NULL,
  `NOTIFICATION` varchar(100) NOT NULL,
  `ACTIVE` int(1) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`NOTIFICATION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblnotificationsetting`
--

LOCK TABLES `tblnotificationsetting` WRITE;
/*!40000 ALTER TABLE `tblnotificationsetting` DISABLE KEYS */;
INSERT INTO `tblnotificationsetting` VALUES (1,'Leave Application For Approval',1,'UPD->ADMIN->2021-10-12 01:15:33');
/*!40000 ALTER TABLE `tblnotificationsetting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblofficeshift`
--

DROP TABLE IF EXISTS `tblofficeshift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblofficeshift` (
  `OFFICE_SHIFT_ID` int(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `DTR_DAY` int(1) DEFAULT NULL,
  `DAY_OFF` int(1) DEFAULT NULL,
  `TIME_IN` varchar(10) DEFAULT NULL,
  `TIME_OUT` varchar(10) DEFAULT NULL,
  `LATE_MARK` int(10) DEFAULT NULL,
  `START_LUNCH_BREAK` varchar(10) NOT NULL,
  `END_LUNCH_BREAK` varchar(10) NOT NULL,
  `HALF_DAY_MARK` varchar(10) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`OFFICE_SHIFT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblofficeshift`
--

LOCK TABLES `tblofficeshift` WRITE;
/*!40000 ALTER TABLE `tblofficeshift` DISABLE KEYS */;
INSERT INTO `tblofficeshift` VALUES (71,'2',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:15'),(72,'2',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:13'),(73,'2',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(74,'2',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:09'),(75,'2',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(76,'2',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(77,'2',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:03'),(78,'3',7,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:24:03'),(79,'3',6,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:24:03'),(80,'3',5,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:24:04'),(81,'3',4,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:24:04'),(82,'3',3,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:24:04'),(83,'3',2,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:24:04'),(84,'3',1,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:24:04'),(85,'4',7,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:25:27'),(86,'4',6,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:25:28'),(87,'4',5,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:25:28'),(88,'4',4,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:25:28'),(89,'4',3,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:25:28'),(90,'4',2,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:25:28'),(91,'4',1,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:25:28'),(92,'5',7,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:26:53'),(93,'5',6,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:26:53'),(94,'5',5,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:26:54'),(95,'5',4,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:26:54'),(96,'5',3,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:26:54'),(97,'5',2,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:26:54'),(98,'5',1,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:26:55'),(99,'6',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:15'),(100,'6',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:13'),(101,'6',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(102,'6',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:09'),(103,'6',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(104,'6',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(105,'6',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:03'),(106,'7',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:15'),(107,'7',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:13'),(108,'7',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(109,'7',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:09'),(110,'7',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(111,'7',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(112,'7',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:03'),(113,'8',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:16'),(114,'8',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:14'),(115,'8',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(116,'8',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:10'),(117,'8',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:08'),(118,'8',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(119,'8',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(120,'9',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:15'),(121,'9',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:14'),(122,'9',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(123,'9',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:10'),(124,'9',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:08'),(125,'9',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(126,'9',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:04'),(127,'10',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:15'),(128,'10',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:13'),(129,'10',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(130,'10',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:10'),(131,'10',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:08'),(132,'10',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(133,'10',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:04'),(134,'11',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:14'),(135,'11',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(136,'11',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(137,'11',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:08'),(138,'11',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(139,'11',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(140,'11',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:02'),(141,'12',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:14'),(142,'12',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(143,'12',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:10'),(144,'12',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:08'),(145,'12',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(146,'12',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(147,'12',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:02'),(148,'13',7,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:39:25'),(149,'13',6,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:39:25'),(150,'13',5,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:39:26'),(151,'13',4,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:39:26'),(152,'13',3,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:39:26'),(153,'13',2,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:39:26'),(154,'13',1,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:39:26'),(155,'14',7,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:40:24'),(156,'14',6,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:40:24'),(157,'14',5,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:40:24'),(158,'14',4,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:40:25'),(159,'14',3,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:40:25'),(160,'14',2,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:40:25'),(161,'14',1,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:40:25'),(162,'15',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:14'),(163,'15',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(164,'15',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:10'),(165,'15',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:08'),(166,'15',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(167,'15',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(168,'15',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:02'),(169,'16',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:15'),(170,'16',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:13'),(171,'16',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(172,'16',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:09'),(173,'16',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(174,'16',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(175,'16',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:03'),(176,'17',7,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:43:38'),(177,'17',6,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:43:38'),(178,'17',5,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:43:38'),(179,'17',4,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:43:38'),(180,'17',3,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:43:39'),(181,'17',2,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:43:39'),(182,'17',1,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:43:39'),(183,'19',7,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:45:02'),(184,'19',6,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:45:02'),(185,'19',5,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:45:02'),(186,'19',4,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:45:02'),(187,'19',3,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:45:02'),(188,'19',2,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:45:02'),(189,'19',1,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:45:02'),(190,'20',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:14'),(191,'20',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(192,'20',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:10'),(193,'20',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:08'),(194,'20',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(195,'20',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(196,'20',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:02'),(197,'21',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:16'),(198,'21',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:14'),(199,'21',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(200,'21',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:10'),(201,'21',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:08'),(202,'21',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(203,'21',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(246,'27',7,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:56:45'),(247,'27',6,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:56:45'),(248,'27',5,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:56:46'),(249,'27',4,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:56:46'),(250,'27',3,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:56:46'),(251,'27',2,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:56:46'),(252,'27',1,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 11:56:46'),(253,'28',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:15'),(254,'28',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:14'),(255,'28',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(256,'28',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:10'),(257,'28',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:08'),(258,'28',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(259,'28',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:04'),(260,'29',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:14'),(261,'29',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(262,'29',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:10'),(263,'29',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:08'),(264,'29',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(265,'29',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(266,'29',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:02'),(267,'31',7,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 12:00:39'),(268,'31',6,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 12:00:39'),(269,'31',5,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 12:00:39'),(270,'31',4,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 12:00:40'),(271,'31',3,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 12:00:40'),(272,'31',2,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 12:00:40'),(273,'31',1,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 12:00:40'),(274,'32',7,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 12:01:34'),(275,'32',6,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 12:01:34'),(276,'32',5,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 12:01:34'),(277,'32',4,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 12:01:34'),(278,'32',3,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 12:01:34'),(279,'32',2,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 12:01:34'),(280,'32',1,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 12:01:35'),(281,'33',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:15'),(282,'33',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:13'),(283,'33',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(284,'33',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:09'),(285,'33',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(286,'33',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(287,'33',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:03'),(288,'35',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:16'),(289,'35',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:14'),(290,'35',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(291,'35',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:10'),(292,'35',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:08'),(293,'35',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(294,'35',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(295,'36',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:15'),(296,'36',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:13'),(297,'36',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(298,'36',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:09'),(299,'36',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(300,'36',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(301,'36',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:03'),(302,'37',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:15'),(303,'37',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:13'),(304,'37',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(305,'37',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:10'),(306,'37',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(307,'37',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(308,'37',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:04'),(309,'38',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:14'),(310,'38',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(311,'38',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(312,'38',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:09'),(313,'38',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(314,'38',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(315,'38',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:02'),(316,'39',7,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:12:20'),(317,'39',6,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:12:20'),(318,'39',5,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:12:20'),(319,'39',4,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:12:20'),(320,'39',3,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:12:20'),(321,'39',2,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:12:20'),(322,'39',1,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:12:21'),(323,'40',7,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:13:23'),(324,'40',6,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:13:23'),(325,'40',5,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:13:23'),(326,'40',4,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:13:23'),(327,'40',3,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:13:23'),(328,'40',2,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:13:23'),(329,'40',1,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:13:23'),(330,'41',7,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:14:13'),(331,'41',6,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:14:13'),(332,'41',5,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:14:14'),(333,'41',4,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:14:14'),(334,'41',3,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:14:14'),(335,'41',2,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:14:14'),(336,'41',1,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:14:14'),(337,'42',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:15'),(338,'42',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:13'),(339,'42',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(340,'42',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:09'),(341,'42',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(342,'42',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(343,'42',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:03'),(344,'43',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:16'),(345,'43',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:14'),(346,'43',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(347,'43',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:10'),(348,'43',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:08'),(349,'43',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(350,'43',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(351,'44',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:15'),(352,'44',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(353,'44',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(354,'44',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:09'),(355,'44',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(356,'44',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(357,'44',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:03'),(358,'45',7,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:18:48'),(359,'45',6,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:18:48'),(360,'45',5,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:18:48'),(361,'45',4,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:18:48'),(362,'45',3,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:18:49'),(363,'45',2,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:18:49'),(364,'45',1,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:18:49'),(365,'46',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:15'),(366,'46',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:13'),(367,'46',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(368,'46',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:09'),(369,'46',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(370,'46',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(371,'46',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:03'),(372,'47',7,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:21:01'),(373,'47',6,1,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:21:01'),(374,'47',5,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:21:01'),(375,'47',4,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:21:01'),(376,'47',3,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:21:01'),(377,'47',2,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:21:02'),(378,'47',1,0,'08:30','17:30',1,'12:30','13:30','12:30','INS->ADMIN->2021-10-14 01:21:02'),(379,'48',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:14'),(380,'48',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(381,'48',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(382,'48',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:09'),(383,'48',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(384,'48',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(385,'48',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:03'),(386,'49',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:15'),(387,'49',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(388,'49',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(389,'49',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:09'),(390,'49',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(391,'49',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(392,'49',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:03'),(393,'50',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:14'),(394,'50',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:12'),(395,'50',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:10'),(396,'50',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:08'),(397,'50',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(398,'50',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:05'),(399,'50',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:02'),(400,'51',7,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:15'),(401,'51',6,1,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:13'),(402,'51',5,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:11'),(403,'51',4,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:09'),(404,'51',3,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:07'),(405,'51',2,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:06'),(406,'51',1,0,'08:30','17:30',1,'12:00','13:00','12:00','UPD->LDAGULTO->2021-10-29 09:44:03');
/*!40000 ALTER TABLE `tblofficeshift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblotherincometype`
--

DROP TABLE IF EXISTS `tblotherincometype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblotherincometype` (
  `OTHER_INCOME_TYPE_ID` varchar(50) NOT NULL,
  `OTHER_INCOME` varchar(200) NOT NULL,
  `TAX_TYPE` varchar(30) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`OTHER_INCOME_TYPE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblotherincometype`
--

LOCK TABLES `tblotherincometype` WRITE;
/*!40000 ALTER TABLE `tblotherincometype` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblotherincometype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblpage`
--

DROP TABLE IF EXISTS `tblpage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblpage` (
  `PAGE_ID` int(50) NOT NULL,
  `PAGE_NAME` varchar(100) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`PAGE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpage`
--

LOCK TABLES `tblpage` WRITE;
/*!40000 ALTER TABLE `tblpage` DISABLE KEYS */;
INSERT INTO `tblpage` VALUES (1,'Roles','INS->ADMIN->2021-06-04 02:17:27'),(2,'Permission','INS->ADMIN->2021-06-04 02:17:33'),(3,'System Code','INS->ADMIN->2021-06-04 02:17:38'),(4,'System Parameter','INS->ADMIN->2021-06-04 02:17:44'),(6,'Dashboard','INS->ADMIN->2021-06-04 02:26:55'),(7,'User Logs','INS->ADMIN->2021-06-04 03:43:11'),(8,'Company Settings','INS->ADMIN->2021-06-04 04:23:13'),(9,'Profile','INS->ADMIN->2021-06-09 11:43:11'),(10,'Application Settings','UPD->ADMIN->2021-06-10 11:15:45'),(11,'Employee List','INS->ADMIN->2021-06-10 02:59:15'),(12,'Department','INS->ADMIN->2021-06-10 03:11:36'),(13,'Designation','INS->ADMIN->2021-06-10 03:12:25'),(14,'Branch','INS->ADMIN->2021-06-11 02:10:44'),(15,'Holiday','INS->ADMIN->2021-06-14 03:34:32'),(16,'Leave Settings','UPD->LDAGULTO->2021-07-15 08:47:51'),(17,'Employee','INS->ADMIN->2021-06-16 09:16:45'),(18,'Leave Approval','UPD->ADMIN->2021-07-13 11:07:06'),(19,'Payroll Specification','UPD->ADMIN->2021-07-08 11:49:20'),(20,'Deduction Type','INS->ADMIN->2021-07-02 09:08:09'),(21,'Deduction Amount (Sub)','UPD->ADMIN->2021-07-06 11:03:59'),(22,'Deduction Amount (Main)','UPD->ADMIN->2021-07-06 11:03:47'),(23,'Allowance Type','INS->ADMIN->2021-07-08 10:43:17'),(24,'Other Income','INS->ADMIN->2021-07-08 10:46:25'),(25,'User Account','INS->ADMIN->2021-07-13 03:00:57'),(26,'Email Settings','INS->LDAGULTO->2021-07-15 08:47:45'),(27,'Generate Payroll','UPD->ADMIN->2021-07-16 09:40:26'),(28,'Office Shift','UPD->ADMIN->2021-07-23 03:05:50'),(29,'Payslip','UPD->LDAGULTO->2021-08-25 11:25:52'),(30,'Payroll Group','INS->LDAGULTO->2021-08-31 11:43:29'),(31,'General','INS->LDAGULTO->2021-08-31 04:13:24'),(32,'Attendance Record','UPD->LDAGULTO->2021-09-03 04:28:37'),(33,'Leave Application','INS->LDAGULTO->2021-09-06 03:13:10'),(34,'Employee Attendance Record','UPD->LDAGULTO->2021-09-07 11:59:37'),(35,'Attendance Adjustment Approval Request Page','UPD->LDAGULTO->2021-09-08 01:47:13'),(36,'Attendance Summary','INS->LDAGULTO->2021-09-09 11:14:49'),(37,'Payroll Summary','INS->LDAGULTO->2021-09-10 04:57:39'),(38,'Telephone Log','UPD->ADMIN->2021-10-13 01:19:25'),(39,'Telephone Log Approval','UPD->ADMIN->2021-10-13 01:19:37'),(40,'Document Management Settings','UPD->LDAGULTO->2021-09-15 10:52:35'),(41,'Pending Documents','INS->LDAGULTO->2021-09-21 09:47:48'),(42,'Published Documents','INS->LDAGULTO->2021-09-22 03:58:56'),(43,'Transmittal','UPD->LDAGULTO->2021-10-04 02:10:03'),(44,'Manage Suggest To Win','UPD->LDAGULTO->2021-10-07 02:46:03'),(45,'Suggest To Win Approval','INS->LDAGULTO->2021-10-06 02:20:55'),(46,'Suggest To Win Voting','INS->LDAGULTO->2021-10-06 04:55:50'),(47,'Suggest To Win Vote Summary','UPD->LDAGULTO->2021-10-08 02:47:24'),(48,'Training Room Log','UPD->ADMIN->2021-10-13 01:19:31'),(49,'Training Room Log Approval','INS->LDAGULTO->2021-10-12 09:48:42'),(50,'Email Notification Recipients','INS->ADMIN->2021-10-12 01:09:59'),(51,'Weekly Cash Flow Projection','INS->ADMIN->2021-10-15 01:46:11'),(52,'Weekly Cash Flow Particulars','INS->LDAGULTO->2021-10-15 04:39:08'),(53,'Weekly Cash Flow Projection Summary','INS->LDAGULTO->2021-10-18 10:13:33'),(54,'Ticket','UPD->ADMIN->2021-10-20 03:10:37'),(55,'Ticket Details','INS->LDAGULTO->2021-10-21 03:00:22'),(56,'Ticket Adjustment Request Approval','UPD->LDAGULTO->2021-10-25 01:11:31'),(57,'Telephone Log Summary','INS->LDAGULTO->2021-10-28 10:10:15');
/*!40000 ALTER TABLE `tblpage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblpayroll`
--

DROP TABLE IF EXISTS `tblpayroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblpayroll` (
  `PAYROLL_ID` int(11) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `PAYROLL_START_DATE` date NOT NULL,
  `PAYROLL_END_DATE` date NOT NULL,
  `STATUS` int(1) DEFAULT NULL,
  `NO_HOURS` double DEFAULT NULL,
  `GROSS` double DEFAULT NULL,
  `NET` double DEFAULT NULL,
  `DEDUCTIONS` double DEFAULT NULL,
  `WITHHOLDING_TAX` double NOT NULL,
  `LATE` double DEFAULT NULL,
  `EARLY_LEAVING` double DEFAULT NULL,
  `OVERTIME` double DEFAULT NULL,
  `ABSENT` double DEFAULT NULL,
  `ALLOWANCE` double DEFAULT NULL,
  `OTHER_INCOME` double DEFAULT NULL,
  `GENERATED_DATE` date NOT NULL,
  `GENERATED_BY` varchar(50) NOT NULL,
  `PAY_DATE` date DEFAULT NULL,
  `REVERSAL_DATE` date DEFAULT NULL,
  `REMARKS` varchar(500) DEFAULT NULL,
  `BANK_REFERENCE` varchar(50) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`PAYROLL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpayroll`
--

LOCK TABLES `tblpayroll` WRITE;
/*!40000 ALTER TABLE `tblpayroll` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblpayroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblpayrollgroup`
--

DROP TABLE IF EXISTS `tblpayrollgroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblpayrollgroup` (
  `PAYROLL_GROUP_ID` varchar(50) NOT NULL,
  `PAYROLL_GROUP_DESC` varchar(100) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`PAYROLL_GROUP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpayrollgroup`
--

LOCK TABLES `tblpayrollgroup` WRITE;
/*!40000 ALTER TABLE `tblpayrollgroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblpayrollgroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblpayrollgroupemployee`
--

DROP TABLE IF EXISTS `tblpayrollgroupemployee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblpayrollgroupemployee` (
  `PAYROLL_GROUP_ID` varchar(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpayrollgroupemployee`
--

LOCK TABLES `tblpayrollgroupemployee` WRITE;
/*!40000 ALTER TABLE `tblpayrollgroupemployee` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblpayrollgroupemployee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblpayrollspec`
--

DROP TABLE IF EXISTS `tblpayrollspec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblpayrollspec` (
  `SPEC_ID` varchar(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `SPEC_TYPE` varchar(20) NOT NULL,
  `PAYROLL_ID` int(11) DEFAULT NULL,
  `STATUS` int(1) NOT NULL,
  `CATEGORY` varchar(50) NOT NULL,
  `SPEC_AMOUNT` double NOT NULL,
  `PAYROLL_DATE` date NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`SPEC_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpayrollspec`
--

LOCK TABLES `tblpayrollspec` WRITE;
/*!40000 ALTER TABLE `tblpayrollspec` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblpayrollspec` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblpermission`
--

DROP TABLE IF EXISTS `tblpermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblpermission` (
  `PERMISSION_ID` int(50) NOT NULL,
  `PAGE_ID` int(50) NOT NULL,
  `PERMISSION_DESC` varchar(100) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`PERMISSION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpermission`
--

LOCK TABLES `tblpermission` WRITE;
/*!40000 ALTER TABLE `tblpermission` DISABLE KEYS */;
INSERT INTO `tblpermission` VALUES (1,1,'View Roles Page','UPD->ADMIN->2021-06-04 02:18:42'),(2,1,'Add Roles','INS->ADMIN->2021-06-04 02:18:52'),(3,1,'Update Roles','INS->ADMIN->2021-06-04 02:18:59'),(4,1,'Delete Roles','INS->ADMIN->2021-06-04 02:19:06'),(5,1,'Assign Permission','INS->ADMIN->2021-06-04 02:19:33'),(6,1,'Activate Role','INS->ADMIN->2021-06-04 02:19:43'),(7,1,'Deactivate Role','INS->ADMIN->2021-06-04 02:19:50'),(8,2,'View Permission Page','INS->ADMIN->2021-06-04 02:20:10'),(9,2,'Add Page','INS->ADMIN->2021-06-04 02:20:16'),(10,2,'Update Page','INS->ADMIN->2021-06-04 02:20:21'),(11,2,'Delete Page','INS->ADMIN->2021-06-04 02:20:28'),(12,2,'Add Permission','INS->ADMIN->2021-06-04 02:20:40'),(13,2,'Update Permission','INS->ADMIN->2021-06-04 02:20:46'),(14,2,'Delete Permission','INS->ADMIN->2021-06-04 02:20:56'),(15,3,'View System Code Page','INS->ADMIN->2021-06-04 02:21:23'),(16,3,'Add System Code','INS->ADMIN->2021-06-04 02:21:32'),(17,3,'Update System Code','INS->ADMIN->2021-06-04 02:21:39'),(18,3,'Delete System Code','INS->ADMIN->2021-06-04 02:21:52'),(19,4,'View System Parameter Page','INS->ADMIN->2021-06-04 02:22:08'),(20,4,'Add System Code','INS->ADMIN->2021-06-04 02:22:16'),(21,4,'Update System Parameter','INS->ADMIN->2021-06-04 02:22:24'),(22,4,'Delete System Parameter','INS->ADMIN->2021-06-04 02:22:34'),(23,6,'View Dashboard Page','INS->ADMIN->2021-06-04 02:27:14'),(24,7,'View User Logs Page','INS->ADMIN->2021-06-04 03:43:20'),(25,8,'View Company Settings Page','INS->ADMIN->2021-06-04 04:23:29'),(26,8,'Update Company Settings','UPD->ADMIN->2021-06-04 04:23:47'),(27,9,'View Profile Page','INS->ADMIN->2021-06-09 11:43:19'),(28,9,'Update Profile','INS->ADMIN->2021-06-09 11:43:29'),(29,10,'View Application Settings Page','INS->ADMIN->2021-06-10 08:43:20'),(30,10,'Update Application Settings','INS->ADMIN->2021-06-10 08:43:27'),(31,11,'View Employee List Page','INS->ADMIN->2021-06-10 02:59:23'),(32,11,'Add Employee','INS->ADMIN->2021-06-10 02:59:40'),(33,11,'Update Employee','INS->ADMIN->2021-06-10 02:59:47'),(34,11,'Delete Employee','INS->ADMIN->2021-06-10 03:00:01'),(35,12,'View Department Page','INS->ADMIN->2021-06-10 03:11:45'),(36,12,'Add Department','INS->ADMIN->2021-06-10 03:11:52'),(37,12,'Update Department','INS->ADMIN->2021-06-10 03:12:01'),(38,12,'Delete Department','INS->ADMIN->2021-06-10 03:12:07'),(39,13,'View Designation Page','INS->ADMIN->2021-06-10 03:12:35'),(40,13,'Add Designation','INS->ADMIN->2021-06-10 03:12:42'),(41,13,'Update Designation','INS->ADMIN->2021-06-10 03:12:59'),(42,13,'Delete Designation','INS->ADMIN->2021-06-10 03:13:23'),(43,14,'View Branch Page','INS->ADMIN->2021-06-11 02:11:14'),(44,14,'Add Branch','INS->ADMIN->2021-06-11 02:11:22'),(45,14,'Update Branch','INS->ADMIN->2021-06-11 02:11:31'),(46,14,'Delete Branch','INS->ADMIN->2021-06-11 02:11:43'),(47,15,'View Holiday Page','INS->ADMIN->2021-06-14 03:34:39'),(48,15,'Add Holiday','INS->ADMIN->2021-06-14 03:34:48'),(49,15,'Update Holiday','INS->ADMIN->2021-06-14 03:34:57'),(50,15,'Delete Holiday','INS->ADMIN->2021-06-14 03:35:02'),(51,16,'View Leave Settings Page','UPD->LDAGULTO->2021-07-15 08:47:58'),(52,16,'Add Leave Type','INS->ADMIN->2021-06-15 03:27:36'),(53,16,'Update Leave Type','UPD->ADMIN->2021-06-15 03:28:09'),(54,16,'Delete Leave Type','UPD->ADMIN->2021-06-15 03:28:17'),(55,17,'View Employee Page','INS->ADMIN->2021-06-16 09:17:00'),(56,17,'Add Leave Entitlement','INS->ADMIN->2021-06-17 11:58:51'),(57,17,'Update Leave Entitlement','INS->ADMIN->2021-06-17 11:59:06'),(58,17,'Delete Leave Entitlement','INS->ADMIN->2021-06-17 11:59:18'),(59,17,'Add Employee Leave','INS->ADMIN->2021-06-17 01:10:18'),(60,17,'Update Employee Leave','INS->ADMIN->2021-06-17 01:11:22'),(61,17,'Delete Employee Leave','INS->ADMIN->2021-06-17 01:11:43'),(62,17,'Add Document','INS->ADMIN->2021-06-24 04:37:33'),(63,17,'Delete Document','INS->ADMIN->2021-06-24 04:37:45'),(64,17,'View Document','INS->ADMIN->2021-06-24 04:38:17'),(65,18,'View Leaves Page','INS->ADMIN->2021-06-25 02:42:39'),(66,18,'Approve Leave','INS->ADMIN->2021-06-25 02:42:51'),(67,18,'Reject Leave','UPD->ADMIN->2021-06-25 02:43:17'),(68,6,'Record Attendance','INS->ADMIN->2021-06-28 10:01:00'),(69,6,'Scan QR Code Attendance','INS->ADMIN->2021-06-30 11:17:21'),(70,17,'Add Employee Attendance Log','UPD->ADMIN->2021-07-01 11:34:46'),(71,17,'Update Employee Attendance Log','UPD->ADMIN->2021-07-01 11:34:54'),(72,17,'Delete Employee Attendance Log','UPD->ADMIN->2021-07-01 11:34:36'),(73,19,'View Payroll Specification Page','UPD->ADMIN->2021-07-08 11:49:27'),(74,19,'Add Payroll Specification','UPD->ADMIN->2021-07-08 11:49:35'),(75,19,'Update Payroll Specification','UPD->ADMIN->2021-07-08 11:49:40'),(76,19,'Delete Payroll Specification','UPD->ADMIN->2021-07-08 11:49:45'),(77,20,'View Deduction Type','INS->ADMIN->2021-07-02 09:08:20'),(78,20,'Add Deduction Type','INS->ADMIN->2021-07-02 09:08:26'),(79,20,'Update Deduction Type','INS->ADMIN->2021-07-02 09:08:33'),(80,20,'Delete Deduction Type','INS->ADMIN->2021-07-02 09:08:42'),(81,21,'View Deduction Amount Page','INS->ADMIN->2021-07-05 10:32:54'),(82,21,'Add Deduction Amount','INS->ADMIN->2021-07-05 10:33:02'),(83,21,'Update Deduction Amount','INS->ADMIN->2021-07-05 10:33:09'),(84,21,'Delete Deduction Amount','INS->ADMIN->2021-07-05 10:33:14'),(85,21,'Import Deduction Amount','INS->ADMIN->2021-07-06 09:50:09'),(86,22,'View Deduction Amount Page','UPD->ADMIN->2021-07-06 11:03:40'),(87,22,'Add Deduction Amount','UPD->ADMIN->2021-07-06 11:01:19'),(88,22,'Update Deduction Amount','INS->ADMIN->2021-07-06 11:01:31'),(89,22,'Delete Deduction Amount','INS->ADMIN->2021-07-06 11:01:42'),(90,22,'Import Deduction Amount','INS->ADMIN->2021-07-06 11:01:54'),(91,23,'View Allowance Type Page','INS->ADMIN->2021-07-08 10:43:27'),(92,23,'Add Allowance Type','INS->ADMIN->2021-07-08 10:43:37'),(93,23,'Update Allowance Type','INS->ADMIN->2021-07-08 10:45:33'),(94,23,'Delete Allowance Type','INS->ADMIN->2021-07-08 10:45:40'),(95,24,'View Other Income Page','INS->ADMIN->2021-07-08 10:46:34'),(96,24,'Add Other Income','INS->ADMIN->2021-07-08 10:46:44'),(97,24,'Update Other Income','INS->ADMIN->2021-07-08 10:46:59'),(98,24,'Delete Other Income','INS->ADMIN->2021-07-08 10:47:08'),(99,17,'Approve Employee Leave','UPD->ADMIN->2021-07-13 10:02:45'),(100,17,'Reject Employee Leave','UPD->ADMIN->2021-07-13 10:02:55'),(101,17,'Cancel Employee Leave','UPD->ADMIN->2021-07-13 10:03:04'),(102,18,'Cancel Leave','INS->ADMIN->2021-07-13 11:07:20'),(103,18,'View All Pending Leaves','INS->ADMIN->2021-07-13 01:55:12'),(104,25,'View User Account Page','INS->ADMIN->2021-07-13 03:13:04'),(105,25,'Add User Account','INS->ADMIN->2021-07-13 03:13:11'),(106,25,'Update User Account','INS->ADMIN->2021-07-13 03:13:20'),(107,25,'Lock User Account','INS->ADMIN->2021-07-13 03:13:32'),(108,25,'Unlock User Account','INS->ADMIN->2021-07-13 03:13:41'),(109,25,'Activate User Account','INS->ADMIN->2021-07-13 03:13:54'),(110,25,'Deactivate User Account','UPD->ADMIN->2021-07-13 03:14:18'),(111,6,'Get Location','INS->LDAGULTO->2021-07-14 04:37:57'),(112,26,'View Email Settings Page','INS->LDAGULTO->2021-07-15 08:48:31'),(113,26,'Add Email Notification Setting','INS->LDAGULTO->2021-07-15 08:57:40'),(114,26,'Update Email Notification Setting','UPD->LDAGULTO->2021-07-15 08:59:41'),(115,26,'Delete Email Notification Setting','UPD->LDAGULTO->2021-07-15 08:59:46'),(116,26,'Activate Email Notification Setting','INS->LDAGULTO->2021-07-15 08:59:33'),(117,26,'Deactivate Email Notification Setting','INS->LDAGULTO->2021-07-15 09:00:12'),(118,26,'Update Mail Configuration','INS->LDAGULTO->2021-07-15 11:46:36'),(119,27,'View Generate Payroll Page','UPD->ADMIN->2021-07-16 09:40:33'),(120,27,'Generate Payroll','UPD->ADMIN->2021-07-16 09:40:39'),(121,27,'Reverse Payroll','UPD->LDAGULTO->2021-08-24 01:17:25'),(122,27,'Pay Payroll','INS->ADMIN->2021-07-21 03:27:49'),(123,29,'View Payslip Page','UPD->LDAGULTO->2021-08-25 11:26:21'),(124,28,'View Office Shift Page','UPD->ADMIN->2021-07-23 11:18:09'),(125,28,'Add Office Shift','UPD->ADMIN->2021-07-23 11:18:19'),(126,28,'Update Office Shift','UPD->ADMIN->2021-07-23 11:18:28'),(127,29,'View Own Payslip','INS->LDAGULTO->2021-08-25 11:27:11'),(128,29,'Print Payslip','INS->LDAGULTO->2021-08-25 11:27:18'),(129,30,'View Payroll Group Page','INS->LDAGULTO->2021-08-31 11:43:41'),(130,30,'Add Payroll Group','INS->LDAGULTO->2021-08-31 11:43:50'),(131,30,'Update Payroll Group','INS->LDAGULTO->2021-08-31 11:43:59'),(132,30,'Delete Payroll Group','INS->LDAGULTO->2021-08-31 11:44:11'),(133,30,'Assign Employee','INS->LDAGULTO->2021-08-31 11:44:41'),(134,30,'Unassign Employee','INS->LDAGULTO->2021-08-31 03:02:00'),(135,31,'Backup Database','INS->LDAGULTO->2021-08-31 04:13:34'),(136,32,'View Attendance Record Page','UPD->LDAGULTO->2021-09-03 05:21:13'),(137,32,'Add Attendance Record','UPD->LDAGULTO->2021-09-03 04:31:21'),(138,32,'Update Attendance Record','INS->LDAGULTO->2021-09-03 04:31:38'),(139,32,'Delete Attendance Record','INS->LDAGULTO->2021-09-03 04:31:50'),(140,32,'Import Attendance Record','INS->LDAGULTO->2021-09-03 04:32:01'),(141,19,'Import Payroll Specification','INS->LDAGULTO->2021-09-06 01:31:18'),(142,33,'View Leave Application Page','UPD->LDAGULTO->2021-09-06 03:13:31'),(143,33,'Apply Leave','INS->LDAGULTO->2021-09-06 03:14:58'),(144,33,'Update Leave','INS->LDAGULTO->2021-09-06 03:16:00'),(145,33,'Cancel Leave','INS->LDAGULTO->2021-09-06 03:16:08'),(146,34,'View Employee Attendance Record Page','UPD->LDAGULTO->2021-09-07 11:59:59'),(147,34,'Request Employee Attendance Record Adjustment','INS->LDAGULTO->2021-09-07 02:29:22'),(148,34,'Update Employee Attendance Adjustment Request','INS->LDAGULTO->2021-09-08 10:48:07'),(149,34,'Delete Employee Attendance Adjustment Request','UPD->LDAGULTO->2021-09-08 11:45:25'),(150,34,'Cancel Employee Attendance Adjustment Request','INS->LDAGULTO->2021-09-08 11:45:32'),(151,35,'View Attendance Adjustment Request Approval Page','UPD->LDAGULTO->2021-09-08 01:47:25'),(152,35,'Approve Attendance Adjustment Request','UPD->LDAGULTO->2021-09-08 01:47:40'),(153,35,'Reject Attendance Adjustment Request','UPD->LDAGULTO->2021-09-08 01:47:49'),(154,35,'Delete Attendance Adjustment Request','UPD->LDAGULTO->2021-09-08 01:47:55'),(155,35,'Cancel Attendance Adjustment Request','INS->LDAGULTO->2021-09-08 01:47:04'),(156,36,'View Attendance Summary Page','INS->LDAGULTO->2021-09-09 11:15:01'),(157,37,'View Payroll Summary Page','INS->LDAGULTO->2021-09-10 04:57:50'),(158,36,'Export Attendance Summary','INS->LDAGULTO->2021-09-13 10:53:38'),(159,37,'Export Payroll Summary','INS->LDAGULTO->2021-09-13 10:53:48'),(160,38,'View Telephone Log Page','UPD->ADMIN->2021-10-13 01:19:44'),(161,38,'Add Telephone Log','INS->LDAGULTO->2021-09-13 11:15:29'),(162,38,'Update Telephone Log','INS->LDAGULTO->2021-09-13 11:15:40'),(163,38,'Delete Telephone Log','INS->LDAGULTO->2021-09-13 11:15:47'),(164,38,'Cancel Telephone Log','INS->LDAGULTO->2021-09-13 11:16:49'),(165,38,'Tag As Consumed Telephone Log','UPD->LDAGULTO->2021-09-13 02:48:57'),(166,38,'Tag As Not Consumed Telephone Log','INS->LDAGULTO->2021-09-13 02:49:05'),(167,39,'View Telephone Log Approval Page','UPD->ADMIN->2021-10-13 01:19:51'),(168,39,'View All Pending Telephone Log','UPD->LDAGULTO->2021-09-13 03:53:34'),(169,39,'Approve Telephone Log','UPD->LDAGULTO->2021-09-13 03:53:49'),(170,39,'Reject Telephone Log','UPD->LDAGULTO->2021-09-13 03:53:56'),(171,39,'Cancel Telephone Log','INS->LDAGULTO->2021-09-13 03:54:12'),(172,40,'View Document Management Settings Page','UPD->LDAGULTO->2021-09-15 10:52:50'),(173,40,'Update Document Management Settings','UPD->LDAGULTO->2021-09-15 10:53:06'),(174,40,'Add Document Authorizer','UPD->LDAGULTO->2021-09-15 03:21:24'),(175,40,'Delete Document Authorizer','INS->LDAGULTO->2021-09-15 03:21:42'),(176,41,'View Pending Documents Page','INS->LDAGULTO->2021-09-21 09:47:59'),(177,41,'View All Pending Document','UPD->LDAGULTO->2021-09-21 10:32:12'),(178,41,'Add Document','INS->LDAGULTO->2021-09-21 10:32:28'),(179,41,'Update Document','INS->LDAGULTO->2021-09-21 01:56:42'),(180,41,'Delete Document','INS->LDAGULTO->2021-09-21 03:34:12'),(181,41,'Publish Document','INS->LDAGULTO->2021-09-21 04:10:53'),(182,41,'Assign Permission to Department','INS->LDAGULTO->2021-09-21 04:56:11'),(183,41,'Assign Permission To Employee','INS->LDAGULTO->2021-09-22 01:49:17'),(184,42,'View Published Documents Page','INS->LDAGULTO->2021-09-22 03:59:14'),(185,42,'View All Documents','INS->LDAGULTO->2021-09-23 10:43:20'),(186,42,'Publish Document','UPD->LDAGULTO->2021-09-23 04:39:42'),(187,42,'Unpublish Document','UPD->LDAGULTO->2021-09-23 04:39:52'),(188,1,'Assign User To Role','UPD->LDAGULTO->2021-10-04 11:21:33'),(189,43,'View Transmittal Page','INS->LDAGULTO->2021-10-04 02:10:16'),(190,43,'Add Transmittal','INS->LDAGULTO->2021-10-04 02:26:28'),(191,43,'Update Transmittal','INS->LDAGULTO->2021-10-04 02:26:38'),(192,43,'Delete Transmittal','INS->LDAGULTO->2021-10-04 02:26:44'),(193,43,'Received Transmittal','INS->LDAGULTO->2021-10-04 02:26:59'),(194,43,'Re-Transmit Transmittal','INS->LDAGULTO->2021-10-04 02:27:23'),(195,43,'File Transmittal','INS->LDAGULTO->2021-10-04 02:27:41'),(196,43,'Cancel Transmittal','INS->LDAGULTO->2021-10-04 02:27:54'),(197,43,'View Transmittal History','INS->LDAGULTO->2021-10-05 01:59:19'),(198,43,'View All Transmittal','INS->LDAGULTO->2021-10-05 01:59:31'),(199,44,'View Manage Suggest To Win Page','UPD->LDAGULTO->2021-10-07 02:46:20'),(200,44,'Add Suggest To Win','INS->LDAGULTO->2021-10-06 08:39:04'),(201,44,'Update Suggest To Win','INS->LDAGULTO->2021-10-06 10:00:48'),(202,44,'Delete Suggest To Win','INS->LDAGULTO->2021-10-06 10:01:00'),(203,44,'View All Department Suggestions','UPD->LDAGULTO->2021-10-06 10:15:03'),(204,44,'View All Suggestions','INS->LDAGULTO->2021-10-06 10:14:59'),(205,44,'Cancel Suggest To Win','INS->LDAGULTO->2021-10-06 02:05:29'),(206,45,'View Suggest To Win Approval Page','INS->LDAGULTO->2021-10-06 02:28:48'),(207,45,'Approve Suggest To Win','INS->LDAGULTO->2021-10-06 03:24:09'),(208,45,'Reject Suggest To Win','INS->LDAGULTO->2021-10-06 03:24:20'),(209,45,'Cancel Suggest To Win','INS->LDAGULTO->2021-10-06 03:24:29'),(210,46,'View Suggest To Win Voting Page','UPD->LDAGULTO->2021-10-07 01:05:38'),(211,46,'Vote Suggest To Win','INS->LDAGULTO->2021-10-08 11:01:49'),(212,44,'Adjust Vote End Date','INS->LDAGULTO->2021-10-08 01:38:32'),(213,47,'View Suggest To Win Vote Summary Page','UPD->LDAGULTO->2021-10-08 02:47:32'),(214,47,'View Suggest To Win Votes','INS->LDAGULTO->2021-10-08 02:36:27'),(215,43,'Import Transmittal','INS->LDAGULTO->2021-10-11 09:41:37'),(216,43,'Import Transmittal History','INS->LDAGULTO->2021-10-11 10:18:10'),(217,42,'Import Documents','INS->LDAGULTO->2021-10-11 01:03:39'),(218,42,'Import Department Document Permission','UPD->LDAGULTO->2021-10-11 02:00:58'),(219,42,'Import Employee Document Permission','UPD->LDAGULTO->2021-10-11 02:02:44'),(220,48,'View Training Room Log Page','UPD->ADMIN->2021-10-13 01:20:00'),(221,48,'Add Training Room Log','UPD->LDAGULTO->2021-10-11 02:36:58'),(222,48,'Update Training Room Log','INS->LDAGULTO->2021-10-11 02:37:09'),(223,48,'Delete Training Room Log','INS->LDAGULTO->2021-10-11 02:37:22'),(224,48,'Cancel Training Room Log','INS->LDAGULTO->2021-10-11 03:33:04'),(225,49,'View Training Room Log Approval Page','INS->LDAGULTO->2021-10-12 09:48:56'),(226,49,'Approve Training Room Log','INS->LDAGULTO->2021-10-12 09:49:27'),(227,49,'Reject Training Room Log','INS->LDAGULTO->2021-10-12 09:49:37'),(228,49,'Cancel Training Room Log','INS->LDAGULTO->2021-10-12 09:49:54'),(229,50,'View Email Notification Recipients Page','INS->ADMIN->2021-10-12 01:10:08'),(230,50,'Add Email Notification Recipients','INS->ADMIN->2021-10-12 01:10:19'),(231,50,'Update Email Notification Recipients','INS->ADMIN->2021-10-12 01:10:24'),(232,50,'Delete Email Notification Recipients','INS->ADMIN->2021-10-12 01:10:39'),(233,51,'View Weekly Cash Flow Projection Page','UPD->ADMIN->2021-10-15 01:46:29'),(234,51,'Add Weekly Cash Flow Projection','INS->ADMIN->2021-10-15 01:47:26'),(235,51,'Update Weekly Cash Flow Projection','INS->ADMIN->2021-10-15 01:47:38'),(236,51,'Delete Weekly Cash Flow Projection','INS->ADMIN->2021-10-15 01:47:49'),(237,51,'View All Weekly Cash Flow Projection','INS->ADMIN->2021-10-15 02:37:22'),(238,51,'Approve Weekly Cash Flow Projection','INS->ADMIN->2021-10-15 02:45:27'),(239,51,'Lock Weekly Cash Flow Projection','INS->ADMIN->2021-10-15 02:45:41'),(240,51,'Unlock Weekly Cash Flow Projection','INS->ADMIN->2021-10-15 02:45:51'),(241,51,'Update Approved Weekly Cash Flow Projection','INS->ADMIN->2021-10-15 02:48:26'),(242,52,'View Weekly Cash Flow Particulars','INS->LDAGULTO->2021-10-15 04:39:28'),(243,52,'Add Weekly Cash Flow Particulars','INS->LDAGULTO->2021-10-15 04:41:17'),(244,52,'Update Weekly Cash Flow Particulars','INS->LDAGULTO->2021-10-15 04:41:30'),(245,52,'Delete Weekly Cash Flow Particulars','INS->LDAGULTO->2021-10-15 04:41:44'),(246,53,'View Weekly Cash Flow Projection Summary','INS->LDAGULTO->2021-10-18 10:13:57'),(247,54,'View Ticket Page','UPD->ADMIN->2021-10-20 03:10:44'),(248,54,'Add Ticket','INS->LDAGULTO->2021-10-18 04:30:56'),(249,54,'Update Ticket','INS->LDAGULTO->2021-10-19 10:29:18'),(250,54,'Delete Ticket','UPD->LDAGULTO->2021-10-19 11:08:13'),(251,54,'View All Ticket','INS->LDAGULTO->2021-10-19 11:08:27'),(252,54,'View All Department Ticket','UPD->LDAGULTO->2021-10-20 04:20:19'),(253,54,'Accept Ticket','INS->LDAGULTO->2021-10-20 04:21:59'),(254,54,'Reject Ticket','INS->LDAGULTO->2021-10-20 04:22:20'),(255,54,'Cancel Ticket','INS->LDAGULTO->2021-10-20 04:22:27'),(256,54,'Tag Ticket As Solved','INS->LDAGULTO->2021-10-20 04:22:57'),(257,54,'Tag Ticket As Closed','INS->LDAGULTO->2021-10-20 04:23:05'),(258,54,'Tag Ticket As Unsolved','INS->LDAGULTO->2021-10-20 04:23:19'),(259,55,'View Ticket Details Page','UPD->LDAGULTO->2021-10-25 08:07:46'),(260,55,'Update Ticket','UPD->LDAGULTO->2021-10-25 07:59:29'),(261,55,'Accept Ticket','UPD->LDAGULTO->2021-10-25 07:59:40'),(262,55,'Reject Ticket','UPD->LDAGULTO->2021-10-25 07:59:52'),(263,55,'Cancel Ticket','UPD->LDAGULTO->2021-10-25 08:00:03'),(264,55,'Tag Ticket As Solved','UPD->LDAGULTO->2021-10-25 08:00:11'),(265,55,'	Tag Ticket As Closed','UPD->LDAGULTO->2021-10-25 08:00:18'),(266,55,'	Tag Ticket As Unsolved','UPD->LDAGULTO->2021-10-25 08:00:36'),(267,55,'Add Ticket Note','UPD->LDAGULTO->2021-10-25 08:01:52'),(268,55,'Delete Ticket Note','UPD->LDAGULTO->2021-10-25 08:02:01'),(269,55,'Add Ticket Attachment','UPD->LDAGULTO->2021-10-25 08:02:13'),(270,55,'Delete Ticket Attachment','UPD->LDAGULTO->2021-10-25 08:02:20'),(271,55,'Add Ticket Adjustment Request','UPD->LDAGULTO->2021-10-25 08:02:38'),(272,55,'Update Ticket Adjustment Request','UPD->LDAGULTO->2021-10-25 08:02:48'),(273,55,'Delete Ticket Adjustment Request','INS->LDAGULTO->2021-10-25 08:03:04'),(274,55,'Cancel Ticket Adjustment Request','UPD->LDAGULTO->2021-10-25 01:10:32'),(275,56,'View Ticket Adjustment Request Approval Page','UPD->LDAGULTO->2021-10-25 01:11:58'),(276,56,'Approve Ticket Adjustment Request','UPD->LDAGULTO->2021-10-25 01:12:25'),(277,56,'Reject Ticket Adjustment Request','UPD->LDAGULTO->2021-10-25 01:12:30'),(278,56,'Cancel Ticket Adjustment Request','INS->LDAGULTO->2021-10-25 01:12:40'),(279,56,'View All Pending Ticket Adjustment Request','INS->LDAGULTO->2021-10-25 01:23:28'),(280,57,'View Telephone Log Summary Page','UPD->LDAGULTO->2021-10-28 10:12:38'),(281,57,'View All Consumed Telephone Log','INS->LDAGULTO->2021-10-28 10:27:06');
/*!40000 ALTER TABLE `tblpermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblrole`
--

DROP TABLE IF EXISTS `tblrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblrole` (
  `ROLE_ID` varchar(50) NOT NULL,
  `ROLE_DESC` varchar(100) NOT NULL,
  `ACTIVE` int(1) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblrole`
--

LOCK TABLES `tblrole` WRITE;
/*!40000 ALTER TABLE `tblrole` DISABLE KEYS */;
INSERT INTO `tblrole` VALUES ('ROLE1','Administrator',1,'UPD->ADMIN->2021-06-15 10:04:40'),('ROLE2','Human Resource',1,'UPD->ADMIN->2021-07-12 09:03:02'),('ROLE3','Employee',1,'UPD->ADMIN->2021-07-12 09:05:57'),('ROLE4','Guard',1,'UPD->ADMIN->2021-07-12 09:51:35'),('ROLE5','Department Head',1,'UPD->ADMIN->2021-10-14 05:09:31'),('ROLE6','Finance',1,'UPD->ADMIN->2021-10-15 03:13:42');
/*!40000 ALTER TABLE `tblrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblrolepermission`
--

DROP TABLE IF EXISTS `tblrolepermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblrolepermission` (
  `ROLE_ID` varchar(50) NOT NULL,
  `PERMISSION_ID` int(20) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblrolepermission`
--

LOCK TABLES `tblrolepermission` WRITE;
/*!40000 ALTER TABLE `tblrolepermission` DISABLE KEYS */;
INSERT INTO `tblrolepermission` VALUES ('ROLE4',69,'INS->ADMIN->2021-07-12 09:51:45'),('ROLE4',23,'INS->ADMIN->2021-07-12 09:51:45'),('ROLE2',92,'INS->ADMIN->2021-10-14 05:14:48'),('ROLE2',93,'INS->ADMIN->2021-10-14 05:14:48'),('ROLE2',91,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',152,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',155,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',153,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',151,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',137,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',138,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',136,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',158,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',156,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',44,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',45,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',43,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',68,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',23,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',87,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',90,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',88,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',86,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',82,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',85,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',83,'INS->ADMIN->2021-10-14 05:14:49'),('ROLE2',81,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',78,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',79,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',77,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',36,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',37,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',35,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',40,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',41,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',39,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',62,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',70,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',59,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',56,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',71,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',60,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',57,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',64,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',55,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',32,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',33,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',31,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',48,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',49,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',47,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',66,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',67,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',65,'INS->ADMIN->2021-10-14 05:14:50'),('ROLE2',125,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',126,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',124,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',96,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',97,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',95,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',130,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',133,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',132,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',134,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',131,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',129,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',74,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',75,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',73,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',159,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',157,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',128,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',123,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',28,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',27,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',226,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',228,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',227,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE2',225,'INS->ADMIN->2021-10-14 05:14:51'),('ROLE5',152,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',155,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',153,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',151,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',200,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',205,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',201,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',203,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',199,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',207,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',209,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',208,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',206,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',210,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',211,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',169,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',171,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',170,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',167,'INS->LDAGULTO->2021-10-15 04:46:36'),('ROLE5',245,'INS->LDAGULTO->2021-10-15 04:46:37'),('ROLE5',236,'INS->LDAGULTO->2021-10-15 04:46:37'),('ROLE6',239,'INS->LDAGULTO->2021-10-18 10:14:30'),('ROLE6',240,'INS->LDAGULTO->2021-10-18 10:14:30'),('ROLE6',241,'INS->LDAGULTO->2021-10-18 10:14:30'),('ROLE6',237,'INS->LDAGULTO->2021-10-18 10:14:30'),('ROLE6',233,'INS->LDAGULTO->2021-10-18 10:14:30'),('ROLE6',246,'INS->LDAGULTO->2021-10-18 10:14:30'),('ROLE3',111,'INS->ADMIN->2021-10-19 02:40:29'),('ROLE3',68,'INS->ADMIN->2021-10-19 02:40:29'),('ROLE3',23,'INS->ADMIN->2021-10-19 02:40:29'),('ROLE3',150,'INS->ADMIN->2021-10-19 02:40:29'),('ROLE3',147,'INS->ADMIN->2021-10-19 02:40:29'),('ROLE3',148,'INS->ADMIN->2021-10-19 02:40:29'),('ROLE3',146,'INS->ADMIN->2021-10-19 02:40:29'),('ROLE3',143,'INS->ADMIN->2021-10-19 02:40:29'),('ROLE3',145,'INS->ADMIN->2021-10-19 02:40:29'),('ROLE3',144,'INS->ADMIN->2021-10-19 02:40:29'),('ROLE3',142,'INS->ADMIN->2021-10-19 02:40:29'),('ROLE3',200,'INS->ADMIN->2021-10-19 02:40:29'),('ROLE3',205,'INS->ADMIN->2021-10-19 02:40:29'),('ROLE3',201,'INS->ADMIN->2021-10-19 02:40:29'),('ROLE3',199,'INS->ADMIN->2021-10-19 02:40:29'),('ROLE3',178,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',182,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',183,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',179,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',176,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',28,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',27,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',184,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',161,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',164,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',165,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',166,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',162,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',160,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',221,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',224,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',222,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',220,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',190,'INS->ADMIN->2021-10-19 02:40:30'),('ROLE3',196,'INS->ADMIN->2021-10-19 02:40:31'),('ROLE3',195,'INS->ADMIN->2021-10-19 02:40:31'),('ROLE3',194,'INS->ADMIN->2021-10-19 02:40:31'),('ROLE3',193,'INS->ADMIN->2021-10-19 02:40:31'),('ROLE3',191,'INS->ADMIN->2021-10-19 02:40:31'),('ROLE3',197,'INS->ADMIN->2021-10-19 02:40:31'),('ROLE3',189,'INS->ADMIN->2021-10-19 02:40:31'),('ROLE3',243,'INS->ADMIN->2021-10-19 02:40:31'),('ROLE3',244,'INS->ADMIN->2021-10-19 02:40:31'),('ROLE3',242,'INS->ADMIN->2021-10-19 02:40:31'),('ROLE3',234,'INS->ADMIN->2021-10-19 02:40:31'),('ROLE3',235,'INS->ADMIN->2021-10-19 02:40:31'),('ROLE3',233,'INS->ADMIN->2021-10-19 02:40:31'),('ROLE1',92,'INS->LDAGULTO->2021-10-28 10:12:50'),('ROLE1',94,'INS->LDAGULTO->2021-10-28 10:12:50'),('ROLE1',93,'INS->LDAGULTO->2021-10-28 10:12:50'),('ROLE1',91,'INS->LDAGULTO->2021-10-28 10:12:50'),('ROLE1',30,'INS->LDAGULTO->2021-10-28 10:12:50'),('ROLE1',29,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',152,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',155,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',154,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',153,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',151,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',137,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',139,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',140,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',138,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',136,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',158,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',156,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',44,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',46,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',45,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',43,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',26,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',25,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',111,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',68,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',69,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',23,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',87,'INS->LDAGULTO->2021-10-28 10:12:51'),('ROLE1',89,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',90,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',88,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',86,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',82,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',84,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',85,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',83,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',81,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',78,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',80,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',79,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',77,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',36,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',38,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',37,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',35,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',40,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',42,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',41,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',39,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',174,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',175,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',173,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',172,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',230,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',232,'INS->LDAGULTO->2021-10-28 10:12:52'),('ROLE1',231,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',229,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',116,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',113,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',117,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',115,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',114,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',118,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',112,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',62,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',70,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',59,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',56,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',99,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',101,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',63,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',72,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',61,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',58,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',100,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',71,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',60,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',57,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',64,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',55,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',150,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',149,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',147,'INS->LDAGULTO->2021-10-28 10:12:53'),('ROLE1',148,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',146,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',32,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',34,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',33,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',31,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',135,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',120,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',122,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',121,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',119,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',48,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',50,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',49,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',47,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',143,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',145,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',144,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',142,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',66,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',102,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',67,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',103,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',65,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',52,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',54,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',53,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',51,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',200,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',212,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',205,'INS->LDAGULTO->2021-10-28 10:12:54'),('ROLE1',202,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',201,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',204,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',199,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',125,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',126,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',124,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',96,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',98,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',97,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',95,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',130,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',133,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',132,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',134,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',131,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',129,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',74,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',76,'INS->LDAGULTO->2021-10-28 10:12:55'),('ROLE1',141,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',75,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',73,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',159,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',157,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',128,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',127,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',123,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',178,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',182,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',183,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',180,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',181,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',179,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',177,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',176,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',9,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',12,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',11,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',14,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',10,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',13,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',8,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',28,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',27,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',218,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',217,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',219,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',186,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',187,'INS->LDAGULTO->2021-10-28 10:12:56'),('ROLE1',185,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',184,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',6,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',2,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',5,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',188,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',7,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',4,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',3,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',1,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',207,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',209,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',208,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',206,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',213,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',214,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',210,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',211,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',16,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',18,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',17,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',15,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',20,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',22,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',21,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',19,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',161,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',164,'INS->LDAGULTO->2021-10-28 10:12:57'),('ROLE1',163,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',165,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',166,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',162,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',160,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',169,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',171,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',170,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',168,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',167,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',280,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',253,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',248,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',255,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',250,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',254,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',257,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',256,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',258,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',249,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',251,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',247,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',276,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',278,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',277,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',279,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',275,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',265,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',266,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',261,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',271,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',269,'INS->LDAGULTO->2021-10-28 10:12:58'),('ROLE1',267,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',263,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',274,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',273,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',270,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',268,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',262,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',264,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',260,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',272,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',259,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',221,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',224,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',223,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',222,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',220,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',226,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',228,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',227,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',225,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',190,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',196,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',192,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',195,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',215,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',216,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',194,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',193,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',191,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',198,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',197,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',189,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',109,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',105,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',110,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',107,'INS->LDAGULTO->2021-10-28 10:12:59'),('ROLE1',108,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',106,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',104,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',24,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',243,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',245,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',244,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',242,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',234,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',238,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',236,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',239,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',240,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',241,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',235,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',237,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',233,'INS->LDAGULTO->2021-10-28 10:13:00'),('ROLE1',246,'INS->LDAGULTO->2021-10-28 10:13:00');
/*!40000 ALTER TABLE `tblrolepermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblroleuser`
--

DROP TABLE IF EXISTS `tblroleuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblroleuser` (
  `ROLE_ID` varchar(50) NOT NULL,
  `USERNAME` varchar(50) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblroleuser`
--

LOCK TABLES `tblroleuser` WRITE;
/*!40000 ALTER TABLE `tblroleuser` DISABLE KEYS */;
INSERT INTO `tblroleuser` VALUES ('ROLE2','ADELAFUENTE','INS->ADMIN->2021-10-14 05:05:27'),('ROLE5','MAGARSULA','INS->ADMIN->2021-10-14 05:09:50'),('ROLE5','ACADIZ','INS->ADMIN->2021-10-14 05:09:50'),('ROLE5','ADELAFUENTE','INS->ADMIN->2021-10-14 05:09:50'),('ROLE5','ALRIVERA','INS->ADMIN->2021-10-14 05:09:50'),('ROLE5','SDLIM','INS->ADMIN->2021-10-14 05:09:50'),('ROLE5','LPUNSALAN','INS->ADMIN->2021-10-14 05:09:50'),('ROLE5','MSONIGA','INS->ADMIN->2021-10-14 05:09:50'),('ROLE6','ACADIZ','INS->ADMIN->2021-10-15 03:14:44'),('ROLE6','KSVILLAR','INS->ADMIN->2021-10-15 03:14:45'),('ROLE6','NRGUTIERREZ','INS->ADMIN->2021-10-15 03:14:45'),('ROLE6','NCSANPEDRO','INS->ADMIN->2021-10-15 03:14:45'),('ROLE1','GTBONITA','INS->ADMIN->2021-10-26 01:04:17'),('ROLE1','LDAGULTO','INS->ADMIN->2021-10-26 01:04:17'),('ROLE1','LVMICAYAS','INS->ADMIN->2021-10-26 01:04:17'),('ROLE3','ABJUANANI','INS->LDAGULTO->2021-10-26 01:15:56'),('ROLE3','ADDUCLAYAN','INS->LDAGULTO->2021-10-26 01:15:56'),('ROLE3','CAGUILAR','INS->LDAGULTO->2021-10-26 01:15:56'),('ROLE3','JYYALUNG','INS->LDAGULTO->2021-10-26 01:15:56'),('ROLE3','LPAMADORA','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','MAGARSULA','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','RFDELACRUZII','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','GTBONITA','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','LDAGULTO','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','LVMICAYAS','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','JCADIZJR','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','MKCADIZ','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','ACADIZ','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','KSVILLAR','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','NRGUTIERREZ','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','NCSANPEDRO','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','ADELAFUENTE','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','ALRIVERA','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','CBPALO','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','PBLORENZO','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','SDLIM','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','CSRIVERA','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','CRONQUILLO','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','FCARREON','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','HPMESINA','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','LPUNSALAN','INS->LDAGULTO->2021-10-26 01:15:57'),('ROLE3','MSONIGA','INS->LDAGULTO->2021-10-26 01:15:58');
/*!40000 ALTER TABLE `tblroleuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblstw`
--

DROP TABLE IF EXISTS `tblstw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblstw` (
  `STW_ID` varchar(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `STATUS` int(1) DEFAULT NULL,
  `FILE_PATH` varchar(500) DEFAULT NULL,
  `TITLE` varchar(100) NOT NULL,
  `DESCRIPTION` varchar(200) NOT NULL,
  `REASON` varchar(500) NOT NULL,
  `BENEFITS` varchar(1000) NOT NULL,
  `POST_DATE` date DEFAULT NULL,
  `POST_TIME` varchar(10) DEFAULT NULL,
  `DECISION_DATE` date DEFAULT NULL,
  `DECISION_TIME` varchar(10) DEFAULT NULL,
  `VOTING_PERIOD` date DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`STW_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblstw`
--

LOCK TABLES `tblstw` WRITE;
/*!40000 ALTER TABLE `tblstw` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblstw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblstwvote`
--

DROP TABLE IF EXISTS `tblstwvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblstwvote` (
  `VOTE_ID` varchar(50) NOT NULL,
  `STW_ID` varchar(50) DEFAULT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `SATISFACTION` int(11) DEFAULT NULL,
  `QUALITY` int(11) DEFAULT NULL,
  `INNOVATION` int(11) DEFAULT NULL,
  `FEASIBILITY` int(11) DEFAULT NULL,
  `TOTAL` int(11) DEFAULT NULL,
  `REMARKS` varchar(500) DEFAULT NULL,
  `VOTE_DATE` date DEFAULT NULL,
  `VOTE_TIME` varchar(10) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`VOTE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblstwvote`
--

LOCK TABLES `tblstwvote` WRITE;
/*!40000 ALTER TABLE `tblstwvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblstwvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblstwvotesummary`
--

DROP TABLE IF EXISTS `tblstwvotesummary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblstwvotesummary` (
  `STW_ID` varchar(50) DEFAULT NULL,
  `SATISFACTION` double DEFAULT NULL,
  `QUALITY` double DEFAULT NULL,
  `INNOVATION` double DEFAULT NULL,
  `FEASIBILITY` double DEFAULT NULL,
  `TOTAL` double DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblstwvotesummary`
--

LOCK TABLES `tblstwvotesummary` WRITE;
/*!40000 ALTER TABLE `tblstwvotesummary` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblstwvotesummary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblsystemcode`
--

DROP TABLE IF EXISTS `tblsystemcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblsystemcode` (
  `SYSTEM_TYPE` varchar(20) NOT NULL,
  `SYSTEM_CODE` varchar(20) NOT NULL,
  `SYSTEM_DESC` varchar(100) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblsystemcode`
--

LOCK TABLES `tblsystemcode` WRITE;
/*!40000 ALTER TABLE `tblsystemcode` DISABLE KEYS */;
INSERT INTO `tblsystemcode` VALUES ('SYSTYPE','SYSTYPE','System Code','UPD->ADMIN->2021-06-04 03:02:36'),('SYSTYPE','GENDER','Gender','UPD->ADMIN->2021-06-04 03:02:14'),('GENDER','MALE','Male','UPD->ADMIN->2021-06-04 03:05:30'),('GENDER','FEMALE','Female','UPD->ADMIN->2021-06-04 03:05:36'),('GENDER','OTHER','Other','UPD->ADMIN->2021-06-04 03:05:41'),('SYSTYPE','SUFFIX','Suffix','UPD->ADMIN->2021-06-04 03:02:08'),('SUFFIX','JR','Jr.','UPD->ADMIN->2021-06-04 03:05:53'),('SUFFIX','SR','Sr.','UPD->ADMIN->2021-06-04 03:05:47'),('SUFFIX','II','II','INS->ADMIN->2021-05-27 04:38:04'),('SUFFIX','III','III','INS->ADMIN->2021-05-27 04:38:10'),('SYSTYPE','CURRENCY','Currency','INS->ADMIN->2021-06-04 04:51:11'),('CURRENCY','USD','$','UPD->ADMIN->2021-06-04 04:53:04'),('CURRENCY','GBP','£','UPD->ADMIN->2021-06-04 04:53:00'),('CURRENCY','EUR','€','UPD->ADMIN->2021-06-04 04:52:57'),('CURRENCY','INR','₹','INS->ADMIN->2021-06-04 04:52:52'),('CURRENCY','PHP','₱','INS->ADMIN->2021-06-04 05:16:14'),('SYSTYPE','DATEFORMAT','Date Format','INS->ADMIN->2021-06-08 11:23:08'),('DATEFORMAT','d-m-Y','d-M-Y','UPD->ADMIN->2021-06-08 11:27:03'),('DATEFORMAT','m-d-Y','m-d-Y','INS->ADMIN->2021-06-08 11:24:36'),('DATEFORMAT','Y-m-d','Y-m-d','INS->ADMIN->2021-06-08 11:25:07'),('DATEFORMAT','d.m.Y','d.m.Y','INS->ADMIN->2021-06-08 11:25:21'),('DATEFORMAT','m.d.Y','m.d.Y','INS->ADMIN->2021-06-08 11:25:31'),('DATEFORMAT','Y.m.d','Y.m.d','INS->ADMIN->2021-06-08 11:26:29'),('DATEFORMAT','d/m/Y','d/m/Y','INS->ADMIN->2021-06-08 11:26:38'),('DATEFORMAT','m/d/Y','m/d/Y','INS->ADMIN->2021-06-08 11:26:45'),('DATEFORMAT','Y/m/d','Y/m/d','INS->ADMIN->2021-06-08 11:26:54'),('DATEFORMAT','d M Y','d M Y','INS->ADMIN->2021-06-08 11:27:12'),('DATEFORMAT','d F, Y','d F, Y','INS->ADMIN->2021-06-08 11:27:35'),('DATEFORMAT','d D M Y','D d M Y','UPD->ADMIN->2021-06-08 11:27:55'),('DATEFORMAT','dS M Y','dS M Y','INS->ADMIN->2021-06-08 11:28:10'),('SYSTYPE','TIMEFORMAT','Time Format','INS->ADMIN->2021-06-08 11:32:19'),('TIMEFORMAT','g:i a','g:i a','UPD->ADMIN->2021-06-08 11:33:30'),('TIMEFORMAT','G:i','G:i','INS->ADMIN->2021-06-08 11:32:45'),('SYSTYPE','HOLIDAYTYPE','Holiday Type','INS->ADMIN->2021-06-15 02:24:46'),('HOLIDAYTYPE','REGHOL','Regular Holiday','INS->ADMIN->2021-06-15 02:46:12'),('HOLIDAYTYPE','SPCNONWORKHOL','Special Non-working Holiday','INS->ADMIN->2021-06-15 02:46:55'),('HOLIDAYTYPE','LOCHOL','Local Holiday','INS->ADMIN->2021-06-15 02:49:05'),('SYSTYPE','PAIDSTAT','Paid Status','INS->ADMIN->2021-06-15 03:19:56'),('PAIDSTAT','PAID','Paid','INS->ADMIN->2021-06-15 03:20:03'),('PAIDSTAT','UNPAID','Unpaid','INS->ADMIN->2021-06-15 03:20:14'),('SYSTYPE','LVDURATION','Leave Duration','INS->ADMIN->2021-06-23 11:51:45'),('LVDURATION','SINGLE','Single','INS->ADMIN->2021-06-23 11:52:08'),('LVDURATION','MULTIPLE','Multiple','INS->ADMIN->2021-06-23 11:52:18'),('LVDURATION','HLFDAYMOR','Half Day (Morning)','INS->ADMIN->2021-06-23 11:52:54'),('LVDURATION','HLFDAYAFT','Half Day (Afternoon)','UPD->ADMIN->2021-06-23 11:54:49'),('LVDURATION','CUSTOM','Custom','INS->ADMIN->2021-06-23 05:02:47'),('SYSTYPE','RECURRENCEPATTERN','Recurrence Pattern','UPD->ADMIN->2021-07-02 10:33:34'),('RECURRENCEPATTERN','MONTHLY','Monthly','INS->ADMIN->2021-07-02 10:34:15'),('RECURRENCEPATTERN','SEMIMONTHLY','Semi-Monthly','INS->ADMIN->2021-07-02 10:34:28'),('RECURRENCEPATTERN','YEARLY','Yearly','INS->ADMIN->2021-07-02 01:25:22'),('SYSTYPE','DEDUCTIONCATEGORY','Deduction Category','INS->ADMIN->2021-07-05 10:01:54'),('DEDUCTIONCATEGORY','REGULAR','Regular','INS->ADMIN->2021-07-05 10:02:02'),('DEDUCTIONCATEGORY','GOVERNMENT','Government','INS->ADMIN->2021-07-05 10:02:17'),('SYSTYPE','SPECTYPE','Spec Type','INS->ADMIN->2021-07-08 09:44:54'),('SPECTYPE','DEDUCTION','Deduction','INS->ADMIN->2021-07-08 09:45:03'),('SPECTYPE','ALLOWANCE','Allowance','INS->ADMIN->2021-07-08 09:45:15'),('SPECTYPE','OTHERINCOME','Other Income','INS->ADMIN->2021-07-08 09:45:38'),('SYSTYPE','EMPLOYMENTTP','Employment Type','INS->ADMIN->2021-07-12 02:03:56'),('EMPLOYMENTTP','PERMANENT','Regular/Permanent','INS->ADMIN->2021-07-12 02:04:13'),('EMPLOYMENTTP','PROVISIONAL','Provisional','INS->ADMIN->2021-07-12 02:04:35'),('SYSTYPE','DOCUMENTCATEGORY','Document Category','INS->ADMIN->2021-07-12 05:19:29'),('SYSTYPE','MAILENCRYPTION','Mail Encryption','INS->LDAGULTO->2021-07-15 10:58:32'),('MAILENCRYPTION','tls','TLS','INS->LDAGULTO->2021-07-15 10:58:42'),('MAILENCRYPTION','ssl','SSL','INS->LDAGULTO->2021-07-15 10:58:50'),('MAILENCRYPTION','none','None','INS->LDAGULTO->2021-07-15 10:58:58'),('SYSTYPE','DTRTP','DTR Type','INS->ADMIN->2021-07-21 03:46:58'),('DTRTP','REGULAR','Regular','INS->ADMIN->2021-07-21 03:47:05'),('DTRTP','FLEXIBLE','Flexible','INS->ADMIN->2021-07-21 03:47:16'),('SYSTYPE','PAYROLLPERIOD','Payroll Period','INS->LDAGULTO->2021-08-18 11:48:30'),('PAYROLLPERIOD','SEMIMONTHLY','Semi-Monthly','INS->LDAGULTO->2021-08-18 11:48:47'),('PAYROLLPERIOD','MONTHLY','Monthly','INS->LDAGULTO->2021-08-18 11:48:59'),('SYSTYPE','TAXTYPE','Tax Type','INS->LDAGULTO->2021-08-18 05:15:56'),('TAXTYPE','TAXABLE','Taxable','INS->LDAGULTO->2021-08-18 05:16:10'),('TAXTYPE','NONTAXABLE','Non-Taxable','INS->LDAGULTO->2021-08-18 05:16:21'),('DOCUMENTCATEGORY','ADMINPROCEDURE','Admin Procedure','INS->LDAGULTO->2021-09-14 11:15:54'),('DOCUMENTCATEGORY','ADMINPOLICY','Admin Policy','INS->LDAGULTO->2021-09-14 11:16:17'),('DOCUMENTCATEGORY','CREDITPOLICY','Credit Policy','INS->LDAGULTO->2021-09-14 11:16:31'),('DOCUMENTCATEGORY','CREDITPROCEDURE','Credit Procedure','INS->LDAGULTO->2021-09-14 11:16:43'),('DOCUMENTCATEGORY','FORMS','Forms','INS->LDAGULTO->2021-09-14 11:16:51'),('DOCUMENTCATEGORY','LOANDOCUMENTS','Loan Documents','INS->LDAGULTO->2021-09-14 11:17:05'),('DOCUMENTCATEGORY','MEMORANDUMS','Memorandums','INS->LDAGULTO->2021-09-14 11:17:24'),('DOCUMENTCATEGORY','SYSTEMMANUALS','System Manuals','INS->LDAGULTO->2021-09-14 11:17:42'),('SYSTYPE','DOCUMENTFILETYPE','Document File Type','INS->LDAGULTO->2021-09-15 11:34:30'),('DOCUMENTFILETYPE','gif','GIF','INS->LDAGULTO->2021-09-15 11:35:03'),('DOCUMENTFILETYPE','jpeg','JPEG','INS->LDAGULTO->2021-09-15 11:35:13'),('DOCUMENTFILETYPE','jpg','JPG','INS->LDAGULTO->2021-09-15 11:35:20'),('DOCUMENTFILETYPE','xls','Excel (XLS)','UPD->LDAGULTO->2021-09-15 11:41:03'),('DOCUMENTFILETYPE','pdf','PDF','INS->LDAGULTO->2021-09-15 11:35:57'),('DOCUMENTFILETYPE','xlsx','Excel (XLSX)','UPD->LDAGULTO->2021-09-15 11:41:18'),('DOCUMENTFILETYPE','doc','Word (DOC)','INS->LDAGULTO->2021-09-15 11:41:47'),('DOCUMENTFILETYPE','docx','Word (DOCX)','INS->LDAGULTO->2021-09-15 11:41:58'),('DOCUMENTFILETYPE','ppt','Powerpoint (PPT)','UPD->LDAGULTO->2021-09-15 11:42:50'),('DOCUMENTFILETYPE','pptx','Powerpoint (PPTX)','UPD->LDAGULTO->2021-09-15 11:42:58'),('DOCUMENTFILETYPE','zip','ZIP','INS->LDAGULTO->2021-09-15 11:43:34'),('DOCUMENTFILETYPE','rar','RAR','INS->LDAGULTO->2021-09-15 11:43:40'),('DOCUMENTFILETYPE','7z','7Z','INS->LDAGULTO->2021-09-15 11:43:46'),('DOCUMENTFILETYPE','csv','CSV','INS->LDAGULTO->2021-09-15 11:44:28'),('SYSTYPE','WCFTYPE','Weekly Cash Flow Type','INS->ADMIN->2021-10-15 02:17:14'),('WCFTYPE','NONLOAN','Non-Loan Disbursements','INS->ADMIN->2021-10-15 02:17:33'),('WCFTYPE','LOAN','Loan Disbursements','INS->ADMIN->2021-10-15 02:17:50'),('SYSTYPE','TICKETCATEGORY','Ticket Category','INS->ADMIN->2021-10-20 09:10:30'),('TICKETCATEGORY','HARDWARE','Hardware','INS->ADMIN->2021-10-20 10:04:21'),('TICKETCATEGORY','SOFTWARE','Software','INS->ADMIN->2021-10-20 10:04:29'),('TICKETCATEGORY','DATAREQUEST','Data Request','INS->ADMIN->2021-10-20 10:04:42'),('SYSTYPE','WCFLOANTYPE','Weekly Cash Flow Loan Type','INS->LDAGULTO->2021-10-25 03:15:58'),('WCFLOANTYPE','300KBELOW','300K Below','INS->LDAGULTO->2021-10-25 03:16:43'),('WCFLOANTYPE','300KABOVE','300K Above','INS->LDAGULTO->2021-10-25 03:16:56'),('DOCUMENTCATEGORY','IMAGES','Images','INS->LDAGULTO->2021-10-27 02:30:43');
/*!40000 ALTER TABLE `tblsystemcode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblsystemparameters`
--

DROP TABLE IF EXISTS `tblsystemparameters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblsystemparameters` (
  `PARAMETER_ID` int(11) NOT NULL,
  `PARAMETER_DESC` varchar(100) NOT NULL,
  `PARAMETER_EXTENSION` varchar(10) DEFAULT NULL,
  `PARAMETER_NUMBER` int(11) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`PARAMETER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblsystemparameters`
--

LOCK TABLES `tblsystemparameters` WRITE;
/*!40000 ALTER TABLE `tblsystemparameters` DISABLE KEYS */;
INSERT INTO `tblsystemparameters` VALUES (1,'System Parameter','',40,'UPD->LDAGULTO->2021-10-25 09:18:21'),(2,'Page','',57,'UPD->LDAGULTO->2021-10-28 10:10:16'),(3,'Permission','',281,'UPD->LDAGULTO->2021-10-28 10:27:06'),(4,'Role','ROLE',6,'UPD->ADMIN->2021-10-15 03:13:39'),(5,'Change Logs','CHG',0,'UPD->ADMIN->2021-06-04 03:24:38'),(6,'Department','DEPT',10,'UPD->LDAGULTO->2021-10-05 04:02:39'),(7,'Designation','DES',16,'UPD->ADMIN->2021-07-12 10:22:40'),(8,'Branch','BRANCH',3,'UPD->ADMIN->2021-07-12 10:42:05'),(9,'Holiday','HOL',0,'UPD->LDAGULTO->2021-10-12 10:23:04'),(10,'Leave Type','LEAVETP',10,'UPD->LDAGULTO->2021-09-09 05:18:06'),(11,'Leave Entitlement','LVENT',108,'UPD->LDAGULTO->2021-10-26 11:54:30'),(12,'Leave','LV',0,'UPD->LDAGULTO->2021-10-25 05:07:26'),(13,'Employee Document','',0,'UPD->LDAGULTO->2021-09-22 03:34:09'),(14,'Attendance','',0,'UPD->LDAGULTO->2021-10-29 09:22:51'),(15,'Deduction','',0,'INS->ADMIN->2021-07-02 09:23:00'),(16,'Deduction Type','DEDUCTTP',0,'UPD->LDAGULTO->2021-10-12 10:22:48'),(17,'Allowance Type','ALLOWTP',0,'UPD->LDAGULTO->2021-10-12 10:22:36'),(18,'Other Income Type','OTHINCTP',0,'UPD->ADMIN->2021-10-12 11:32:43'),(19,'Payroll Specification','SPEC',0,'UPD->LDAGULTO->2021-10-12 10:24:41'),(20,'Location Record','',0,'UPD->LDAGULTO->2021-10-12 10:23:31'),(21,'Email Notification Settings','',1,'UPD->ADMIN->2021-10-12 01:15:04'),(22,'Payroll','',0,'UPD->ADMIN->2021-10-12 11:32:31'),(23,'Office Shift','',406,'UPD->LDAGULTO->2021-10-26 11:53:52'),(24,'Payroll Group','PAYGROUP',0,'UPD->LDAGULTO->2021-10-12 10:24:37'),(25,'Attendance Adjustment Attachment','ATTACHMENT',0,'UPD->LDAGULTO->2021-10-25 05:06:49'),(26,'Telephone Log ID','TELLOG',0,'UPD->LDAGULTO->2021-10-25 05:08:02'),(27,'Document','',0,'UPD->LDAGULTO->2021-10-27 03:23:22'),(28,'Transmittal','',0,'UPD->LDAGULTO->2021-10-27 03:23:51'),(29,'Transmittal History','',0,'UPD->LDAGULTO->2021-10-27 03:23:55'),(30,'Suggest To Win','',0,'UPD->LDAGULTO->2021-10-25 05:07:49'),(31,'Suggest To Win Vote','',0,'UPD->LDAGULTO->2021-10-25 05:07:54'),(32,'Training Room Log Sheet','',0,'UPD->LDAGULTO->2021-10-25 05:08:53'),(33,'Email Notification Recipients','',0,'UPD->ADMIN->2021-10-12 02:29:02'),(34,'Employee ID','',51,'UPD->LDAGULTO->2021-10-26 11:53:51'),(35,'Weekly Cash Flow','WCF',0,'UPD->LDAGULTO->2021-10-25 05:09:05'),(36,'Weekly Cash Flow Particulars','PARTICULAR',0,'UPD->LDAGULTO->2021-10-25 05:09:22'),(37,'Ticket','TICKET-',0,'UPD->LDAGULTO->2021-10-25 05:08:07'),(38,'Ticket Attachment','',0,'UPD->LDAGULTO->2021-10-25 05:08:24'),(39,'Ticket Note','NOTE-',0,'UPD->LDAGULTO->2021-10-25 05:08:36'),(40,'Ticket Adjustment','',0,'UPD->LDAGULTO->2021-10-25 05:08:18');
/*!40000 ALTER TABLE `tblsystemparameters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbltelephonelogsheet`
--

DROP TABLE IF EXISTS `tbltelephonelogsheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbltelephonelogsheet` (
  `LOG_ID` varchar(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `INITIAL_CALL_DATE` date DEFAULT NULL,
  `INITIAL_CALL_TIME` varchar(10) DEFAULT NULL,
  `ACTUAL_CALL_DATE` date DEFAULT NULL,
  `ACTUAL_CALL_TIME` varchar(10) DEFAULT NULL,
  `ACTUAL_CALL_DURATION` double DEFAULT NULL,
  `RECIPIENT` varchar(300) DEFAULT NULL,
  `TELEPHONE` varchar(30) DEFAULT NULL,
  `REQUEST_DATE` date DEFAULT NULL,
  `REQUEST_TIME` varchar(10) DEFAULT NULL,
  `STATUS` int(1) NOT NULL,
  `DECISION_DATE` date DEFAULT NULL,
  `DECISION_TIME` varchar(10) DEFAULT NULL,
  `DECISION_BY` varchar(100) DEFAULT NULL,
  `REASON` varchar(500) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbltelephonelogsheet`
--

LOCK TABLES `tbltelephonelogsheet` WRITE;
/*!40000 ALTER TABLE `tbltelephonelogsheet` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbltelephonelogsheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblticket`
--

DROP TABLE IF EXISTS `tblticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblticket` (
  `TICKET_ID` varchar(50) NOT NULL,
  `REQUESTER` varchar(100) NOT NULL,
  `DEPARTMENT` varchar(50) NOT NULL,
  `CATEGORY` varchar(50) NOT NULL,
  `ASSIGNED_DEPARTMENT` varchar(50) NOT NULL,
  `ASSIGNED_EMPLOYEE` varchar(100) NOT NULL,
  `SUBJECT` varchar(200) NOT NULL,
  `DESCRIPTION` varchar(1000) NOT NULL,
  `PRIORITY` int(1) NOT NULL,
  `STATUS` int(1) NOT NULL,
  `DUE_DATE` date NOT NULL,
  `CREATED_DATE` date NOT NULL,
  `CREATED_TIME` varchar(10) NOT NULL,
  `ACCEPTED_DATE` date DEFAULT NULL,
  `ACCEPTED_TIME` varchar(10) DEFAULT NULL,
  `SOLVED_DATE` date DEFAULT NULL,
  `SOLVED_TIME` varchar(10) DEFAULT NULL,
  `CLOSED_DATE` date DEFAULT NULL,
  `CLOSED_TIME` varchar(10) DEFAULT NULL,
  `DECISION_DATE` date DEFAULT NULL,
  `DECISION_TIME` varchar(10) DEFAULT NULL,
  `REJECTION_REASON` varchar(500) DEFAULT NULL,
  `CANCELLATION_REASON` varchar(500) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`TICKET_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblticket`
--

LOCK TABLES `tblticket` WRITE;
/*!40000 ALTER TABLE `tblticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblticketadjustment`
--

DROP TABLE IF EXISTS `tblticketadjustment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblticketadjustment` (
  `ADJUSTMENT_ID` varchar(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `TICKET_ID` varchar(50) NOT NULL,
  `STATUS` int(11) NOT NULL,
  `ASSIGNED_EMPLOYEE_ORG` varchar(100) NOT NULL,
  `ASSIGNED_EMPLOYEE_ADJ` varchar(100) NOT NULL,
  `CATEGORY_ORG` varchar(50) NOT NULL,
  `CATEGORY_ADJ` varchar(50) NOT NULL,
  `SUBJECT_ORG` varchar(200) NOT NULL,
  `SUBJECT_ADJ` varchar(200) NOT NULL,
  `DESCRIPTION_ORG` varchar(1000) NOT NULL,
  `DESCRIPTION_ADJ` varchar(1000) NOT NULL,
  `PRIORITY_ORG` int(1) NOT NULL,
  `PRIORITY_ADJ` int(1) NOT NULL,
  `DUE_DATE_ORG` date NOT NULL,
  `DUE_DATE_ADJ` date NOT NULL,
  `REASON` varchar(500) DEFAULT NULL,
  `REQUEST_DATE` date NOT NULL,
  `REQUEST_TIME` varchar(10) NOT NULL,
  `DECISION_BY` varchar(50) DEFAULT NULL,
  `DECISION_DATE` date DEFAULT NULL,
  `DECISION_TIME` varchar(10) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ADJUSTMENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblticketadjustment`
--

LOCK TABLES `tblticketadjustment` WRITE;
/*!40000 ALTER TABLE `tblticketadjustment` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblticketadjustment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblticketattachment`
--

DROP TABLE IF EXISTS `tblticketattachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblticketattachment` (
  `ATTACHMENT_ID` varchar(50) NOT NULL,
  `TICKET_ID` varchar(50) DEFAULT NULL,
  `FILE_NAME` varchar(500) NOT NULL,
  `FILE_PATH` varchar(500) DEFAULT NULL,
  `UPLOAD_BY` varchar(100) NOT NULL,
  `UPLOAD_DATE` date NOT NULL,
  `UPLOAD_TIME` varchar(10) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ATTACHMENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblticketattachment`
--

LOCK TABLES `tblticketattachment` WRITE;
/*!40000 ALTER TABLE `tblticketattachment` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblticketattachment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblticketnotes`
--

DROP TABLE IF EXISTS `tblticketnotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblticketnotes` (
  `NOTE_ID` varchar(50) NOT NULL,
  `TICKET_ID` varchar(50) DEFAULT NULL,
  `NOTE_BY` varchar(100) NOT NULL,
  `NOTE` varchar(1000) NOT NULL,
  `NOTE_DATE` date DEFAULT NULL,
  `NOTE_TIME` varchar(10) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`NOTE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblticketnotes`
--

LOCK TABLES `tblticketnotes` WRITE;
/*!40000 ALTER TABLE `tblticketnotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblticketnotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbltrainingroomlogsheet`
--

DROP TABLE IF EXISTS `tbltrainingroomlogsheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbltrainingroomlogsheet` (
  `LOG_ID` varchar(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `START_DATE` date NOT NULL,
  `START_TIME` varchar(10) NOT NULL,
  `END_TIME` varchar(10) NOT NULL,
  `REQUEST_DATE` date NOT NULL,
  `REQUEST_TIME` varchar(10) NOT NULL,
  `STATUS` int(1) NOT NULL,
  `DECISION_DATE` date DEFAULT NULL,
  `DECISION_TIME` varchar(10) DEFAULT NULL,
  `DECISION_BY` varchar(100) DEFAULT NULL,
  `OTHER_PARTICIPANT` varchar(1000) DEFAULT NULL,
  `FAN` int(1) DEFAULT NULL,
  `AIRCON` int(1) DEFAULT NULL,
  `LIGHTS` int(1) DEFAULT NULL,
  `REASON` varchar(500) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`LOG_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbltrainingroomlogsheet`
--

LOCK TABLES `tbltrainingroomlogsheet` WRITE;
/*!40000 ALTER TABLE `tbltrainingroomlogsheet` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbltrainingroomlogsheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbltrainingroomparticipant`
--

DROP TABLE IF EXISTS `tbltrainingroomparticipant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbltrainingroomparticipant` (
  `LOG_ID` varchar(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbltrainingroomparticipant`
--

LOCK TABLES `tbltrainingroomparticipant` WRITE;
/*!40000 ALTER TABLE `tbltrainingroomparticipant` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbltrainingroomparticipant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbltransmittal`
--

DROP TABLE IF EXISTS `tbltransmittal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbltransmittal` (
  `TRANSMITTAL_ID` int(50) NOT NULL,
  `DESCRIPTION` varchar(200) NOT NULL,
  `STATUS` int(1) DEFAULT NULL,
  `CURRENT_EMPLOYEE` varchar(100) NOT NULL,
  `CURRENT_DEPARTMENT` varchar(50) NOT NULL,
  `TRANSMITTED_EMPLOYEE` varchar(100) NOT NULL,
  `TRANSMITTED_DEPARTMENT` varchar(50) NOT NULL,
  `LAST_TRANSACTION_DATE` date NOT NULL,
  `LAST_TRANSACTION_TIME` varchar(10) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`TRANSMITTAL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbltransmittal`
--

LOCK TABLES `tbltransmittal` WRITE;
/*!40000 ALTER TABLE `tbltransmittal` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbltransmittal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbltransmittalhistory`
--

DROP TABLE IF EXISTS `tbltransmittalhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbltransmittalhistory` (
  `HISTORY_ID` int(50) NOT NULL,
  `TRANSMITTAL_ID` int(50) DEFAULT NULL,
  `TRASMITTAL_TYPE` int(1) DEFAULT NULL,
  `EMPLOYEE_FROM` varchar(100) NOT NULL,
  `DEPARTMENT_FROM` varchar(50) NOT NULL,
  `EMPLOYEE_TO` varchar(100) NOT NULL,
  `DEPARTMENT_TO` varchar(50) NOT NULL,
  `TRANSACTION_DATE` date DEFAULT NULL,
  `TRANSACTION_TIME` varchar(10) DEFAULT NULL,
  `RECEIVED_BY` varchar(100) NOT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`HISTORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbltransmittalhistory`
--

LOCK TABLES `tbltransmittalhistory` WRITE;
/*!40000 ALTER TABLE `tbltransmittalhistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbltransmittalhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbluseraccount`
--

DROP TABLE IF EXISTS `tbluseraccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbluseraccount` (
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `USERNAME` varchar(50) NOT NULL,
  `PASSWORD` varchar(200) NOT NULL,
  `ROLE_ID` varchar(50) DEFAULT NULL,
  `ACTIVE` int(1) DEFAULT NULL,
  `PASSWORD_EXPIRY_DATE` date NOT NULL,
  `FAILED_LOGIN` int(1) DEFAULT NULL,
  `LAST_FAILED_LOGIN` date DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`EMPLOYEE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluseraccount`
--

LOCK TABLES `tbluseraccount` WRITE;
/*!40000 ALTER TABLE `tbluseraccount` DISABLE KEYS */;
INSERT INTO `tbluseraccount` VALUES ('10','MAGARSULA','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 05:03:12'),('11','CSRIVERA','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 04:58:18'),('12','ADDUCLAYAN','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 04:58:04'),('15','ACADIZ','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 04:57:08'),('16','JCADIZJR','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 05:00:55'),('2','GTBONITA','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->LDAGULTO->2021-10-14 04:04:32'),('20','ADELAFUENTE','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 04:56:14'),('21','RFDELACRUZII','e672f48272c3f6d9','',0,'2022-04-14',0,NULL,'INS->ADMIN->2021-10-14 05:04:17'),('28','NRGUTIERREZ','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 05:03:33'),('29','ABJUANANI','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 04:56:42'),('33','LPUNSALAN','e672f4823584f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 05:03:07'),('35','NCSANPEDRO','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 05:03:50'),('36','KSVILLAR','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 05:01:18'),('37','MKCADIZ','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 05:03:09'),('38','CBPALO','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 04:58:56'),('42','JYYALUNG','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 05:00:52'),('43','PBLORENZO','e672f48272c3f6d9','',0,'2022-04-14',0,NULL,'INS->ADMIN->2021-10-14 05:04:07'),('44','FCARREON','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 04:59:38'),('46','HPMESINA','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 04:59:56'),('48','CAGUILAR','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 04:58:59'),('49','CRONQUILLO','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 04:59:20'),('50','ALRIVERA','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 04:57:43'),('51','LPAMADORA','e672f48272c3f6d9','',0,'2022-04-26',0,NULL,'INS->LDAGULTO->2021-10-26 01:15:42'),('6','LVMICAYAS','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 05:01:48'),('7','LDAGULTO','e672f48272c3f6d9','',1,'2022-04-19',0,NULL,'UPD->ADMIN->2021-10-14 03:52:11'),('8','SDLIM','e672f48272c3f6d9','',0,'2022-04-14',0,NULL,'INS->ADMIN->2021-10-14 05:04:44'),('9','MSONIGA','e672f48272c3f6d9','',1,'2022-04-14',0,NULL,'UPD->ADMIN->2021-10-14 05:03:14'),('USER-GUARD','guard','e672f48272c3f6d9','ROLE4',1,'2022-01-12',0,NULL,'UPD->LDAGULTO->2021-10-04 01:18:03'),('USER-wg1xs8lm7orn786nc4so','ADMIN','e672f48272c3f6d9','ROLE1',1,'2022-04-12',0,NULL,'UPD->ADMIN->2021-10-12 10:52:15');
/*!40000 ALTER TABLE `tbluseraccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbluserlogs`
--

DROP TABLE IF EXISTS `tbluserlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbluserlogs` (
  `USERNAME` varchar(50) NOT NULL,
  `LOG_TYPE` varchar(100) NOT NULL,
  `LOG_DATE` date NOT NULL,
  `LOG_TIME` varchar(15) NOT NULL,
  `LOG` varchar(4000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluserlogs`
--

LOCK TABLES `tbluserlogs` WRITE;
/*!40000 ALTER TABLE `tbluserlogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbluserlogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblwcf`
--

DROP TABLE IF EXISTS `tblwcf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblwcf` (
  `WCF_ID` varchar(50) NOT NULL,
  `EMPLOYEE_ID` varchar(100) NOT NULL,
  `DEPARTMENT` varchar(50) NOT NULL,
  `STATUS` int(1) NOT NULL,
  `START_DATE` date NOT NULL,
  `END_DATE` date NOT NULL,
  `APPROVAL_DATE` date DEFAULT NULL,
  `APPROVAL_TIME` varchar(10) DEFAULT NULL,
  `APPROVAL_BY` varchar(100) DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`WCF_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblwcf`
--

LOCK TABLES `tblwcf` WRITE;
/*!40000 ALTER TABLE `tblwcf` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblwcf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblwcfparticulars`
--

DROP TABLE IF EXISTS `tblwcfparticulars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblwcfparticulars` (
  `PARTICULAR_ID` varchar(50) NOT NULL,
  `WCF_ID` varchar(50) NOT NULL,
  `DETAILS` varchar(100) NOT NULL,
  `WCF_TYPE` varchar(50) NOT NULL,
  `LOAN_WCF_TYPE` varchar(50) DEFAULT NULL,
  `MONDAY` double DEFAULT NULL,
  `TUESDAY` double DEFAULT NULL,
  `WEDNESDAY` double DEFAULT NULL,
  `THURSDAY` double DEFAULT NULL,
  `FRIDAY` double DEFAULT NULL,
  `TOTAL` double DEFAULT NULL,
  `RECORD_LOG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`PARTICULAR_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblwcfparticulars`
--

LOCK TABLES `tblwcfparticulars` WRITE;
/*!40000 ALTER TABLE `tblwcfparticulars` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblwcfparticulars` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-29 13:04:00

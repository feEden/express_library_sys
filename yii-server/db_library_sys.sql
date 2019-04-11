/*
Navicat MySQL Data Transfer

Source Server         : php
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : db_library_sys

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-03-26 23:17:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_book
-- ----------------------------
DROP TABLE IF EXISTS `t_book`;
CREATE TABLE `t_book` (
  `bid` varchar(32) NOT NULL COMMENT '图书编码',
  `bname` varchar(255) DEFAULT NULL COMMENT '书名',
  `bprice` varchar(10) DEFAULT NULL COMMENT '书价',
  `bauth` varchar(32) DEFAULT NULL COMMENT '作者',
  `btype` varchar(12) DEFAULT NULL COMMENT '分类',
  `bdesc` varchar(255) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`bid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

-- ----------------------------
-- Records of t_book
-- ----------------------------
INSERT INTO `t_book` VALUES ('99f67a4ca515085f70ebf803698931f3', '你不知道的js(上)', '56', '詹姆斯', 'javascript', '这是一本很好的javascript入门书籍...');
INSERT INTO `t_book` VALUES ('99f67a4ca515085f70ebf803698931f4', '你不知道的js(中)', '52', '詹姆斯', 'javascript', '这是一本很好的js入门书籍...');
INSERT INTO `t_book` VALUES ('99f67a4ca515085f70ebf803698931f7', 'Java并发编程', '89.0', '阿贾克斯', 'java', '这是java并发从入门到放弃系列');

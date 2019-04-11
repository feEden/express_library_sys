/*
 Navicat Premium Data Transfer

 Source Server         : 虚拟机_mysql
 Source Server Type    : MySQL
 Source Server Version : 100137
 Source Host           : localhost:3306
 Source Schema         : db_library

 Target Server Type    : MySQL
 Target Server Version : 100137
 File Encoding         : 65001

 Date: 12/04/2019 00:27:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_books
-- ----------------------------
DROP TABLE IF EXISTS `t_books`;
CREATE TABLE `t_books`  (
  `bid` varchar(32) CHARACTER SET utf32 COLLATE utf32_bin NOT NULL COMMENT '图书编码',
  `bname` varchar(255) CHARACTER SET utf32 COLLATE utf32_general_ci NULL DEFAULT NULL COMMENT '书名',
  `bprice` varchar(10) CHARACTER SET utf32 COLLATE utf32_general_ci NULL DEFAULT NULL COMMENT '书价',
  `bauth` varchar(32) CHARACTER SET utf32 COLLATE utf32_general_ci NULL DEFAULT NULL COMMENT '作者',
  `btype` varchar(12) CHARACTER SET utf32 COLLATE utf32_general_ci NULL DEFAULT NULL COMMENT '分类',
  `bdesc` varchar(255) CHARACTER SET utf32 COLLATE utf32_general_ci NULL DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`bid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf32 COLLATE = utf32_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_books
-- ----------------------------
INSERT INTO `t_books` VALUES ('99f67a4ca515085f70ebf803698931f3', '你不知道的js(上)', '56', '詹姆斯', 'javascript', '这是一本很好的javascript入门书籍...');
INSERT INTO `t_books` VALUES ('99f67a4ca515085f70ebf803698931f7', 'Java并发编程', '89.0', '阿贾克斯', 'java', '这是java并发从入门到放弃系列');

SET FOREIGN_KEY_CHECKS = 1;

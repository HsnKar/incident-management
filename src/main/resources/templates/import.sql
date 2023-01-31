
-- Listage de la structure de la base pour vdi
DROP DATABASE IF EXISTS `vdi`;
CREATE DATABASE IF NOT EXISTS `vdi`;
USE `vdi`;


-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table vdi. incident
DROP TABLE IF EXISTS `incident`;
CREATE TABLE IF NOT EXISTS `incident` (
  `id` bigint(20) NOT NULL NOT NULL AUTO_INCREMENT,
  `cause` varchar(255) DEFAULT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `duration` bigint(20) DEFAULT NULL,
  `resolution` varchar(255) DEFAULT NULL,
  `service` varchar(255) DEFAULT NULL,
  `site` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;






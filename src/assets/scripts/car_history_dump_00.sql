CREATE DATABASE  IF NOT EXISTS `car_history` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `car_history`;
-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: localhost    Database: car_history
-- ------------------------------------------------------
-- Server version	5.7.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Carros`
--

DROP TABLE IF EXISTS `Carros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Carros` (
  `carro_id` int(11) NOT NULL AUTO_INCREMENT,
  `modelo` varchar(255) NOT NULL,
  `descripcion` text,
  `precio` decimal(30,2) NOT NULL,
  `motor` varchar(50) NOT NULL,
  `marca_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`carro_id`),
  KEY `marca_id` (`marca_id`),
  CONSTRAINT `carros_ibfk_1` FOREIGN KEY (`marca_id`) REFERENCES `Marcas` (`marca_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Carros`
--

LOCK TABLES `Carros` WRITE;
/*!40000 ALTER TABLE `Carros` DISABLE KEYS */;
INSERT INTO `Carros` VALUES (1,'M1','La necesidad de homologar unidades de producción en serie para crear el de competición sirvió para que BMW produjera este modelo diseñado por Giorgetto Giugiaro. Solo se hicieron 456 ejemplares en tres años, y fue el primero con la “M” en su denominación. Su diseño afilado no pasó desapercibido, como tampoco su motor de seis cilindros en línea con 3,5 litros de cubicaje que desarrollaba 277 caballos de potencia.',750000.00,'6 cilindros en línea',1),(2,'M3 E30','El primer derivado M de la Serie 3, con código E30, supuso un antes y un después en la marca gracias a su ingeniería. También nació para ser la base del coche de competición, y por ello equipó un propulsor de 4 cilindros, 2,3 litros y 16 válvulas que rendía 200 CV en su primera versión y 238 CV con 2,5 litros en su última evolución. Su bajo peso, carrocería ensanchada y chasis mejorado le hacen aún hoy un prodigio de la conducción.',200000.00,'4 cilindros',1),(3,'Z3 M Coupé','Este modelo rompió moldes a finales de los 90 y hoy la variante M es de lo más codiciada. Su carrocería coupé le hacía mucho más rígido que su equivalente descapotable, y eso se traducía en una gran capacidad dinámica. Dotado de diferencial autoblocante trasero y un motor de 6 cilindros en línea de 3,2 litros y 321 caballos, solo necesitaba 5,4 segundos para pasar de 0 a 100 km/h.',15000.00,'6 cilindros en línea',1),(4,'M5 E39','Dos años después del M3, BMW empezó a lanzar versiones M de la berlina de mayor tamaño, y en 1998 destacó esta tercera generación, única de la saga que montó el motor V8 de 4,9 litros atmosférico. Con distribución variable para la admisión y el escape, la potencia llegaba hasta los 400 CV y conseguía acelerar de 0 a 100 km/h en 4,8 segundos, además de llegar sin limitación hasta los 298 km/h. Fue considerado en su época el sedán de producción más rápido del mercado',300000.00,'8 cilindros en V',1),(5,'F40','El F40 fue diseñado para celebrar los 40 años de Ferrari, y resulta que es el último automóvil aprobado por Enzo Ferrari antes de su muerte en 1988. Bajo la piel, utilizaba un V8 biturbo desarrollado a partir del 288 GTO que generaba 471 CV, y Ferrari afirmaba que el F40 tenía una velocidad máxima de poco más de 200 mph. La carrocería está hecha de una mezcla de kevlar, fibra de carbono y aluminio para ahorrar peso, mientras que el interior despojado presentaba aire acondicionado como su único lujo.',2000000.00,'V8 twin-turbo',2),(6,'F355 Berlinetta','El manual de seis velocidades es el modelo de elección, porque mientras que el F355 F1 presentaba un embrague electrohidráulico y palancas de cambio inspiradas en coches de carreras, este auto de embrague único no es el mejor intérprete. Otras opciones incluyeron un F355 Spider convertible, el primer convertible de Ferrari en incluir operación eléctrica en su techo plegable, y el F355 GTS, que era una versión targa del Berlinetta estándar.',150000.00,'V8',2),(7,'250 GTO','El GTO es el desarrollo definitivo de la serie 250 de automóviles deportivos de Ferrari, y a su vez se derivó de otro exitoso automóvil de carreras de Ferrari, el 250 GT SWB. Ese modelo tenía una distancia entre ejes más corta que el 250 GT estándar para mejorar su manejo, mientras que el GTO agregó una nueva carrocería aerodinámica para ayudarlo a competir contra automóviles deportivos rivales como el Shelby Cobra y el Jaguar E-Type Lightweight.',50000000.00,'V12',2),(8,'LaFerrari','LaFerrari es el primer híbrido de producción de Ferrari, y su sistema de propulsión híbrido se basa en un motor V12 de 6.3 litros que produce 789 caballos de fuerza a 9,000 rpm y 516 libras-pie de torque a 6,750 rpm. Ese motor se combina con un motor eléctrico que agrega 161 caballos de fuerza y 199 libras-pie de torque, lo que lleva la potencia total a 950 caballos de fuerza y 664 libras-pie de torque. Eso es suficiente para llevar a LaFerrari de 0 a 60 mph en menos de 3 segundos, y su velocidad máxima es superior a 217 mph.',3000000.00,'V12 híbrido',2),(9,'GT3 RS','El Porsche 911 GT3 RS es un coche de carreras homologado para la calle. Es el 911 más potente y rápido que se puede comprar, y su motor atmosférico de 4.0 litros y seis cilindros produce 520 CV y 470 Nm de par. El GT3 RS es capaz de acelerar de 0 a 100 km/h en 3,2 segundos y alcanzar una velocidad máxima de 312 km/h. El GT3 RS es un coche de carreras homologado para la calle. Es el 911 más potente y rápido que se puede comprar, y su motor atmosférico de 4.0 litros y seis cilindros produce 520 CV y 470 Nm de par. El GT3 RS es capaz de acelerar de 0 a 100 km/h en 3,2 segundos y alcanzar una velocidad máxima de 312 km/h.',350000.00,'6 cilindros Flat-6',3),(10,'918 Spyder','El Porsche 918 Spyder es un híbrido enchufable que combina un motor V8 de 4.6 litros con dos motores eléctricos para producir 887 caballos de fuerza y 944 libras-pie de torque. Eso es suficiente para llevarlo de 0 a 60 mph en 2,5 segundos y alcanzar una velocidad máxima de 214 mph. El 918 Spyder es un híbrido enchufable que combina un motor V8 de 4.6 litros con dos motores eléctricos para producir 887 caballos de fuerza y 944 libras-pie de torque. Eso es suficiente para llevarlo de 0 a 60 mph en 2,5 segundos y alcanzar una velocidad máxima de 214 mph.',1000000.00,'V8 híbrido',3),(11,'Carrera GT','El Porsche Carrera GT es un superdeportivo de motor central que utiliza un V10 de 5.7 litros que produce 612 caballos de fuerza y 435 libras-pie de torque. Eso es suficiente para llevarlo de 0 a 60 mph en 3,5 segundos y alcanzar una velocidad máxima de 205 mph. El Carrera GT es un superdeportivo de motor central que utiliza un V10 de 5.7 litros que produce 612 caballos de fuerza y 435 libras-pie de torque. Eso es suficiente para llevarlo de 0 a 60 mph en 3,5 segundos y alcanzar una velocidad máxima de 205 mph.',700000.00,'V10',3),(12,'956','El Porsche 956 es un automóvil de carreras construido por Porsche en 1982 para competir en la categoría de Grupo C del Campeonato Mundial de Resistencia de la FIA. Fue reemplazado por el Porsche 962 en 1985. El 956 fue considerado revolucionario en su época, y fue el primer automóvil de carreras en utilizar un monocasco de aluminio y un motor de inyección de combustible. El 956 fue el automóvil de carreras más exitoso de Porsche, ganando en total 120 carreras, incluyendo 7 victorias en las 24 Horas de Le Mans. A velocidad máxima, generaba más fuerza descendente que su propio peso. Así que, técnicamente, podría circular al revés, boca abajo.',5000000.00,'6 cilindros Flat-6 Turbo',3),(13,'300SL','El Mercedes-Benz 300 SL (W198) es un automóvil deportivo producido por Mercedes-Benz entre 1954 y 1963. Fue conocido por su distintiva puerta de ala de gaviota y por ser el primer automóvil de producción en equipar un motor con inyección directa de gasolina. El 300 SL fue el primer automóvil de producción en equipar un motor con inyección directa de gasolina. El 300 SL fue el primer automóvil de producción en equipar un motor con inyección directa de gasolina.',7000000.00,'6 cilindros en línea',4),(14,'CLK GTR','El Mercedes-Benz CLK GTR es un automóvil de carreras construido por Mercedes-Benz y basado en el modelo de producción CLK. Fue diseñado para competir en la nueva serie FIA GT creada por la Federación Internacional del Automóvil. El Mercedes-Benz CLK GTR es un automóvil de carreras construido por Mercedes-Benz y basado en el modelo de producción CLK. Fue diseñado para competir en la nueva serie FIA GT creada por la Federación Internacional del Automóvil.',10000000.00,'V12',4),(15,'SLR HDK','El extremo delantero inspirado en la F1 ha perdido algo de carácter, con MSO eliminando algunos de los detalles de la parrilla. En general, este SLR especial se ve fantástico en blanco, completo con ruedas de carreras ligeras a juego y calcomanías rojas \"03\".',350000.00,'V8',4),(16,'300 SLR Gullwing Uhlenhaut','El Mercedes-Benz 300 SLR (W196S) fue un automóvil deportivo de carreras fabricado por Mercedes-Benz para la temporada de carreras de 1955, un sucesor del famoso Mercedes-Benz 300 SLR W196. El coche fue construido para competir en el Campeonato Mundial de Sportscar de la FIA, incluyendo la Carrera Panamericana, y la Mille Miglia. El coche fue construido para competir en el Campeonato Mundial de Sportscar de la FIA, incluyendo la Carrera Panamericana, y la Mille Miglia.',140000000.00,'8 cilindros en línea',4);
/*!40000 ALTER TABLE `Carros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Imagenes`
--

DROP TABLE IF EXISTS `Imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Imagenes` (
  `imagen_id` int(11) NOT NULL AUTO_INCREMENT,
  `url` text NOT NULL,
  `carro_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`imagen_id`),
  KEY `carro_id` (`carro_id`),
  CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`carro_id`) REFERENCES `Carros` (`carro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Imagenes`
--

LOCK TABLES `Imagenes` WRITE;
/*!40000 ALTER TABLE `Imagenes` DISABLE KEYS */;
INSERT INTO `Imagenes` VALUES (1,'https://thevaultms.com/wp-content/uploads/2021/07/DSC00479.jpg',1),(2,'https://thevaultms.com/wp-content/uploads/2021/07/DSC00758.jpg',1),(3,'https://thevaultms.com/wp-content/uploads/2021/07/DSC00489.jpg',1),(4,'https://thevaultms.com/wp-content/uploads/2021/07/DSC00707.jpg',1),(5,'https://img.remediosdigitales.com/677ec9/bmw-e30-m3-redux-13/1366_2000.jpg',2),(6,'https://img.remediosdigitales.com/f1be6f/bmw-e30-m3-redux-16/1366_2000.jpg',2),(7,'https://img.remediosdigitales.com/17d7ab/redux-bmw-m3-e30-4-/1366_2000.jpg',2),(8,'https://img.remediosdigitales.com/faae0f/bmw-e30-m3-redux-12/1366_2000.jpg',2),(9,'https://img.remediosdigitales.com/160824/p90396966_highres_bmw-z3/1366_2000.jpg',3),(10,'https://cdn.motor1.com/images/mgl/BPmJv/s1/bmw-z3m-coupe-with-v8-engine.webp',3),(11,'https://img.remediosdigitales.com/8d4c34/p90397013_highres_bmw-z3-m-coup--roads-2-/1366_2000.jpg',3),(12,'https://tn.com.ar/resizer/e7vpjWW0jRd4XOSY9gqBev3cEmo=/1440x0/smart/filters:format(webp)/cloudfront-us-east-1.images.arcpublishing.com/artear/H52XTUKIVJDA7CFJFVEFANFGSY.jpg',3),(13,'https://www.coches.com/fotos_historicas/bmw/M5-Sedan-USA-E39-1998-2004/bmw_m5-sedan-usa-e39-1998-2004_r13.jpg',4),(14,'https://www.coches.com/fotos_historicas/bmw/M5-Sedan-USA-E39-1998-2004/bmw_m5-sedan-usa-e39-1998-2004_r9.jpg',4),(15,'https://i.pinimg.com/736x/ae/1b/e7/ae1be7610ce4bc7ddc6010573aed848e.jpg',4),(16,'https://www.coches.com/fotos_historicas/bmw/M5-Sedan-USA-E39-1998-2004/bmw_m5-sedan-usa-e39-1998-2004_r12.jpg',4),(17,'https://acnews.blob.core.windows.net/imgnews/extralarge/NAZ_c3f7ef3ad7c14764b67b9ce72ce8a35e.jpg',5),(18,'https://acnews.blob.core.windows.net/imgnews/paragraph/NPAZ_c5462f5f7d6a4031a70a45906bb45730.jpg',5),(19,'https://acnews.blob.core.windows.net/imgnews/paragraph/NPAZ_4fe17d3719d3430797eab8899dc991c6.jpg',5),(20,'https://acnews.blob.core.windows.net/imgnews/paragraph/NPAZ_09891096964240328921cf2f924d7782.jpg',5),(21,'https://cdn.ferrari.com/cms/network/media/img/resize/645cbdd7457e84002378746e-ferrari-magazine-best-car-f355-berlinetta-cover-high-dek-2?width=1440&height=900',6),(22,'https://cdn.ferrari.com/cms/network/media/img/resize/645a61da13b86f00229a6d9f-f355tofmmain1_1250x700?width=1920&height=0',6),(23,'https://ferrari-view.thron.com/api/xcontents/resources/delivery/getThumbnail/ferrari/0x0/34f27a38-1e9a-4909-860d-bd2ad2f100bc.jpg?v=13',6),(24,'https://cdn.ferrari.com/cms/network/media/img/resize/645a621f3f3b7d0021c3bae1-f355tofmmain2_1250x700?width=1920&height=0',6),(25,'https://editorial.pxcrush.net/carsales/general/editorial/1962-ferrari-250-gto-auction-14.jpeg?width=1024&height=682',7),(26,'https://editorial.pxcrush.net/carsales/general/editorial/1962-ferrari-250-gto-auction-3.jpeg?width=1024&height=682',7),(27,'https://editorial.pxcrush.net/carsales/general/editorial/1962-ferrari-250-gto-auction-17.jpeg?width=1024&height=682',7),(28,'https://editorial.pxcrush.net/carsales/general/editorial/1962-ferrari-250-gto-auction-11.jpeg?width=1024&height=682',7),(29,'https://cdn.motor1.com/images/mgl/9g7N0/s1/ferrari-laferrari-spider-first-official-photos.jpg',8),(30,'https://cdn.motor1.com/images/mgl/kk9KP/s3/ferrari-laferrari-open-top-spider.webp',8),(31,'https://cdn.motor1.com/images/mgl/Qr22Y/s1/ferrari-laferrari-aperta-profile.jpg',8),(32,'https://cdn.motor1.com/images/mgl/BBmQj/s1/ferrari-laferrari-spider-first-official-photos.jpg',8),(33,'https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXABuN9dMGF4tl3U0%25z8rMHIspbWvanYb%255y%25oq%25vSTmjMXD4qAZeoNBPUSfUx4RmWBisGK7Zlp0KtYYF%25mVSW8uViyIuGbmhpg3er0gtdpjzwHl8aFaqxKpqJSPQrIpHaMNYw3Zxvko5xjtKPLFC1awrrIuGbmx263er0g1IjjzwHlHNXaqxKpKfbmO1SZeH4gTbMtzEcl20k8q0qpQHLE2MZZYKI9QKCt5S34x7p8wGb7GXoq1sZSrURRLRmWBitWj7gVdc8VaUtp9CpQHLExS%25ZYKI9tGIt5S34Dfo8CMj%25sLfEGkaWtNa9rLmV8oa4wIghE45%25x3lAnurW1jpJyiuVbaZBvaSh0mtd8c8CMj%25aaOEGkaWxsP9rLmV1J24wIghbLd%25xOCtHhXpCsXbxku9KEeVl9P1qr3KHwACu',9),(34,'https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXABuN9dMGF4tl3U0%25z8rMH1spbWvanYb%255y%25oq%25vSTmjMXD4qAZeoNBPUSfUx4RmWBisGK7Zlp0KtYYF%25mVSW8uViyIuGbmhpg3er0gtdpjzwHl8aFaqxKpqJSPQrIpHaMNYw3Zxvko5xjtKPLFC1awrrIuGbmx263er0g1IjjzwHlHNXaqxKpKfbmO1SZeH4gTbMtzEcl20k8q0qpQHLE2MZZYKI9QKCt5S34x7p8wGb7GXoq1sZSrURRLRmWBitWj7gVdc8VaUtp9CpQHLExS%25ZYKI9tGIt5S34Dfo8CMj%25sLfEGkaWtNa9rLmV8oa4wIghE45%25x3lAnurW1jpJyiuVbaZBvaSh0mtd8c8CMj%25aaOEGkaWxsP9rLmV1J24wIghbLd%25xOCtHhXpCsXbxku9KEeVl9P1qr3KHwACu',9),(35,'https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXABuN9dMGF4tl3U5Yz8rMHIspbWvanYb%255y%25oq%25vSTmjMXD4qAZeoNBPUSfUx4RmWBisGK7Zlp0KtYYF%25mVSW8uViyIuGbmhpg3er0gtdpjzwHl8aFaqxKpqJSPQrIpHaMNYw3Zxvko5xjtKPLFC1awrrIuGbmx263er0g1IjjzwHlHNXaqxKpKfbmO1SZeH4gTbMtzEcl20k8q0qpQHLE2MZZYKI9QKCt5S34x7p8wGb7GXoq1sZSrURRLRmWBitWj7gVdc8VaUtp9CpQHLExS%25ZYKI9tGIt5S34Dfo8CMj%25sLfEGkaWtNa9rLmV8oa4wIghE45%25x3lAnurW1jpJyiuVbaZBvaSh0mtd8c8CMj%25aaOEGkaWxsP9rLmV1J24wIghbLd%25xOCtHhXpCsXbxku9KEeVl9P1qr3KHwACu',9),(36,'https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXABuN9dMGF4tl3U0%25z8rMbjAuWgRcgVGPK0rh4mctLsR6EXdGvdTmJKlEnDzCBLMkYCIFF7gKpGl3UpnW1UzQKZkSbsqYSI9k0iO5M3H7HcTCkc8GXoq1k5Hr6FObLTVwRuT0ICXx7e2HOqq1UzQKTNAbsqYS2100iO5M56hHcTCkCvQKf2GLs5mSPQrIijyMNYw3cYcko5xjNrLLFC1aoCeIuGbmTBk3OzQBzhRc2DLGqdJJxJKlEnIl0BSp9y3pHdIkaeko5xjTGgLFC1aIz1IuGbm4vR3er0gDxvjzwHlI6HaqxKp3RHmO1SZjmugTbMt%25Uql20k8WnUpQHLEVHGZYKI93y3er0gHHfjzwHlTDXaqxKp28NmO1SZQx9gTfeI5ZhkeDhQTwUaCjspMaX2cqbC5OteU',9),(37,'https://hips.hearstapps.com/es.h-cdn.co/cades/contenidos/12539/918008.jpg?resize=980:*',10),(38,'https://hips.hearstapps.com/es.h-cdn.co/cades/contenidos/12539/918006.jpg?resize=980:*',10),(39,'https://hips.hearstapps.com/es.h-cdn.co/cades/contenidos/12539/porsche918spyder04.jpg?resize=980:*',10),(40,'https://hips.hearstapps.com/es.h-cdn.co/cades/contenidos/12539/918007.jpg?resize=980:*',10),(41,'https://cdn.motor1.com/images/mgl/P3GywW/s1/2004-porsche-carrera-gt-with-27-miles.jpg',11),(42,'https://cdn.motor1.com/images/mgl/9mZrVy/s1/2004-porsche-carrera-gt-with-27-miles.jpg',11),(43,'https://cdn.motor1.com/images/mgl/W81Ne6/s1/2004-porsche-carrera-gt-with-27-miles.jpg',11),(44,'https://cdn.motor1.com/images/mgl/koYxL4/s1/2004-porsche-carrera-gt-with-27-miles.jpg',11),(45,'https://upload.wikimedia.org/wikipedia/commons/2/21/Porsche_956_at_the_Porsche_Museum_in_Stuttgart%2C_Germany.jpg',12),(46,'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/teaser_720x406x2/dam/pnr/2022/History/40-Years-Group-C/956-002/956-002LH_006.jpg/jcr:content/956-002LH_006.jpg',12),(47,'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/teaser_720x406x2/dam/pnr/2022/History/40-Years-Group-C/956-002/956-002LH_025.jpg/jcr:content/956-002LH_025.jpg',12),(48,'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/teaser_720x406x2/dam/pnr/2022/History/40-Years-Group-C/956-002/956-002LH_029.jpg/jcr:content/956-002LH_029.jpg',12),(49,'https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2022/09/historia-mercedes-sl-300-gullwing-2819865.jpg?tf=3840x',13),(50,'https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2022/09/historia-mercedes-sl-300-gullwing-2819857.jpg?tf=3840x',13),(51,'https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2022/09/historia-mercedes-sl-300-gullwing-2819869.jpg?tf=3840x',13),(52,'https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2022/09/historia-mercedes-sl-300-gullwing-2819859.jpg?tf=3840x',13),(53,'https://media.gettyimages.com/id/1199279293/es/foto/brussels-belgium-mercedes-benz-clk-gtr-hypercar-on-display-at-brussels-expo-on-january-8-2020.jpg?s=612x612&w=0&k=20&c=ymDHsgpvhOHGJOedXJP1O_jm-zKYC_lLCXLivwLlXAU=',14),(54,'https://media.gettyimages.com/id/1199279259/es/foto/brussels-belgium-mercedes-benz-clk-gtr-hypercar-on-display-at-brussels-expo-on-january-8-2020.jpg?s=612x612&w=0&k=20&c=nDaAiN3z1rbWQiaPfcNuZqJZxAOejk9Cvwz8cc45sGc=',14),(55,'https://i.pinimg.com/736x/ec/63/d2/ec63d2e911effccc50412c63746b07f1.jpg',14),(56,'https://media.gettyimages.com/id/1201407529/es/foto/brussels-belgium-mercedes-benz-clk-gtr-hypercar-on-display-at-brussels-expo-on-january-8-2020.jpg?s=612x612&w=0&k=20&c=KlaHGhWopuOxPxmmxtasS5rvAiZFXTDUbewgVS6i7zk=',14),(57,'https://cdn.carbuzz.com/gallery-images/1600-wp/1158000/800/1158828.webp',15),(58,'https://cdn.carbuzz.com/gallery-images/1600-wp/1158000/800/1158820.webp',15),(59,'https://cdn.carbuzz.com/gallery-images/1600-wp/1158000/800/1158816.webp',15),(60,'https://cdn.carbuzz.com/gallery-images/1600-wp/1158000/800/1158826.webp',15),(61,'https://acnews.blob.core.windows.net/imgnews/medium/NAZ_802dc30c55c5450b92e5f076237ae65e.webp',16),(62,'https://www.elfinanciero.com.mx/resizer/WM4Ez6JcTTS20peDs_7TIAqZqHw=/1440x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/elfinanciero/UYGGC3QCORGZNDOR624MDZZKEY.jpeg',16),(63,'https://www.elfinanciero.com.mx/resizer/1MlhShbjYXQw38e974HeDqS0590=/1440x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/elfinanciero/6QP3ZXJHWBACFOEDPFUZ6EMQIE.jpeg',16),(64,'https://www.elfinanciero.com.mx/resizer/47gGjboSCoq1YiimZ4HwYPG-bFc=/1440x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/elfinanciero/CAY74PEFBBFHHPMBWSKYVDNY3I.jpeg',16);
/*!40000 ALTER TABLE `Imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Marcas`
--

DROP TABLE IF EXISTS `Marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Marcas` (
  `marca_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `paletaColores` json DEFAULT NULL,
  `logo` text NOT NULL,
  PRIMARY KEY (`marca_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Marcas`
--

LOCK TABLES `Marcas` WRITE;
/*!40000 ALTER TABLE `Marcas` DISABLE KEYS */;
INSERT INTO `Marcas` VALUES (1,'BMW','[\"#1c69d4\"]','https://1000logos.net/wp-content/uploads/2018/02/BMW-Logo-1997.png'),(2,'Ferrari','[\"#f93d38\"]','https://1000marcas.net/wp-content/uploads/2019/12/Ferrari-Logo.png'),(3,'Porsche','[\"#9db1ba\"]','https://pngimg.com/uploads/porsche_logo/porsche_logo_PNG6.png'),(4,'Mercedes','[\"#000000\"]','https://pngimg.com/uploads/mercedes_logos/small/mercedes_logos_PNG1.png');
/*!40000 ALTER TABLE `Marcas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-21 13:53:41

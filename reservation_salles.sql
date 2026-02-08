-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2026 at 01:52 PM
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
-- Database: `reservation_salles`
--

-- --------------------------------------------------------

--
-- Table structure for table `equipement`
--

CREATE TABLE `equipement` (
  `id_equip` int(11) NOT NULL,
  `nom` varchar(80) NOT NULL,
  `desc_equip` varchar(100) NOT NULL,
  `id_s` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipement`
--

INSERT INTO `equipement` (`id_equip`, `nom`, `desc_equip`, `id_s`) VALUES
(1, 'Écran Interactif 75\"', 'Modèle : BenQ RP7502. Écran tactile 4K UHD, logiciel EZWrite inclus, stylets interchangeables.', NULL),
(2, 'Écran Interactif 86\"', 'Modèle : SMART Board MX286. Écran tactile 4K UHD avec Android intégré, usage formation.', 3),
(3, 'Écran LED 65\"', 'Modèle : Samsung BE65T-H. Écran professionnel 4K UHD, affichage haute luminosité', 1),
(4, 'Écran LED 75\"', 'Modèle : Samsung QET75. Affichage professionnel haute luminosité, idéal pour réunions.', 4),
(5, 'Écran de Projection', 'Marque : Lumene Embassy. Écran motorisé 240 cm pour vidéoprojecteur.', 3),
(6, 'Webcam 4K', 'Modèle : Logitech Brio. Webcam Ultra HD pour démonstrations et réunions techniques.', 4),
(7, 'Webcam HD', 'Modèle : Logitech C930e. Webcam professionnelle Full HD pour visioconférences.', 1),
(8, 'Caméra Document', 'Modèle : IPEVO V4K. Caméra UHD pour présentation de documents et démonstrations.', NULL),
(9, 'Climatisateur Mobile 12000 BTU', 'Modèle : Delonghi Pinguino. Sur roulettes, évacuation flexible, usage temporaire.', NULL),
(10, 'Climatisateur Split 18000 BTU', 'Modèle : LG DualCool. Technologie Inverter, silencieux, commande Wi-Fi intégrée.', 1),
(11, 'Climatisateur Split 24000 BTU', 'Modèle : Daikin FTXP. Inverter, fonction déshumidification, économie d’énergie.', 4),
(12, 'Climatisateur Split 36000 BTU', 'Modèle : Mitsubishi Electric MSZ-AP. Haute performance pour grande salle de formation.', 3),
(13, 'Micro Sans Fil', 'Modèle : Shure BLX24. Micro-cravate professionnel pour présentations et formations.', 3),
(14, 'Multiprise HDMI / USB', 'Hub HDMI et ports USB pour connexions multiples (PC, écran, projecteur).', 1),
(15, 'PC de Présentation', 'Modèle : Dell OptiPlex 7090. Intel Core i7, 16 Go RAM, SSD 512 Go.', 1),
(16, 'PC Formateur', 'Modèle : HP EliteDesk 800 G6. Intel Core i7, 16 Go RAM, SSD 512 Go.', 3),
(17, 'PC Technique', 'Modèle : Lenovo ThinkCentre M90. Intel Core i5, 16 Go RAM.', 4),
(18, 'Système Audio', 'Modèle : Bose Professional FreeSpace. Sonorisation claire pour salle de formation.', 3),
(19, 'Système de visioconférence', 'Modèle : Logitech Meetup. Caméra 4K, micros et haut-parleurs intégrés.', 1),
(20, 'Switch HDMI', 'Marque : Ugreen. Commutateur HDMI multi-sources pour réunions techniques.', 4),
(21, 'Tableau Blanc Mobile', 'Marque : Bi-Office. Tableau magnétique effaçable avec roulettes.', 1),
(22, 'Tableau Blanc Mural', 'Marque : Bi-Office. Tableau effaçable magnétique mural.', 4),
(23, 'Tableau Paperboard', 'Marque : Bi-Office. Support papier pour sessions de formation.', 3),
(24, 'Vidéoprojecteur HD', 'Modèle : BenQ MH535. 3 600 lumens, HDMI, idéal pour réunions.', 4),
(25, 'Vidéoprojecteur Laser', 'Modèle : Epson EB-PU1007W. 7 000 lumens, longue durée de vie, salle lumineuse.', 3);

-- --------------------------------------------------------

--
-- Table structure for table `reclamation`
--

CREATE TABLE `reclamation` (
  `id_rec` int(11) NOT NULL,
  `contenu` varchar(1000) NOT NULL,
  `date_rec` datetime NOT NULL DEFAULT current_timestamp(),
  `id_u` int(11) NOT NULL,
  `traitement` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reclamation`
--

INSERT INTO `reclamation` (`id_rec`, `contenu`, `date_rec`, `id_u`, `traitement`) VALUES
(1, 'Je souhaite signaler un dysfonctionnement technique nécessitant une intervention de maintenance sur la salle de réunion 2.', '2026-01-16 10:39:53', 3, 1),
(2, 'Bonjour, serait-il possible d’ajouter une nouvelle salle de réunion supplémentaire?', '2026-01-29 10:46:33', 6, 0),
(3, 'Bonjour, pourriez-vous m\'indiquer quand la salle de formation 1 sera disponible?', '2026-02-01 14:00:49', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `id_r` int(11) NOT NULL,
  `id_u` int(11) NOT NULL,
  `id_s` int(11) NOT NULL,
  `date_res` date NOT NULL,
  `heure_deb` time NOT NULL,
  `heure_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`id_r`, `id_u`, `id_s`, `date_res`, `heure_deb`, `heure_fin`) VALUES
(1, 6, 3, '2026-01-19', '10:00:00', '11:00:00'),
(2, 5, 4, '2026-01-22', '08:00:00', '10:00:00'),
(3, 3, 1, '2026-01-22', '16:00:00', '18:00:00'),
(4, 4, 3, '2026-01-23', '08:00:00', '09:00:00'),
(5, 8, 4, '2026-01-30', '09:00:00', '10:30:00'),
(6, 3, 1, '2026-01-07', '10:00:00', '11:00:00'),
(7, 10, 3, '2026-02-01', '08:30:00', '10:00:00'),
(8, 8, 4, '2026-02-07', '15:00:00', '16:00:00'),
(9, 3, 1, '2026-02-16', '10:00:00', '11:00:00'),
(10, 5, 3, '2026-02-20', '09:00:00', '10:30:00'),
(11, 4, 1, '2026-02-27', '08:00:00', '10:00:00'),
(12, 5, 1, '2026-03-02', '11:00:00', '12:00:00'),
(13, 6, 3, '2026-03-15', '10:00:00', '11:00:00'),
(14, 3, 1, '2026-04-02', '09:00:00', '10:00:00'),
(15, 10, 3, '2026-05-01', '10:00:00', '11:00:00'),
(16, 3, 3, '2026-03-07', '13:30:00', '14:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `salle`
--

CREATE TABLE `salle` (
  `id_s` int(11) NOT NULL,
  `nom` varchar(80) NOT NULL,
  `capacite` int(11) NOT NULL,
  `statut` enum('active','inactive') NOT NULL DEFAULT 'active',
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salle`
--

INSERT INTO `salle` (`id_s`, `nom`, `capacite`, `statut`, `description`) VALUES
(1, 'Salle de Réunion 1', 15, 'active', 'Salle principale dédiée aux réunions, présentations et visioconférences.'),
(2, 'Salle de Formation 1', 0, 'inactive', ''),
(3, 'Salle de Formation 2', 15, 'active', 'Salle équipée pour les formations internes, ateliers et démonstrations.'),
(4, 'Salle de Réunion 2', 8, 'active', 'Petite salle de réunion pour échanges rapides et réunions d’équipe.');

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id_u` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nom` varchar(60) NOT NULL,
  `prenom` varchar(60) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`id_u`, `username`, `email`, `password`, `nom`, `prenom`, `tel`, `role`) VALUES
(1, 'admin', 'admin@cmr-group.tn', 'Admin@2026', 'Saidi', 'Mohamed Rayen', '27256925', 'admin'),
(2, 'user', 'user@cmr-group.tn', 'User@cmrt2026', 'Fouleni', 'Foulen', '22156875', 'user'),
(3, 'saidi', 'rayensaidi897@gmail.com', 'Saidi@cmrt2026', 'Saidi', 'Mohamed Rayen', '50134054', 'user'),
(4, 'jihed_chraiti', 'jihedchraiti@cmrt.com', 'Jihed@cmrt2026', 'Chraiti', 'Jihed', '52014789', 'user'),
(5, 'wassim_houachri', 'wassimhouachri@cmrt.com', 'Wassim@cmrt2026', 'Houachri', 'Wassim', '96532874', 'user'),
(6, 'akrem_boulakbeche', 'akremboulakbeche@cmrt.com', 'Akrem@cmrt2026', 'Boulakbeche', 'Akrem', '29170536', 'user'),
(7, 'ichraf_dhiflaoui', 'ichrafdhiflaoui@cmrt.com', 'Ichraf@cmrt2026', 'Dhiflaoui', 'Ichraf', '93654821', 'user'),
(8, 'ayoub_frikha', 'ayoubfrikha@cmrt.com', 'Ayoub@cmrt2026', 'Frikha', 'Ayoub', '58427903', 'user'),
(9, 'mohamed_mastouri', 'mohamedmastouri@cmrt.com', 'Mohamed@cmrt2026', 'Mastouri', 'Mohamed', '27719385', 'user'),
(10, 'ameni_aloui', 'amenialoui@cmrt.com', 'Ameni@cmrt2026', 'Aloui', 'Ameni', '92168450', 'user'),
(11, 'khouloud_lahmmer', 'khouloudlahmmer@cmrt.com', 'Khouloud@cmrt2026', 'Lahmmer', 'Khouloud', '55207469', 'user'),
(12, 'roua_ben_abdallah', 'rouabenabdallah@cmrt.com', 'Roua@cmrt2026', 'Ben abdallah', 'Roua', '50783142', 'user'),
(13, 'dorra_sn', 'dorra_sn@cmrt.com', 'Dorrra@cmrt2026', 'Snene', 'Dorra', '20202020', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `equipement`
--
ALTER TABLE `equipement`
  ADD PRIMARY KEY (`id_equip`),
  ADD KEY `fk_equipement_salle` (`id_s`);

--
-- Indexes for table `reclamation`
--
ALTER TABLE `reclamation`
  ADD PRIMARY KEY (`id_rec`),
  ADD KEY `fk_reclamation_user` (`id_u`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id_r`),
  ADD KEY `fk_reservation_user` (`id_u`),
  ADD KEY `fk_reservation_salle` (`id_s`);

--
-- Indexes for table `salle`
--
ALTER TABLE `salle`
  ADD PRIMARY KEY (`id_s`);

--
-- Indexes for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id_u`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `equipement`
--
ALTER TABLE `equipement`
  MODIFY `id_equip` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `reclamation`
--
ALTER TABLE `reclamation`
  MODIFY `id_rec` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id_r` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `salle`
--
ALTER TABLE `salle`
  MODIFY `id_s` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_u` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `equipement`
--
ALTER TABLE `equipement`
  ADD CONSTRAINT `fk_equipement_salle` FOREIGN KEY (`id_s`) REFERENCES `salle` (`id_s`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `reclamation`
--
ALTER TABLE `reclamation`
  ADD CONSTRAINT `fk_reclamation_user` FOREIGN KEY (`id_u`) REFERENCES `utilisateur` (`id_u`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `fk_reservation_salle` FOREIGN KEY (`id_s`) REFERENCES `salle` (`id_s`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reservation_user` FOREIGN KEY (`id_u`) REFERENCES `utilisateur` (`id_u`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

<?php
require_once 'config/Database.php';

class Reservation {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function getAll() {
        $sql = "
            SELECT r.id_r, r.date_res, r.heure_deb, r.heure_fin,
                s.id_s, s.nom AS salle_nom,
                u.id_u, u.username
            FROM reservation r
            JOIN salle s ON s.id_s = r.id_s
            JOIN utilisateur u ON u.id_u = r.id_u
            ORDER BY r.date_res ASC, r.heure_deb ASC
        ";
        $r = $this->conn->prepare($sql);
        $r->execute();
        return $r->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getByIdAdmin($id_r) {
        $sql = "
            SELECT r.id_r, r.id_u, r.id_s, r.date_res, r.heure_deb, r.heure_fin,
                s.nom AS salle_nom,
                u.username
            FROM reservation r
            JOIN salle s ON s.id_s = r.id_s
            JOIN utilisateur u ON u.id_u = r.id_u
            WHERE r.id_r = :id
            LIMIT 1
        ";
        $r = $this->conn->prepare($sql);
        $r->execute([':id' => (int)$id_r]);
        return $r->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserIdByUsername($username) {
        $sql = "SELECT id_u
                FROM utilisateur
                WHERE username = :u AND role = 'user'
                LIMIT 1";
        $r = $this->conn->prepare($sql);
        $r->execute([':u' => $username]);
        $id = $r->fetchColumn();
        return $id ? (int)$id : 0;
    }

    public function getByUser($id_u) {
        $sql = "
            SELECT r.id_r, r.date_res, r.heure_deb, r.heure_fin,
                   s.id_s, s.nom AS salle_nom
            FROM reservation r
            JOIN salle s ON s.id_s = r.id_s
            WHERE r.id_u = :id_u AND (r.date_res > CURDATE()  OR (r.date_res = CURDATE() AND r.heure_fin > CURTIME()))
            ORDER BY r.date_res ASC, r.heure_deb ASC
        ";
        $r = $this->conn->prepare($sql);
        $r->execute([':id_u' => $id_u]);
        return $r->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id_r) {
        $sql = "SELECT * FROM reservation WHERE id_r = :id LIMIT 1";
        $r = $this->conn->prepare($sql);
        $r->execute([':id' => $id_r]);
        return $r->fetch(PDO::FETCH_ASSOC);
    }

    public function isSalleActive($id_s) {
        $sql = "SELECT statut FROM salle WHERE id_s = :id LIMIT 1";
        $r = $this->conn->prepare($sql);
        $r->execute([':id' => $id_s]);
        return $r->fetchColumn() === 'active';
    }

    public function estConflit($id_s, $date_res, $heure_deb, $heure_fin, $id_r = 0) {
        $sql = "
            SELECT COUNT(*)
            FROM reservation
            WHERE id_s = :id_s
              AND date_res = :date_res
              AND id_r <> :id_r
              AND NOT (heure_fin <= :heure_deb OR heure_deb >= :heure_fin)
        ";
        $r = $this->conn->prepare($sql);
        $r->execute([
            ':id_s' => $id_s,
            ':date_res' => $date_res,
            ':heure_deb' => $heure_deb,
            ':heure_fin' => $heure_fin,
            ':id_r' => $id_r
        ]);
        return ((int)$r->fetchColumn()) > 0;
    }

    public function add($id_u, $id_s, $date_res, $heure_deb, $heure_fin) {
        $sql = "INSERT INTO reservation(id_u, id_s, date_res, heure_deb, heure_fin)
                VALUES(:id_u, :id_s, :date_res, :heure_deb, :heure_fin)";
        $r = $this->conn->prepare($sql);
        return $r->execute([
            ':id_u' => $id_u,
            ':id_s' => $id_s,
            ':date_res' => $date_res,
            ':heure_deb' => $heure_deb,
            ':heure_fin' => $heure_fin
        ]);
    }

    public function update($id_r, $id_s, $date_res, $heure_deb, $heure_fin) {
        $sql = "UPDATE reservation
                SET id_s=:id_s, date_res=:date_res, heure_deb=:heure_deb, heure_fin=:heure_fin
                WHERE id_r=:id_r";
        $r = $this->conn->prepare($sql);
        return $r->execute([
            ':id_s' => $id_s,
            ':date_res' => $date_res,
            ':heure_deb' => $heure_deb,
            ':heure_fin' => $heure_fin,
            ':id_r' => $id_r
        ]);
    }

    public function updateAdmin($id_r, $id_u, $id_s, $date_res, $heure_deb, $heure_fin) {
        $sql = "UPDATE reservation SET id_u=:id_u, id_s=:id_s, date_res=:date_res, heure_deb=:heure_deb, heure_fin=:heure_fin
                WHERE id_r=:id_r";
        $r = $this->conn->prepare($sql);
        return $r->execute([
            ':id_u' => $id_u,
            ':id_s' => $id_s,
            ':date_res' => $date_res,
            ':heure_deb' => $heure_deb,
            ':heure_fin' => $heure_fin,
            ':id_r' => $id_r
        ]);
    }

    public function delete($id_r) {
        $r = $this->conn->prepare("DELETE FROM reservation WHERE id_r=:id");
        return $r->execute([':id' => $id_r]);
    }

    public function countAll() {
        $r = $this->conn->prepare("SELECT COUNT(*) FROM reservation");
        $r->execute();
        return (int)$r->fetchColumn();
    }

    public function countByUserToday($id_u) {
        $r = $this->conn->prepare("SELECT COUNT(*) FROM reservation WHERE id_u = :id_u AND DATE(date_res) = CURDATE()");
        $r->execute([':id_u' => $id_u]);
        return (int)$r->fetchColumn();
    }

    public function countByUserFuture($id_u) {
        $r = $this->conn->prepare("SELECT COUNT(*) FROM reservation WHERE id_u = :id_u AND DATE(date_res) > CURDATE()");
        $r->execute([':id_u' => $id_u]);
        return (int)$r->fetchColumn();
    }

    // public function deleteReservations() {
    //     $sql = "DELETE FROM reservation WHERE date_res < CURDATE()  OR (date_res = CURDATE() AND heure_fin < CURTIME())";
    //     $r = $this->conn->prepare($sql);
    //     return $r->execute();
    // }

    public function statsBySalle() {
        $sql = "
            SELECT 
                s.nom AS salle,
                COUNT(r.id_r) AS total
            FROM salle s
            LEFT JOIN reservation r ON r.id_s = s.id_s
            GROUP BY s.id_s, s.nom
            ORDER BY s.nom ASC
        ";
        $r = $this->conn->prepare($sql);
        $r->execute();
        return $r->fetchAll(PDO::FETCH_ASSOC);
    }

    public function statsByMois() {
        $sql = "
            SELECT 
                DATE_FORMAT(date_res, '%Y-%m') AS mois,
                COUNT(*) AS total
            FROM reservation
            GROUP BY DATE_FORMAT(date_res, '%Y-%m')
            ORDER BY mois ASC
        ";
        $r = $this->conn->prepare($sql);
        $r->execute();
        return $r->fetchAll(PDO::FETCH_ASSOC);
    }

    public function statsByUser() {
        $sql = "
            SELECT CONCAT(u.nom,' ',u.prenom) AS user, COUNT(r.id_r) AS total
            FROM utilisateur u
            LEFT JOIN reservation r ON r.id_u = u.id_u
            WHERE u.role = 'user'
            GROUP BY u.id_u, u.username
            ORDER BY total DESC, u.username ASC
        ";
        $r = $this->conn->prepare($sql);
        $r->execute();
        return $r->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBySalleDate($id_s, $date_res) {
        $sql = "
            SELECT heure_deb, heure_fin
            FROM reservation
            WHERE id_s = :id_s
            AND date_res = :date_res
            ORDER BY heure_deb ASC
        ";
        $r = $this->conn->prepare($sql);
        $r->execute([
            ':id_s' => (int)$id_s,
            ':date_res' => $date_res
        ]);
        return $r->fetchAll(PDO::FETCH_ASSOC);
    }

}

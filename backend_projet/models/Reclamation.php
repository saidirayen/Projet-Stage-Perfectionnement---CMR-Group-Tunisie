<?php
require_once 'config/Database.php';

class Reclamation {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function add($id_u, $contenu) {
        $sql = "INSERT INTO reclamation(id_u, contenu) VALUES(:id_u, :contenu)";
        $r = $this->conn->prepare($sql);
        return $r->execute([
            ':id_u' => (int)$id_u,
            ':contenu' => $contenu
        ]);
    }

    public function getAll() {
        $sql = "
            SELECT 
                rec.id_rec,
                rec.contenu,
                rec.date_rec,
                rec.traitement,
                u.id_u,
                u.nom,
                u.prenom,
                u.username
            FROM reclamation rec
            LEFT JOIN utilisateur u ON u.id_u = rec.id_u
            ORDER BY rec.traitement ASC, rec.date_rec DESC
        ";
        $r = $this->conn->prepare($sql);
        $r->execute();
        return $r->fetchAll(PDO::FETCH_ASSOC);
    }

    public function marquerTraite($id_rec) {
        $sql = "UPDATE reclamation SET traitement = 1 WHERE id_rec = :id";
        $r = $this->conn->prepare($sql);
        return $r->execute([':id' => (int)$id_rec]);
    }

    public function countNonTraite() {
        $sql = "SELECT COUNT(*) FROM reclamation WHERE traitement = 0";
        $r = $this->conn->prepare($sql);
        $r->execute();
        return (int)$r->fetchColumn();
    }
}

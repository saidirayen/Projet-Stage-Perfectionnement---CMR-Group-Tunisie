<?php
require_once 'config/Database.php';

class Salle {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function getAll() {
        $sql = "
            SELECT 
                s.id_s,
                s.nom,
                s.capacite,
                s.statut,
                s.description,
                GROUP_CONCAT(e.nom SEPARATOR ', ') AS equipements
            FROM salle s
            LEFT JOIN equipement e ON e.id_s = s.id_s
            GROUP BY s.id_s, s.nom, s.capacite, s.statut, s.description
            ORDER BY s.id_s ASC
        ";
        $r = $this->conn->prepare($sql);
        $r->execute();
        return $r->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getActive() {
        $sql = "
            SELECT id_s, nom, capacite, statut, description
            FROM salle
            WHERE statut='active'
            ORDER BY id_s ASC
        ";
        $r = $this->conn->prepare($sql);
        $r->execute();
        return $r->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $sql = "
            SELECT 
                s.id_s,
                s.nom,
                s.capacite,
                s.statut,
                s.description,
                GROUP_CONCAT(e.nom SEPARATOR ', ') AS equipements
            FROM salle s
            LEFT JOIN equipement e ON e.id_s = s.id_s
            WHERE s.id_s = :id
            GROUP BY s.id_s, s.nom, s.capacite, s.statut, s.description
            LIMIT 1
        ";
        $r = $this->conn->prepare($sql);
        $r->execute([':id' => $id]);
        return $r->fetch(PDO::FETCH_ASSOC);
    }

    public function add($nom, $capacite, $statut, $description) {
        $sql = "INSERT INTO salle(nom, capacite, statut, description)
                VALUES(:nom, :capacite, :statut, :description)";
        $r = $this->conn->prepare($sql);
        return $r->execute([
            ':nom' => $nom,
            ':capacite' => $capacite,
            ':statut' => $statut,
            ':description' => $description
        ]);
    }

    public function update($id, $nom, $capacite, $statut, $description) {
        $sql = "UPDATE salle
                SET nom=:nom, capacite=:capacite, statut=:statut, description=:description
                WHERE id_s=:id";
        $r = $this->conn->prepare($sql);
        return $r->execute([
            ':id' => $id,
            ':nom' => $nom,
            ':capacite' => $capacite,
            ':statut' => $statut,
            ':description' => $description
        ]);
    }

    public function delete($id) {
        $sql = "DELETE FROM salle WHERE id_s = :id";
        $r = $this->conn->prepare($sql);
        return $r->execute([':id' => $id]);
    }

    public function countAll() {
        $sql = "SELECT COUNT(*) as nb FROM salle";
        $r = $this->conn->prepare($sql);
        $r->execute();
        return (int)$r->fetchColumn();
        //return (int)$row['nb'];
    }

    public function countDisponible() {
        $sql = "SELECT COUNT(*) as nb FROM salle WHERE statut = 'active'";
        $r = $this->conn->prepare($sql);
        $r->execute();
        return (int)$r->fetchColumn();
    }

}

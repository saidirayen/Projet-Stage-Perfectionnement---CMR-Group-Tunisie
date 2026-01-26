<?php
require_once 'config/Database.php';

class Equipement {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function getAll() {
        $sql = "SELECT e.id_equip, e.nom, e.desc_equip, e.id_s, s.nom AS salle_nom
                FROM equipement e
                LEFT JOIN salle s ON s.id_s = e.id_s
                ORDER BY e.id_equip ASC";
        $r = $this->conn->prepare($sql);
        $r->execute();
        return $r->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $sql = "SELECT e.id_equip, e.nom, e.desc_equip, e.id_s, s.nom AS salle_nom
                FROM equipement e
                LEFT JOIN salle s ON s.id_s = e.id_s
                WHERE e.id_equip = :id
                LIMIT 1";
        $r = $this->conn->prepare($sql);
        $r->execute([':id' => $id]);
        return $r->fetch(PDO::FETCH_ASSOC);
    }

    public function add($nom, $desc_equip, $id_s) {
        $sql = "INSERT INTO equipement(nom, desc_equip, id_s) VALUES(:nom, :desc_equip, :id_s)";
        $r = $this->conn->prepare($sql);
        return $r->execute([
            ':nom' => $nom,
            ':desc_equip' => $desc_equip,
            ':id_s' => ($id_s === null ? null : (int)$id_s)
        ]);
    }

    public function update($id_equip, $nom, $desc_equip, $id_s) {
        $sql = "UPDATE equipement SET nom=:nom, desc_equip=:desc_equip, id_s=:id_s WHERE id_equip=:id";
        $r = $this->conn->prepare($sql);
        return $r->execute([
            ':id' => (int)$id_equip,
            ':nom' => $nom,
            ':desc_equip' => $desc_equip,
            ':id_s' => ($id_s === null ? null : (int)$id_s)
        ]);
    }

    public function delete($id) {
        $sql = "DELETE FROM equipement WHERE id_equip = :id";
        $r = $this->conn->prepare($sql);
        return $r->execute([':id' => (int)$id]);
    }

    public function countAll() {
        $sql = "SELECT COUNT(*) as nb FROM equipement";
        $r = $this->conn->prepare($sql);
        $r->execute();
        return (int)$r->fetchColumn();
    }
}

<?php
require_once 'config/Database.php';

class Utilisateur {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function getAllUsers() {
        $sql = "SELECT id_u, username, email, password, nom, prenom, tel, role
                FROM utilisateur
                WHERE role = 'user'
                ORDER BY id_u ASC";
        $r = $this->conn->prepare($sql);
        $r->execute();
        return $r->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id_u) {
        $sql = "SELECT id_u, username, email, password, nom, prenom, tel, role
                FROM utilisateur
                WHERE id_u = :id AND role='user'
                LIMIT 1";
        $r = $this->conn->prepare($sql);
        $r->execute([':id' => (int)$id_u]);
        return $r->fetch(PDO::FETCH_ASSOC);
    }

    public function getByUsername($username) {
        $sql = "SELECT id_u, username, role
                FROM utilisateur
                WHERE username = :u
                LIMIT 1";
        $r = $this->conn->prepare($sql);
        $r->execute([':u' => $username]);
        return $r->fetch(PDO::FETCH_ASSOC);
    }

    public function existe($username, $email, $id = 0) {
        $sql = "SELECT id_u
                FROM utilisateur
                WHERE (username = :u OR email = :e)
                  AND id_u <> :id
                LIMIT 1";
        $r = $this->conn->prepare($sql);
        $r->execute([
            ':u' => $username,
            ':e' => $email,
            ':id' => (int)$id
        ]);
        return $r->fetch(PDO::FETCH_ASSOC) ? true : false;
    }

    public function addUser($username, $email, $password, $nom, $prenom, $tel) {
        $sql = "INSERT INTO utilisateur(username, email, password, nom, prenom, tel, role)
                VALUES(:username, :email, :password, :nom, :prenom, :tel, 'user')";
        $r = $this->conn->prepare($sql);
        return $r->execute([
            ':username' => $username,
            ':email' => $email,
            ':password' => $password,
            ':nom' => $nom,
            ':prenom' => $prenom,
            ':tel' => $tel
        ]);
    }

    public function updateUser($id_u, $username, $email, $password, $nom, $prenom, $tel) {
        $sql = "UPDATE utilisateur
                SET username=:username, email=:email, password=:password, nom=:nom, prenom=:prenom, tel=:tel
                WHERE id_u=:id AND role='user'";
        $r = $this->conn->prepare($sql);
        return $r->execute([
            ':id' => (int)$id_u,
            ':username' => $username,
            ':email' => $email,
            ':password' => $password,
            ':nom' => $nom,
            ':prenom' => $prenom,
            ':tel' => $tel
        ]);
    }

    public function deleteUser($id_u) {
        $sql = "DELETE FROM utilisateur WHERE id_u=:id AND role='user'";
        $r = $this->conn->prepare($sql);
        return $r->execute([':id' => (int)$id_u]);
    }

    public function countUsers() {
        $sql = "SELECT COUNT(*) FROM utilisateur WHERE role='user'";
        $r = $this->conn->prepare($sql);
        $r->execute();
        return (int)$r->fetchColumn();
    }
}

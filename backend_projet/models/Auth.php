<?php
require_once 'config/Database.php';

class Auth {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function login($username, $password) {
        $sql = "SELECT id_u, username, role
                FROM utilisateur
                WHERE username = :username AND password = :password
                LIMIT 1";
        $r = $this->conn->prepare($sql);
        $r->execute([
            ':username' => $username,
            ':password' => $password
        ]);
        return $r->fetch(PDO::FETCH_ASSOC);
    }

    public function existe($username, $email){
        $sql = "SELECT id_u FROM utilisateur WHERE username = :u OR email = :e LIMIT 1";
        $r = $this->conn->prepare($sql);
        $r->execute([':u' => $username, ':e' => $email]);
        return $r->fetch(PDO::FETCH_ASSOC) ? true : false;
    }

    public function inscrire($username, $email, $password, $nom, $prenom, $tel){
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

    public function getProfile($username) {
        $sql = "SELECT id_u, username, email, password, nom, prenom, tel, role
                FROM utilisateur
                WHERE username = :username
                LIMIT 1";
        $r = $this->conn->prepare($sql);
        $r->execute([':username' => $username]);
        return $r->fetch(PDO::FETCH_ASSOC);
    }

    public function getPassword($username) {
        $sql = "SELECT password FROM utilisateur WHERE username = :username LIMIT 1";
        $r = $this->conn->prepare($sql);
        $r->execute([':username' => $username]);
        $p = $r->fetch(PDO::FETCH_ASSOC);
        return $p ? $p : null;
    }

    public function updatePassword($username, $password) {
        $sql = "UPDATE utilisateur SET password = :p WHERE username = :u";
        $r = $this->conn->prepare($sql);
        return $r->execute([
            ':p' => $password,
            ':u' => $username
        ]);
    }

}

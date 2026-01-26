<?php
require_once 'models/Utilisateur.php';

class UtilisateurController {
    private $model;

    public function __construct() {
        $this->model = new Utilisateur();
    }

    public function list() {
        echo json_encode($this->model->getAllUsers());
    }

    public function get() {
        $id = $_GET['id'];
        $u = $this->model->getById((int)$id);
        echo json_encode($u ? $u : "erreur");
    }

    public function add() {
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $nom = $_POST['nom'];
        $prenom = $_POST['prenom'];
        $tel = $_POST['tel'];

        if($this->model->existe($username, $email, 0)) {
            echo json_encode("existe"); return;
        }

        $ok = $this->model->addUser($username, $email, $password, $nom, $prenom, $tel);
        echo json_encode($ok ? "ok" : "erreur");
    }

    public function update() {
        $id = $_POST['id_u'];
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $nom = $_POST['nom'];
        $prenom = $_POST['prenom'];
        $tel = $_POST['tel'];

        if($this->model->existe($username, $email, (int)$id)) {
            echo json_encode("existe"); return;
        }

        $ok = $this->model->updateUser((int)$id, $username, $email, $password, $nom, $prenom, $tel);
        echo json_encode($ok ? "ok" : "erreur");
    }

    public function delete() {
        $id = $_GET['id'];
        $ok = $this->model->deleteUser((int)$id);
        echo json_encode($ok ? "ok" : "erreur");
    }

    public function count() {
        echo json_encode($this->model->countUsers());
    }
}

<?php
require_once 'models/Auth.php';

class AuthController {
    private $model;

    public function __construct() {
        $this->model = new Auth();
    }

    public function session(){
        if(isset($_SESSION['username']) && isset($_SESSION['role'])){
            echo json_encode([
            "username" => $_SESSION['username'],
            "role" => $_SESSION['role']
            ]);
        } else {
            echo json_encode("");
        }
}

    public function logout(){
        session_unset();
        session_destroy();
        echo json_encode("ok");
    }

    public function login(){
        $username = $_POST['username'];
        $password = $_POST['password'];

        $user = $this->model->login($username,$password);

        if($user != null){
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];
            echo json_encode($user['role']);
        } else {
            echo json_encode("erreur");
        }
    }

    public function inscrire(){
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $nom = $_POST['nom'];
        $prenom = $_POST['prenom'];
        $tel = $_POST['tel'];

        if($this->model->existe($username, $email)){
            echo json_encode("existe");
            return;
        }

        $ok = $this->model->inscrire($username,$email,$password,$nom,$prenom,$tel);
        echo json_encode($ok ? "ok" : "erreur");
    }


    public function profile(){
        $username = $_GET['username'];
        $u = $this->model->getProfile($username);
        if($u!=null){
            echo json_encode($u);
        } else {
            echo json_encode("erreur");
        }
    }

    public function getPassword(){
        $username = $_GET['username'] ?? '';
        if($username == '') { echo json_encode("erreur"); return; }

        $p = $this->model->getPassword($username);
        echo json_encode($p ? $p : "erreur");
    }

    public function updatePassword(){
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';

        if($username == '' || $password == '') { echo json_encode("erreur"); return; }

        $ok = $this->model->updatePassword($username, $password);
        echo json_encode($ok ? "ok" : "erreur");
    }

}

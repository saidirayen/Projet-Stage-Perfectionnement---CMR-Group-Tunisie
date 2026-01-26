<?php
require_once 'models/Salle.php';

class SalleController{
    private $model;

    public function __construct() {
        $this->model = new Salle();
    }

    public function list() {
        echo json_encode($this->model->getAll());
    }

    public function listActive() {
        echo json_encode($this->model->getActive());
    }

    public function get() {
        $id = $_GET['id'];
        $s = $this->model->getById((int)$id);
        echo json_encode($s ? $s : "erreur");
    }

    public function add() {
        $nom = $_POST['nom'];
        $capacite = $_POST['capacite'];
        $statut = $_POST['statut'] ?? 'active';
        $description = $_POST['description'] ;

        $ok = $this->model->add($nom, (int)$capacite, $statut, $description);
        echo json_encode($ok ? "ok" : "erreur");
    }

    public function update() {
        $id = $_POST['id_s'];
        $nom = $_POST['nom'];
        $capacite = $_POST['capacite'];
        $statut = $_POST['statut'];
        $description = $_POST['description'];

        $ok = $this->model->update((int)$id, $nom, (int)$capacite, $statut, $description);
        echo json_encode($ok ? "ok" : "erreur");
    }

    public function delete() {
        $id = $_GET['id'];
        $ok = $this->model->delete((int)$id);
        echo json_encode($ok ? "ok" : "erreur");
    }

    public function count() {
        echo json_encode($this->model->countAll());
    }

    public function countDisponible() {
        echo json_encode($this->model->countDisponible());
    }
}

<?php
require_once 'models/Reclamation.php';

class ReclamationController {
    private $model;

    public function __construct() {
        $this->model = new Reclamation();
    }

    public function add() {
        $id_u = $_POST['id_u'];
        $contenu = trim($_POST['contenu']);
        $ok = $this->model->add((int)$id_u, $contenu);
        echo json_encode($ok ? "ok" : "erreur");
    }

    public function addAnonyme() {
        $contenu = trim($_POST['contenu']);
        $ok = $this->model->addAnonyme($contenu);
        echo json_encode($ok ? "ok" : "erreur");
    }

    public function getAll() {
        echo json_encode($this->model->getAll());
    }

    public function marquerTraite() {
        $id = $_POST['id_rec'];
        $ok = $this->model->marquerTraite((int)$id);
        echo json_encode($ok ? "ok" : "erreur");
    }

    public function countNonTraite() {
        echo json_encode($this->model->countNonTraite());
    }
}

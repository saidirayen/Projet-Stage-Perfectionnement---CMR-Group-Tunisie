<?php
require_once 'models/Equipement.php';

class EquipementController {
    private $model;

    public function __construct() {
        $this->model = new Equipement();
    }

    public function list() {
        echo json_encode($this->model->getAll());
    }

    public function get() {
        $id = $_GET['id'];

        $e = $this->model->getById((int)$id);
        echo json_encode($e ? $e : "erreur");
    }

    public function add() {
        $nom = $_POST['nom'];
        $desc_equip = $_POST['desc_equip'] ?? '';
        $id_s = $_POST['id_s'] ?? '';

        $id_s = ($id_s === '' ? null : (int)$id_s);

        $ok = $this->model->add($nom, $desc_equip, $id_s);
        echo json_encode($ok ? "ok" : "erreur");
    }

    public function update() {
        $id = $_POST['id_equip'];
        $nom = $_POST['nom'];
        $desc_equip = $_POST['desc_equip'] ?? '';
        $id_s = $_POST['id_s'] ?? '';

        $id_s = ($id_s === '' ? null : (int)$id_s);

        $ok = $this->model->update((int)$id, $nom, $desc_equip, $id_s);
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
}

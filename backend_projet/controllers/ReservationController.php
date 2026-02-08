<?php
require_once 'models/Reservation.php';

class ReservationController {
    private $model;

    public function __construct() {
        $this->model = new Reservation();
        // $this->model->deleteReservations();
    }

    public function listByUser() {
        $id_u = $_GET['id_u'] ?? '';
        if($id_u == '') { echo json_encode("erreur"); return; }
        echo json_encode($this->model->getByUser((int)$id_u));
    }

    public function get() {
        $id = $_GET['id'] ?? '';
        if($id == '') { echo json_encode("erreur"); return; }
        $r = $this->model->getById((int)$id);
        echo json_encode($r ? $r : "erreur");
    }

    private function minutes($t) {
        $parts = explode(':',$t);
        $h = (int)$parts[0];
        $m = (int)$parts[1];
        if($h < 0 || $h > 23) 
            return -1;
        if($m < 0 || $m > 59) 
            return -1;
        return $h*60+$m;
    }

    private function verifierTemps($heure_deb, $heure_fin) {
        $deb = $this->minutes($heure_deb);
        $fin = $this->minutes($heure_fin);
        if($deb < 0 || $fin < 0)
            return "erreur_heure_format";
        $mDeb = $deb % 60;
        $mFin = $fin % 60;
        if(!(($mDeb === 0 || $mDeb === 30) && ($mFin === 0 || $mFin === 30))) {
            return "erreur_minutes";
        }
        $open = 8 * 60; // 08:00
        $close = 19 * 60; // 19:00
        if($deb < $open || $fin > $close){
            return "erreur_plage";
        }
        return "ok";
    }

    public function add() {
        $id_u = $_POST['id_u'];
        $id_s = $_POST['id_s'];
        $date_res = $_POST['date_res'];
        $heure_deb = $_POST['heure_deb'];
        $heure_fin = $_POST['heure_fin'];

        $currentDate = date('Y-m-d');
        $currentTime = date('H:i:s');

        if(!$this->model->isSalleActive((int)$id_s)){
            echo json_encode("erreur_salle"); return;
        }

        if(strtotime($date_res) < strtotime($currentDate) || ($date_res == $currentDate && strtotime($heure_deb) < strtotime($currentTime))){
            echo json_encode("erreur_date"); return;
        }

        if(strtotime($heure_deb) >= strtotime($heure_fin)){
            echo json_encode("erreur_heure"); return;
        }

        $time = $this->verifierTemps($heure_deb, $heure_fin);
        if($time !== "ok"){
            echo json_encode($time);
            return;
        }

        if($this->model->estConflit((int)$id_s, $date_res, $heure_deb, $heure_fin)){
            echo json_encode("erreur_conflit"); return;
        }

        $ok = $this->model->add((int)$id_u, (int)$id_s, $date_res, $heure_deb, $heure_fin);
        echo json_encode($ok ? "ok" : "erreur");
    }

    public function update() {
        $id_r = $_POST['id_r'];
        $id_s = $_POST['id_s'];
        $date_res = $_POST['date_res'];
        $heure_deb = $_POST['heure_deb'];
        $heure_fin = $_POST['heure_fin'];

        $currentDate = date('Y-m-d');
        $currentTime = date('H:i:s');

        if(!$this->model->isSalleActive((int)$id_s)){
            echo json_encode("erreur_salle"); return;
        }

        if(strtotime($date_res) < strtotime($currentDate) || ($date_res == $currentDate && strtotime($heure_deb) < strtotime($currentTime))){
            echo json_encode("erreur_date"); return;
        }

        if(strtotime($heure_deb) >= strtotime($heure_fin)){
            echo json_encode("erreur_heure"); return;
        }

        $time = $this->verifierTemps($heure_deb, $heure_fin);
        if($time !== "ok"){
            echo json_encode($time);
            return;
        }

        if($this->model->estConflit((int)$id_s, $date_res, $heure_deb, $heure_fin, (int)$id_r)){
            echo json_encode("erreur_conflit"); return;
        }

        $ok = $this->model->update((int)$id_r, (int)$id_s, $date_res, $heure_deb, $heure_fin);
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

    public function countByUserToday() {
        $id_u = $_GET['id_u'];
        echo json_encode($this->model->countByUserToday((int)$id_u));
    }

    public function countByUserFuture() {
        $id_u = $_GET['id_u'];
        echo json_encode($this->model->countByUserFuture((int)$id_u));
    }

    // partie admin

    public function getAll() {
        echo json_encode($this->model->getAll());
    }

    public function getReservationByAdmin() {
        $id = $_GET['id'];
        $r = $this->model->getByIdAdmin((int)$id);
        echo json_encode($r ? $r : "erreur");
    }

    public function addAdmin() {
        $username = $_POST['username'];
        $id_s = $_POST['id_s'];
        $date_res = $_POST['date_res'];
        $heure_deb = $_POST['heure_deb'];
        $heure_fin = $_POST['heure_fin'];

        $currentDate = date('Y-m-d');
        $currentTime = date('H:i:s');

        $id_s = (int)$id_s;

        if (!$this->model->isSalleActive($id_s)) {
            echo json_encode("erreur_salle"); return;
        }

        if(strtotime($date_res) < strtotime($currentDate) || ($date_res == $currentDate && strtotime($heure_deb) < strtotime($currentTime))){
            echo json_encode("erreur_date"); return;
        }

        if (strtotime($heure_deb) >= strtotime($heure_fin)) {
            echo json_encode("erreur_heure"); return;
        }

        $id_u = $this->model->getUserIdByUsername($username);
        if ($id_u === 0) {
            echo json_encode("erreur_user"); return;
        }

        $time = $this->verifierTemps($heure_deb, $heure_fin);
        if($time !== "ok"){
            echo json_encode($time);
            return;
        }

        if ($this->model->estConflit($id_s, $date_res, $heure_deb, $heure_fin)) {
            echo json_encode("erreur_conflit"); return;
        }

        $ok = $this->model->add($id_u, $id_s, $date_res, $heure_deb, $heure_fin);
        echo json_encode($ok ? "ok" : "erreur");
    }

    public function updateAdmin() {
        $id_r = $_POST['id_r'];
        $username = $_POST['username'];
        $id_s = $_POST['id_s'];
        $date_res = $_POST['date_res'];
        $heure_deb = $_POST['heure_deb'];
        $heure_fin = $_POST['heure_fin'];

        $currentDate = date('Y-m-d');
        $currentTime = date('H:i:s');

        $id_r = (int)$id_r;
        $id_s = (int)$id_s;

        if (!$this->model->isSalleActive($id_s)) {
            echo json_encode("erreur_salle"); return;
        }

        if(strtotime($date_res) < strtotime($currentDate) || ($date_res == $currentDate && strtotime($heure_deb) < strtotime($currentTime))){
            echo json_encode("erreur_date"); return;
        }

        if (strtotime($heure_deb) >= strtotime($heure_fin)) {
            echo json_encode("erreur_heure"); return;
        }

        $id_u = $this->model->getUserIdByUsername($username);
        if ($id_u === 0) {
            echo json_encode("erreur_user"); return;
        }

        $time = $this->verifierTemps($heure_deb, $heure_fin);
        if($time !== "ok"){
            echo json_encode($time);
            return;
        }

        if ($this->model->estConflit($id_s, $date_res, $heure_deb, $heure_fin, $id_r)) {
            echo json_encode("erreur_conflit"); return;
        }

        $ok = $this->model->updateAdmin($id_r, $id_u, $id_s, $date_res, $heure_deb, $heure_fin);
        echo json_encode($ok ? "ok" : "erreur");
    }

    public function statsBySalle() {
        echo json_encode($this->model->statsBySalle());
    }

    public function statsByMois() {
        echo json_encode($this->model->statsByMois());
    }

    public function statsByUser() {
        echo json_encode($this->model->statsByUser());
    }

    public function listBySalleDate() {
        $id_s = $_GET['id_s'];
        $date_res = $_GET['date_res'];
        echo json_encode($this->model->getBySalleDate((int)$id_s, $date_res));
    }

}

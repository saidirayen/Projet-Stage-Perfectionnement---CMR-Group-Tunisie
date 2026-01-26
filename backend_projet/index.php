<?php
header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

session_start();

$controller = $_GET['controller'] ?? 'auth';
$action = $_GET['action'] ?? 'login';

switch($controller) {
    case 'auth':
        require_once 'controllers/AuthController.php';
        $c = new AuthController();
        break;
    case 'salle':
        require_once 'controllers/SalleController.php';
        $c = new SalleController();
        break;
    case 'equipement':
        require_once 'controllers/EquipementController.php';
        $c = new EquipementController();
        break;
    case 'reservation':
        require_once 'controllers/ReservationController.php';
        $c = new ReservationController();
        break;
    case 'utilisateur':
        require_once 'controllers/UtilisateurController.php';
        $c = new UtilisateurController();
        break;
    case 'reclamation':
        require_once 'controllers/ReclamationController.php';
        $c = new ReclamationController();
        break;
    default:
        echo json_encode(["error" => "Controller introuvable"]);
        exit;
}

if (!method_exists($c, $action)) {
    echo json_encode(["error" => "Action introuvable"]);
    exit;
}

$c->$action();

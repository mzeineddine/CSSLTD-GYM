<?php
    require_once __DIR__ . "/../../models/Coach.php";
    class Coach_Controller{
        // CRUD APIs Functions
        static function create(){
            $data = json_decode(file_get_contents("php://input"),true);
            $coach = Coach::create($data);
        }
        static function read(){
            $data = json_decode(file_get_contents("php://input"),true);
            $coach = Coach::read($data);
            echo json_encode([
                "result" => boolval($coach),
                "message" => $coach ? "coach/s found":"no coachs found",
                "data" => $coach
            ]);
        }
        static function update(){
            $data = json_decode(file_get_contents("php://input"),true);
            $updated = Coach::update($data);
            echo json_encode([
                "result" => $updated,
                "message" => $updated?"Coach updated successfully":"Coach not updated",
            ]);
        }
        static function delete(){
            $data = json_decode(file_get_contents("php://input"),true);
            $deleted = Coach::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Coach deleted successfully":"Coach not deleted",
            ]);
        }
    }
?>
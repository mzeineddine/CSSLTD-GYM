<?php
    require_once __DIR__ . "/../../models/User.php";
    require_once __DIR__ . "/../../models/Coach.php";
    require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
    class Coach_Controller{
        static function check_created_by($data){
            if(!User::read($data)){
                echo json_encode([
                    "result"=>false,
                    "message"=>"Invalid user_id"
                ]);
                return false;
            }
            return true;
        } 
        // CRUD APIs Functions
        static function create(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["full_name","contact","address","dob", "created_by"]))
                return false;
            $modified_data = ["id"=>$data["created_by"]];
            if(self::check_created_by($modified_data)){
                $created = Coach::create($data);
                echo json_encode([
                    "result" => $created,
                    "message" => $created?"Coach created successfully":"Coach not updated",
                ]);
            }
            return false;
        }
        static function read(){
            $data = json_decode(file_get_contents("php://input"),true);
            // if(!Controllers_Utilities::check_params($data,["id"]))
            //     return false;
            $coach = Coach::read($data);
            echo json_encode([
                "result" => boolval($coach),
                "message" => $coach ? "coach/s found":"no coaches found",
                "data" => $coach
            ]);
            return $coach;
        }
        static function update(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id","full_name","contact","address","dob"]))
                return false;

            if(Coach::read($data)){
                echo json_encode([
                    "result" => false,
                    "message" => "No coaches found"
                ]);
                return false;
            }

            $updated = Coach::update($data);
            echo json_encode([
                "result" => $updated,
                "message" => $updated?"Coach updated successfully":"Coach not updated",
            ]);
            return $updated;
        }
        static function delete(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id"]))
                return false;
            $coach=Coach::read($data);
            if(!$coach){
                echo json_encode([
                    "result" => boolval($coach),
                    "message" => $coach ? "coach/s found":"no coaches found",
                    "data" => $coach
                ]);
                return false;
            }
            $deleted = Coach::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Coach deleted successfully":"Coach not deleted",
            ]);
            return $deleted;
        }
    }
?>
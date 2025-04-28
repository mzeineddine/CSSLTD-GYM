<?php
    require_once __DIR__ . "/../../models/User.php";
    require_once __DIR__ . "/../../models/Log.php";
    require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
    class Log_Controller{
        static function check_created_by($data){
            if(!User::read($data)){
                echo json_encode([
                    "result"=>false,
                    "message"=>"Invalid user"
                ]);
                return false;
            }
            return true;
        } 
        // CRUD APIs Functions
        static function create(){
            $data = json_decode(file_get_contents("php://input"),true);
            $decoded_token = Controllers_Utilities::check_jwt();
            if(!$decoded_token){
                return false;
            }
            $data['created_by']=$decoded_token->id;
            if(!Controllers_Utilities::check_params($data,["action","description","created_by"]))
                return false;
            $modified_data = ["id"=>$data["created_by"]];
            if(self::check_created_by($modified_data)){
                $created = Log::create($data);
                echo json_encode([
                    "result" => $created,
                    "message" => $created?"Log created successfully":"Log not created",
                ]);
            }
            return false;
        }
        static function read(){
            $decoded_token = Controllers_Utilities::check_jwt();
            if(!$decoded_token){
                return false;
            }
            $data = json_decode(file_get_contents("php://input"),true);
            // if(!Controllers_Utilities::check_params($data,["id"]))
            //     return false;
            $log = Log::read($data);
            echo json_encode([
                "result" => boolval($log),
                "message" => $log ? "Log found":"No logs found",
                "data" => $log
            ]);
        }
        static function update(){
            $decoded_token = Controllers_Utilities::check_jwt();
            if(!$decoded_token){
                return false;
            }
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id","action","description"]))
                return false;
            if(!Log::read($data)){
                echo json_encode([
                    "result" => false,
                    "message" => "No log found"
                ]);
                return false;
            }
            // $modified_data = ["id"=>$data["created_by"]];
            // if(self::check_created_by($modified_data)){
                $updated = Log::update($data);
                echo json_encode([
                    "result" => $updated,
                    "message" => $updated?"Log updated successfully":"Log not updated",
                ]);
            // }
            return $updated;
        }
        static function delete(){
            $decoded_token = Controllers_Utilities::check_jwt();
            if(!$decoded_token){
                return false;
            }
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id"]))
                return false;
            $log=Log::read($data);
            if(!$log){
                echo json_encode([
                    "result" => false,
                    "message" => "No logs found"
                ]);
                return false;
            }
            $deleted = log::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Log deleted successfully":"Log  not deleted",
            ]);
            return $deleted;
        }
    }
?>
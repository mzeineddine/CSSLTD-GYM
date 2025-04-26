<?php
    require_once __DIR__ . "/../../models/User.php";
    require_once __DIR__ . "/../../models/Log.php";
    require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
    class Log_Controller{
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
            $data = json_decode(file_get_contents("php://input"),true);
            // if(!Controllers_Utilities::check_params($data,["id"]))
            //     return false;
            $log = Log::read($data);
            echo json_encode([
                "result" => boolval($log),
                "message" => $log ? "log found":"no logs found",
                "data" => $log
            ]);
        }
        static function update(){
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
                    "message" => $updated?"Log updated successfully":"log not updated",
                ]);
            // }
            return $updated;
        }
        static function delete(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id"]))
                return false;
            $log=Log::read($data);
            if(!$log){
                echo json_encode([
                    "result" => boolval($log),
                    "message" => $log ? "log found":"no logs found",
                    "data" => $log
                ]);
                return false;
            }
            $deleted = log::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Log deleted successfully":"log  not deleted",
            ]);
        }
    }
?>
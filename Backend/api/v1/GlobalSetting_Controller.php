<?php
    require_once __DIR__ . "/../../models/User.php";
    require_once __DIR__ . "/../../models/GlobalSetting.php";
    require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
    class GlobalSetting_Controller{
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
            if(!Controllers_Utilities::check_params($data,["logo","name","phone_nb","created_by"]))
                return false;
            $modified_data = ["id"=>$data["created_by"]];
            if(self::check_created_by($modified_data)){
                $created = GlobalSetting::create($data);
                echo json_encode([
                    "result" => $created,
                    "message" => $created?"Global settings created successfully":"Global settings not created",
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
            $global_setting = GlobalSetting::read($data);
            echo json_encode([
                "result" => boolval($global_setting),
                "message" => $global_setting ? "Global settings found":"No global settings found",
                "data" => $global_setting
            ]);
        }
        static function update(){
            $decoded_token = Controllers_Utilities::check_jwt();
            if(!$decoded_token){
                return false;
            }
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id","logo","name","phone_nb"]))
                return false;
            if(!GlobalSetting::read($data)){
                echo json_encode([
                    "result" => false,
                    "message" => "No global settings found"
                ]);
                return false;
            }
            // $modified_data = ["id"=>$data["created_by"]];
            // if(self::check_created_by($modified_data)){
                $updated = GlobalSetting::update($data);
                echo json_encode([
                    "result" => $updated,
                    "message" => $updated?"Global setting updated successfully":"Global setting not updated",
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
            $global_setting=GlobalSetting::read($data);
            if(!$global_setting){
                echo json_encode([
                    "result" => false,
                    "message" => "No global settings found"
                ]);
                return false;
            }
            $deleted = GlobalSetting::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Global setting deleted successfully":"Global setting not deleted",
            ]);
            return $deleted;
        }
    }
?>
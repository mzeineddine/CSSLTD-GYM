<?php
    require_once __DIR__ . "/../../models/User.php";
    require_once __DIR__ . "/../../models/Member.php";
    require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
    class Member_Controller{
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
                $created = Member::create($data);
                echo json_encode([
                    "result" => $created,
                    "message" => $created?"Member created successfully":"Member not updated",
                ]);
            }
            return false;
        }
        static function read(){
            $data = json_decode(file_get_contents("php://input"),true);
            // if(!Controllers_Utilities::check_params($data,["id"]))
            //     return false;
            $member = Member::read($data);
            echo json_encode([
                "result" => boolval($member),
                "message" => $member ? "member/s found":"no members found",
                "data" => $member
            ]);
        }
        static function update(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id","full_name","contact","address","dob"]))
                return false;
            $modified_data = ["id"=>$data["created_by"]];
            if(self::check_created_by($modified_data)){
                $updated = Member::update($data);
                echo json_encode([
                    "result" => $updated,
                    "message" => $updated?"Member updated successfully":"Member not updated",
                ]);
            }
            return false;
        }
        static function delete(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id"]))
                return false;
            $member=Member::read($data);
            if(!$member){
                echo json_encode([
                    "result" => boolval($member),
                    "message" => $member ? "member found":"no members found",
                    "data" => $member
                ]);
                return false;
            }
            $deleted = Member::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Member deleted successfully":"Member not deleted",
            ]);
        }
    }
?>
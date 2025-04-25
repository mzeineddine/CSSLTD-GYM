<?php
    require_once __DIR__ . "/../../models/User.php";
    require_once __DIR__ . "/../../models/Class.php";
    require_once __DIR__ . "/../../models/ClassMember.php";
    require_once __DIR__ . "/../../models/Member.php";
    require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
    class ClassMember_Controller{
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
        static function check_class($data){
            if(!Classes::read($data)){
                echo json_encode([
                    "result"=>false,
                    "message"=>"Invalid Class"
                ]);
                return false;
            }
            return true;
        } 

        static function check_member($data){
            if(!Member::read($data)){
                echo json_encode([
                    "result"=>false,
                    "message"=>"Invalid member"
                ]);
                return false;
            }
            return true;
        } 
        // CRUD APIs Functions
        static function create(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,['class_id','member_id','created_by']))
                return false;
            $modified_data = ["id"=>$data["created_by"]];
            if(self::check_created_by($modified_data)){
                $modified_data = ["id"=>$data["class_id"]];
                if(self::check_class($modified_data)){
                    $modified_data = ["id"=>$data["member_id"]];
                    if(self::check_member($modified_data)){
                        $created = ClassMember::create($data);
                        echo json_encode([
                            "result" => $created,
                            "message" => $created?"Class member created successfully":"Class member not created",
                        ]);
                        return $created;
                    }return false;
                }return false;
            }return false;
        }
        static function read(){
            $data = json_decode(file_get_contents("php://input"),true);
            // if(!Controllers_Utilities::check_params($data,["id"]))
            //     return false;
            $class_member = ClassMember::read($data);
            echo json_encode([
                "result" => boolval($class_member),
                "message" => $class_member ? "Class member found":"no class members found",
                "data" => $class_member
            ]);
            return boolval($class_member);
        }
        static function update(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["member_id","class_id","id"]))
                return false;
            if(!ClassMember::read($data)){
                echo json_encode([
                    "result" => false,
                    "message" => "No class member found"
                ]);
                return false;
            }
            $modified_data["id"]=$data["class_id"];
            if(self::check_class($modified_data)){
                $modified_data["id"]=$data["member_id"];
                if(self::check_member($modified_data)){
                    $updated = ClassMember::update($data);
                    echo json_encode([
                        "result" => $updated,
                        "message" => $updated?"Class member updated successfully":"Class member not updated",
                    ]);
                    return $updated;
                }return false;
            }return false;
        }
        static function delete(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id"]))
                return false;
            $class=ClassMember::read($data);
            if(!$class){
                echo json_encode([
                    "result" => boolval($class),
                    "message" => $class ? "Class member found":"no class members found",
                    "data" => $class
                ]);
                return false;
            }
            $deleted = ClassMember::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Class member deleted successfully":"Class member not deleted",
            ]);
            return $deleted;
        }
    }
?>
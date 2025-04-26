<?php
    require_once __DIR__ . "/../../models/User.php";
    require_once __DIR__ . "/../../models/ClassMember.php";
    require_once __DIR__ . "/../../models/ClassMemberAttendance.php";
    require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
    class ClassMemberAttendance_Controller{
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
        static function check_class_member($data){
            if(!ClassMember::read($data)){
                echo json_encode([
                    "result"=>false,
                    "message"=>"Invalid class member"
                ]);
                return false;
            }
            return true;
        } 
        // CRUD APIs Functions
        static function create(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,['class_member_id','class_date','member_attend','created_by']))
                return false;
            $modified_data = ["id"=>$data["created_by"]];
            if(self::check_created_by($modified_data)){
                $modified_data = ["id"=>$data["class_member_id"]];
                if(self::check_class_member($modified_data)){
                    $created = ClassMemberAttendance::create($data);
                    echo json_encode([
                        "result" => $created,
                        "message" => $created?"Class member attendance created successfully":"Class member attendance not created",
                    ]);
                    return $created;
                }return false;
            }return false;
        }
        static function read(){
            $data = json_decode(file_get_contents("php://input"),true);
            // if(!Controllers_Utilities::check_params($data,["id"]))
            //     return false;
            $class_member_attendance = ClassMemberAttendance::read($data);
            echo json_encode([
                "result" => boolval($class_member_attendance),
                "message" => $class_member_attendance ? "Class member attendance found":"no class member attendance found",
                "data" => $class_member_attendance
            ]);
            return boolval($class_member_attendance);
        }
        static function update(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,['class_member_id','class_date','member_attend', "id"]))
                return false;
            if(!ClassMemberAttendance::read($data)){
                echo json_encode([
                    "result" => false,
                    "message" => "No class member attendance found"
                ]);
                return false;
            }
            $modified_data["id"]=$data["class_member_id"];
            if(self::check_class_member($modified_data)){
                $updated = ClassMemberAttendance::update($data);
                echo json_encode([
                    "result" => $updated,
                    "message" => $updated?"Class member attendance updated successfully":"Class member attendance not updated",
                ]);
                return $updated;
            }return false;
        }
        static function delete(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id"]))
                return false;
            $classMemberAttendance=ClassMemberAttendance::read($data);
            if(!$classMemberAttendance){
                echo json_encode([
                    "result" => boolval($classMemberAttendance),
                    "message" => $classMemberAttendance ? "Class member attendance found":"no class member attendances found",
                    "data" => $classMemberAttendance
                ]);
                return false;
            }
            $deleted = ClassMemberAttendance::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Class member attendance deleted successfully":"Class member attendance not deleted",
            ]);
            return $deleted;
        }
    }
?>
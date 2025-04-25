<?php
    require_once __DIR__ . "/../../models/User.php";
    require_once __DIR__ . "/../../models/Class.php";
    require_once __DIR__ . "/../../models/Coach.php";
    require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
    class Class_Controller{
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
        static function check_coach($data){
            if(!Coach::read($data)){
                echo json_encode([
                    "result"=>false,
                    "message"=>"Invalid Coach"
                ]);
                return false;
            }
            return true;
        } 
        // CRUD APIs Functions
        static function create(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,['coach_id','title','start_date','end_date','created_by']))
                return false;
            $modified_data = ["id"=>$data["created_by"]];
            if(self::check_created_by($modified_data)){
                $modified_data = ["id"=>$data["coach_id"]];
                if(self::check_coach($modified_data)){
                    $created = Classes::create($data);
                    echo json_encode([
                        "result" => $created,
                        "message" => $created?"Class created successfully":"Class not created",
                    ]);
                    return $created;
                }return false;
            }return false;
        }
        static function read(){
            $data = json_decode(file_get_contents("php://input"),true);
            // if(!Controllers_Utilities::check_params($data,["id"]))
            //     return false;
            $class = Classes::read($data);
            echo json_encode([
                "result" => boolval($class),
                "message" => $class ? "Class found":"no classes found",
                "data" => $class
            ]);
            return boolval($class);
        }
        static function update(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["coach_id","title","start_date","end_date", "id"]))
                return false;
            if(!Classes::read($data)){
                echo json_encode([
                    "result" => false,
                    "message" => "No class found"
                ]);
                return false;
            }
            $modified_data["id"]=$data["coach_id"];
            if(self::check_coach($modified_data)){
                $updated = Classes::update($data);
                echo json_encode([
                    "result" => $updated,
                    "message" => $updated?"Class updated successfully":"Class not updated",
                ]);
                return $updated;
            }return false;
        }
        static function delete(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id"]))
                return false;
            $class=Classes::read($data);
            if(!$class){
                echo json_encode([
                    "result" => boolval($class),
                    "message" => $class ? "Class payment found":"no classes found",
                    "data" => $class
                ]);
                return false;
            }
            $deleted = Classes::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Class deleted successfully":"Class not deleted",
            ]);
            return $deleted;
        }
    }
?>
<?php
    require_once __DIR__ . "/../../models/User.php";
    require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
    class User_Controller{
        // CRUD APIs Functions
        static function create(){
            $data = json_decode(file_get_contents("php://input"),true);
            User::create($data);
        }
        static function read(){
            $data = json_decode(file_get_contents("php://input"),true);
            // if(!Controllers_Utilities::check_params($data,["id","username","email","password","title", "access_level","contact", "address"]))
            //     return false;
            $user = User::read($data);
            echo json_encode([
                "result" => boolval($user),
                "message" => $user ? "user/s found":"no users found",
                "data" => $user
            ]);
        }
        static function update(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id","username","email","password","title", "access_level","contact", "address"]))
                return false;
            $user = User::read_email($data);
            if($user && $user["id"] != $data['id']){
                echo json_encode([
                    "result"=>false,
                    "message"=>"Email already used"
                ]);
                return false;
            }
            $updated = User::update($data);
            echo json_encode([
                "result" => $updated,
                "message" => $updated?"User updated successfully":"User not updated",
            ]);
        }
        static function delete(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id"]))
                return false;
            $deleted = User::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"User deleted successfully":"User not deleted",
            ]);
        }
        //
        static function login(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["email","password"]))
                return false;
            $user = User::read($data);
            if ($user && password_verify($data['password'], $user['password'])) {
                echo json_encode([
                    "result" => true,
                    "message" => "Login successful",
                    "data" => $user
                ]);
            } else {
                http_response_code(401);
                echo json_encode([
                    "result" => false,
                    "message" => "Invalid email or password"
                ]);
            }
        }
        static function signup(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["username","email","password","title", "access_level","contact", "address"]))
                return false;
            $user = User::read($data);
            if($user){
                echo json_encode([
                    "result"=>false,
                    "message"=>"Email already used"
                ]);
                return false;
            }
            User::create($data);
            echo json_encode([
                "result"=>true,
                "message"=>"User created successfully"
            ]);
            return true;
        }
    }
?>
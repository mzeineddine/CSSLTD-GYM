<?php
    require_once __DIR__ . "/../../models/User.php";
    class User_Controller{
        // CRUD APIs Functions
        static function create(){
            $data = json_decode(file_get_contents("php://input"),true);
            $user = User::create($data);
        }
        static function read(){
            $data = json_decode(file_get_contents("php://input"),true);
            $user = User::read($data);
            echo json_encode([
                "result" => boolval($user),
                "message" => $user ? "user/s found":"no users found",
                "data" => $user
            ]);
        }
        static function update(){
            $data = json_decode(file_get_contents("php://input"),true);
            $updated = User::update($data);
            echo json_encode([
                "result" => $updated,
                "message" => $updated?"User updated successfully":"User not updated",
            ]);
        }
        static function delete(){
            $data = json_decode(file_get_contents("php://input"),true);
            $deleted = User::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"User deleted successfully":"User not deleted",
            ]);
        }
        //
        static function login(){
            $data = json_decode(file_get_contents("php://input"),true);
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
            $user = User::read($data);
            if($user){
                echo json_encode([
                    "result"=>false,
                    "message"=>"Email already used"
                ]);
                return false;
            }
            $user=User::create($data);
        }
    }
?>
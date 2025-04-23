<?php
    require_once __DIR__ . "/../../models/Member.php";
    class Member_Controller{
        // CRUD APIs Functions
        static function create(){
            $data = json_decode(file_get_contents("php://input"),true);
            $member = Member::create($data);
        }
        static function read(){
            $data = json_decode(file_get_contents("php://input"),true);
            $member = Member::read($data);
            echo json_encode([
                "result" => boolval($member),
                "message" => $member ? "member/s found":"no members found",
                "data" => $member
            ]);
        }
        static function update(){
            $data = json_decode(file_get_contents("php://input"),true);
            $updated = Member::update($data);
            echo json_encode([
                "result" => $updated,
                "message" => $updated?"Member updated successfully":"Member not updated",
            ]);
        }
        static function delete(){
            $data = json_decode(file_get_contents("php://input"),true);
            $deleted = Member::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Member deleted successfully":"Member not deleted",
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
    }
?>
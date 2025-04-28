<?php
    require_once __DIR__ . "/../../models/User.php";
    require_once __DIR__ . "/../../models/PaymentAccount.php";
    require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
    class PaymentAccount_Controller{
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
            if(!Controllers_Utilities::check_params($data,["name", "description", "created_by"]))
                return false;
            $modified_data = ["id"=>$data["created_by"]];
            if(self::check_created_by($modified_data)){
                $created = PaymentAccount::create($data);
                echo json_encode([
                    "result" => $created,
                    "message" => $created?"Payment account created successfully":"Payment account not updated",
                ]);
                return $created;
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
            $payment_account = PaymentAccount::read($data);
            echo json_encode([
                "result" => boolval($payment_account),
                "message" => $payment_account ? "Payment account found":"No payment accounts found",
                "data" => $payment_account
            ]);
            return boolval($payment_account);
        }
        static function update(){
            $decoded_token = Controllers_Utilities::check_jwt();
            if(!$decoded_token){
                return false;
            }
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id","name","description"]))
                return false;
            if(!PaymentAccount::read($data)){
                echo json_encode([
                    "result" => false,
                    "message" => "No payment accounts found"
                ]);
                return false;
            }
            $updated = PaymentAccount::update($data);
            echo json_encode([
                "result" => $updated,
                "message" => $updated?"Payment account updated successfully":"Payment account not updated",
            ]);
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
            $payment_account=PaymentAccount::read($data);
            if(!$payment_account){
                echo json_encode([
                    "result" => false,
                    "message" => "No payment accounts found"
                ]);
                return false;
            }
            $deleted = PaymentAccount::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Payment account deleted successfully":"Payment account not deleted",
            ]);
            return $deleted;
        }
    }
?>
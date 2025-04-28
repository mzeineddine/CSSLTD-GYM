<?php
    require_once __DIR__ . "/../../models/User.php";
    require_once __DIR__ . "/../../models/Subscription.php";
    require_once __DIR__ . "/../../models/SubscriptionPayment.php";
    require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
    class SubscriptionPayment_Controller{
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
        static function check_subscription($data){
            if(!Subscription::read($data)){
                echo json_encode([
                    "result"=>false,
                    "message"=>"Invalid subscription"
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
            if(!Controllers_Utilities::check_params($data,["subscription_id","amount","created_by"]))
                return false;
            $modified_data = ["id"=>$data["created_by"]];
            if(self::check_created_by($modified_data)){
                $modified_data = ["id"=>$data["subscription_id"]];
                if(self::check_subscription($modified_data)){
                    $created = SubscriptionPayment::create($data);
                    echo json_encode([
                        "result" => $created,
                        "message" => $created?"Subscription payment created successfully":"Subscription payment not created",
                    ]);
                    return $created;
                }
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
            $subscription_payment = SubscriptionPayment::read($data);
            echo json_encode([
                "result" => boolval($subscription_payment),
                "message" => $subscription_payment ? "Subscription payment found":"No subscription payments found",
                "data" => $subscription_payment
            ]);
            return boolval($subscription_payment);
        }
        static function update(){
            $decoded_token = Controllers_Utilities::check_jwt();
            if(!$decoded_token){
                return false;
            }
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id","amount"]))
                return false;
            if(!SubscriptionPayment::read($data)){
                echo json_encode([
                    "result" => false,
                    "message" => "No subscription payment found"
                ]);
                return false;
            }
            // $modified_data = ["id"=>$data["subscription_id"]];
            // if(self::check_subscription($modified_data)){
                $updated = SubscriptionPayment::update($data);
                echo json_encode([
                    "result" => $updated,
                    "message" => $updated?"Subscription payment updated successfully":"Subscription payment not updated",
                ]);
                return $updated;
            // }return false;
        }
        static function delete(){
            $decoded_token = Controllers_Utilities::check_jwt();
            if(!$decoded_token){
                return false;
            }
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id"]))
                return false;
            $subscription_payment=SubscriptionPayment::read($data);
            if(!$subscription_payment){
                echo json_encode([
                    "result" => false,
                    "message" => "No subscription payment found"
                ]);
                return false;
            }
            $deleted = SubscriptionPayment::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Subscription payment deleted successfully":"Subscription payment not deleted",
            ]);
            return $deleted;
        }
    }
?>
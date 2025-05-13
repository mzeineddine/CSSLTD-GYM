<?php
    require_once __DIR__ . "/../../models/User.php";
    require_once __DIR__ . "/../../models/Member.php";
    require_once __DIR__ . "/../../models/Category.php";
    require_once __DIR__ . "/../../models/Subscription.php";
    require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
    class Subscription_Controller{
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
        static function check_category($data){
            if(!Category::read($data)){
                echo json_encode([
                    "result"=>false,
                    "message"=>"Invalid category"
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
            if(!Controllers_Utilities::check_params($data,["member_id","category_id","cost","start_date","end_date","created_by"]))
                return false;
            $modified_data = ["id"=>$data["created_by"]];
            if(self::check_created_by($modified_data)){
                $modified_data = ["id"=>$data["member_id"]];
                if(self::check_member($modified_data)){
                    $modified_data = ["id"=>$data["category_id"]];
                    if(self::check_category($modified_data)){
                        $created = Subscription::create($data);
                        echo json_encode([
                            "result" => $created,
                            "message" => $created?"Subscription created successfully":"Subscription not created",
                        ]);
                        return $created;
                    }return false;
                }return false;
            }return false;
        }
        static function read(){
            $decoded_token = Controllers_Utilities::check_jwt();
            if(!$decoded_token){
                return false;
            }
            $data = json_decode(file_get_contents("php://input"),true);
            // if(!Controllers_Utilities::check_params($data,["id"]))
            //     return false;
            $subscription = Subscription::read($data);
            echo json_encode([
                "result" => boolval($subscription),
                "message" => $subscription ? "Subscription found":"No subscriptions found",
                "data" => $subscription
            ]);
            return boolval($subscription);
        }
        static function update(){
            $decoded_token = Controllers_Utilities::check_jwt();
            if(!$decoded_token){
                return false;
            }
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["member_id","category_id","cost","start_date","end_date","id"]))
                return false;
            $subscription=Subscription::read($data);
            if(!$subscription){
                echo json_encode([
                    "result" => false,
                    "message" => "No subscriptions found",
                ]);
                return false;
            }
            $modified_data = ["id"=>$data["member_id"]];
            if(self::check_member($modified_data)){
                $modified_data = ["id"=>$data["category_id"]];
                if(self::check_category($modified_data)){
                    $updated = Subscription::update($data);
                    echo json_encode([
                        "result" => $updated,
                        "message" => $updated?"Subscription updated successfully":"Subscription not updated",
                    ]);
                    return $updated;
                }return false;
            }return false;
        }
        static function delete(){
            $decoded_token = Controllers_Utilities::check_jwt();
            if(!$decoded_token){
                return false;
            }
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id"]))
                return false;
            $subscription=Subscription::read($data);
            if(!$subscription){
                echo json_encode([
                    "result" => false,
                    "message" => "No Subscription payment found"
                ]);
                return false;
            }
            $deleted = Subscription::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Subscription deleted successfully":"Subscription not deleted",
            ]);
            return $deleted;
        }
    }
?>
<?php
    require_once __DIR__ . "/../../models/User.php";
    require_once __DIR__ . "/../../models/Expense.php";
    require_once __DIR__ . "/../../models/PaymentAccount.php";
    require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
    class Expense_Controller{
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
        static function check_payment_account($data){
            if(!PaymentAccount::read($data)){
                echo json_encode([
                    "result"=>false,
                    "message"=>"Invalid payment account"
                ]);
                return false;
            }
            return true;
        } 
        // CRUD APIs Functions
        static function create(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["date","account_id","bill_amount","paid_amount","comment","created_by"]))
                return false;
            $modified_data = ["id"=>$data["created_by"]];
            if(self::check_created_by($modified_data)){
                $modified_data = ["id"=>$data["account_id"]];
                if(self::check_payment_account($modified_data)){
                    $created = Expense::create($data);
                    echo json_encode([
                        "result" => $created,
                        "message" => $created?"Expense created successfully":"Expense not updated",
                    ]);
                    return $created;
                }
            }
            return false;
        }
        static function read(){
            $data = json_decode(file_get_contents("php://input"),true);
            // if(!Controllers_Utilities::check_params($data,["id"]))
            //     return false;
            $expense = Expense::read($data);
            echo json_encode([
                "result" => boolval($expense),
                "message" => $expense ? "Expense found":"no expenses found",
                "data" => $expense
            ]);
            return boolval($expense);
        }
        static function update(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id","date","account_id","bill_amount","paid_amount","comment"]))
                return false;
            if(!Expense::read($data)){
                echo json_encode([
                    "result" => false,
                    "message" => "No expense found"
                ]);
                return false;
            }
            $modified_data = ["id"=>$data["account_id"]];
            if(self::check_payment_account($modified_data)){
                $updated = Expense::update($data);
                echo json_encode([
                    "result" => $updated,
                    "message" => $updated?"Expense updated successfully":"Expense not updated",
                ]);
                return $updated;
            }return false;
        }
        static function delete(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id"]))
                return false;
            $expense=Expense::read($data);
            if(!$expense){
                echo json_encode([
                    "result" => boolval($expense),
                    "message" => $expense ? "Expense found":"no expense found",
                    "data" => $expense
                ]);
                return false;
            }
            $deleted = Expense::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Expense deleted successfully":"Expense not deleted",
            ]);
            return $deleted;
        }
    }
?>
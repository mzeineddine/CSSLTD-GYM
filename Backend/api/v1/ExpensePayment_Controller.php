<?php
    require_once __DIR__ . "/../../models/User.php";
    require_once __DIR__ . "/../../models/Expense.php";
    require_once __DIR__ . "/../../models/ExpensePayment.php";
    require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
    class ExpensePayment_Controller{
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
        static function check_expense($data){
            if(!Expense::read($data)){
                echo json_encode([
                    "result"=>false,
                    "message"=>"Invalid expense"
                ]);
                return false;
            }
            return true;
        } 
        // CRUD APIs Functions
        static function create(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["expense_id","amount","created_by"]))
                return false;
            $modified_data = ["id"=>$data["created_by"]];
            if(self::check_created_by($modified_data)){
                $modified_data = ["id"=>$data["expense_id"]];
                if(self::check_expense($modified_data)){
                    $created = ExpensePayment::create($data);
                    echo json_encode([
                        "result" => $created,
                        "message" => $created?"Expense payment created successfully":"Expense payment not created",
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
            $expense_payment = ExpensePayment::read($data);
            echo json_encode([
                "result" => boolval($expense_payment),
                "message" => $expense_payment ? "Expense payment found":"no expense payments found",
                "data" => $expense_payment
            ]);
            return boolval($expense_payment);
        }
        static function update(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id","amount","expense_id"]))
                return false;
            if(!ExpensePayment::read($data)){
                echo json_encode([
                    "result" => false,
                    "message" => "No expense payment found"
                ]);
                return false;
            }
            $modified_data = ["id"=>$data["expense_id"]];
            if(self::check_expense($modified_data)){
                $updated = ExpensePayment::update($data);
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
            $expense=ExpensePayment::read($data);
            if(!$expense){
                echo json_encode([
                    "result" => boolval($expense),
                    "message" => $expense ? "Expense payment found":"no expense payment found",
                    "data" => $expense
                ]);
                return false;
            }
            $deleted = ExpensePayment::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Expense payment deleted successfully":"Expense payment not deleted",
            ]);
            return $deleted;
        }
    }
?>
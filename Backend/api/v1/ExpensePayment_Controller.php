<?php
require_once __DIR__ . "/../../models/User.php";
require_once __DIR__ . "/../../models/ExpensePayment.php";
require_once __DIR__ . "/../../models/PaymentAccount.php";
require_once __DIR__ . "/../../models/Log.php";
require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
class ExpensePayment_Controller
{
    static function check_created_by($data)
    {
        if (!User::read($data)) {
            echo json_encode([
                "result" => false,
                "message" => "Invalid user"
            ]);
            return false;
        }
        return true;
    }
    static function check_account($data)
    {
        if (!PaymentAccount::read($data)) {
            echo json_encode([
                "result" => false,
                "message" => "Invalid account"
            ]);
            return false;
        }
        return true;
    }
    // CRUD APIs Functions
    static function create()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!$decoded_token) {
            return false;
        }
        $data['created_by'] = $decoded_token->id;
        if (!Controllers_Utilities::check_params($data, ["account_id", "amount", "created_by"]))
            return false;
        $modified_data = ["id" => $data["created_by"]];
        if (self::check_created_by($modified_data)) {
            $modified_data = ["id" => $data["account_id"]];
            if (self::check_account($modified_data)) {
                $created = ExpensePayment::create($data);
                echo json_encode([
                    "result" => $created,
                    "message" => $created ? "Expense payment created successfully" : "Expense payment not created",
                ]);
                if ($created) {
                    Log::create([
                        "action" => "Create",
                        "created_by" => $decoded_token->id,
                        "description" => "EXPENSE PAYMENT of amount " . $data["amount"] .
                            " and account_id " . $data["account_id"]
                    ]);
                }
                return $created;
            }
        }
        return false;
    }
    static function read()
    {
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!$decoded_token) {
            return false;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        // if(!Controllers_Utilities::check_params($data,["id"]))
        //     return false;
        $expense_payment = ExpensePayment::read($data);
        echo json_encode([
            "result" => boolval($expense_payment),
            "message" => $expense_payment ? "Expense payment found" : "No expense payments found",
            "data" => $expense_payment
        ]);
        return boolval($expense_payment);
    }
    static function update()
    {
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!$decoded_token) {
            return false;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        if (!Controllers_Utilities::check_params($data, ["id", "amount", "account_id"]))
            return false;
        // echo json_encode($data);
        $payment = ExpensePayment::read($data);
        if (!$payment) {
            echo json_encode([
                "result" => false,
                "message" => "No expense payment found"
            ]);
            return false;
        }
        $modified_data = ["id" => $data["account_id"]];
        if (self::check_account($modified_data)) {
            $updated = ExpensePayment::update($data);
            echo json_encode([
                "result" => $updated,
                "message" => $updated ? "Expense payment updated successfully" : "Expense payment not updated",
            ]);
            if ($updated) {
                Log::create([
                    "action" => "update",
                    "created_by" => $decoded_token->id,
                    "description" => "EXPENSE from amount " . $payment["amount"] .
                        " to amount " . $data["amount"] .
                        " and account_id " . $payment["account_id"]
                ]);
            }
            return $updated;
        }
        return false;
    }
    static function delete()
    {
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!$decoded_token) {
            return false;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        if (!Controllers_Utilities::check_params($data, ["id"]))
            return false;
        $expense = ExpensePayment::read($data);
        if (!$expense) {
            echo json_encode([
                "result" => false,
                "message" => "No expense payment found"
            ]);
            return false;
        }
        $deleted = ExpensePayment::delete($data);
        echo json_encode([
            "result" => $deleted,
            "message" => $deleted ? "Expense payment deleted successfully" : "Expense payment not deleted",
        ]);
        if ($deleted) {
            Log::create([
                "action" => "Delete",
                "created_by" => $decoded_token->id,
                "description" => "EXPENSE PAYMENT of amount " . $expense["amount"]
            ]);
        }
        return $deleted;
    }
}

<?php
require_once __DIR__ . "/../../models/SubscriptionPayment.php";
require_once __DIR__ . "/../../models/ExpensePayment.php";
require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
require_once __DIR__ . "/../../models/General.php";

class General_Controller
{
    static function get_balance()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!Controllers_Utilities::check_params($data, ["from", "to"]))
            return false;
        if (!$decoded_token) {
            return false;
        }
        $total_balance = General::get_total_balances($data);
        echo json_encode([
            "result" => boolval($total_balance),
            "message" => $total_balance ? "Total balance found" : "Total balance not found",
            "data" => $total_balance
        ]);
        return false;
    }

    static function get_transactions()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!Controllers_Utilities::check_params($data, ["from", "to"]))
            return false;
        if (!$decoded_token) {
            return false;
        }
        $latestTransactions = General::get_latest_transactions($data);
        echo json_encode([
            "result" => boolval($latestTransactions),
            "message" => $latestTransactions ? "Latest transactions found" : "Latest transactions not found",
            "data" => $latestTransactions
        ]);
        return false;
    }

    static function get_profit()
    {
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!$decoded_token) {
            return false;
        }
        $total_profit = General::get_profit();
        echo json_encode([
            "result" => boolval($total_profit),
            "message" => $total_profit ? "Total profit found" : "Total profit not found",
            "data" => $total_profit
        ]);
        return false;
    }

    static function get_receive_pay_month()
    {
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!$decoded_token) {
            return false;
        }
        $receive_pay_month = General::get_receive_pay_month();
        echo json_encode([
            "result" => boolval($receive_pay_month),
            "message" => $receive_pay_month ? "receive and pay in month found" : "receive and pay in month not found",
            "data" => $receive_pay_month
        ]);
        return false;
    }
}

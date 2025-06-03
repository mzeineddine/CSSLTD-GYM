<?php
class General
{
    public static function get_total_balances($data)
    {
        global $conn;
        if ($data["from"] == "" || $data["to"] == "") {
            $sql_1 = "SELECT SUM(amount) as total_in FROM subscription_payments WHERE is_deleted = 0";
            $stmt_1 = $conn->prepare($sql_1);
            $stmt_1->execute();
            $result_1 = $stmt_1->fetch(PDO::FETCH_ASSOC);
            $total_in = $result_1['total_in'] ?? 0;

            $sql_2 = "SELECT -SUM(amount) as total_out FROM expense_payments WHERE is_deleted = 0";
            $stmt_2 = $conn->prepare($sql_2);
            $stmt_2->execute();
            $result_2 = $stmt_2->fetch(PDO::FETCH_ASSOC);
            $total_out = $result_2['total_out'] ?? 0;

            $total_balance = $total_in + $total_out;
        } else {
            $sql_1 = "SELECT SUM(amount) as total_in FROM subscription_payments WHERE DATE(created_on) >= ? AND DATE(created_on) <= ? AND is_deleted = 0";
            $stmt_1 = $conn->prepare($sql_1);
            $stmt_1->execute([$data['from'], $data['to']]);
            $result_1 = $stmt_1->fetch(PDO::FETCH_ASSOC);
            $total_in = $result_1['total_in'] ?? 0;

            $sql_2 = "SELECT -SUM(amount) as total_out FROM expense_payments WHERE DATE(created_on) >= ? AND DATE(created_on)     <= ? AND is_deleted = 0";
            $stmt_2 = $conn->prepare($sql_2);
            $stmt_2->execute([$data['from'], $data['to']]);
            $result_2 = $stmt_2->fetch(PDO::FETCH_ASSOC);
            $total_out = $result_2['total_out'] ?? 0;

            $total_balance = $total_in + $total_out;
        }
        return [
            "total_in" => $total_in,
            "total_out" => $total_out,
            "total_balance" => $total_balance
        ];
    }
    public static function get_latest_transactions($data)
    {
        global $conn;
        if ($data["from"] == "" || $data["to"] == "") {
            $sql_1 = "SELECT full_name as account, +subscription_payments.amount AS amount, subscription_payments.created_on, 'in' AS type FROM subscription_payments, members WHERE member_id=members.id AND subscription_payments.is_deleted = 0";
            $stmt_1 = $conn->prepare($sql_1);
            $stmt_1->execute();
            $result_1 = $stmt_1->fetchAll(PDO::FETCH_ASSOC);

            $sql_2 = "SELECT `name` as account, -expense_payments.amount AS amount, expense_payments.created_on, 'out' as type FROM expense_payments, payment_accounts WHERE expense_payments.is_deleted = 0 and account_id=payment_accounts.id;";
            $stmt_2 = $conn->prepare($sql_2);
            $stmt_2->execute();
            $result_2 = $stmt_2->fetchAll(PDO::FETCH_ASSOC);
            $response = array_merge($result_1, $result_2);
        } else {
            $sql_1 = "SELECT full_name as account, +subscription_payments.amount AS amount, subscription_payments.created_on, 'in' AS type FROM subscription_payments, members WHERE member_id=members.id AND subscription_payments.is_deleted = 0 AND DATE(subscription_payments.created_on) >= ? AND DATE(subscription_payments.created_on) <= ?";
            $stmt_1 = $conn->prepare($sql_1);
            $stmt_1->execute([$data['from'], $data['to']]);
            $result_1 = $stmt_1->fetchAll(PDO::FETCH_ASSOC);

            $sql_2 = "SELECT `name` as account, -expense_payments.amount AS amount, expense_payments.created_on, 'out' as type FROM expense_payments, payment_accounts WHERE expense_payments.is_deleted = 0 AND DATE(expense_payments.created_on) >= ? AND DATE(expense_payments.created_on) <= ?";
            $stmt_2 = $conn->prepare($sql_2);
            $stmt_2->execute([$data['from'], $data['to']]);
            $result_2 = $stmt_2->fetchAll(PDO::FETCH_ASSOC);

            $response = array_merge($result_1, $result_2);
        }
        usort($response, function ($a, $b) {
            return strtotime($b['created_on']) <=> strtotime($a['created_on']);
        });

        return $response;
    }

    static function get_profit()
    {
        global $conn;
        $sql_1 = "SELECT SUM(amount) AS total_in FROM subscription_payments WHERE is_deleted = 0";
        $stmt_1 = $conn->prepare($sql_1);
        $stmt_1->execute();
        $result_1 = $stmt_1->fetch(PDO::FETCH_ASSOC);

        $sql_2 = "SELECT SUM(amount) AS total_out FROM expense_payments WHERE is_deleted = 0";
        $stmt_2 = $conn->prepare($sql_2);
        $stmt_2->execute();
        $result_2 = $stmt_2->fetch(PDO::FETCH_ASSOC);
        $response = (float)$result_1["total_in"] - (float)$result_2["total_out"];
        return $response;
    }





    static function get_receive_pay_month()
    {
        global $conn;
        $sql = "SELECT 
                month_year,
                SUM(total_in) AS total_in,
                SUM(total_out) AS total_out
                FROM (
                    SELECT 
                        DATE_FORMAT(created_on, '%Y-%m') AS month_year,
                        SUM(amount) AS total_in,
                        0 AS total_out
                    FROM subscription_payments
                    WHERE created_on >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
                    GROUP BY month_year
                    UNION ALL
                    SELECT 
                        DATE_FORMAT(created_on, '%Y-%m') AS month_year,
                        0 AS total_in,
                        SUM(amount) AS total_out
                    FROM expense_payments
                    WHERE created_on >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
                    GROUP BY month_year
                ) AS combined
                GROUP BY month_year
                ORDER BY month_year ASC;
            ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}

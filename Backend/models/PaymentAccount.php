<?php

use function PHPSTORM_META\type;

require_once __DIR__ . "/PaymentAccount_Skeleton.php";
require_once __DIR__ . "/../connections/connection.php";
class PaymentAccount extends PaymentAccount_Skeleton
{
    static function create($data)
    {
        global $conn;
        // id, name, description, created_on,created_by, is_deleted
        $sql = "INSERT INTO payment_accounts (`name`, `description`,`created_by`) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['name'], $data['description'], $data['created_by']]);
        return boolval($stmt->rowCount());
    }
    static function read($data)
    {
        global $conn;
        $id = $data['id'] ?? null;

        if ($id) {
            // Fetch a single payment account
            $stmt = $conn->prepare("
            SELECT payment_accounts.*, users.username AS created_by
            FROM payment_accounts
            JOIN users ON payment_accounts.created_by = users.id
            WHERE payment_accounts.id = ? AND payment_accounts.is_deleted = 0
        ");
            $stmt->execute([$id]);
            $payment_account = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$payment_account) return null;

            // Total expenses
            $stmt = $conn->prepare("
            SELECT SUM(bill_amount) AS total
            FROM expenses
            WHERE account_id = ? AND is_deleted = 0
        ");
            $stmt->execute([$id]);
            $total_amount = $stmt->fetchColumn() ?? 0;

            // Total paid
            $stmt = $conn->prepare("
            SELECT SUM(amount) AS total
            FROM expense_payments
            WHERE account_id = ? AND is_deleted = 0
        ");
            $stmt->execute([$id]);
            $paid_amount = $stmt->fetchColumn() ?? 0;

            $payment_account["total_amount"] = (float)$total_amount;
            $payment_account["paid_amount"] = (float)$paid_amount;
            $payment_account["remaining_amount"] = $payment_account["total_amount"] - $payment_account["paid_amount"];

            return $payment_account;
        } else {
            // Fetch all payment accounts
            $stmt = $conn->query("
            SELECT payment_accounts.*, users.username AS created_by
            FROM payment_accounts
            JOIN users ON payment_accounts.created_by = users.id
            WHERE payment_accounts.is_deleted = 0
        ");
            $payment_accounts = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($payment_accounts as &$account) {
                $account_id = $account["id"];

                // Total expenses
                $stmt = $conn->prepare("
                SELECT SUM(bill_amount) AS total
                FROM expenses
                WHERE account_id = ? AND is_deleted = 0
            ");
                $stmt->execute([$account_id]);
                $total_amount = $stmt->fetchColumn() ?? 0;

                // Total paid
                $stmt = $conn->prepare("
                SELECT SUM(amount) AS total
                FROM expense_payments
                WHERE account_id = ? AND is_deleted = 0
            ");
                $stmt->execute([$account_id]);
                $paid_amount = $stmt->fetchColumn() ?? 0;

                $account["total_amount"] = (float)$total_amount;
                $account["paid_amount"] = (float)$paid_amount;
                $account["remaining_amount"] = $account["total_amount"] - $account["paid_amount"];
            }

            return $payment_accounts;
        }
    }


    static function update($data)
    {
        global $conn;
        $sql = "UPDATE payment_accounts SET `name`=?, `description`=? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['name'], $data['description'], $data['id']]);
        return boolval($stmt->rowCount());
    }
    static function delete($data)
    {
        global $conn;
        $sql = "UPDATE payment_accounts SET is_deleted = 1 WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['id']]);
        return $stmt ? true : false;
    }
}

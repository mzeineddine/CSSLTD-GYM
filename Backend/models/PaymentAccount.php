<?php

use function PHPSTORM_META\type;

    require_once __DIR__ . "/PaymentAccount_Skeleton.php";
    require_once __DIR__ . "/../connections/connection.php";
    class PaymentAccount extends PaymentAccount_Skeleton{
        static function create($data){
            global $conn;
            // id, name, description, created_on,created_by, is_deleted
            $sql = "INSERT INTO payment_accounts (`name`, `description`,`created_by`) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['name'],$data['description'],$data['created_by']]);
            return boolval($stmt->rowCount());
        }
        static function read($data){
            global $conn;
            $id = $data['id'] ?? null;
            if ($id){
                $stmt = $conn->prepare("SELECT * FROM payment_accounts WHERE id = ? AND is_deleted=0");
                $stmt->execute([$id]);
                $payment_account = $stmt->fetch(PDO::FETCH_ASSOC);
                $stmt = $conn->prepare("SELECT SUM(bill_amount) AS total FROM expenses GROUP BY account_id HAVING account_id = ?;");
                $stmt->execute([$id]);
                $total_amount = $stmt->fetch(PDO::FETCH_ASSOC);
                $payment_account["total_amount"] = $total_amount["total"];
                $stmt = $conn->prepare("SELECT SUM(amount) AS total FROM expense_payments GROUP BY account_id HAVING account_id = ?;");
                $stmt->execute([$id]);
                $paid_amount = $stmt->fetch(PDO::FETCH_ASSOC);
                $payment_account["paid_amount"] = $paid_amount["total"]; 
                // $payment_account["remaining_amount"] = $total_amount - $paid_amount;
                return $payment_account;
            } else {
                $stmt = $conn->query("SELECT * FROM payment_accounts WHERE is_deleted=0");
                $payment_accounts = $stmt->fetchAll(PDO::FETCH_ASSOC);
                for ($i = 0; $i < count($payment_accounts); $i++) {
                    $stmt = $conn->prepare("SELECT SUM(bill_amount) AS total FROM expenses WHERE account_id = ?");
                    $stmt->execute([$payment_accounts[$i]["id"]]);
                    $total_amount = $stmt->fetch(PDO::FETCH_ASSOC);
                    $payment_accounts[$i]["total_amount"] = $total_amount ? (float)$total_amount["total"] : 0;
                    $stmt = $conn->prepare("SELECT SUM(amount) AS total FROM expense_payments WHERE account_id = ?");
                    $stmt->execute([$payment_accounts[$i]["id"]]);
                    $paid_amount = $stmt->fetch(PDO::FETCH_ASSOC);
                    $payment_accounts[$i]["paid_amount"] = $paid_amount ? (float)$paid_amount["total"] : 0;
                    $payment_accounts[$i]["remaining_amount"] = $payment_accounts[$i]["total_amount"] - $payment_accounts[$i]["paid_amount"];
                }
                return $payment_accounts;
            }
        }
    
        static function update($data){
            global $conn;
            $sql = "UPDATE payment_accounts SET `name`=?, `description`=? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['name'],$data['description'],$data['id']]);
            return boolval($stmt->rowCount());
        }
        static function delete($data){
            global $conn;
            $sql = "UPDATE payment_accounts SET is_deleted = 1 WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['id']]);
            return $stmt? true : false;
        }
    }
?>
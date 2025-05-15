<?php
    require_once __DIR__ . "/SubscriptionPayment_Skeleton.php";
    require_once __DIR__ . "/../connections/connection.php";
    class SubscriptionPayment extends SubscriptionPayment_Skeleton{
        static function create($data){
            global $conn;
            // id	expense_id	amount	created_on	created_by	is_deleted	
            $sql = "INSERT INTO subscription_payments (`member_id`,`amount`,`created_by`) 
            VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['member_id'],$data['amount'],$data['created_by']]);
            return boolval($stmt->rowCount());
        }
        static function read($data){
            global $conn;
            $id = $data['id'] ?? null;
            if ($id){
                $stmt = $conn->prepare("SELECT * FROM subscription_payments WHERE id = ? AND is_deleted=0");
                $stmt->execute([$id]);
                $expense = $stmt->fetch(PDO::FETCH_ASSOC);
                return $expense;
            } else {
                $stmt = $conn->query("SELECT * FROM subscription_payments WHERE is_deleted=0");
                $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $expenses;
            }
        }
        static function update($data){
            global $conn;
            // id	expense_id	amount	created_on	created_by	is_deleted
            $sql = "UPDATE subscription_payments SET `amount`=? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(params: [$data['amount'], $data['id']]);
            return boolval($stmt->rowCount());
        }
        static function delete($data){
            global $conn;
            $sql = "UPDATE subscription_payments SET is_deleted = 1 WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['id']]);
            return $stmt? true : false;
        }
    }
?>
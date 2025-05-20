<?php
    require_once __DIR__ . "/ExpensePayment_Skeleton.php";
    require_once __DIR__ . "/../connections/connection.php";
    class ExpensePayment extends ExpensePayment_Skeleton{
        static function create($data){
            global $conn;
            // id	account_id	amount	created_on	created_by	is_deleted	
            $sql = "INSERT INTO expense_payments (`account_id`,`amount`,`created_by`) 
            VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['account_id'],$data['amount'],$data['created_by']]);
            return boolval($stmt->rowCount());
        }
        static function read($data){
            global $conn;
            $id = $data['id'] ?? null;
            if ($id){
                $stmt = $conn->prepare("SELECT expense_payments.*, username as created_by FROM expense_payments, users WHERE created_by=users.id AND expense_payments.id = ? AND expense_payments.is_deleted=0");
                $stmt->execute([$id]);
                $expense = $stmt->fetch(PDO::FETCH_ASSOC);
                return $expense;
            } else {
                $stmt = $conn->query("SELECT expense_payments.*, username as created_by FROM expense_payments, users WHERE created_by=users.id AND expense_payments.is_deleted=0");
                $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $expenses;
            }
        }
    
        static function update($data){
            global $conn;
            // id	account_id	amount	created_on	created_by	is_deleted
            $sql = "UPDATE expense_payments SET `account_id`=?, `amount`=? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(params: [$data['account_id'],$data['amount'], $data['id']]);
            return boolval($stmt->rowCount());
        }
        static function delete($data){
            global $conn;
            $sql = "UPDATE expense_payments SET is_deleted = 1 WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['id']]);
            return $stmt? true : false;
        }
    }
?>
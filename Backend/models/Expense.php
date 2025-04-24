<?php
    require_once __DIR__ . "/Expense.php";
    require_once __DIR__ . "/../connections/connection.php";
    class Expense{
        static function create($data){
            global $conn;
            //id,date,account_id,bill_amount,paid_amount,comment,created_on,created_by,is_deleted
            $sql = "INSERT INTO expenses (`date`, `account_id`,`bill_amount`,`paid_amount`,`comment`,`created_by`) 
            VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['date'],$data['account_id'],$data['bill_amount'],$data['paid_amount'],$data['comment'],$data['created_by']]);
            return boolval($stmt->rowCount());
        }
        static function read($data){
            global $conn;
            $id = $data['id'] ?? null;
            if ($id){
                $stmt = $conn->prepare("SELECT * FROM expenses WHERE id = ? AND is_deleted=0");
                $stmt->execute([$id]);
                $expense = $stmt->fetch(PDO::FETCH_ASSOC);
                return $expense;
            } else {
                $stmt = $conn->query("SELECT * FROM expenses WHERE is_deleted=0");
                $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $expenses;
            }
        }
    
        static function update($data){
            global $conn;
            $sql = "UPDATE expenses SET `date`=?, `account_id`=?,`bill_amount`=?,`paid_amount`=?,`comment`=? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['date'],$data['account_id'],$data['bill_amount'],$data['paid_amount'],$data['comment'],$data["id"]]);
            return boolval($stmt->rowCount());
        }
        static function delete($data){
            global $conn;
            $sql = "UPDATE expenses SET is_deleted = 1 WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['id']]);
            return $stmt? true : false;
        }
    }
?>
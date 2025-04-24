<?php
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
                return $payment_account;
            } else {
                $stmt = $conn->query("SELECT * FROM payment_accounts WHERE is_deleted=0");
                $payment_accounts = $stmt->fetchAll(PDO::FETCH_ASSOC);
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
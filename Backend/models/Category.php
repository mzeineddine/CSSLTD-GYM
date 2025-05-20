<?php
    require_once __DIR__ . "/Category_Skeleton.php";
    require_once __DIR__ . "/../connections/connection.php";
    class Category extends Category_Skeleton{
        static function create($data){
            global $conn;
            // id,name,price,last_update,created_on,created_by,is_deleted	
            $sql = "INSERT INTO categories (`name`, `type`,`price`, `created_by`) 
            VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['name'], $data['type'],$data['price'],$data['created_by']]);
            return boolval($stmt->rowCount());
        }
        static function read($data){
            global $conn;
            $id = $data['id'] ?? null;
            if ($id){
                $stmt = $conn->prepare("SELECT categories.*, username as created_by FROM categories, users WHERE created_by=users.id AND categories.id = ? AND categories.is_deleted=0");
                $stmt->execute([$id]);
                $expense = $stmt->fetch(PDO::FETCH_ASSOC);
                return $expense;
            } else {
                $stmt = $conn->query("SELECT categories.*, username as created_by FROM categories, users WHERE created_by=users.id AND categories.is_deleted=0");
                $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $expenses;
            }
        }
    
        static function update($data){
            global $conn;
            $sql = "UPDATE categories SET `name`=?, `type`=?,`price`=?,`last_update`=? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $data["last_update"] = date('Y-m-d h:i:s', time());
            $stmt->execute([$data['name'],$data['type'],$data['price'],$data['last_update'],$data["id"]]);
            return boolval($stmt->rowCount());
        }
        static function delete($data){
            global $conn;
            $sql = "UPDATE categories SET is_deleted = 1 WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['id']]);
            return $stmt? true : false;
        }
    }
?>
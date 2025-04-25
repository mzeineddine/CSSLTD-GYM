<?php
    require_once __DIR__ . "/ClassMember_Skeleton.php";
    require_once __DIR__ . "/../connections/connection.php";
    class ClassMember extends ClassMember_Skeleton{
        // id,class_id,member_id,created_on,created_by,is_deleted	
        static function create($data){
            global $conn;
            $sql = "INSERT INTO class_members (`class_id`,`member_id`,`created_by`) 
            VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['class_id'],$data['member_id'],$data['created_by']]);
            return boolval($stmt->rowCount());
        }
        static function read($data){
            global $conn;
            $id = $data['id'] ?? null;
            if ($id){
                $stmt = $conn->prepare("SELECT * FROM class_members WHERE id = ? AND is_deleted=0");
                $stmt->execute([$id]);
                $expense = $stmt->fetch(PDO::FETCH_ASSOC);
                return $expense;
            } else {
                $stmt = $conn->query("SELECT * FROM class_members WHERE is_deleted=0");
                $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $expenses;
            }
        }

        static function update($data){
            global $conn;
            $sql = "UPDATE class_members SET `class_id`=?,`member_id`=? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['class_id'],$data['member_id'],$data["id"]]);
            return boolval($stmt->rowCount());
        }
        static function delete($data){
            global $conn;
            $sql = "UPDATE class_members SET is_deleted = 1 WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['id']]);
            return $stmt? true : false;
        }
    }
?>
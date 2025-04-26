<?php
    require_once __DIR__ . "/ClassMemberAttendance_Skeleton.php";
    require_once __DIR__ . "/../connections/connection.php";
    class ClassMemberAttendance extends ClassMemberAttendance_Skeleton{
        // id,class_id,member_id,created_on,created_by,is_deleted	
        static function create($data){
            global $conn;
            $sql = "INSERT INTO class_member_attendances (`class_member_id`,`class_date`,`member_attend`,`created_by`) 
            VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['class_member_id'],$data['class_date'],$data['member_attend'],$data['created_by']]);
            return boolval($stmt->rowCount());
        }
        static function read($data){
            global $conn;
            $id = $data['id'] ?? null;
            if ($id){
                $stmt = $conn->prepare("SELECT * FROM class_member_attendances WHERE id = ? AND is_deleted=0");
                $stmt->execute([$id]);
                $expense = $stmt->fetch(PDO::FETCH_ASSOC);
                return $expense;
            } else {
                $stmt = $conn->query("SELECT * FROM class_member_attendances WHERE is_deleted=0");
                $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $expenses;
            }
        }

        static function update($data){
            global $conn;
            $sql = "UPDATE class_member_attendances SET `class_member_id`=?,`class_date`=?,`member_attend`=? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['class_member_id'],$data['class_date'],$data['member_attend'],$data["id"]]);
            return boolval($stmt->rowCount());
        }
        static function delete($data){
            global $conn;
            $sql = "UPDATE class_member_attendances SET is_deleted = 1 WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['id']]);
            return $stmt? true : false;
        }
    }
?>
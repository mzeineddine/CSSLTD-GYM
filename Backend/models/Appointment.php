<?php
    require_once __DIR__ . "/Appointment_Skeleton.php";
    require_once __DIR__ . "/../connections/connection.php";
    class Appointment extends Appointment_Skeleton{
        // id,member_id,coach_id,title,color,start_date,end_date,created_on,created_by,is_deleted	
        static function create($data){
            global $conn;
            $sql = "INSERT INTO appointments (`member_id`,`coach_id`,`title`,`color`,`start_date`,`end_date`,`created_by`) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data["member_id"],$data['coach_id'],$data['title'],$data['color'],$data['start_date'],$data['end_date'],$data['created_by']]);
            return boolval($stmt->rowCount());
        }
        static function read($data){
            global $conn;
            $id = $data['id'] ?? null;
            if ($id){
                $stmt = $conn->prepare("SELECT * FROM appointments WHERE id = ? AND is_deleted=0");
                $stmt->execute([$id]);
                $expense = $stmt->fetch(PDO::FETCH_ASSOC);
                return $expense;
            } else {
                $stmt = $conn->query("SELECT * FROM appointments WHERE is_deleted=0");
                $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $expenses;
            }
        }

        static function update($data){
            global $conn;
            $sql = "UPDATE appointments SET `member_id`=?,`coach_id`=?,`title`=?,`color`=?,`start_date`=?,`end_date`=? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['member_id'],$data['coach_id'],$data['title'],$data['color'],$data['start_date'],$data['end_date'],$data["id"]]);
            return boolval($stmt->rowCount());
        }
        static function delete($data){
            global $conn;
            $sql = "UPDATE appointments SET is_deleted = 1 WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['id']]);
            return $stmt? true : false;
        }
    }
?>
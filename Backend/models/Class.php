<?php
    require_once __DIR__ . "/Class_Skeleton.php";
    require_once __DIR__ . "/../connections/connection.php";
    class Classes extends Class_Skeleton{
        // id,coach_id,title,start_date,end_date,created_on,created_by,is_deleted
        static function create($data){
            global $conn;
            $sql = "INSERT INTO classes (`coach_id`,`title`,`start_date`,`end_date`,`created_by`) 
            VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['coach_id'],$data['title'],$data['start_date'],$data['end_date'],$data['created_by']]);
            return boolval($stmt->rowCount());
        }
        static function read($data){
            global $conn;
            $id = $data['id'] ?? null;
            if ($id){
                $stmt = $conn->prepare("SELECT * FROM classes WHERE id = ? AND is_deleted=0");
                $stmt->execute([$id]);
                $expense = $stmt->fetch(PDO::FETCH_ASSOC);
                return $expense;
            } else {
                $stmt = $conn->query("SELECT * FROM classes WHERE is_deleted=0");
                $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $expenses;
            }
        }

        static function update($data){
            global $conn;
            $sql = "UPDATE classes SET `coach_id`=?,`title`=?,`start_date`=?,`end_date`=? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['coach_id'],$data['title'],$data['start_date'],$data['end_date'],$data["id"]]);
            return boolval($stmt->rowCount());
        }
        static function delete($data){
            global $conn;
            $sql = "UPDATE classes SET is_deleted = 1 WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['id']]);
            return $stmt? true : false;
        }
    }
?>
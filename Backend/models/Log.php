<?php
    require_once __DIR__ . "/Log_Skeleton.php";
    require_once __DIR__ . "/../connections/connection.php";
    class Log extends Log_Skeleton{
        // CRUD Functions
        static function create($data){
            global $conn;
            // id,action,description,created_on,created_by,is_deleted
            $sql = "INSERT INTO `logs` (`action`, `description`,`created_by`) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['action'],$data['description'],$data["created_by"]]);
            return boolval($stmt->rowCount());
        }
        static function read($data){
            global $conn;
            $id = $data['id'] ?? null;
            if ($id){
                $stmt = $conn->prepare("SELECT logs.*, username as created_by FROM `logs`, users WHERE created_by=users.id AND  logs.id = ? AND logs.is_deleted=0");
                $stmt->execute([$id]);
                $member = $stmt->fetch(PDO::FETCH_ASSOC);
                return $member;
            } else {
                $stmt = $conn->query("SELECT logs.*, username as created_by FROM logs, users WHERE created_by=users.id AND logs.is_deleted=0");
                $members = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $members;
            }
        }

        static function update($data){
            global $conn;
            $sql = "UPDATE `logs` SET `action`=?, `description`=? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['action'],$data['description'],$data['id']]);
            return boolval($stmt->rowCount());
        }
        static function delete($data){
            global $conn;
            $sql = "UPDATE `logs` SET is_deleted = 1 WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['id']]);
            return $stmt? true : false;
        }
    }
?>
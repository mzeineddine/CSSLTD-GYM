<?php
    require_once __DIR__ . "/Member_Skeleton.php";
    require_once __DIR__ . "/../connections/connection.php";
    class Member extends Member_Skeleton{
        // CRUD Functions
        static function create($data){
            global $conn;
            // id, full_name, contact, address, dob, created_on,created_by, is_deleted
            $sql = "INSERT INTO members (`full_name`, `contact`, `address`,`dob`,`created_by`) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['full_name'],$data['contact'],$data['address'],$data['dob'],$data["created_by"]]);
            return boolval($stmt->rowCount());
        }
        static function read($data){
            global $conn;
            $id = $data['id'] ?? null;
            if ($id){
                $stmt = $conn->prepare("SELECT * FROM members WHERE id = ?");
                $stmt->execute([$id]);
                $member = $stmt->fetch(PDO::FETCH_ASSOC);
                return $member;
            } else {
                $stmt = $conn->query("SELECT * FROM users");
                $members = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $members;
            }
        }

        static function update($data){
            global $conn;
            $sql = "UPDATE members SET `full_name`=?, `contact`=?, `address`=?,`dob`=? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['full_name'],$data['contact'],$data['address'],$data['dob'],$data['id']]);
            return boolval($stmt->rowCount());
        }
        static function delete($data){
            global $conn;
            $sql = "UPDATE members SET is_deleted = 1 WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['id']]);
            return $stmt? true : false;
        }
    }
?>
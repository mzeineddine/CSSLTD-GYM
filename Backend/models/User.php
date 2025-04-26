<?php
    require_once __DIR__ . "/User_Skeleton.php";
    require_once __DIR__ . "/../connections/connection.php";
    class User extends User_Skeleton{
        // CRUD Functions
        static function create($data){
            // id, username, email, password, title, access_level, 
            // contact, address, status, created_on, is_deleted
            global $conn;
            $sql = "INSERT INTO users (`username`, `email`, `password`,`title`,`access_level`,`contact`,`address`) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data["username"], $data["email"], password_hash($data['password'], PASSWORD_DEFAULT),$data["title"],$data["access_level"],$data["contact"], $data["address"]]);
            return boolval($stmt->rowCount());
        }
        static function read($data){
            global $conn;
            $id = $data['id'] ?? null;
            $email = $data['email'] ?? null;
            if ($id){
                $stmt = $conn->prepare("SELECT * FROM users WHERE id = ? AND is_deleted=0");
                $stmt->execute([$id]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                return $user;
            } else if ($email) {
                $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND is_deleted=0");
                $stmt->execute([$email]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                return $user;
            } else {
                $stmt = $conn->query("SELECT * FROM users WHERE is_deleted=0");
                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $users;
            }
        }
        static function update($data){
            global $conn;
            $sql = "UPDATE users SET `username` = ?, `email` = ?, `password` = ?,
            `title` = ?,`access_level` = ?,`contact` = ?,`address` = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['username'],$data['email'],password_hash($data['password'], PASSWORD_DEFAULT),$data['title'],$data['access_level'],$data['contact'],$data['address'],$data['id']]);
            return boolval($stmt->rowCount());
        }
        static function delete($data){
            global $conn;
            $sql = "UPDATE users SET is_deleted = 1 WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['id']]);
            return $stmt? true : false;
        }
        static function read_email($data){
            global $conn;
            $email = $data['email'] ?? null;
            if ($email) {
                $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
                $stmt->execute([$email]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                return $user;
            } else{
                return false;
            }
        }
    }
?>
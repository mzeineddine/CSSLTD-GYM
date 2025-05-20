<?php
require_once __DIR__ . "/Coach_Skeleton.php";
require_once __DIR__ . "/../connections/connection.php";
class Coach extends Coach_Skeleton
{
    // CRUD Functions
    static function create($data)
    {
        global $conn;
        // id, full_name, contact, address, dob, created_on,created_by, is_deleted
        $sql = "INSERT INTO coaches (`full_name`, `contact`, `address`,`dob`,`created_by`) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['full_name'], $data['contact'], $data['address'], $data['dob'], $data["created_by"]]);
        return boolval($stmt->rowCount());
    }
    static function read($data)
    {
        global $conn;
        $id = $data['id'] ?? null;
        if ($id) {
            $stmt = $conn->prepare("SELECT coaches.*, user_name as created_by FROM coaches, users WHERE coaches.id = ?  created_by=users.id AND coaches.is_deleted=0");
            $stmt->execute([$id]);
            $member = $stmt->fetch(PDO::FETCH_ASSOC);
            return $member;
        } else {
            $stmt = $conn->query("SELECT coaches.*, username as created_by FROM coaches, users WHERE created_by=users.id AND coaches.is_deleted=0");
            $members = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $members;
        }
    }

    static function update($data)
    {
        global $conn;
        $sql = "UPDATE coaches SET `full_name`=?, `contact`=?, `address`=?,`dob`=? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['full_name'], $data['contact'], $data['address'], $data['dob'], $data['id']]);
        return boolval($stmt->rowCount());
    }
    static function delete($data)
    {
        global $conn;
        $sql = "UPDATE coaches SET is_deleted = 1 WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['id']]);
        return boolval($stmt->rowCount());
    }
    static function get_coaches_count()
    {
        global $conn;
        $sql = "SELECT COUNT(id) as count FROM coaches WHERE is_deleted = 0";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $counter = $stmt->fetch(PDO::FETCH_ASSOC);
        return $counter;
    }
}

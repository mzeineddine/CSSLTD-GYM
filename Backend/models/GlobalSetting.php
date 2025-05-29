<?php
require_once __DIR__ . "/GlobalSetting_Skeleton.php";
require_once __DIR__ . "/../connections/connection.php";
class GlobalSetting extends GlobalSetting_Skeleton
{
    // CRUD Functions
    static function create($data)
    {
        global $conn;
        // id,logo,name,phone_nb,created_on,created_by,is_deleted
        $sql = "INSERT INTO global_settings (`logo`, `name`, `phone_nb`,`created_by`) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['logo'], $data['name'], $data['phone_nb'], $data["created_by"]]);
        return boolval($stmt->rowCount());
    }
    static function read($data)
    {
        global $conn;
        $id = $data['id'] ?? null;
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM global_settings WHERE id = ? AND is_deleted=0");
            $stmt->execute([$id]);
            $member = $stmt->fetch(PDO::FETCH_ASSOC);
            return $member;
        } else {
            $stmt = $conn->query("SELECT * FROM global_settings WHERE is_deleted=0");
            $members = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $members;
        }
    }

    static function update($data)
    {
        global $conn;
        $sql = "UPDATE global_settings SET `logo`=?, `name`=?, `phone_nb`=? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['logo'], $data['name'], $data['phone_nb'], $data['id']]);
        return boolval($stmt->rowCount());
    }

    static function update_without_logo($data)
    {
        global $conn;
        $sql = "UPDATE global_settings SET `name`=?, `phone_nb`=? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['name'], $data['phone_nb'], $data['id']]);
        return boolval($stmt->rowCount());
    }
    static function delete($data)
    {
        global $conn;
        $sql = "UPDATE global_settings SET is_deleted = 1 WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['id']]);
        return $stmt ? true : false;
    }
}

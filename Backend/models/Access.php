<?php
require_once __DIR__ . "/Access_Skeleton.php";
require_once __DIR__ . "/../connections/connection.php";
class Access extends Access_Skeleton
{
    static function create($data)
    {
        global $conn;
        $sql = "INSERT INTO access (`user_id`,`page`,`action`,`created_by`) 
            VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data["user_id"], $data['page'], $data['action'], $data['created_by']]);
        return boolval($stmt->rowCount());
    }
    static function read($data)
    {
        global $conn;
        $id = $data['user_id'] ?? null;
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM access WHERE user_id = ? AND is_deleted=0");
            $stmt->execute([$id]);
            $expense = $stmt->fetch(PDO::FETCH_ASSOC);
            return $expense;
        } else {
            $stmt = $conn->query("SELECT * FROM access WHERE is_deleted=0");
            $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $expenses;
        }
    }

    static function update($data)
    {
        global $conn;
        $sql = "UPDATE access SET `user_id`=?,`page`=?,`action`=? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['user_id'], $data['page'], $data['action'], $data["id"]]);
        return boolval($stmt->rowCount());
    }
    static function delete($data)
    {
        global $conn;
        $sql = "UPDATE access SET is_deleted = 1 WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['id']]);
        return $stmt ? true : false;
    }
}

<?php
require_once __DIR__ . "/Member_Skeleton.php";
require_once __DIR__ . "/../connections/connection.php";
class Member extends Member_Skeleton
{
    // CRUD Functions
    static function create($data)
    {
        global $conn;
        // id, full_name, contact, address, dob, created_on,created_by, is_deleted
        $sql = "INSERT INTO members (`full_name`, `contact`, `address`,`dob`,`created_by`) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['full_name'], $data['contact'], $data['address'], $data['dob'], $data["created_by"]]);
        return $conn->lastInsertId();
    }
    static function read($data)
    {
        global $conn;
        $id = $data['id'] ?? null;

        if ($id) {
            // Fetch single member
            $stmt = $conn->prepare("
            SELECT members.*, users.username AS created_by
            FROM members
            JOIN users ON members.created_by = users.id
            WHERE members.id = ? AND members.is_deleted = 0
        ");
            $stmt->execute([$id]);
            $member = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$member) return null;

            // Total subscription cost
            $stmt = $conn->prepare("
            SELECT SUM(cost) AS total
            FROM subscriptions
            WHERE member_id = ? AND is_deleted = 0
        ");
            $stmt->execute([$id]);
            $total = $stmt->fetchColumn() ?? 0;

            // Total paid amount
            $stmt = $conn->prepare("
            SELECT SUM(amount) AS total
            FROM subscription_payments
            WHERE member_id = ? AND is_deleted = 0
        ");
            $stmt->execute([$id]);
            $paid = $stmt->fetchColumn() ?? 0;

            $member["total_amount"] = (float)$total;
            $member["paid_amount"] = (float)$paid;
            $member["remaining_amount"] = $member["total_amount"] - $member["paid_amount"];

            return $member;
        } else {
            // Fetch all members
            $stmt = $conn->query("
            SELECT members.*, users.username AS created_by
            FROM members
            JOIN users ON members.created_by = users.id
            WHERE members.is_deleted = 0
        ");
            $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($members as &$member) {
                $id = $member["id"];
                $stmt = $conn->prepare("
                SELECT SUM(cost) AS total
                FROM subscriptions
                WHERE member_id = ? AND is_deleted = 0
            ");
                $stmt->execute([$id]);
                $total = $stmt->fetchColumn() ?? 0;
                $stmt = $conn->prepare("
                SELECT SUM(amount) AS total
                FROM subscription_payments
                WHERE member_id = ? AND is_deleted = 0
            ");
                $stmt->execute([$id]);
                $paid = $stmt->fetchColumn() ?? 0;
                $member["total_amount"] = (float)$total;
                $member["paid_amount"] = (float)$paid;
                $member["remaining_amount"] = $member["total_amount"] - $member["paid_amount"];
            }

            return $members;
        }
    }


    static function update($data)
    {
        global $conn;
        $sql = "UPDATE members SET `full_name`=?, `contact`=?, `address`=?,`dob`=? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['full_name'], $data['contact'], $data['address'], $data['dob'], $data['id']]);
        return boolval($stmt->rowCount());
    }
    static function delete($data)
    {
        global $conn;
        $sql = "UPDATE members SET is_deleted = 1 WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['id']]);
        return $stmt ? true : false;
    }
}

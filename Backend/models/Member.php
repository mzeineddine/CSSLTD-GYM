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
            $stmt = $conn->prepare("SELECT * FROM members WHERE id = ? AND is_deleted=0");
            $stmt->execute([$id]);
            $member = $stmt->fetch(PDO::FETCH_ASSOC);
            $stmt = $conn->prepare("SELECT SUM(cost) AS total FROM subscriptions GROUP BY member_id HAVING member_id = ?;");
            $stmt->execute([$id]);
            $total_amount = $stmt->fetch(PDO::FETCH_ASSOC);
            $member["total_amount"] = $total_amount["total"]?? 0;
            $stmt = $conn->prepare("SELECT SUM(amount) AS total FROM subscription_payments GROUP BY member_id HAVING member_id = ?;");
            $stmt->execute([$id]);
            $paid_amount = $stmt->fetch(PDO::FETCH_ASSOC);
            $member["paid_amount"] = $paid_amount["total"]?? 0;
            // $payment_account["remaining_amount"] = $total_amount - $paid_amount;
            return $member;
        } else {
            $stmt = $conn->query("SELECT * FROM members WHERE is_deleted=0");
            $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

            for ($i = 0; $i < count($members); $i++) {
                $stmt = $conn->prepare("SELECT SUM(cost) AS total FROM subscriptions GROUP BY member_id HAVING member_id = ?;");
                $stmt->execute([$members[$i]["id"]]);
                $total_amount = $stmt->fetch(PDO::FETCH_ASSOC);
                $members[$i]["total_amount"] = $total_amount ? (float)$total_amount["total"] : 0;
                $stmt = $conn->prepare("SELECT SUM(amount) AS total FROM subscription_payments GROUP BY member_id HAVING member_id = ?;");
                $stmt->execute([$members[$i]["id"]]);
                $paid_amount = $stmt->fetch(PDO::FETCH_ASSOC);
                $members[$i]["paid_amount"] = $paid_amount ? (float)$paid_amount["total"] : 0;
                $members[$i]["remaining_amount"] = $members[$i]["total_amount"] - $members[$i]["paid_amount"];
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

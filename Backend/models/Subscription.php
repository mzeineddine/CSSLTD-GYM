<?php
require_once __DIR__ . "/Subscription_Skeleton.php";
require_once __DIR__ . "/../connections/connection.php";
class Subscription extends Subscription_Skeleton
{
    // id,member_id,category_id,cost,start_date,end_date,created_on,created_by,is_deleted	
    static function create($data)
    {
        global $conn;
        $sql = "INSERT INTO subscriptions (`member_id`,`category_id`,`cost`,`start_date`,`end_date`,`created_by`) 
            VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['member_id'], $data['category_id'], $data['cost'], $data['start_date'], $data['end_date'], $data['created_by']]);
        return boolval($stmt->rowCount());
    }
    static function read($data)
    {
        global $conn;
        $id = $data['id'] ?? null;
        $member_id = $data['member_id'] ?? null;
        if ($id) {
            $stmt = $conn->prepare("SELECT subscriptions.id, members.full_name as member, categories.name as category,subscriptions.cost, subscriptions.start_date, subscriptions.end_date, subscriptions.created_on, username as created_by FROM subscriptions, members, categories, users WHERE subscriptions.created_by=users.id AND subscriptions.id = ? AND subscriptions.is_deleted=0 AND members.id=subscriptions.member_id AND categories.id=subscriptions.category_id");
            $stmt->execute([$id]);
            $expense = $stmt->fetch(PDO::FETCH_ASSOC);
            return $expense;
        } else if ($member_id) {
            $stmt = $conn->prepare("SELECT subscriptions.id, members.full_name as member, categories.name as category,subscriptions.cost, subscriptions.start_date, subscriptions.end_date, subscriptions.created_on, username as created_by FROM subscriptions, members, categories, users WHERE subscriptions.created_by=users.id AND member_id = ? AND subscriptions.is_deleted=0 AND members.id=subscriptions.member_id AND categories.id=subscriptions.category_id");
            $stmt->execute([$member_id]);
            $expense = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $expense;
        } else {
            $stmt = $conn->query("SELECT subscriptions.id, members.full_name as member, categories.name as category,subscriptions.cost, subscriptions.start_date, subscriptions.end_date, subscriptions.created_on, username as created_by FROM subscriptions, members, categories, users WHERE subscriptions.created_by=users.id AND subscriptions.is_deleted=0 AND members.id=subscriptions.member_id AND categories.id=subscriptions.category_id  AND end_date>CURRENT_DATE order by end_date asc");
            $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $expenses;
        }
    }

    static function update($data)
    {
        global $conn;
        $sql = "UPDATE subscriptions SET `member_id`=?,`category_id`=?,`cost`=?,`start_date`=?,`end_date`=? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['member_id'], $data['category_id'], $data['cost'], $data['start_date'], $data['end_date'], $data["id"]]);
        return boolval($stmt->rowCount());
    }
    static function delete($data)
    {
        global $conn;
        $sql = "UPDATE subscriptions SET is_deleted = 1 WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['id']]);
        return $stmt ? true : false;
    }
}

<?php
require_once __DIR__ . "/SubscriptionPayment_Skeleton.php";
require_once __DIR__ . "/../connections/connection.php";
class SubscriptionPayment extends SubscriptionPayment_Skeleton
{
    static function create($data)
    {
        global $conn;
        // id	expense_id	amount	created_on	created_by	is_deleted	
        $sql = "INSERT INTO subscription_payments (`member_id`,`amount`,`created_by`) 
            VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['member_id'], $data['amount'], $data['created_by']]);
        return boolval($stmt->rowCount());
    }
    static function read($data)
    {
        global $conn;
        $id = $data['id'] ?? null;
        if ($id) {
            $stmt = $conn->prepare("SELECT subscription_payments.*, username as created_by FROM subscription_payments, users WHERE created_by=users.id AND subscription_payments.id = ? AND subscription_payments.is_deleted=0");
            $stmt->execute([$id]);
            $expense = $stmt->fetch(PDO::FETCH_ASSOC);
            return $expense;
        } else {
            $stmt = $conn->query("SELECT 
        subscription_payments.id as id,
        subscription_payments.member_id,
        members.full_name,
        subscription_payments.amount,
        subscription_payments.created_on,
        subscription_payments.is_deleted,
        users.username AS created_by
    FROM subscription_payments,users,members
    WHERE subscription_payments.member_id = members.id 
    AND subscription_payments.created_by = users.id
    AND subscription_payments.is_deleted = 0
    ");
            $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $expenses;
        }
    }
    static function update($data)
    {
        global $conn;
        // id	expense_id	amount	created_on	created_by	is_deleted
        $sql = "UPDATE subscription_payments SET `amount`=? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(params: [$data['amount'], $data['id']]);
        return boolval($stmt->rowCount());
    }
    static function delete($data)
    {
        global $conn;
        $sql = "UPDATE subscription_payments SET is_deleted = 1 WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['id']]);
        return $stmt ? true : false;
    }
}

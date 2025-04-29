<?php
    class Expenses_Skeleton{
        public static $id;
        public static $date;
        public static $account_id;
        public static $bill_amount;
        public static $paid_amount;
        public static $comment;
        public static $created_on;
        public static $created_by;
        public static $is_deleted;
        static function create_expense($id, $date, $account_id, $bill_amount, $paid_amount, $comment, $created_on, $created_by, $is_deleted){
            self::$id=$id;
            self::$date = $date;
            self::$account_id = $account_id;
            self::$bill_amount = $bill_amount;
            self::$paid_amount = $paid_amount;
            self::$comment = $comment;
            self::$created_on = $created_on; 
            self::$created_by = $created_by; 
            self::$is_deleted = $is_deleted;
        }
    }
?>
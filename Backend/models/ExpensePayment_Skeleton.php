<?php
    class ExpensePayment_Skeleton{
        public static $id;
        public static $account_id;
        public static $amount;
        public static $created_on;
        public static $created_by;
        public static $is_deleted;
        static function create_expensePayment($id, $account_id, $amount, $created_on, $created_by, $is_deleted){
            self::$id=$id;
            self::$account_id=$account_id;
            self::$amount=$amount;
            self::$created_on=$created_on;
            self::$created_by=$created_by;
            self::$is_deleted=$is_deleted;
        }
    }
?>
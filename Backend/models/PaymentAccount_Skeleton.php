<?php
    class PaymentAccount_Skeleton{
        public static $id;
        public static $name;
        public static $description;
        public static $created_on;
        public static $created_by;
        public static $is_deleted;
        // id, full_name, contact, address, dob, created_on,created_by, is_deleted
        static function create_member($id, $name, $created_on,$created_by, $is_deleted){
                self::$id=$id;
                self::$name=$name;
                self::$created_on=$created_on; 
                self::$created_by=$created_by; 
                self::$is_deleted=$is_deleted;
        }
    }
?>
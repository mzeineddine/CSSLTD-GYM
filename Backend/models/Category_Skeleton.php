<?php
    class Category_Skeleton{
        // id,name,price,last_update,created_on,created_by,is_deleted	
        public static $id;
        public static $name;
        public static $price;
        public static $last_update;
        public static $created_on;
        public static $created_by;
        public static $is_deleted;
        // id, full_name, contact, address, dob, created_on,created_by, is_deleted
        static function create_category($id, $name, $price, $last_update, $created_on,$created_by, $is_deleted){
            self::$id=$id;
            self::$name=$name;
            self::$price=$price;
            self::$last_update=$last_update;
            self::$created_on=$created_on; 
            self::$created_by=$created_by; 
            self::$is_deleted=$is_deleted;
        }
    }
?>
<?php
    class Member_Skeleton{
        public static $id;
        public static $full_name;
        public static $contact;
        public static $address;
        public static $dob;
        public static $created_on;
        public static $created_by;
        public static $is_deleted;
        // id, full_name, contact, address, dob, created_on,created_by, is_deleted
        static function create_user($id, $full_name, $contact, $address, $dob, $created_on,$created_by, $is_deleted){
                self::$id=$id;
                self::$full_name=$full_name;
                self::$contact=$contact;
                self::$address=$address;
                self::$dob=$dob;
                self::$created_on=$created_on; 
                self::$created_by=$created_by; 
                self::$is_deleted=$is_deleted;
        }
    }
?>
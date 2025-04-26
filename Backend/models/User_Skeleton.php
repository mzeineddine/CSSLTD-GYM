<?php
    class User_Skeleton{
        public static $id;
        public static $username;
        public static $email;
        public static $password;
        public static $title;
        public static $access_level;
        public static $contact;
        public static $address;
        public static $status;
        public static $created_on;
        public static $is_deleted;
        // id, username, email, password, title, access_level, 
        // contact, address, status, created_on, is_deleted
        static function create_user($id, $username, $email, $password, $title, $access_level, 
            $contact, $address, $status, $created_on, $is_deleted){
                self::$id=$id;
                self::$username=$username;
                self::$email=$email;
                self::$password=$password;
                self::$title=$title;
                self::$access_level=$access_level; 
                self::$contact=$contact;
                self::$address=$address;
                self::$status=$status;
                self::$created_on=$created_on; 
                self::$is_deleted=$is_deleted;
        }
    }
?>
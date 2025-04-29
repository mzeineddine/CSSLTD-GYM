<?php
    class GlobalSetting_Skeleton{
        // id,logo,name,phone_nb,created_on,created_by,is_deleted
        public static $id;
        public static $logo;
        public static $name;
        public static $phone_nb;
        public static $created_on;
        public static $created_by;
        public static $is_deleted;
        static function create_globalSettings($id, $logo, $name, $phone_nb, $created_on, $created_by, $is_deleted){
            self::$id=$id;
            self::$logo=$logo;
            self::$name=$name;
            self::$phone_nb=$phone_nb;
            self::$created_on=$created_on; 
            self::$created_by=$created_by; 
            self::$is_deleted=$is_deleted;
        }	
    }
?>
<?php
    class Log_Skeleton{
        // id,action,description,created_on,created_by,is_deleted
        public static $id;
        public static $action;
        public static $description;
        public static $created_on;
        public static $created_by;
        public static $is_deleted;
        static function create_class($id, $action, $description, $created_on, $created_by, $is_deleted){
            self::$id=$id;
            self::$action=$action;
            self::$description=$description;
            self::$created_on=$created_on; 
            self::$created_by=$created_by; 
            self::$is_deleted=$is_deleted;
        }	
    }
?>
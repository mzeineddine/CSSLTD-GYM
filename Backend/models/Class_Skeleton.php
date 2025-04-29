<?php
    class Class_Skeleton{
        // id,name,price,last_update,created_on,created_by,is_deleted	
        public static $id;
        public static $coach_id;
        public static $title;
        public static $start_date;
        public static $end_date;
        public static $created_on;
        public static $created_by;
        public static $is_deleted;
        // id, full_name, contact, address, dob, created_on,created_by, is_deleted
        static function create_Skeleton($id, $coach_id, $title, $start_date,$end_date, $created_on,$created_by, $is_deleted){
            self::$id=$id;
            self::$coach_id=$coach_id;
            self::$title=$title;
            self::$start_date=$start_date;
            self::$end_date=$end_date;
            self::$created_on=$created_on; 
            self::$created_by=$created_by; 
            self::$is_deleted=$is_deleted;
        }
    }
?>
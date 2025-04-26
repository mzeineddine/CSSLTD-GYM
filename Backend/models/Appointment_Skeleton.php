<?php
    class Appointment_Skeleton{
        // id,member_id,coach_id,title,color,start_date,end_date,created_on,created_by,is_deleted	
        public static $id;
        public static $member_id;
        public static $coach_id;
        public static $title;
        public static $color;
        public static $start_date;
        public static $end_date;
        public static $created_on;
        public static $created_by;
        public static $is_deleted;
        static function create_class($id,$member_id, $coach_id,$title,$color, $start_date, $end_date, $created_on, $created_by, $is_deleted){
            self::$id=$id;
            self::$member_id=$member_id;
            self::$coach_id=$coach_id;
            self::$title=$title;
            self::$color=$color;
            self::$start_date=$start_date;
            self::$end_date=$end_date;
            self::$created_on=$created_on; 
            self::$created_by=$created_by; 
            self::$is_deleted=$is_deleted;
        }	
    }
?>
<?php
    class Subscription_Skeleton{
        public static $id;
        public static $member_id;
        public static $category_id;
        public static $cost;
        public static $start_date;
        public static $end_date;
        public static $created_on;
        public static $created_by;
        public static $is_deleted;
        
        // id,member_id,category_id,cost,start_date,end_date,created_on,created_by,is_deleted	
        static function create_subscription($id,$member_id,$category_id,$cost,$start_date,$end_date,$created_on,$created_by,$is_deleted){
            self::$id=$id;
            self::$member_id=$member_id;
            self::$category_id=$category_id;
            self::$cost=$cost;
            self::$start_date=$start_date;
            self::$end_date=$end_date;
            self::$created_on=$created_on; 
            self::$created_by=$created_by; 
            self::$is_deleted=$is_deleted;
        }
    }
?>
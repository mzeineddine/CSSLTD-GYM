<?php
    class ClassMemberAttendance_Skeleton{
        // id,class_member_id,class_date,member_attend,created_on,created_by,is_deleted		
        public static $id;
        public static $class_member_id;
        public static $class_date;
        public static $member_attend;
        public static $created_on;
        public static $created_by;
        public static $is_deleted;
        static function create_class($id, $class_member_id, $class_date,$member_attend, $created_on,$created_by, $is_deleted){
            self::$id=$id;
            self::$class_member_id=$class_member_id;
            self::$class_date=$class_date;
            self::$member_attend=$member_attend;
            self::$created_on=$created_on; 
            self::$created_by=$created_by; 
            self::$is_deleted=$is_deleted;
        }
    }
?>
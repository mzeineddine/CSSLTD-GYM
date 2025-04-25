<?php
    class ClassMember_Skeleton{
        // id,class_id,member_id,created_on,created_by,is_deleted	
        public static $id;
        public static $class_id;
        public static $member_id;
        public static $created_on;
        public static $created_by;
        public static $is_deleted;
        static function create_class($id, $class_id, $member_id, $created_on,$created_by, $is_deleted){
            self::$id=$id;
            self::$class_id=$class_id;
            self::$member_id=$member_id;
            self::$created_on=$created_on; 
            self::$created_by=$created_by; 
            self::$is_deleted=$is_deleted;
        }
    }
?>
<?php
class Access_Skeleton
{
    // id,member_id,coach_id,title,color,start_date,end_date,created_on,created_by,is_deleted	
    public static $id;
    public static $user_id;
    public static $page;
    public static $action;
    public static $created_on;
    public static $created_by;
    public static $is_deleted;
    static function create_access($id, $user_id, $page, $action, $created_on, $created_by, $is_deleted)
    {
        self::$id = $id;
        self::$user_id = $user_id;
        self::$page = $page;
        self::$action = $action;
        self::$created_on = $created_on;
        self::$created_by = $created_by;
        self::$is_deleted = $is_deleted;
    }
}

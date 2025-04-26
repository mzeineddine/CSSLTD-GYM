<?php 

// Define your base directory 
$base_dir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove the base directory from the request if present
if (strpos($request, $base_dir) === 0) {
    $request = substr($request, strlen($base_dir));
}

// Ensure the request is at least '/'
if ($request == '') {
    $request = '/';
}

$apis = [
    //CRUD User apis paths
    "/user/create"  => ['controller' => 'User_Controller', "method" => 'create'],
    "/user/read"    => ['controller' => 'User_Controller', "method" => 'read'],
    "/user/update"  => ['controller' => 'User_Controller', "method" => 'update'],
    "/user/delete"  => ['controller' => 'User_Controller', "method" => 'delete'],
    //User apis
    "/user/signup"       => ['controller' => 'User_Controller', "method" => 'signup'],
    "/user/login"        => ['controller' => 'User_Controller', "method" => 'login'],

    // CRUD Member apis paths
    "/member/create"  => ['controller' => 'Member_Controller', "method" => 'create'],
    "/member/read"    => ['controller' => 'Member_Controller', "method" => 'read'],
    "/member/update"  => ['controller' => 'Member_Controller', "method" => 'update'],
    "/member/delete"  => ['controller' => 'Member_Controller', "method" => 'delete'],

    // CRUD Coach apis paths
    "/coach/create"  => ['controller' => 'Coach_Controller', "method" => 'create'],
    "/coach/read"    => ['controller' => 'Coach_Controller', "method" => 'read'],
    "/coach/update"  => ['controller' => 'Coach_Controller', "method" => 'update'],
    "/coach/delete"  => ['controller' => 'Coach_Controller', "method" => 'delete'],

    // CRUD PaymentAccount apis paths
    "/payment_account/create"  => ['controller' => 'PaymentAccount_Controller', "method" => 'create'],
    "/payment_account/read"    => ['controller' => 'PaymentAccount_Controller', "method" => 'read'],
    "/payment_account/update"  => ['controller' => 'PaymentAccount_Controller', "method" => 'update'],
    "/payment_account/delete"  => ['controller' => 'PaymentAccount_Controller', "method" => 'delete'],

    // CRUD Expense apis paths
    "/expense/create"  => ['controller' => 'Expense_Controller', "method" => 'create'],
    "/expense/read"    => ['controller' => 'Expense_Controller', "method" => 'read'],
    "/expense/update"  => ['controller' => 'Expense_Controller', "method" => 'update'],
    "/expense/delete"  => ['controller' => 'Expense_Controller', "method" => 'delete'],

    // CRUD Expense Payment apis paths
    "/expense_payment/create"  => ['controller' => 'ExpensePayment_Controller', "method" => 'create'],
    "/expense_payment/read"    => ['controller' => 'ExpensePayment_Controller', "method" => 'read'],
    "/expense_payment/update"  => ['controller' => 'ExpensePayment_Controller', "method" => 'update'],
    "/expense_payment/delete"  => ['controller' => 'ExpensePayment_Controller', "method" => 'delete'],

    // CRUD Category apis paths
    "/category/create"  => ['controller' => 'Category_Controller', "method" => 'create'],
    "/category/read"    => ['controller' => 'Category_Controller', "method" => 'read'],
    "/category/update"  => ['controller' => 'Category_Controller', "method" => 'update'],
    "/category/delete"  => ['controller' => 'Category_Controller', "method" => 'delete'],
    
    // CRUD Subscription apis paths
    "/subscription/create"  => ['controller' => 'Subscription_Controller', "method" => 'create'],
    "/subscription/read"    => ['controller' => 'Subscription_Controller', "method" => 'read'],
    "/subscription/update"  => ['controller' => 'Subscription_Controller', "method" => 'update'],
    "/subscription/delete"  => ['controller' => 'Subscription_Controller', "method" => 'delete'],

    // CRUD Subscription Payment apis paths
    "/subscription_payment/create"  => ['controller' => 'SubscriptionPayment_Controller', "method" => 'create'],
    "/subscription_payment/read"    => ['controller' => 'SubscriptionPayment_Controller', "method" => 'read'],
    "/subscription_payment/update"  => ['controller' => 'SubscriptionPayment_Controller', "method" => 'update'],
    "/subscription_payment/delete"  => ['controller' => 'SubscriptionPayment_Controller', "method" => 'delete'],

    // CRUD Class apis paths
    "/class/create"  => ['controller' => 'Class_Controller', "method" => 'create'],
    "/class/read"    => ['controller' => 'Class_Controller', "method" => 'read'],
    "/class/update"  => ['controller' => 'Class_Controller', "method" => 'update'],
    "/class/delete"  => ['controller' => 'Class_Controller', "method" => 'delete'],

    // CRUD Class Member apis paths
    "/class_member/create"  => ['controller' => 'ClassMember_Controller', "method" => 'create'],
    "/class_member/read"    => ['controller' => 'ClassMember_Controller', "method" => 'read'],
    "/class_member/update"  => ['controller' => 'ClassMember_Controller', "method" => 'update'],
    "/class_member/delete"  => ['controller' => 'ClassMember_Controller', "method" => 'delete'],

    // CRUD Class Member Attendance apis paths
    "/class_member_attendance/create"  => ['controller' => 'ClassMemberAttendance_Controller', "method" => 'create'],
    "/class_member_attendance/read"    => ['controller' => 'ClassMemberAttendance_Controller', "method" => 'read'],
    "/class_member_attendance/update"  => ['controller' => 'ClassMemberAttendance_Controller', "method" => 'update'],
    "/class_member_attendance/delete"  => ['controller' => 'ClassMemberAttendance_Controller', "method" => 'delete'],

    // CRUD Global Setting apis paths
    "/global_setting/create"  => ['controller' => 'GlobalSetting_Controller', "method" => 'create'],
    "/global_setting/read"    => ['controller' => 'GlobalSetting_Controller', "method" => 'read'],
    "/global_setting/update"  => ['controller' => 'GlobalSetting_Controller', "method" => 'update'],
    "/global_setting/delete"  => ['controller' => 'GlobalSetting_Controller', "method" => 'delete'],

    // CRUD Log apis paths
    "/log/create"  => ['controller' => 'log_Controller', "method" => 'create'],
    "/log/read"    => ['controller' => 'log_Controller', "method" => 'read'],
    "/log/update"  => ['controller' => 'log_Controller', "method" => 'update'],
    "/log/delete"  => ['controller' => 'log_Controller', "method" => 'delete'],
];

if (isset($apis[$request])) {
    $controller_name = $apis[$request]['controller'];
    $method = $apis[$request]['method'];
    require_once "./api/v1/{$controller_name}.php";
    
    $controller = new $controller_name();
    if (method_exists($controller, $method)) {
        $controller->$method();
    } else {
        echo "Error: Method {$method} not found in {$controller_name}.";
    }
} else {
    echo "404 Not Found";
}
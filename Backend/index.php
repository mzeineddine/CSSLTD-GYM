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
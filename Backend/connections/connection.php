<?php
    //using mysqli
    // $host = "localhost";
    // $user = "root";
    // $pass = "";
    // $db_name = "csstld_gym";

    // $conn = new mysqli($host,$user,$pass,$db_name);

    //using PDO
    $host = "localhost";
    $user = "root";
    $pass = "";
    $db_name = "csstld_gym";
    $dsn = "mysql:host=$host;dbname=$db_name";
    
    try {
        $conn = new PDO($dsn, $user, $pass);
    } catch (PDOException $e) {
        throw new PDOException($e->getMessage(), (int)$e->getCode());
    }

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods:*");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
?>
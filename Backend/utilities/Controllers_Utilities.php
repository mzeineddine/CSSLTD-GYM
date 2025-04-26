<?php
    class Controllers_Utilities{
        static function check_params($data,$params){
            for($i=0; $i<count($params); $i++){
                if(!isset($data[$params[$i]])){
                    echo json_encode([
                        "result" => false,
                        "message" => "missing ".$params[$i]
                        // "message" => "missing parameter"
                    ]);
                    return false;
                }
            } return true;
        }
    }
?>
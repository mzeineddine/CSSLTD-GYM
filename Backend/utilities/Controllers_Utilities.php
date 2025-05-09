<?php
    require 'vendor/autoload.php';
    use \Firebase\JWT\JWT;
    use \Firebase\JWT\Key;
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
        static function generate_jwt($user){
            $key = "your_secret_key"; // keep this secret and safe
            $issuedAt = time();
            $expirationTime = $issuedAt + 3600; // jwt valid for 1 hour
            $payload = [
                'iat' => $issuedAt,
                'exp' => $expirationTime,
                'id' => $user['id']
            ];
            $jwt = JWT::encode($payload, $key, 'HS256');
            return $jwt;
        }
        static function check_jwt(){
            $key = "your_secret_key";
            // Get Authorization header
            $headers = apache_request_headers();
            $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
            if ($authHeader) {
                list($jwt) = sscanf($authHeader, 'Bearer %s');
                if ($jwt) {
                    try {
                        $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
                        return $decoded;
                    } catch (Exception $e) {
                        // http_response_code(401);
                        echo json_encode([
                            "result"    => false,
                            "message"   => "Access denied.", 
                            "error"     => $e->getMessage()]);
                        return false;
                    }
                }
            } else {
                // http_response_code(401);
                echo json_encode(["message" => "Authorization header not found."]);
                return false;
            }
        }
    }
?>
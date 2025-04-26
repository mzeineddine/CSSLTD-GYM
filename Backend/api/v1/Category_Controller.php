<?php
    require_once __DIR__ . "/../../models/User.php";
    require_once __DIR__ . "/../../models/Category.php";
    require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
    class Category_Controller{
        static function check_created_by($data){
            if(!User::read($data)){
                echo json_encode([
                    "result"=>false,
                    "message"=>"Invalid user_id"
                ]);
                return false;
            }
            return true;
        } 
        // CRUD APIs Functions
        static function create(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["name","price","created_by"]))
                return false;
            $modified_data = ["id"=>$data["created_by"]];
            if(self::check_created_by($modified_data)){
                $created = Category::create($data);
                echo json_encode([
                    "result" => $created,
                    "message" => $created?"Category created successfully":"Category not created",
                ]);
                return $created;
            }
            return false;
        }
        static function read(){
            $data = json_decode(file_get_contents("php://input"),true);
            // if(!Controllers_Utilities::check_params($data,["id"]))
            //     return false;
            $category = Category::read($data);
            echo json_encode([
                "result" => boolval($category),
                "message" => $category ? "Expense payment found":"no expense payments found",
                "data" => $category
            ]);
            return boolval($category);
        }
        static function update(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id","name","price"]))
                return false;
            if(!Category::read($data)){
                echo json_encode([
                    "result" => false,
                    "message" => "No Category found"
                ]);
                return false;
            }
            $updated = Category::update($data);
            echo json_encode([
                "result" => $updated,
                "message" => $updated?"Category updated successfully":"Category not updated",
            ]);
            return $updated;
        }
        static function delete(){
            $data = json_decode(file_get_contents("php://input"),true);
            if(!Controllers_Utilities::check_params($data,["id"]))
                return false;
            $category=Category::read($data);
            if(!$category){
                echo json_encode([
                    "result" => boolval($category),
                    "message" => $category ? "Category payment found":"no category payment found",
                    "data" => $category
                ]);
                return false;
            }
            $deleted = Category::delete($data);
            echo json_encode([
                "result" => $deleted,
                "message" => $deleted?"Category deleted successfully":"Category not deleted",
            ]);
            return $deleted;
        }
    }
?>
<?php
require_once __DIR__ . "/../../models/User.php";
require_once __DIR__ . "/../../models/Category.php";
require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
require_once __DIR__ . "/../../models/Log.php";

class Category_Controller
{
    static function check_created_by($data)
    {
        if (!User::read($data)) {
            echo json_encode([
                "result" => false,
                "message" => "Invalid user"
            ]);
            return false;
        }
        return true;
    }
    // CRUD APIs Functions
    static function create()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!$decoded_token) {
            return false;
        }
        $data['created_by'] = $decoded_token->id;
        if (!Controllers_Utilities::check_params($data, ["name", "type", "price", 'created_by']))
            return false;
        $modified_data = ["id" => $data["created_by"]];
        if (self::check_created_by($modified_data)) {
            $created = Category::create($data);
            echo json_encode([
                "result" => $created,
                "message" => $created ? "Category created successfully" : "Category not created",
            ]);
            if ($created) {
                Log::create([
                    "action" => "Create",
                    "created_by" => $decoded_token->id,
                    "description" => $decoded_token->id .
                        " create CATEGORY of name " . $data["name"]
                ]);
            }
            return $created;
        }
        return false;
    }
    static function read()
    {
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!$decoded_token) {
            return false;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        // if(!Controllers_Utilities::check_params($data,["id"]))
        //     return false;
        $category = Category::read($data);
        echo json_encode([
            "result" => boolval($category),
            "message" => $category ? "Category found" : "No categories found",
            "data" => $category
        ]);
        return boolval($category);
    }
    static function update()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!$decoded_token) {
            return false;
        }
        if (!Controllers_Utilities::check_params($data, ["id", "name", "type", "price"]))
            return false;
        $category = Category::read($data);
        if (!$category) {
            echo json_encode([
                "result" => false,
                "message" => "No Category found"
            ]);
            return false;
        }
        $updated = Category::update($data);
        echo json_encode([
            "result" => $updated,
            "message" => $updated ? "Category updated successfully" : "Category not updated",
        ]);
        if ($updated) {
            Log::create([
                "action" => "Update",
                "created_by" => $decoded_token->id,
                "description" => $decoded_token->id .
                    " update CATEGORY of name " . $category["name"]
            ]);
        }
        return $updated;
    }
    static function delete()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!$decoded_token) {
            return false;
        }
        if (!Controllers_Utilities::check_params($data, ["id"]))
            return false;
        $category = Category::read($data);
        if (!$category) {
            echo json_encode([
                "result" => false,
                "message" => "No category payment found",
            ]);
            return false;
        }
        $deleted = Category::delete($data);
        echo json_encode([
            "result" => $deleted,
            "message" => $deleted ? "Category deleted successfully" : "Category not deleted",
        ]);
        if ($deleted) {
            Log::create([
                "action" => "Deleted",
                "created_by" => $decoded_token->id,
                "description" => $decoded_token->id .
                    " delete CATEGORY of name " . $category["name"]
            ]);
        }
        return $deleted;
    }
}

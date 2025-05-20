<?php
require_once __DIR__ . "/../../models/User.php";
require_once __DIR__ . "/../../models/Coach.php";
require_once __DIR__ . "/../../models/Log.php";
require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
class Coach_Controller
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
        if (!Controllers_Utilities::check_params($data, ["full_name", "contact", "address", "dob", "created_by"]))
            return false;
        $modified_data = ["id" => $data["created_by"]];
        if (self::check_created_by($modified_data)) {
            $created = Coach::create($data);
            echo json_encode([
                "result" => $created,
                "message" => $created ? "Coach created successfully" : "Coach not updated",
            ]);
            if ($created) {
                Log::create([
                    "action" => "Create",
                    "created_by" => $decoded_token->id,
                    "description" => "Coach of name " . $data["full_name"]
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
        $coach = Coach::read($data);
        echo json_encode([
            "result" => boolval($coach),
            "message" => $coach ? "Coach found" : "No coaches found",
            "data" => $coach
        ]);
        return $coach;
    }
    static function update()
    {
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!$decoded_token) {
            return false;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        if (!Controllers_Utilities::check_params($data, ["id", "full_name", "contact", "address", "dob"]))
            return false;
        $coach = Coach::read($data);
        if (!$coach) {
            echo json_encode([
                "result" => false,
                "message" => "No coaches found"
            ]);
            return false;
        }

        $updated = Coach::update($data);
        echo json_encode([
            "result" => $updated,
            "message" => $updated ? "Coach updated successfully" : "Coach not updated",
        ]);
        if ($updated) {
            Log::create([
                "action" => "Update",
                "created_by" => $decoded_token->id,
                "description" => "Coach of name " . $coach["full_name"]
            ]);
        }
        return $updated;
    }
    static function delete()
    {
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!$decoded_token) {
            return false;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        if (!Controllers_Utilities::check_params($data, ["id"]))
            return false;
        $coach = Coach::read($data);
        if (!$coach) {
            echo json_encode([
                "result" => false,
                "message" => "No coaches found"
            ]);
            return false;
        }
        $deleted = Coach::delete($data);
        echo json_encode([
            "result" => $deleted,
            "message" => $deleted ? "Coach deleted successfully" : "Coach not deleted",
        ]);
        if ($deleted) {
            Log::create([
                "action" => "Update",
                "created_by" => $decoded_token->id,
                "description" => "Coach of name " . $coach["full_name"]
            ]);
        }
        return $deleted;
    }

    static function get_coaches_count()
    {
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!$decoded_token) {
            return false;
        }
        $data = json_decode(file_get_contents("php://input"), true);

        $count = Coach::get_coaches_count();

        echo json_encode([
            "result" => boolval($count),
            "message" => $count ? "Coach count found" : "No coaches count found",
            "data" => $count
        ]);
        return $count;
    }
}

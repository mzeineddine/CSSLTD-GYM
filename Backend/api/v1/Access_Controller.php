<?php
require_once __DIR__ . "/../../models/User.php";
require_once __DIR__ . "/../../models/Access.php";
require_once __DIR__ . "/../../models/Log.php";
require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
class Appointment_Controller
{
    static function check_member($data)
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
        if (!Controllers_Utilities::check_params($data, ['user_id', 'page', 'action', 'created_by']))
            return false;
        $modified_data = ["id" => $data["created_by"]];
        if (self::check_member($modified_data)) {
            $modified_data = ["id" => $data["user_id"]];
            if (self::check_member($modified_data)) {
                $created = Access::create($data);
                echo json_encode([
                    "result" => $created,
                    "message" => $created ? "Access created successfully" : "Access not created",
                ]);
                Log::create([
                    "action" => "Create",
                    "created_by" => $data["created_by"],
                    "description" => " ACCESS of Page " . $data["page"] . " and Action " . $data["action"]
                ]);
                return $created;
            }
            return false;
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
        $class = Access::read($data);
        echo json_encode([
            "result" => boolval($class),
            "message" => $class ? "Access found" : "No accesses found",
            "data" => $class
        ]);
        return boolval($class);
    }
    static function update()
    {
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!$decoded_token) {
            return false;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        if (!Controllers_Utilities::check_params($data, ["user_id", "page", "action", "id"]))
            return false;
        $access = Access::read($data);
        if (!$access) {
            echo json_encode([
                "result" => false,
                "message" => "No appointments found"
            ]);
            return false;
        }

        $modified_data["id"] = $data["user_id"];
        if (self::check_member($modified_data)) {
            $updated = Access::update($data);
            echo json_encode([
                "result" => $updated,
                "message" => $updated ? "Access updated successfully" : "Access not updated",
            ]);
            Log::create([
                "action" => "Update",
                "created_by" => $decoded_token->id,
                "description" => "ACCESS of page " . $access["page"] . " from " . $access["action"] . " to " . $data["action"]
            ]);
            return $updated;
        }
        return false;
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
        $access = Access::read($data);
        if (!$access) {
            echo json_encode([
                "result" => false,
                "message" => "No access found"
            ]);
            return false;
        }
        $deleted = Access::delete($data);
        echo json_encode([
            "result" => $deleted,
            "message" => $deleted ? "Access deleted successfully" : "Access not deleted",
        ]);
        Log::create([
            "action" => "Delete",
            "created_by" => $decoded_token->id,
            "description" => "Access of page " . $access["page"] . " and action " . $access["action"]
        ]);
        return $deleted;
    }
}

<?php
require_once __DIR__ . "/../../models/User.php";
require_once __DIR__ . "/../../models/Coach.php";
require_once __DIR__ . "/../../models/Member.php";
require_once __DIR__ . "/../../models/Appointment.php";
require_once __DIR__ . "/../../models/Log.php";
require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
class Appointment_Controller
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
    static function check_coach($data)
    {
        if (!Coach::read($data)) {
            echo json_encode([
                "result" => false,
                "message" => "Invalid coach"
            ]);
            return false;
        }
        return true;
    }
    static function check_member($data)
    {
        if (!Member::read($data)) {
            echo json_encode([
                "result" => false,
                "message" => "Invalid member"
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
        if (!Controllers_Utilities::check_params($data, ['member_id', 'coach_id', 'title', 'color', 'start_date', 'end_date', 'created_by']))
            return false;
        $modified_data = ["id" => $data["created_by"]];
        if (self::check_created_by($modified_data)) {
            $modified_data = ["id" => $data["coach_id"]];
            if (self::check_coach($modified_data)) {
                $modified_data = ["id" => $data["member_id"]];
                if (self::check_member($modified_data)) {
                    $created = Appointment::create($data);
                    echo json_encode([
                        "result" => $created,
                        "message" => $created ? "Appointment created successfully" : "Appointment not created",
                    ]);
                    Log::create([
                        "action" => "Create",
                        "created_by" => $data["created_by"],
                        "description" => "APPOINTMENT of title " . $data["title"]
                    ]);
                    return $created;
                }
                return false;
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
        // if(!Controllers_Utilities::check_params($data,["id"]))
        //     return false;
        $class = Appointment::read($data);
        echo json_encode([
            "result" => boolval($class),
            "message" => $class ? "Appointment found" : "No appointments found",
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
        if (!Controllers_Utilities::check_params($data, ["member_id", "coach_id", "title", "color", "start_date", "end_date", "id"]))
            return false;
        $appointment = Appointment::read($data);
        if (!$appointment) {
            echo json_encode([
                "result" => false,
                "message" => "No appointments found"
            ]);
            return false;
        }
        $modified_data["id"] = $data["coach_id"];
        if (self::check_coach($modified_data)) {
            $modified_data["id"] = $data["member_id"];
            if (self::check_member($modified_data)) {
                $updated = Appointment::update($data);
                echo json_encode([
                    "result" => $updated,
                    "message" => $updated ? "Appointment updated successfully" : "Appointment not updated",
                ]);
                Log::create([
                    "action" => "Update",
                    "created_by" => $decoded_token->id,
                    "description" => "APPOINTMENT of title " . $appointment["title"]
                ]);
                return $updated;
            }
            return false;
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
        $appointment = Appointment::read($data);
        if (!$appointment) {
            echo json_encode([
                "result" => false,
                "message" => "No appointment found"
            ]);
            return false;
        }
        $deleted = Appointment::delete($data);
        echo json_encode([
            "result" => $deleted,
            "message" => $deleted ? "Appointment deleted successfully" : "Appointment not deleted",
        ]);
        Log::create([
            "action" => "Delete",
            "created_by" => $decoded_token->id,
            "description" => "APPOINTMENT of title " . $appointment["title"]
        ]);
        return $deleted;
    }
}

<?php
require_once __DIR__ . "/../../models/User.php";
require_once __DIR__ . "/../../models/Member.php";
require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
require_once __DIR__ . "/../../models/Log.php";
class Member_Controller
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
            $created = Member::create($data);
            echo json_encode([
                "result" => $created,
                "message" => $created ? "Member created successfully" : "Member not created",
            ]);
            if ($created) {
                Log::create([
                    "action" => "Create",
                    "created_by" => $decoded_token->id,
                    "description" => $decoded_token->id .
                        " create Member of name " . $data["full_name"]
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
        $member = Member::read($data);
        echo json_encode([
            "result" => boolval($member),
            "message" => $member ? "Member found" : "No members found",
            "data" => $member
        ]);
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
        $member = Member::read($data);
        if (!$member) {
            echo json_encode([
                "result" => false,
                "message" => "No members found"
            ]);
            return false;
        }
        // $modified_data = ["id"=>$data["created_by"]];
        // if(self::check_created_by($modified_data)){
        $updated = Member::update($data);
        echo json_encode([
            "result" => $updated,
            "message" => $updated ? "Member updated successfully" : "Member not updated",
        ]);
        // }
        if ($updated) {
            Log::create([
                "action" => "Update",
                "created_by" => $decoded_token->id,
                "description" => $decoded_token->id .
                    " update Member of name " . $member["full_name"]
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
        $member = Member::read($data);
        if (!$member) {
            echo json_encode([
                "result" => false,
                "message" => "No members found"
            ]);
            return false;
        }
        $deleted = Member::delete($data);
        echo json_encode([
            "result" => $deleted,
            "message" => $deleted ? "Member deleted successfully" : "Member not deleted",
        ]);
        if ($deleted) {
            Log::create([
                "action" => "Delete",
                "created_by" => $decoded_token->id,
                "description" => $decoded_token->id .
                    " delete Member of name " . $member["full_name"]
            ]);
        }
        return $deleted;
    }
}

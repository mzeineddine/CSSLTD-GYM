<?php
require_once __DIR__ . "/../../models/User.php";
require_once __DIR__ . "/../../models/GlobalSetting.php";
require_once __DIR__ . "/../../models/Log.php";
require_once __DIR__ . "/../../utilities/Controllers_Utilities.php";
class GlobalSetting_Controller
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
        if (!Controllers_Utilities::check_params($data, ["logo", "file_name", "name", "phone_nb", "created_by"]))
            return false;
        $out_path = self::save_image($data['file_name'], $data['logo']);
        $data["logo"] = $out_path;
        $modified_data = ["id" => $data["created_by"]];
        if (self::check_created_by($modified_data)) {
            $created = GlobalSetting::create($data);
            echo json_encode([
                "result" => $created,
                "message" => $created ? "Global settings created successfully" : "Global settings not created",
            ]);
            if ($created) {
                Log::create([
                    "action" => "Create",
                    "created_by" => $decoded_token->id,
                    "description" => "GLOBAL SETTINGS of name " . $data["name"]
                ]);
            }
            return $created;
        }
        return false;
    }
    static function read()
    {
        // $decoded_token = Controllers_Utilities::check_jwt();
        // if (!$decoded_token) {
        //     return false;
        // }
        $data = json_decode(file_get_contents("php://input"), true);
        // if(!Controllers_Utilities::check_params($data,["id"]))
        //     return false;
        $global_setting = GlobalSetting::read($data);
        echo json_encode([
            "result" => boolval($global_setting),
            "message" => $global_setting ? "Global settings found" : "No global settings found",
            "data" => $global_setting
        ]);
    }
    static function update()
    {
        $decoded_token = Controllers_Utilities::check_jwt();
        if (!$decoded_token) {
            return false;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        if (!Controllers_Utilities::check_params($data, ["id", "logo", "file_name", "name", "phone_nb"]))
            return false;
        if ($data["logo"] == "unchanged") {
            $global_setting = GlobalSetting::read($data);
            if (!$global_setting) {
                echo json_encode([
                    "result" => false,
                    "message" => "No global settings found"
                ]);
                return false;
            }
            $updated = GlobalSetting::update_without_logo($data);
            echo json_encode([
                "result" => $updated,
                "message" => $updated ? "Global setting updated successfully" : "Global setting not updated",
            ]);
        } else {
            $out_path = self::save_image($data['file_name'], $data['logo']);
            $data["logo"] = $out_path;
            $global_setting = GlobalSetting::read($data);
            if (!$global_setting) {
                echo json_encode([
                    "result" => false,
                    "message" => "No global settings found"
                ]);
                return false;
            }
            echo json_encode($global_setting);
            $img_base =  __DIR__ . "/../../../";
            $filePath = $global_setting["logo"];
            $filePath = $img_base . $filePath;
            unlink($filePath);
            $updated = GlobalSetting::update($data);
            echo json_encode([
                "result" => $updated,
                "message" => $updated ? "Global setting updated successfully" : "Global setting not updated",
            ]);
        }
        // $modified_data = ["id"=>$data["created_by"]];
        // if(self::check_created_by($modified_data)){
        // }
        if ($updated) {
            Log::create([
                "action" => "Update",
                "created_by" => $decoded_token->id,
                "description" => "GLOBAL SETTINGS from name " . $global_setting["name"] .
                    " to name" . $data["name"]
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
        $global_setting = GlobalSetting::read($data);
        if (!$global_setting) {
            echo json_encode([
                "result" => false,
                "message" => "No global settings found"
            ]);
            return false;
        }
        $deleted = GlobalSetting::delete($data);
        echo json_encode([
            "result" => $deleted,
            "message" => $deleted ? "Global setting deleted successfully" : "Global setting not deleted",
        ]);
        if ($deleted) {
            Log::create([
                "action" => "Delete",
                "created_by" => $decoded_token->id,
                "description" => "GLOBAL SETTINGS of name " . $data["name"]
            ]);
        }
        return $deleted;
    }
    static function save_image($file_name, $img)
    {
        $time = time();
        $out_path =  __DIR__ . "/../../uploads/" . $time . $file_name;
        $ifp = fopen($out_path, 'wb');
        $splitted_data = explode(',', $img);
        fwrite($ifp, base64_decode($splitted_data[1]));
        fclose($ifp);
        // Should be changed
        $imagePath = "/Backend/uploads/" . $time . $file_name;
        $out_path = $imagePath;
        return $out_path;
    }
}

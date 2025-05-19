<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once __DIR__ . "/User_Skeleton.php";
require_once __DIR__ . "/../connections/connection.php";
class User extends User_Skeleton
{
    // CRUD Functions
    static function create($data)
    {
        // id, username, email, password, title, access_level, 
        // contact, address, status, created_on, is_deleted
        global $conn;
        $sql = "INSERT INTO users (`username`, `email`, `password`,`title`,`access_level`,`contact`,`address`) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data["username"], $data["email"], password_hash($data['password'], PASSWORD_DEFAULT), $data["title"], $data["access_level"], $data["contact"], $data["address"]]);
        return boolval($stmt->rowCount());
    }
    static function read($data)
    {
        global $conn;
        $id = $data['id'] ?? null;
        $email = $data['email'] ?? null;
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM users WHERE id = ? AND is_deleted=0");
            $stmt->execute([$id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            return $user;
        } else if ($email) {
            $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND is_deleted=0");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            return $user;
        } else {
            $stmt = $conn->query("SELECT * FROM users WHERE is_deleted=0");
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $users;
        }
    }
    static function update($data)
    {
        global $conn;
        $sql = "UPDATE users SET `username` = ?, `email` = ?, `password` = ?,
            `title` = ?,`access_level` = ?,`contact` = ?,`address` = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['username'], $data['email'], password_hash($data['password'], PASSWORD_DEFAULT), $data['title'], $data['access_level'], $data['contact'], $data['address'], $data['id']]);
        return boolval($stmt->rowCount());
    }
    static function delete($data)
    {
        global $conn;
        $sql = "UPDATE users SET is_deleted = 1 WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['id']]);
        return $stmt ? true : false;
    }
    static function read_email($data)
    {
        global $conn;
        $email = $data['email'] ?? null;
        if ($email) {
            $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            return $user;
        } else {
            return false;
        }
    }
    public static function reset_password($data)
    {
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'mohammad.zeineddine50@gmail.com'; // Your Gmail
            $mail->Password = 'legq dsgn jazz rwof'; // App Password from Google
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = 465;

            // Recipients
            $mail->setFrom('your_email@gmail.com', 'Your App');
            $mail->addAddress($data["email"]);

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'Reset Password';
            $resetLink = "http://localhost:5173/reset";
            $mail->Body = "To reset your password, click the following link: <a href='$resetLink'>$resetLink</a>";

            $mail->send();
            return true;
        } catch (Exception $e) {
            echo("Mailer Error: {$mail->ErrorInfo}");
            return false;
        }
    }
    static function reset($data){
        global $conn;
        $sql = "UPDATE users SET  `email` = ?, `password` = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['email'], password_hash($data['password'], PASSWORD_DEFAULT), $data['id']]);
        return boolval($stmt->rowCount());
    }
}

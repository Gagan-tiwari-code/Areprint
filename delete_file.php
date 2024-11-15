<?php
header('Content-Type: application/json');

$host = "sql210.infinityfree.com";
$dbname = "if0_37656534_ssvr";
$username = "if0_37656534";
$password = "9324580034GAN";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
$fileId = $data["id"];
$filePath = $data["filePath"];

// Delete the file from the server
if (file_exists($filePath)) {
    unlink($filePath);
}

// Delete the file record from the database
$sql = "DELETE FROM uploads WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $fileId);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "File deleted successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete file from the database."]);
}

$conn->close();
?>

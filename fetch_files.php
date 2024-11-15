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

$sql = "SELECT id, name, files FROM uploads";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $files = [];
    while ($row = $result->fetch_assoc()) {
        $files[] = [
            "id" => $row["id"],
            "name" => $row["name"],
            "files" => json_decode($row["files"])
        ];
    }
    echo json_encode(["success" => true, "files" => $files]);
} else {
    echo json_encode(["success" => false, "message" => "No files found."]);
}

$conn->close();
?>

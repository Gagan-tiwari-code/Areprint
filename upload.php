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

$name = $_POST['name'];
$filePaths = [];

$uploadDir = 'uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

foreach ($_FILES['files']['tmp_name'] as $key => $tmpName) {
    $fileName = basename($_FILES['files']['name'][$key]);
    $filePath = $uploadDir . $fileName;

    if (move_uploaded_file($tmpName, $filePath)) {
        $filePaths[] = $filePath;
    } else {
        echo json_encode(["success" => false, "message" => "Failed to upload file: $fileName"]);
        exit;
    }
}

$filePathsJson = json_encode($filePaths);
$sql = "INSERT INTO uploads (name, files) VALUES ('$name', '$filePathsJson')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Files uploaded and data saved successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
}

$conn->close();
?>

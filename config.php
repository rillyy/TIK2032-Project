<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "contacts_db";

$conn = new mysqli($host, $username, $password, $database);

// Cek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

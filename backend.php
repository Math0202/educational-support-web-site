<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "MILLshe@73";
$dbname = "educational_support_platform";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to get all questions
function getQuestions() {
    global $conn;
    $sql = "SELECT * FROM questions ORDER BY created_at DESC";
    $result = $conn->query($sql);
    $questions = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $questions[] = $row;
        }
    }

    return $questions;
}

// Function to add a new question
function addQuestion($text, $user_id) {
    global $conn;
    $text = $conn->real_escape_string($text);
    $sql = "INSERT INTO questions (text, user_id) VALUES ('$text', $user_id)";
    
    if ($conn->query($sql) === TRUE) {
        return $conn->insert_id;
    } else {
        return false;
    }
}

// Handle POST request to add a question
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action']) && $_POST['action'] == 'add_question') {
    $question_text = $_POST['question_text'];
    $user_id = 1; // In a real application, this would come from the session

    $result = addQuestion($question_text, $user_id);
    if ($result) {
        echo json_encode(["success" => true, "question_id" => $result]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to add question"]);
    }
    exit;
}

// Handle GET request to fetch questions
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['action']) && $_GET['action'] == 'get_questions') {
    $questions = getQuestions();
    echo json_encode($questions);
    exit;
}

$conn->close();
?>
<?php
include "db.php";

$book_id = $_POST['book_id'];
$review = $_POST['review'];

if ($book_id == "0" || empty($review)) {
    echo "error";
    exit;
}

$q = mysqli_query($conn, 
    "INSERT INTO reviews (book_id, review, created_at) 
     VALUES ('$book_id', '$review', NOW())"
);

if ($q) {
    echo "success";
} else {
    echo "error";
}
?>

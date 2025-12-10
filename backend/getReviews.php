<?php
include "db.php";

$q = mysqli_query($conn, 
    "SELECT r.review, r.created_at, b.title 
     FROM reviews r 
     JOIN books b ON r.book_id = b.id
     ORDER BY r.id DESC"
);

$data = [];

while ($row = mysqli_fetch_assoc($q)) {
    $data[] = $row;
}

echo json_encode($data);
?>

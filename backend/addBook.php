<?php
// backend/addBook.php
include "db.php";

$title  = $_POST['title'];
$author = $_POST['author'];

$title  = mysqli_real_escape_string($conn, $title);
$author = mysqli_real_escape_string($conn, $author);

$sql = "INSERT INTO books (title, author) VALUES ('$title', '$author')";
$q   = mysqli_query($conn, $sql);

if($q){
    echo "<script>alert('Book Added Successfully!'); window.location.href='../frontend/add-book.html';</script>";
} else {
    echo "<script>alert('Error Adding Book: ".mysqli_error($conn)."'); window.location.href='../frontend/add-book.html';</script>";
}
?>
// add book backend updated

// Load all books for borrow.html
if (document.getElementById("bookList")) {
    fetch("../backend/getBooks.php")
    .then(res => res.json())
    .then(data => {
        let html = "";
        data.forEach(b => {
            html += `
                <div class="book-item">
                    <b>${b.title}</b> - ${b.author}
                    <br>
                    <a href="../backend/borrow.php?book_id=${b.id}">Borrow</a>
                </div>
            `;
        });
        document.getElementById("bookList").innerHTML = html;
    });
}

// Load My Books
if (document.getElementById("myBooks")) {
    fetch("../backend/getMyBooks.php")
    .then(res => res.json())
    .then(data => {
        let html = "";
        data.forEach(b => {
            html += `<div class="book-item"><b>${b.title}</b> - ${b.author}</div>`;
        });
        document.getElementById("myBooks").innerHTML = html;
    });
}

// Load Requests
if (document.getElementById("reqList")) {
    fetch("../backend/getMyRequests.php")
    .then(res => res.json())
    .then(data => {
        let output = "";
        data.forEach(r => {
            output += `
                <div class="book-item">
                    <b>${r.book}</b> — Status: ${r.status}
                </div>`;
        });
        document.getElementById("reqList").innerHTML = output;
    });
}


// Load Reviews
if (document.getElementById("reviewList")) {
    fetch("../backend/getReviews.php")
    .then(res => res.json())
    .then(data => {
        let html = "";
        data.forEach(rv => {
            html += `
                <div class="review-item">
                    <b>${rv.user}</b><br>
                    ${rv.text}
                </div>
            `;
        });
        document.getElementById("reviewList").innerHTML = html;
    });
}

// SHOW STATIC DEMO REVIEWS
let reviews = [
    { book: "Harry Potter", user: "Arpita", text: "Amazing fantasy book!" },
    { book: "The Alchemist", user: "Rahim", text: "Motivational and inspiring!" }
];

// DISPLAY REVIEWS
function loadReviews() {
    let box = document.getElementById("reviewList");
    if (!box) return;

    let html = "";
    reviews.forEach(rv => {
        html += `
            <div class="review-item">
                <b>Book:</b> ${rv.book} <br>
                <b>Review:</b> ${rv.text}
            </div>
        `;
    });

    box.innerHTML = html;
}
loadReviews();


// ADD NEW REVIEW (WITHOUT BACKEND)
function addReview() {
    let book = document.getElementById("bookSelect").value;
    let text = document.getElementById("reviewText").value;

    if (book === "Select a book" || text === "") {
        alert("Please select a book & write a review.");
        return;
    }

    reviews.push({ book: book, user: "You", text: text });
    loadReviews();
    document.getElementById("reviewText").value = "";
}
// SUBMIT REVIEW TO DATABASE
function submitReview() {
    let book = document.getElementById("bookName").value;
    let text = document.getElementById("reviewText").value;

    if (book === "" || text === "") {
        alert("Please write both book name and review.");
        return;
    }

    fetch("../backend/addReview.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "book=" + encodeURIComponent(book) + "&text=" + encodeURIComponent(text)
    })
    .then(res => res.text())
    .then(data => {
        alert("Review submitted!");
        document.getElementById("bookName").value = "";
        document.getElementById("reviewText").value = "";
        loadReviews();
    });
}


// LOAD REVIEWS FROM DATABASE
function loadReviews() {
    if (!document.getElementById("reviewList")) return;

    fetch("../backend/getReviews.php")
    .then(res => res.json())
    .then(data => {
        let html = "";
        data.forEach(rv => {
            html += `
                <div class="review-item">
                    <b>${rv.book}</b><br>
                    ${rv.text}
                </div>
            `;
        });
        document.getElementById("reviewList").innerHTML = html;
    });
}

loadReviews();
// SUBMIT REVIEW WITH BOOK ID
function submitReview() {
    let book = document.getElementById("bookName").value;
    let text = document.getElementById("reviewText").value;

    if (book === "" || text === "") {
        alert("Please enter both book name and review.");
        return;
    }

    // 1. First get book_id from backend
    fetch("../backend/getBookId.php?name=" + encodeURIComponent(book))
    .then(res => res.text())
    .then(book_id => {
        if (book_id == "0") {
            alert("Book not found in database.");
            return;
        }

        // 2. Insert review with book_id
        fetch("../backend/addReview.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "book_id=" + book_id + "&review=" + encodeURIComponent(text)
        })
        .then(res => res.text())
        .then(data => {
            alert("Review Submitted!");
            document.getElementById("bookName").value = "";
            document.getElementById("reviewText").value = "";
            loadReviews();
        });
    });
}


// LOAD ALL REVIEWS
function loadReviews() {
    fetch("../backend/getReviews.php")
    .then(res => res.json())
    .then(data => {
        let html = "";
        data.forEach(rv => {
            html += `
                <div class="review-item">
                    <b>Book ID:</b> ${rv.book_id}<br>
                    <b>Review:</b> ${rv.review}
                </div>
            `;
        });

        document.getElementById("reviewList").innerHTML = html;
    });
}

loadReviews();
// SUBMIT REVIEW WITH BOOK ID
function submitReview() {
    let book = document.getElementById("bookName").value;
    let text = document.getElementById("reviewText").value;

    if (book === "" || text === "") {
        alert("Please enter both book name and review.");
        return;
    }

    // 1. First get book_id from backend
    fetch("../backend/getBookId.php?name=" + encodeURIComponent(book))
    .then(res => res.text())
    .then(book_id => {
        if (book_id == "0") {
            alert("Book not found in database.");
            return;
        }

        // 2. Insert review with book_id
        fetch("../backend/addReview.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "book_id=" + book_id + "&review=" + encodeURIComponent(text)
        })
        .then(res => res.text())
        .then(data => {
            alert("Review Submitted!");
            document.getElementById("bookName").value = "";
            document.getElementById("reviewText").value = "";
            loadReviews();
        });
    });
}


// LOAD ALL REVIEWS
function loadReviews() {
    fetch("../backend/getReviews.php")
    .then(res => res.json())
    .then(data => {
        let html = "";
        data.forEach(rv => {
            html += `
                <div class="review-item">
                    <b>Book ID:</b> ${rv.book_id}<br>
                    <b>Review:</b> ${rv.review}
                </div>
            `;
        });

        document.getElementById("reviewList").innerHTML = html;
    });
}

loadReviews();
// LOAD PROFILE DATA
if (document.getElementById("profileName")) {
    fetch("../backend/getProfile.php")
    .then(res => res.json())
    .then(data => {
        document.getElementById("profileName").innerText = data.name;
        document.getElementById("profileEmail").innerText = data.email;
    })
    .catch(() => {
        document.getElementById("profileName").innerText = "Error";
        document.getElementById("profileEmail").innerText = "Error";
    });
}


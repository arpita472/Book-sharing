jQuery(document).ready(function($){
    $('.book-sharing-borrow-form').on('submit', function(){
        return confirm('Are you sure you want to borrow this book?');
    });
    $('.book-delete-form').on('submit', function(){
        return confirm('Are you sure you want to delete this book?');
    });
    $('.book-sharing-review-form').on('submit', function(){
        if ($('select[name="rating"]', this).val() === "") {
            alert('Please select a rating.');
            return false;
        }
        return true;
    });
});

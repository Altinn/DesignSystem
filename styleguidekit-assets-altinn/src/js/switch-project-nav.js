$(document).ready(function() {

    $(".selLabel").click(function () {
        $('.dropdown').toggleClass('active');
    });

    $(".dropdown-list li").click(function() {
        var selected = $(this).text();
        console.log('You Selected: ' + selected);
        $('.selLabel').html($(this).html());
        $('.dropdown').removeClass('active');
    });

    $(".dropdown-list li:first-child").click();
});

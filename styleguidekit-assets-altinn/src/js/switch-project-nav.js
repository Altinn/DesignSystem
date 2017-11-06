$(document).ready(function() {

    $(".selLabel").click(function () {
        $('.dropdown').toggleClass('active');
    });

    $(".dropdown-list li").click(function() {
        var selected = $(this).text();
        /*console.log('You Selected: ' + $(this).attr("data-value"));*/
        $('.selLabel').html($(this).html());
        $('.dropdown').removeClass('active');
        /*window.localStorage.setItem('selected_project', $(this).attr("data-value"));
        console.log('Project selection ' + window.localStorage.getItem('selected_project') + ' saved to localStorage')*/
    });

    $(".dropdown-list li:first-child").click();
});

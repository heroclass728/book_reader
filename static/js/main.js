$(document).ready(function(){

    $('#collapse_xs_menu_on').on('click', function(e){
        e.preventDefault();
        $('#collapse_xs_menu').toggle();
        $('.overlay-menu').toggle();

    });

});

$('#myCarousel').carousel({
    interval: 4000
})

$('.carousel .item').each(function(){
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i=0;i<4;i++) {
        next=next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
    }
});

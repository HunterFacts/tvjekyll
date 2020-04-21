
function changeCircleLogo(redInBlack = false) {
    if (redInBlack){
        $('#logoSvg .circle-left').attr("fill", "#BD241F");
        $('#logoSvg .circle-right').attr("fill", "black");
    }
    else {
        $('#logoSvg .circle-left').attr("fill", "black");
        $('#logoSvg .circle-right').attr("fill", "#BD241F");
    }
}

function changeColorMenuBtn (){
    var menu = $(".btn-nav, .btn-nav:after"),
    logo = $("#logoSvg");
    let topDarkBlock = $('.background-section-questions').offset().top;
    var top = $(this).scrollTop() + 60;
    if ( top >= topDarkBlock ) {
        menu.addClass("btn-nav-white");
        logo.addClass("logoSvgColor");
    } else if ( top <= topDarkBlock ) {
        menu.removeClass("btn-nav-white");
        logo.removeClass("logoSvgColor");
    }
}

$(document).ready(function(){
    $('.open-menu').removeAttr('disabled');	
    $('header').on('click','.open-menu',function() {
        if ( ($(window).width() < '960' && (window.matchMedia("(orientation: landscape)").matches))||
        ($(window).width() < '600' && (window.matchMedia("(orientation: portrait)").matches))) {
            changeCircleLogo(true);
            $("#logoSvg").addClass("logoSvgColor");
        }
        $(this).addClass('close-menu').removeClass('open-menu').attr('disabled','disabled');
        $('.float-nav').prop('style', '');
        $('.container').addClass('blur');
        $('.float-nav').show();
        $('.float-nav').addClass('active');
        $('.btn-nav').addClass("btn-nav-white");
        $('.close-menu').removeAttr('disabled');
    });
    function fechaMenu(){
        $('.close-menu').removeClass('close-menu').addClass('open-menu').attr('disabled','disabled');
        changeCircleLogo();
        changeColorMenuBtn();
        $('.float-nav').removeClass('active');
        $('.float-nav').animate({
            opacity: 0.1, // прозрачность элемента
            transform: 'translate(0, 30px)'
        }, 300, 'swing', function(){
            $('.float-nav').hide();	
            $('.open-menu').removeAttr('disabled');		
        });
    }
    $('header').on('click','.close-menu',function(){
        fechaMenu();
    });

    $('.float-nav ul li').on('click','a',function(){
        fechaMenu();
    });
    $('.collapsible').collapsible({
        onOpenStart: function (object){
            $($(object).children()[0].children[1]).addClass("rotate");
        },
        onCloseStart: function (object){
            $($(object).children()[0].children[1]).removeClass("rotate");
        }
    });
    let slidesPerView = 3;
    let spaceBetween = 30;
    if ($(window).width() <= '599' || ((window.matchMedia("(orientation: landscape)").matches) && $(window).width() <= '959')){
        slidesPerView = 1;
        spaceBetween = 0;
    }
    var swiper = new Swiper('.swiper-container-photo', {
        slidesPerView: slidesPerView,
        spaceBetween: spaceBetween,
        pagination: {
            //el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
    });
    $(window).scroll(function() {
        if (!$(".float-nav").hasClass("active")){
            changeColorMenuBtn();
        }
    });
    $('.is-animate, .is-animate-last, .is-animate-two').viewportChecker({
        classToAdd: 'is-animate-active', // Class to add to the elements when they are visible,
        offset: 100, // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
    });
    $('.modal').modal();
});
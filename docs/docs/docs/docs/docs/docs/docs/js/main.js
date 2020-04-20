
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
        $(this).addClass('close-menu').removeClass('open-menu').attr('disabled','disabled');
        $('.container').addClass('blur');
        setTimeout(function(){
            $('.close-menu').removeAttr('disabled');
        },1100);
        $('.float-nav').show();
        setTimeout(function(){
            $('.float-nav').addClass('active');
            changeCircleLogo(true);
            $('.btn-nav').addClass("btn-nav-white");
            $("#logoSvg").addClass("logoSvgColor")
        },100);
    });
    function fechaMenu(){
        changeCircleLogo(false);
        changeColorMenuBtn();
        $('.close-menu').removeClass('close-menu').addClass('open-menu').attr('disabled','disabled');
        $('.float-nav').removeClass('active');
        setTimeout(function(){
            $('.float-nav').hide();	
            $('.open-menu').removeAttr('disabled');		
        },1100);
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
    var swiper = new Swiper('.swiper-container', {
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
});
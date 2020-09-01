(function ($) {
  "use strict";

  // :: Preloader Active Code
  $(window).on("load", function () {
    $(".pr-circle").fadeOut();
    $("#preloader").delay(550).fadeOut("slow");
    // $("body").delay(550).css({
    //   overflow: "visible",
    // });
  });

  // ****************************
  // :: TOP Menu Active Code
  // ****************************

  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 150) {
      $(".navbar").removeClass("sticky");
      $("#back-top").fadeOut(700);
    } else {
      $(".navbar").addClass("sticky");
      $("#back-top").fadeIn(700);
    }
  });

  // Add smooth scrolling to all links
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      var scrollTop = $(hash).offset().top - 100;
      $('html, body').animate({
        scrollTop: scrollTop
      }, 800);
    }
  });
  $(document).ready(function () {
    AOS.init({once: true});

    $(".navbar-toggler").click(function() {
      var navbar = $(".navbar-collapse");
      if (navbar.hasClass("opened")) {
        navbar.removeClass("opened");
        $("body").removeClass("navOpened");
        $(".navbar-toggler").removeClass("toggle-clicked");
      } else {
        navbar.addClass("opened");
        $("body").addClass("navOpened");
        $(".navbar-toggler").addClass("toggle-clicked");
      }
    });
    $(".nav-link").click(function() {
      $(".navbar-toggler").click();
    })

    $('.contactForm').on('submit', function(e){
      e.preventDefault();

      // var fd = new FormData( this );
      var btn = $(this).find('.sendMessageButton');
      var formControls = $(this).find('.form-group').toArray();
      var mailBody = $(this).find('h1').text() + '\n';
      var mailBody = $(this).find('h5').text() + '\n';
      formControls.forEach(element => {
        var inputval = $('.form-control', element).val();
        var labelval = $('.form-control', element).attr('placeholder');
        mailBody += `${labelval}: ${inputval}\n`;
      });

      $.ajax({
        url: "./mail/contact_me.php",
        type: "POST",
        contentType: false,
        processData: false,
        data: 'mailBody=' + mailBody,
        cache: false,
        beforeSend: () => {
          $(this).find('.alert').addClass("d-none");
          btn[0].lastChild.nodeValue="Отправка";
          btn.prop('disabled', true);
          $(btn).find('.spinner-grow').removeClass('d-none');
        },
        success: () => {
          $(this).find('#contacts-success-wrapper').removeClass("d-none");
        },
        error: () => {
          $(this).find('#contacts-error-wrapper').removeClass("d-none");
        },

      }).always(() => {
        btn[0].lastChild.nodeValue="Отправить заявку";
        btn.prop('disabled', false).find('.spinner-grow').addClass('d-none');
      });
    });
  });
})(jQuery);
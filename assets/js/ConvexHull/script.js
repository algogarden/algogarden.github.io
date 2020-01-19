/* -----------------------------------------------------------------------------


File:           JS Core
Version:        1.0
Last change:    00/00/00 
Author:         Suelo

-------------------------------------------------------------------------------- */
(function() {
  "use strict";

  var Puppin = {
    init: function() {
      this.Basic.init();
    },

    Basic: {
      init: function() {
        this.preloader();
        this.chooseQuantifyAlgo();
      },
      /* Start Of Preloader
================================================*/
      preloader: function() {
        $(window).on("load", function() {
          $("#preloader").fadeOut("slow", function() {
            $(this).remove();
          });
        });
      },
      /* End Of Preloader
================================================*/

      /* Start of menu bar
================================================*/
      chooseQuantifyAlgo: function() {
        $(window).on("load", function() {
          /* activate jquery isotope */
          var $grid = $("#grid").isotope({
            itemSelector: ".grid-item",
            layoutMode: 'fitRows',
          });
          
          // filter items on button click
          $("#quantityOfAlgo").change(function() {
            $("#grid").empty();
            var elems = [];
            var str = $("#quantityOfAlgo").val();
            for (var i = 0; i < str; i++) {
              var $elem = $('<div class="grid-item"/>');
              // set number
              $elem.html("<div id='sketch-holder-" + (i+1) + "'>"
              +"<div class='row' style='margin-top:10px'>"
              +'<div class="col-xs-2 col-xs-offset-3" style="display: inline-block;vertical-align: middle;float: none;"><span class="label label-default" style="font-size:100%;">Algorithm: </span></div>'
              +'<div class="col-xs-2" style="margin-left:10px;display: inline-block;vertical-align: middle;float: none;"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Choose Algorithm'
              +' <span class="caret"></span> </button>'
              +' <ul class="dropdown-menu" aria-labelledby="dropdownMenu1" role="menu">'
              +'   <li data-attr="'+(i+1)+'"><a href="#">Quick Hull</a></li>'
              +'   <li data-attr="'+(i+1)+'"><a href="#">Monotone Chain</a></li>'
              +'   <li data-attr="'+(i+1)+'"><a href="#">Gift Wrapping</a></li>'
              +'   <li data-attr="'+(i+1)+'"><a href="#">Graham Scan</a></li>'
              +'   <li data-attr="'+(i+1)+'"><a href="#">Gift Wrapping</a></li>'
              +'</ul>'
              +'</ul>'
              +'</div></div>' 
              +"</div></div>" );
              $elem.find('#sketch-holder-' + (i+1) + ' .dropdown-menu > li').click(function() {
                var getValue = $(this).text();
                var attr=($(this).data("attr"));
                console.log(attr)
                $('#sketch-holder-' + attr+ ' .dropdown-toggle').text(getValue);
              });
              elems.push($elem[0]);
            }
            $grid.isotope("insert", elems);
          });
        });
      },

      /* End  of menu bar
================================================*/

      /* Start Of Isotope
================================================*/

      /* End Of Isotope
================================================*/

      /* - Start of popup
================================================*/
      videoPopup: function() {
        $(".popup").magnificPopup({
          disableOn: 200,
          type: "iframe",
          mainClass: "mfp-fade",
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
        });
      },
      /* - End of popup
================================================*/

      /* - Start of Scroll to top
================================================*/
      scrollTop: function() {
        $(window).on("scroll", function() {
          if ($(this).scrollTop() > 200) {
            $("#scrolluptop").fadeIn();
          } else {
            $("#scrolluptop").fadeOut();
          }
        });

        $("#scrolluptop").on("click", function() {
          $("html, body").animate(
            {
              scrollTop: 0
            },
            800
          );
          return false;
        });
      },

      /* - End of Scroll to top
================================================*/

      /* - Start of service slide
================================================*/

      portfolioSlide: function() {
        $(".service-slide-content").owlCarousel({
          margin: 40,
          responsiveClass: true,
          pagination: false,
          autoplay: false,
          nav: true,
          smartSpeed: 1000,
          responsive: {
            0: {
              items: 1
            },
            400: {
              items: 1
            },
            600: {
              items: 1
            },
            700: {
              items: 2
            },
            1000: {
              items: 3
            }
          }
        });
      },
      /* - End of service slide
================================================*/

      /* Start Of counter-up
================================================*/
      counterUp: function() {
        $(".count").counterUp({
          delay: 10,
          time: 2000
        });
      },
      /* - End Of counter-up
================================================*/

      /* - Start of Testimonial slide
================================================*/

      testimonialSlide: function() {
        $(".testimonial-item").owlCarousel({
          margin: 0,
          responsiveClass: true,
          pagination: true,
          autoplay: false,
          nav: false,
          smartSpeed: 1000,
          responsive: {
            0: {
              items: 1
            },
            400: {
              items: 1
            },
            600: {
              items: 1
            },
            700: {
              items: 1
            },
            1000: {
              items: 1
            }
          }
        });
      },
      /* - End of Testimonial slide
================================================*/

      /* - Start of Testimonial slide
================================================*/

      partnerSlide: function() {
        $(".partner-logo-slide").owlCarousel({
          margin: 100,
          responsiveClass: true,
          pagination: false,
          autoplay: false,
          nav: false,
          smartSpeed: 1000,
          responsive: {
            0: {
              items: 1
            },
            400: {
              items: 2
            },
            600: {
              items: 3
            },
            700: {
              items: 4
            },
            1000: {
              items: 5
            }
          }
        });
      },
      /* - End of Testimonial slide
================================================*/

      /* Start Of counter-up
================================================*/
      blogGrid: function() {
        $(".blog-main-content").masonry({
          // options
          itemSelector: ".blog-main-text-pic"
          // columnWidth: 200,
        });
      },
      /* - End Of counter-up
================================================*/

      /* - Start of service slide
================================================*/

      serviceSlide: function() {
        $(".portfolio-single-slide-content").owlCarousel({
          margin: 40,
          responsiveClass: true,
          pagination: true,
          autoplay: false,
          nav: false,
          smartSpeed: 1000,
          responsive: {
            0: {
              items: 1
            },
            400: {
              items: 1
            },
            600: {
              items: 1
            },
            700: {
              items: 1
            },
            1000: {
              items: 1
            }
          }
        });
      }
      /* - End of service slide
================================================*/
    }
  };
  $(document).ready(function() {
    Puppin.init();
  });
})();

/* -----------------------------------------------------------------------------


File:           JS Core
Version:        1.0
Last change:    00/00/00 
Author:         Suelo

-------------------------------------------------------------------------------- */
var boardManager;

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
        this.chooseNumberOfPoints();
        this.randomPoint();
        this.showTime();
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
            layoutMode: "fitRows"
          });

          // filter items on button click
          $("#quantityOfAlgo").change(function() {
            $("#grid").empty();
            var elems = [];
            var str = $("#quantityOfAlgo").val();
            if (str.length > 0) {
              $("#visiblePoint").css("visibility", "visible");
              for (var i = 0; i < str; i++) {
                var $elem = $('<div class="grid-item" />');
                // set number
                $elem.html(
                  "<div style='height:100%;display: flex;flex-flow: column;' id='sketch-holder-" +
                    (i + 1) +
                    "'>" +
                    "<div class='row' style='margin-top:10px;'>" +
                    '<div class="col-xs-2 col-xs-offset-3" style="display: inline-block;vertical-align: middle;float: none;"><span class="label label-default" style="font-size:100%;">Algorithm: </span></div>' +
                    '<div class="col-xs-2" style="margin-left:10px;display: inline-block;vertical-align: middle;float: none;"><button disabled="disabled" class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Choose Algorithm' +
                    ' <span class="caret"></span> </button>' +
                    ' <ul class="dropdown-menu" aria-labelledby="dropdownMenu1" role="menu">' +
                    '   <li data-attr="' +
                    (i + 1) +
                    '"><a href="#">Quick Hull</a></li>' +
                    '   <li data-attr="' +
                    (i + 1) +
                    '"><a href="#">Monotone Chain</a></li>' +
                    '   <li data-attr="' +
                    (i + 1) +
                    '"><a href="#">Gift Wrapping</a></li>' +
                    '   <li data-attr="' +
                    (i + 1) +
                    '"><a href="#">Graham Scan</a></li>' +
                    "</ul>" +
                    "</div></div>" +
                    "<div class='row' style='margin-bottom:10px;margin-top:10px'>" +
                    "<div class='col-xs-3' style='text-align:center'> <h5><span class='label label-default'>Iteration </span></h5><span id='iteration'>0</span></div>" +
                    "<div class='col-xs-4' style='text-align:center'> <h5><span class='label label-default'>Points in convex hull </span></h5><span id='pointsinconvexhull'>0</span> </div>"+
                    "<div class='col-xs-5' style='text-align:center'> <h5><span class='label label-default'> Covered area unit<sup>2</sup></span></h5> <span id='coveredArea'>0 </span></div>" +
                    "</div>" +
                    "<div id='sketch-holder-" +
                    (i + 1) +
                    "-canvas' style='flex-grow : 1;background-color:#fafafa'>" +
                    "</div>" +
                    "</div>"
                );
                $elem
                  .find("#sketch-holder-" + (i + 1) + " .dropdown-menu > li")
                  .click(function() {
                    var getValue = $(this).text();
                    var attr = $(this).data("attr");
                    $("#sketch-holder-" + attr + " .dropdown-toggle").text(
                      getValue
                    );
                    switch (getValue) {
                      case "Quick Hull":
                        boardManager.listBoard[
                          attr - 1
                        ].algorithm = new QuickHull(
                          boardManager.listBoard[attr - 1].world
                        );
                     
                        break;
                      case "Monotone Chain":
                        boardManager.listBoard[
                          attr - 1
                        ].algorithm = new MonotoneChain(
                          boardManager.listBoard[attr - 1].world
                        );
                        break;
                      case "Gift Wrapping":
                        boardManager.listBoard[
                          attr - 1
                        ].algorithm = new GiftWrapping(
                          boardManager.listBoard[attr - 1].world
                        );
                        break;
                      case "Graham Scan":
                        boardManager.listBoard[
                          attr - 1
                        ].algorithm = new GrahamScan(
                          boardManager.listBoard[attr - 1].world
                        );
                        break;
                      default:
                      // code block
                    }
                    boardManager.listBoard[
                      attr - 1
                    ].init();
                  });
                elems.push($elem[0]);
              }
              $grid.isotope("insert", elems);
            } else {
              $("#visiblePoint").css("visibility", "hidden");
            }
          });
        });
      },

      /* End  of menu bar
================================================*/

      /* - Start of popup
================================================*/
      chooseNumberOfPoints: function() {
        $("#numberOfPoint").change(function() {
          var pool = $(this).val();
          var algo = $("#quantityOfAlgo").val();
          var $board = $("#sketch-holder-1-canvas");
          if (pool > 0) {
            $("#runAlgorithm").css("visibility", "visible");
            var world = new World(
              $board[0].offsetWidth,
              $board[0].offsetHeight,
              pool,
              5
            );
            var redraw = true;
            if (!boardManager) {
              boardManager = new BoardManager(world, algo, pool);
              redraw = false;
            } else {
              boardManager.setWorld(world);
            }
            if (!redraw) {
              for (var i = 0; i < boardManager.algo; i++) {
                $("#sketch-holder-" + (i + 1) + " .dropdown-toggle").removeAttr('disabled');
                boardManager.addBoard(
                  5,
                  "sketch-holder-" + (i + 1),
                  new Algorithm()
                );
                boardManager.listBoard[i].plotPoints();
              }
            }
          } else {
            $("#runAlgorithm").css("visibility", "hidden");
          }
        });
      },
      /* - End of popup
================================================*/
      /* Start Of Preloader
================================================*/
      showTime: function() {
        $("#showtime").on("click", function() {
          if ($("#showtime .icon .material-icons:first-of-type").css("opacity") == 1) {
            for (var i = 0; i < boardManager.algo; i++) {
              if(!((boardManager.listBoard[i].algorithm instanceof QuickHull)
              || (boardManager.listBoard[i].algorithm instanceof GiftWrapping)
              || (boardManager.listBoard[i].algorithm instanceof GrahamScan)
              || (boardManager.listBoard[i].algorithm instanceof MonotoneChain))){
                var getValue=Math.floor(Math.random() * 4);
                switch (getValue) {
                  case 0:
                    boardManager.listBoard[i].algorithm=new QuickHull(
                      boardManager.listBoard[i].world
                    );
                    $("#sketch-holder-" + (i+1) + " .dropdown-toggle").text(
                      "Quick Hull"
                    );
                    break;
                  case 1:
                    boardManager.listBoard[i].algorithm=new QuickHull(
                      boardManager.listBoard[i].world
                    );
                    $("#sketch-holder-" + (i+1) + " .dropdown-toggle").text(
                      "Monotone Chain"
                    );
                    break;
                  case 2:
                    boardManager.listBoard[i].algorithm=new QuickHull(
                      boardManager.listBoard[i].world
                    );
                    $("#sketch-holder-" + (i+1) + " .dropdown-toggle").text(
                      "Gift Wrapping"
                    );
                    break;
                  case 3:
                    boardManager.listBoard[i].algorithm=new QuickHull(
                      boardManager.listBoard[i].world
                    );
                    $("#sketch-holder-" + (i+1) + " .dropdown-toggle").text(
                      "Graham Scan"
                    );
                    break;
                  default:
                  // code block
                }
               
              }
              boardManager.listBoard[i].play();
            }
            $("input").attr('disabled','disabled');
            $(".dropdown-toggle").attr('disabled','disabled');

            $("#showtime .icon .material-icons:first-of-type").css({
              opacity: 0,
              transition: "all 0.3s ease",
            });
            $("#showtime .icon .material-icons:last-of-type").css({
              opacity: 1,
              transition: "all 0.3s ease"
            });

            $("#showtime .text").text("Clean, go!")


            } else {
              $("input").removeAttr('disabled');
              $(".dropdownMenu1").removeAttr('disabled');
              for (var i = 0; i < boardManager.algo; i++) {
                boardManager.listBoard[i].clean();
              }
              $("#showtime .icon .material-icons:first-of-type").css({
                opacity: 1,
                transition: "all 0.3s ease"
              });
              $("#showtime .icon .material-icons:last-of-type").css({
                opacity: 0,
                transition: "all 0.3s ease"
              });
              $("#showtime .text").text("Show time");
            }
        });
      },
      /* End Of Preloader
================================================*/
randomPoint: function() {
  $("#randomPoint").on("click", function() {
    $("#numberOfPoint").val(Math.floor(Math.random() * Math.floor(100)));
    $("#numberOfPoint").trigger("change");
  
  });
},
    }
  };
  $(document).ready(function() {
    Puppin.init();
  });
})();

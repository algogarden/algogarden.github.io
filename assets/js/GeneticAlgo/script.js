/* -----------------------------------------------------------------------------


File:           JS Core
Version:        1.0
Last change:    00/00/00 

-------------------------------------------------------------------------------- */
var boardManager;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function gogogo() {
  var pops = new Population();
  pops.generatingPhase(100, 0.1, "abcdef");
  let tmp = 1;
  while (pops.averageFitness < 1) {
    pops.evaluatingPhase();
    $("#bestGen").text(pops.bestGene.gene.join(""));
    $("#bestScore").text((pops.bestScore-0.01).toFixed(3));
    $("#generations").text(tmp);
    $("#averageFitness").text(pops.averageFitness.toFixed(3));
    $("#all_genes").text(pops.averageFitness.toFixed(3));
    let str="";
    for (var i = 0; i < 10 && i<pops.genes.length; i++) {
      str+="<h3 class=\"output\">"+pops.genes[i].gene.join("") +"</h3>";
    }
    $("#all_genes").html(str);
    if (pops.averageFitness >= 1) {
      break;
    }
    pops.addToMatingPool();
    pops.reproduce();
    tmp++;
    await sleep(50);
  }
}

(function () {
  "use strict";

  var Puppin = {
    init: function () {
      this.Basic.init();
    },

    Basic: {
      init: function () {
        this.preloader();
        this.numberOfGens();
        this.mutation();
        this.target();
      },
      /* Start Of Preloader
================================================*/
      preloader: function () {
        $(window).on("load", function () {
          $("#preloader").fadeOut("slow", function () {
            $(this).remove();
          });
        });
      },
      /* End Of Preloader
================================================*/
      /* Start Of Preloader
================================================*/
      numberOfGens: function () {
        $("#quantityOfGens").on("change", function () {
          var val = $("#mutationRate").val();
          $("#populations").text($(this).context.value);
          if (val.length > 0 && $(this).context.value.length > 0) {
            $("#runAlgorithm").css("visibility", "visible");
          } else {
            $("#runAlgorithm").css("visibility", "hidden");
          }
        });
      },
      /* End Of Preloader
================================================*/

      /* Start Of Preloader
================================================*/
      target: function () {
        $("#textTarget").on("change", function () {
          $("#target").text($(this).context.value);
        });
      },
      /* End Of Preloader
================================================*/

      /* Start Of Preloader
================================================*/
      mutation: function () {
        $("#mutationRate").on("change", function () {
          var val = $("#quantityOfGens").val();
          $("#mutationRateOutput").text($(this).context.value);
          if (val.length > 0 && $(this).context.value.length > 0) {
            $("#runAlgorithm").css("visibility", "visible");
            $("#showtime .icon .material-icons:first-of-type").css({
              opacity: 1,
              transition: "all 0.3s ease",
            });
            $("#showtime .icon .material-icons:last-of-type").css({
              opacity: 0,
              transition: "all 0.3s ease",
            });
          } else {
            $("#runAlgorithm").css("visibility", "hidden");
          }
          gogogo();
        });
      },
      /* End Of Preloader
================================================*/

      /* Start Of Preloader
================================================*/
      showTime: function () {
        $("#showtime").on("click", function () {
          if ($("#showtime .icon .material-icons:first-of-type").css("opacity") == 1) {
            $("input").attr("disabled", "disabled");
            $(".dropdown-toggle").attr("disabled", "disabled");

            $("#showtime .icon .material-icons:first-of-type").css({
              opacity: 0,
              transition: "all 0.3s ease",
            });
            $("#showtime .icon .material-icons:last-of-type").css({
              opacity: 1,
              transition: "all 0.3s ease",
            });

            $("#showtime .text").text("Clean, go!");
          } else {
            $("input").removeAttr("disabled");
            $(".dropdownMenu1").removeAttr("disabled");
            $("#showtime .icon .material-icons:first-of-type").css({
              opacity: 1,
              transition: "all 0.3s ease",
            });
            $("#showtime .icon .material-icons:last-of-type").css({
              opacity: 0,
              transition: "all 0.3s ease",
            });
            $("#showtime .text").text("Show time");
          }
        });
      },
      /* End Of Preloader
================================================*/
    },
  };
  $(document).ready(function () {
    Puppin.init();
  });
})();

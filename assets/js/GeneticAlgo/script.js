/* -----------------------------------------------------------------------------


File:           JS Core
Version:        1.0
Last change:    00/00/00 

-------------------------------------------------------------------------------- */
var boardManager;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var stop=0;
async function gogogo() {
  var pops = new Population();
  let population=$("#quantityOfGens").val();
  let mutationRate=$("#mutationRate").val();
  let target=$("#textTarget").val();
  pops.generatingPhase(population, mutationRate, target);
  let tmp = 1;
  while (pops.bestScore < 1 && stop==0) {
    pops.evaluatingPhase();
    $("#bestGen").text(pops.bestGene.gene.join(""));
    $("#bestScore").text((pops.bestScore).toFixed(3));
    $("#generations").text(tmp);
    $("#averageFitness").text(pops.averageFitness.toFixed(3));
    $("#all_genes").text(pops.averageFitness.toFixed(3));
    let str="";
    for (var i = 0; i < 10 && i<pops.genes.length; i++) {
      str+="<h3 class=\"output\">"+pops.genes[i].gene.join("") +"</h3>";
    }
    $("#all_genes_1").html(str);

    str="";
    for (var i = 10; i < 20 && i<pops.genes.length; i++) {
      str+="<h3 class=\"output\">"+pops.genes[i].gene.join("") +"</h3>";
    }
    $("#all_genes_2").html(str);

    if (pops.bestScore >= 1) {
      break;
    }
    pops.addToMatingPool();
    pops.reproduce();
    tmp++;
    await sleep(50);
  }
  if(stop==1){
    $("#bestGen").text("");
    $("#bestScore").text("");
    $("#generations").text("");
    $("#target").text("");
    $("#averageFitness").text("");
    $("#all_genes").text("");
    $("#mutationRateOutput").text("");
    $("#textTarget").val("");
    $("#quantityOfGens").val("");
    $("#mutationRate").val("");
    $("#all_genes_1").html("");
    $("#all_genes_2").html("");
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
        this.showTime();
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
            stop=0;
            gogogo();
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
            stop=1;
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

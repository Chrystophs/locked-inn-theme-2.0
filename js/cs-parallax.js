var csParallax = {
  /* PROPERTIES */
  Setup: function() {
    /* Find all Parallax Items */
    if ($(window).width() >= 1024) {
      $("[data-parallax=false]").each(function(k, v) {
        $(v)
          .attr("data-parallax", "true")
          .attr(
            "data-parallax-offset",
            Math.ceil(
              $(v)
                .parent()
                .offset().top
            )
          );
      });
    }
  },
  Scroll: function() {
    var wW = $(window).width(),
      wH = $(window).height(),
      wS = $(window).scrollTop(),
      offset;

    if (wW > 1050) {
      offset = wS + wH / 1.2;
    } else if (wW >= 768) {
      offset = wS + wH / 1.01;
    } else {
      $("[data-parallax=true").each(function(k, v) {
        $(v).attr("data-parallax", "false");
      });
    }

    $("[data-parallax=true]").each(function(k, v) {
      if (offset >= $(v).data("parallax-offset")) {
        $(v)
          .attr("data-shown", "true")
          .attr("aria-hidden", "false");
      } else {
        $(v)
          .attr("data-shown", "false")
          .attr("aria-hidden", "true");
      }
    });
  }
};

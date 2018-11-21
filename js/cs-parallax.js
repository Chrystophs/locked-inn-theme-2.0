var csParallax = {
  /* PROPERTIES */
  Setup: function() {
    /* Find all Parallax Items */
    $("[data-parallax=true]").each(function(k, v) {
      $(v).attr(
        "data-parallax-offset",
        Math.ceil(
          $(v)
            .parent()
            .offset().top
        )
      );
    });
  },
  Scroll: function() {
    var wW = $(window).width(),
      wH = $(window).height(),
      wS = $(window).scrollTop();

    if (wW > 1050) {
      var offset = wS + wH / 1.5;
    } else if (wW >= 768) {
      var offset = wS + wH / 1.35;
    } else {
      $("[data-parallax=true").attr("data-parallax", "false");
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

var csParallax = {
  /* PROPERTIES */
  Setup: function() {
    var _this = this;
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
    this.Scroll();
    $(window).on("scroll", function() {
      _this.Scroll();
    });
  },
  Scroll: function() {
    var wW = $(window).width(),
      wH = $(window).height(),
      wS = $(window).scrollTop(),
      offset;

    if (wW > 1050) {
      offset = wS + wH / 1.2;
    } else {
      offset = wS + wH / 1.12;
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

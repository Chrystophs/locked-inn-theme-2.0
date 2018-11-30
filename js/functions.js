$(function() {
  ChrisTemplate.Init();
});

var ChrisTemplate = {
  // PROPERTIES
  KeyCodes: {
    tab: 9,
    enter: 13,
    esc: 27,
    space: 32,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40
  },
  MobileView: false,

  // METHODS
  Init: function() {
    // FOR SCOPE
    var _this = this;

    this.Header();

    csParallax.Setup();
    csParallax.Scroll();

    if ($("#hp-container").length > 0) {
      this.Homepage();
    }
    if ($("#sp-contact").length) {
      this.ContactUs();
    }

    $(window).on("scroll", function() {
      csParallax.Scroll();
    });
    $(window).on("resize", function() {
      csParralax.Setup();
    });
  },
  WindowScroll: function() {},
  WindowResize: function() {
    var wW = $(widnow).width();
    if (wW > 1120) {
      if ($("#menu-main-menu").attr("aria-hidden") == "true") {
        $("#menu-main-menu")
          .fadeIn()
          .attr("Aria-hidden", "false");
      }
    }
  },
  Header: function() {
    /* Check Device */
    /* Navigation */
    $(".menu-item > a")
      .unbind()
      .click(function() {
        if (window.location.hostname == "localhost") {
          if ($("#hp-container").length) {
            navigateTo($(this).attr("href"));
            return false;
          } else {
            window.location.href =
              window.location.origin +
              "/locked-inn-theme/" +
              $(this).attr("href");
          }
        } else {
          if ($("#hp-container").length) {
            navigateTo($(this).attr("href"));
            return false;
          } else {
            window.location.href =
              window.location.origin + "/" + $(this).attr("href");
          }
        }
      });
    function navigateTo(location) {
      $("html, body").animate(
        {
          scrollTop: $(location).offset().top
        },
        1500
      );
    }
    /* To Top Button */
    $("#gb-to-top").click(function() {
      navigateTo("#top");
    });

    $(".nav-btn").click(function() {
      if ($(this).hasClass("open")) {
        $(this).removeClass("open");
        $("#menu-main-menu")
          .fadeOut()
          .removeClass("open");
      } else {
        $(this).addClass("open");
        $("#menu-main-menu")
          .fadeIn()
          .addClass("open");
      }
    });
    $("#hp-btn-learn").click(function() {
      navigateTo("#hp-about");
      return false;
    });
  },
  Body: function() {},
  Homepage: function() {
    //Watch Video Btn and Auto Play
    $(".cs-btn-watch-video").click(function() {
      $("#head-video-outer").fadeIn();
      $("#lockedinn-vid")
        .get(0)
        .play();
    }); //End watchVideo
    //Close Video Btn Also Pauses Video
    $("#head-video-outer").click(function() {
      $(this).fadeOut();
      $("#lockedinn-vid")
        .get(0)
        .pause();
    }); //End videoOuter

    /* FAQ Dropdown & Animate Locks */
    $("li.question").click(function() {
      if ($(this).hasClass("open")) {
        $(this).removeClass("open");
        $(".lock-path1", this).css(
          "animation",
          "closelock 0.5s linear forwards"
        );
        $(".dropdown", this).slideUp();
      } else {
        if (
          $(this)
            .siblings(".open")
            .hasClass("open")
        ) {
          $(this).removeClass("open");
          $(".lock-path1", this).css(
            "animation",
            "closelock 0.5s linear forwards"
          );
          $(".dropdown", this).slideUp();
        }
        $(this).addClass("open");
        $(".lock-path1", this).css(
          "animation",
          "openlock 0.5s linear forwards"
        );
        $(".dropdown", this).slideDown();
      }
    }); //End FAQ & Locks
  },
  Subpage: function() {},
  ContactUs: function() {
    //Click function for Walking Directions
    $(".btn-walk").click(function() {
      $("#walking-map").fadeIn();
    }); // End Click
    $("#walking-map").click(function() {
      $(this).fadeOut();
    });
  },
  Footer: function() {}
};

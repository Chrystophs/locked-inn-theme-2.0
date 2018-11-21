!(function($) {
  $.fn.csMultimediaGallery = function(settings) {
    var config = {
      efficientLoad: !0,
      imageWidth: 960,
      imageHeight: 500,
      mobileDescriptionContainer: [640, 480, 320],
      galleryOverlay: !1,
      linkedElement: [],
      playPauseControl: !1,
      backNextControls: !1,
      bullets: !1,
      thumbnails: !1,
      thumbnailViewerNum: [4, 4, 3, 3, 2],
      autoRotate: !0,
      hoverPause: !0,
      transitionType: "fade",
      transitionSpeed: 1.5,
      transitionDelay: 4,
      fullScreenRotator: !1,
      fullScreenBreakpoints: [960],
      onImageLoad: function(e) {},
      allImagesLoaded: function(e) {},
      onTransitionStart: function(e) {},
      onTransitionEnd: function(e) {},
      allLoaded: function(e) {},
      onWindowResize: function(e) {}
    };
    return (
      settings && $.extend(config, settings),
      this.each(function() {
        var element = this,
          MMG = eval("multimediaGallery" + $(element).attr("data-pmi"));
        MMG.records.splice(-1, 1);
        var MultimediaGallery = {
          pmi: MMG.props.pageModuleInstanceId,
          galleryContainer: "#mmg-container-" + MMG.props.pageModuleInstanceId,
          recordNum: MMG.records.length,
          isAnimating: !1,
          isPlaying: !!(config.autoRotate && 1 < this.recordNum),
          isHovering: !1,
          hasFocus: !1,
          isTouching: !1,
          thumbnailWidth: 0,
          thumbnailSliderPosition: 0,
          thumbnailsAnimating: !1,
          keyCodes: {
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
          galleryTimer: [],
          Init: function() {
            var e = this;
            this.UpdateAttributes({
              ".mmg-container": {
                "data-gallery-type": MMG.props.defaultGallery
                  ? "default"
                  : "custom",
                "data-transition": config.transitionType,
                "data-record-num": this.recordNum,
                "data-is-animating": "false",
                "data-play-state":
                  config.autoRotate && 1 < this.recordNum
                    ? "playing"
                    : "paused",
                "data-active-record-index": "0",
                "data-active-gallery-index": "0",
                "data-active-slide-title":
                  "True" != MMG.records[0].hideTitle ? "true" : "false",
                "data-active-slide-caption":
                  "True" != MMG.records[0].hideCaption &&
                  "" != $.trim(MMG.records[0].caption)
                    ? "true"
                    : "false",
                "data-active-slide-link":
                  "True" == MMG.records[0].isLinked ? "true" : "false",
                "data-active-slide-video":
                  "True" == MMG.records[0].videoIsEmbedded ? "true" : "false"
              }
            }),
              this.BuildStyleSheet(),
              this.BuildSlides(),
              this.BuildStructure(),
              this.Events(),
              config.autoRotate && 1 < this.recordNum && this.RunTimer(),
              $(window).resize(function() {
                e.WindowResize();
              }),
              $(window).load(function() {
                e.WindowLoad();
              }),
              config.allLoaded.call(this, {
                element: element,
                mmgRecords: MMG.records
              });
          },
          BuildStructure: function() {
            config.backNextControls &&
              1 < this.recordNum &&
              $(
                '<button class="mmg-control back" aria-label="Navigate to Previous Slide"></button><button class="mmg-control next" aria-label="Navigate to Next Slide"></button>'
              ).insertAfter($(".mmg-slides-outer", this.galleryContainer)),
              config.playPauseControl &&
                1 < this.recordNum &&
                $(
                  '<button class="mmg-control play-pause playing" aria-label="Pause gallery"><span></span></button'
                ).insertAfter($(".mmg-slides-outer", this.galleryContainer));
            var e = parseInt(this.GetBreakPoint());
            -1 < config.mobileDescriptionContainer.indexOf(e) &&
              $(this.galleryContainer).append(
                '<div class="mmg-description-outer"><div class="mmg-description">' +
                  ("True" != MMG.records[0].hideTitle
                    ? '<h2 class="mmg-description-title">' +
                      (-1 < config.linkedElement.indexOf("title") &&
                      "True" == MMG.records[0].isLinked
                        ? '<a href="' +
                          MMG.records[0].linkUrl +
                          '" target="' +
                          ("True" == MMG.records[0].openLinkInNewWindow
                            ? "_blank"
                            : "_self") +
                          '">'
                        : "") +
                      MMG.records[0].title +
                      (-1 < config.linkedElement.indexOf("title") &&
                      "True" == MMG.records[0].isLinked
                        ? "</a>"
                        : "") +
                      "</h2>"
                    : "") +
                  ("True" != MMG.records[0].hideCaption &&
                  "" != $.trim(MMG.records[0].caption)
                    ? '<p class="mmg-description-caption">' +
                      MMG.records[0].caption +
                      "</p>"
                    : "") +
                  ("True" == MMG.records[0].isLinked ||
                  "True" == MMG.records[0].videoIsEmbedded
                    ? '<div class="mmg-description-links">'
                    : "") +
                  ("True" == MMG.records[0].isLinked
                    ? '<a class="mmg-description-link read-more" href="' +
                      MMG.records[0].linkUrl +
                      '" target="' +
                      ("True" == MMG.records[0].openLinkInNewWindow
                        ? "_blank"
                        : "_self") +
                      '" tabindex="0">' +
                      MMG.records[0].linkText +
                      "</a>"
                    : "") +
                  ("True" == MMG.records[0].videoIsEmbedded
                    ? '<a class="mmg-description-link watch-video" href="#" role="button" tabindex="0">' +
                      MMG.records[0].videoLinkText +
                      "</a>"
                    : "") +
                  ("True" == MMG.records[0].isLinked ||
                  "True" == MMG.records[0].videoIsEmbedded
                    ? "</div>"
                    : "") +
                  "</div></div>"
              ),
              config.bullets && 1 < this.recordNum && this.BuildBullets(),
              config.thumbnails && 1 < this.recordNum && this.BuildThumbnails(),
              config.galleryOverlay &&
                -1 < config.linkedElement.indexOf("overlay") &&
                $(".mmg-viewer", this.galleryContainer).append(
                  '<a href="' +
                    MMG.records[0].linkUrl +
                    '" target="' +
                    ("True" == MMG.records[0].openLinkInNewWindow
                      ? "_blank"
                      : "_self") +
                    '" tabindex="' +
                    ("True" != MMG.records[0].isLinked ? "-1" : "0") +
                    '" aria-hidden="' +
                    ("True" != MMG.records[0].isLinked ? "true" : "false") +
                    '" class="mmg-overlay' +
                    ("True" != MMG.records[0].isLinked ? " mmg-hidden" : "") +
                    '" aria-label="' +
                    MMG.records[0].linkText +
                    '"></a>'
                ),
              this.SetFullScreenHeight();
          },
          BuildSlides: function() {
            var t = "";
            function a(e) {
              return (
                ("True" != MMG.records[e].hideTitle ||
                "True" != MMG.records[e].hideCaption ||
                "True" == MMG.records[e].isLinked ||
                "True" == MMG.records[e].videoIsEmbedded
                  ? '<div class="mmg-description">'
                  : "") +
                ("True" != MMG.records[e].hideTitle
                  ? '<h2 class="mmg-description-title">' +
                    (-1 < config.linkedElement.indexOf("title") &&
                    "True" == MMG.records[e].isLinked
                      ? '<a href="' +
                        MMG.records[e].linkUrl +
                        '" target="' +
                        ("True" == MMG.records[e].openLinkInNewWindow
                          ? "_blank"
                          : "_self") +
                        '">'
                      : "") +
                    MMG.records[e].title +
                    (-1 < config.linkedElement.indexOf("title") &&
                    "True" == MMG.records[e].isLinked
                      ? "</a>"
                      : "") +
                    "</h2>"
                  : "") +
                ("True" != MMG.records[e].hideCaption &&
                "" != $.trim(MMG.records[e].caption)
                  ? '<p class="mmg-description-caption">' +
                    MMG.records[e].caption +
                    "</p>"
                  : "") +
                ("True" == MMG.records[e].isLinked ||
                "True" == MMG.records[e].videoIsEmbedded
                  ? '<div class="mmg-description-links">'
                  : "") +
                ("True" == MMG.records[e].isLinked
                  ? '<a class="mmg-description-link read-more" href="' +
                    MMG.records[e].linkUrl +
                    '" target="' +
                    ("True" == MMG.records[e].openLinkInNewWindow
                      ? "_blank"
                      : "_self") +
                    '" tabindex="0">' +
                    MMG.records[e].linkText +
                    "</a>"
                  : "") +
                ("True" == MMG.records[e].videoIsEmbedded
                  ? '<a class="mmg-description-link watch-video" href="#" role="button" tabindex="0">' +
                    MMG.records[e].videoLinkText +
                    "</a>"
                  : "") +
                ("True" == MMG.records[e].isLinked ||
                "True" == MMG.records[e].videoIsEmbedded
                  ? "</div>"
                  : "") +
                ("True" != MMG.records[e].hideTitle ||
                "True" != MMG.records[e].hideCaption ||
                "True" == MMG.records[e].isLinked ||
                "True" == MMG.records[e].videoIsEmbedded
                  ? "</div>"
                  : "")
              );
            }
            if ("slide" == config.transitionType)
              switch (this.recordNum) {
                case 1:
                  t +=
                    '<li class="mmg-slide loading" tabindex="-1" data-gallery-index="3" data-record-index="0" aria-hidden="true"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                    a(0) +
                    '</li><li class="mmg-slide loading active" tabindex="-1" data-gallery-index="0" data-record-index="0" aria-hidden="false"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                    a(0) +
                    '</li><li class="mmg-slide loading" tabindex="-1" data-gallery-index="1" data-record-index="0" aria-hidden="true"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                    a(0) +
                    '</li><li class="mmg-slide loading" tabindex="-1" data-gallery-index="2" data-record-index="0" aria-hidden="true"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                    a(0) +
                    "</li>";
                  break;
                case 2:
                  t +=
                    '<li class="mmg-slide loading" tabindex="-1" data-gallery-index="3" data-record-index="1" aria-hidden="true"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                    a(1) +
                    '</li><li class="mmg-slide loading active" tabindex="-1" data-gallery-index="0" data-record-index="0" aria-hidden="false"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                    a(0) +
                    '</li><li class="mmg-slide loading" tabindex="-1" data-gallery-index="1" data-record-index="1" aria-hidden="true"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                    a(1) +
                    '</li><li class="mmg-slide loading" tabindex="-1" data-gallery-index="2" data-record-index="0" aria-hidden="true"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                    a(0) +
                    "</li>";
                  break;
                case 3:
                  t +=
                    '<li class="mmg-slide loading" tabindex="-1" data-gallery-index="5" data-record-index="2" aria-hidden="true"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                    a(2) +
                    '</li><li class="mmg-slide loading active" tabindex="-1" data-gallery-index="0" data-record-index="0" aria-hidden="false"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                    a(0) +
                    '</li><li class="mmg-slide loading" tabindex="-1" data-gallery-index="1" data-record-index="1" aria-hidden="true"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                    a(1) +
                    '</li><li class="mmg-slide loading" tabindex="-1" data-gallery-index="2" data-record-index="2" aria-hidden="true"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                    a(2) +
                    '</li><li class="mmg-slide ' +
                    (config.efficientLoad ? "rest" : "loading") +
                    '" tabindex="-1" data-gallery-index="3" data-record-index="0" aria-hidden="true"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                    a(0) +
                    '</li><li class="mmg-slide ' +
                    (config.efficientLoad ? "rest" : "loading") +
                    '" tabindex="-1" data-gallery-index="4" data-record-index="1" aria-hidden="true"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                    a(1) +
                    "</li>";
                  break;
                default:
                  t +=
                    '<li class="mmg-slide loading" tabindex="-1" data-gallery-index="' +
                    (this.recordNum - 1) +
                    '" data-record-index="' +
                    (this.recordNum - 1) +
                    '" aria-hidden="true"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                    a(this.recordNum - 1) +
                    "</li>";
                  for (var e = 0; e < this.recordNum - 1; e++)
                    t +=
                      '<li class="mmg-slide ' +
                      (e < 3
                        ? "loading"
                        : config.efficientLoad
                        ? "rest"
                        : "loading") +
                      (0 == e ? " active" : "") +
                      '" tabindex="-1" data-gallery-index="' +
                      e +
                      '" data-record-index="' +
                      e +
                      '" aria-hidden="' +
                      (0 == e ? "false" : "true") +
                      '"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                      a(e) +
                      "</li>";
              }
            else
              $.each(MMG.records, function(e, i) {
                t +=
                  '<li class="mmg-slide ' +
                  (e < 2
                    ? "loading"
                    : config.efficientLoad
                    ? "rest"
                    : "loading") +
                  (0 == e ? " active" : "") +
                  '" tabindex="-1" data-gallery-index="' +
                  e +
                  '" data-record-index="' +
                  e +
                  '" aria-hidden="' +
                  (0 == e ? "false" : "true") +
                  '"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                  a(e) +
                  "</li>";
              });
            "slide" == config.transitionType &&
              $(".mmg-slides", this.galleryContainer).css("left", "-100%"),
              $(".mmg-slides", this.galleryContainer).html(t),
              this.LoadImages({ handle: "loading" });
          },
          LoadImages: function(e) {
            var n = this;
            if ("loading" == e.handle)
              $(".mmg-slide.loading", this.galleryContainer).each(function() {
                var e = $(this).attr("data-gallery-index"),
                  i = $(this).attr("data-record-index"),
                  t = MMG.records[i].imageSrc,
                  a = MMG.records[i].imageAltText;
                $('<img src="' + t + '" alt="' + a + '" />').one(
                  "load",
                  function() {
                    $(
                      ".mmg-slide[data-gallery-index='" + e + "'] .mmg-loader",
                      n.galleryContainer
                    ).remove(),
                      $(
                        ".mmg-slide[data-gallery-index='" + e + "']",
                        n.galleryContainer
                      )
                        .removeClass("loading")
                        .prepend(
                          '<div class="mmg-image" aria-hidden="true"></div>'
                        ),
                      $(
                        ".mmg-slide[data-gallery-index='" + e + "'] .mmg-image",
                        n.galleryContainer
                      ).prepend($(this)),
                      "True" == MMG.records[i].isLinked &&
                        -1 < config.linkedElement.indexOf("image") &&
                        $(
                          ".mmg-slide[data-gallery-index='" + e + "'] img",
                          n.galleryContainer
                        ).wrap(
                          '<a href="' +
                            $.trim(MMG.records[i].linkUrl) +
                            '" tabindex="' +
                            ($(
                              ".mmg-slide[data-gallery-index='" + e + "']",
                              n.galleryContainer
                            ).hasClass("active")
                              ? "0"
                              : "-1") +
                            '" target="' +
                            ("True" == MMG.records[i].openLinkInNewWindow
                              ? "_blank"
                              : "_self") +
                            '" aria-label="' +
                            $.trim(MMG.records[i].linkText) +
                            '"></a>'
                        ),
                      config.onImageLoad.call(this, {
                        element: element,
                        recordIndex: i,
                        mmgRecords: MMG.records
                      });
                  }
                );
              });
            else if ("rest" == e.handle) {
              var i = e.galleryIndex,
                t = $(
                  ".mmg-slide[data-gallery-index='" + i + "']",
                  this.galleryContainer
                ).attr("data-record-index"),
                a = MMG.records[t].imageSrc,
                r = MMG.records[t].imageAltText;
              $('<img src="' + a + '" alt="' + r + '" />').one(
                "load",
                function() {
                  $(
                    ".mmg-slide[data-gallery-index='" + i + "'] .mmg-loader",
                    n.galleryContainer
                  ).remove(),
                    $(
                      ".mmg-slide[data-gallery-index='" + i + "']",
                      n.galleryContainer
                    )
                      .removeClass("rest")
                      .prepend(
                        '<div class="mmg-image" aria-hidden="true"></div>'
                      ),
                    $(
                      ".mmg-slide[data-gallery-index='" + i + "'] .mmg-image",
                      n.galleryContainer
                    ).prepend($(this)),
                    "True" == MMG.records[t].isLinked &&
                      -1 < config.linkedElement.indexOf("image") &&
                      $(
                        ".mmg-slide[data-gallery-index='" + i + "'] img",
                        n.galleryContainer
                      ).wrap(
                        '<a href="' +
                          $.trim(MMG.records[t].linkUrl) +
                          '" tabindex="' +
                          ($(
                            ".mmg-slide[data-gallery-index='" + i + "']",
                            n.galleryContainer
                          ).hasClass("active")
                            ? "0"
                            : "-1") +
                          '" target="' +
                          ("True" == MMG.records[t].openLinkInNewWindow
                            ? "_blank"
                            : "_self") +
                          '" aria-label="' +
                          $.trim(MMG.records[t].linkText) +
                          '"></a>'
                      ),
                    config.onImageLoad.call(this, {
                      element: element,
                      imageIndex: t,
                      mmgRecords: MMG.records
                    });
                }
              );
            }
            $(".mmg-slide.loading", this.galleryContainer).length ||
              $(".mmg-slide.rest", this.galleryContainer).length ||
              config.allImagesLoaded.call(this, {
                element: element,
                mmgRecords: MMG.records
              });
          },
          BuildBullets: function() {
            for (var e = "", i = 0; i < this.recordNum; i++)
              e +=
                '<li><button class="mmg-bullet' +
                (0 == i ? " active" : "") +
                '" data-record-index="' +
                i +
                '" aria-label="' +
                (0 == i
                  ? "Slide " + (i + 1) + ": Current Item"
                  : "Navigate to Slide " + (i + 1)) +
                '"></button></li>';
            $(this.galleryContainer).append(
              '<div class="mmg-bullets-outer"><ul class="mmg-bullets">' +
                e +
                "</ul></div>"
            );
          },
          BuildThumbnails: function() {
            for (
              var e = "", i = this.GetThumbnailRange(), t = 0;
              t < this.recordNum;
              t++
            )
              e +=
                '<li aria-hidden="false"><button class="mmg-thumbnail' +
                (0 == t ? " active" : "") +
                '" data-record-index="' +
                t +
                '" aria-label="' +
                (0 == t
                  ? "Slide " + (t + 1) + ": Current Item"
                  : "Navigate to Slide " + (t + 1)) +
                '"><img src="' +
                MMG.records[t].imageSrc +
                '" alt="' +
                MMG.records[t].imageAltText +
                ' thumbnail" /></button></li>';
            $(this.galleryContainer).append(
              '<div class="mmg-thumbnails-outer"><button class="mmg-thumbnail-control back" aria-label="Cycle Thumbnails Backward" aria-hidden="' +
                (this.recordNum > i ? "false" : "true") +
                '"></button><div class="mmg-thumbnail-viewer"><ul class="mmg-thumbnails" style="left: 0;">' +
                e +
                '</ul></div><button class="mmg-thumbnail-control next" aria-label="Cycle Thumbnails Forward" aria-hidden="' +
                (this.recordNum > i ? "false" : "true") +
                '"></button></div>'
            ),
              (this.thumbnailWidth = $(
                ".mmg-thumbnails > li:first-child",
                this.galleryContainer
              ).outerWidth(!0)),
              $(
                ".mmg-thumbnails > li:nth-child(n+" + (i + 1) + ")",
                this.galleryContainer
              ).attr("aria-hidden", "true");
          },
          GetThumbnailRange: function() {
            var e = 0;
            switch (parseInt(this.GetBreakPoint())) {
              case 960:
                e = config.thumbnailViewerNum[0];
                break;
              case 768:
                e = config.thumbnailViewerNum[1];
                break;
              case 640:
                e = config.thumbnailViewerNum[2];
                break;
              case 480:
                e = config.thumbnailViewerNum[3];
                break;
              case 320:
                e = config.thumbnailViewerNum[4];
            }
            return e;
          },
          AnimateThumbnails: function(e) {
            var i = this,
              t = this.GetThumbnailRange();
            (this.thumbnailWidth = $(
              ".mmg-thumbnails > li:first-child",
              this.galleryContainer
            ).outerWidth(!0)),
              $(".mmg-thumbnails > li", this.galleryContainer).attr(
                "aria-hidden",
                "false"
              ),
              "back" == e.action
                ? ((this.thumbnailSliderPosition =
                    this.thumbnailSliderPosition - this.thumbnailWidth),
                  $(".mmg-thumbnails", this.galleryContainer)
                    .css("left", i.thumbnailSliderPosition)
                    .prepend(
                      $(
                        ".mmg-thumbnails > li:last-child",
                        this.galleryContainer
                      )
                    ),
                  (this.thumbnailSliderPosition =
                    this.thumbnailSliderPosition + this.thumbnailWidth),
                  $(".mmg-thumbnails", this.galleryContainer).animate(
                    { left: i.thumbnailSliderPosition },
                    (1e3 * config.transitionSpeed) / 2,
                    function() {
                      $(
                        ".mmg-thumbnails > li:nth-child(n+" + (t + 1) + ")",
                        i.galleryContainer
                      ).attr("aria-hidden", "true"),
                        (i.thumbnailsAnimating = !1);
                    }
                  ))
                : "next" == e.action &&
                  ((this.thumbnailSliderPosition =
                    this.thumbnailSliderPosition - this.thumbnailWidth),
                  $(".mmg-thumbnails", this.galleryContainer).animate(
                    { left: i.thumbnailSliderPosition },
                    (1e3 * config.transitionSpeed) / 2,
                    function() {
                      (i.thumbnailSliderPosition =
                        i.thumbnailSliderPosition + i.thumbnailWidth),
                        $(".mmg-thumbnails", i.galleryContainer)
                          .css("left", i.thumbnailSliderPosition)
                          .append(
                            $(
                              ".mmg-thumbnails > li:first-child",
                              i.galleryContainer
                            )
                          ),
                        $(
                          ".mmg-thumbnails > li:nth-child(n+" + (t + 1) + ")",
                          i.galleryContainer
                        ).attr("aria-hidden", "true"),
                        (i.thumbnailsAnimating = !1);
                    }
                  ));
          },
          Events: function() {
            var o = this;
            config.hoverPause &&
              1 < this.recordNum &&
              $(element)
                .on("focusin", o.galleryContainer, function(e) {
                  $(window).keyup(function(e) {
                    $(o.galleryContainer).find(":focus").length &&
                      (o.StopTimer(),
                      o.UpdateAttributes({
                        ".mmg-container": {
                          "data-has-focus": "true",
                          "data-play-state": "paused"
                        }
                      }),
                      (o.hasFocus = !0),
                      (o.isPlaying = !1));
                  });
                })
                .on("focusout", o.galleryContainer, function(e) {
                  $(window).keyup(function(e) {
                    $(o.galleryContainer).find(":focus").length ||
                      (o.UpdateAttributes({
                        ".mmg-container": { "data-has-focus": "false" }
                      }),
                      (o.hasFocus = !1),
                      !config.autoRotate ||
                        o.isHovering ||
                        o.isTouching ||
                        o.hasFocus ||
                        $(
                          ".mmg-control.play-pause",
                          o.galleryContainer
                        ).hasClass("paused") ||
                        (o.UpdateAttributes({
                          ".mmg-container": { "data-play-state": "playing" }
                        }),
                        (o.isPlaying = !0),
                        o.StopTimer(),
                        o.RunTimer()));
                  });
                })
                .on("mouseenter touchstart", o.galleryContainer, function(e) {
                  o.StopTimer();
                  var i = e.type;
                  o.UpdateAttributes({
                    ".mmg-container": (function(e) {
                      switch (e) {
                        case "mouseenter":
                          return (
                            (o.isHovering = !0),
                            {
                              "data-is-hovering": "true",
                              "data-play-state": "paused"
                            }
                          );
                        case "touchstart":
                          return (
                            (o.isTouching = !0),
                            {
                              "data-is-touching": "true",
                              "data-play-state": "paused"
                            }
                          );
                      }
                    })(i)
                  }),
                    (o.isPlaying = !1);
                })
                .on("mouseleave touchend", o.galleryContainer, function(e) {
                  var i = e.type;
                  o.UpdateAttributes({
                    ".mmg-container": (function(e) {
                      switch (e) {
                        case "mouseleave":
                          return (
                            (o.isHovering = !1), { "data-is-hovering": "false" }
                          );
                        case "touchend":
                          return (
                            (o.isTouching = !1), { "data-is-touching": "false" }
                          );
                      }
                    })(i)
                  }),
                    !config.autoRotate ||
                      o.isHovering ||
                      o.isTouching ||
                      o.hasFocus ||
                      $(".mmg-control.play-pause", o.galleryContainer).hasClass(
                        "paused"
                      ) ||
                      (o.UpdateAttributes({
                        ".mmg-container": { "data-play-state": "playing" }
                      }),
                      (o.isPlaying = !0),
                      o.StopTimer(),
                      o.RunTimer());
                }),
              config.backNextControls &&
                1 < this.recordNum &&
                $(element).on(
                  "click keydown",
                  ".mmg-control.back, .mmg-control.next",
                  function(e) {
                    if (o.AllyClick(e) && !o.isAnimating) {
                      e.preventDefault(), o.StopTimer();
                      var i = {};
                      $(this).hasClass("back")
                        ? ((i.defaultNext = !1),
                          (i.bullet = { click: !1, keydown: !1 }),
                          (i.thumbnail = { click: !1, keydown: !1 }),
                          (i.currentImage = $(
                            ".mmg-slide.active",
                            o.galleryContainer
                          )),
                          (i.nextImage = $(
                            ".mmg-slide.active",
                            o.galleryContainer
                          ).prev(".mmg-slide").length
                            ? $(".mmg-slide.active", o.galleryContainer).prev(
                                ".mmg-slide"
                              )
                            : $(".mmg-slide:last", o.galleryContainer)))
                        : ((i.defaultNext = !0),
                          (i.bullet = { click: !1, keydown: !1 }),
                          (i.thumbnail = { click: !1, keydown: !1 }),
                          (i.currentImage = $(
                            ".mmg-slide.active",
                            o.galleryContainer
                          )),
                          (i.nextImage = $(
                            ".mmg-slide.active + .mmg-slide",
                            o.galleryContainer
                          ).length
                            ? $(
                                ".mmg-slide.active + .mmg-slide",
                                o.galleryContainer
                              )
                            : $(".mmg-slide:first", o.galleryContainer))),
                        o.RunTransition(i);
                      var t = $(i.nextImage).attr("data-gallery-index");
                      $(i.nextImage).attr("data-record-index");
                      $(".mmg-live-feedback", o.galleryContainer).text(
                        "Slide " + (parseInt(t) + 1) + " of " + o.recordNum
                      ),
                        config.autoRotate && o.isPlaying && o.RunTimer();
                    }
                  }
                ),
              1 < this.recordNum &&
                ($(element).on("swiperight", o.galleryContainer, function(e) {
                  o.StopTimer();
                  var i = $(".mmg-slide.active", o.galleryContainer).prev(
                    ".mmg-slide"
                  ).length
                    ? $(".mmg-slide.active", o.galleryContainer).prev(
                        ".mmg-slide"
                      )
                    : $(".mmg-slide:last", o.galleryContainer);
                  o.RunTransition({
                    defaultNext: !1,
                    bullet: { click: !1, keydown: !1 },
                    thumbnail: { click: !1, keydown: !1 },
                    currentImage: $(".mmg-slide.active", o.galleryContainer),
                    nextImage: i
                  }),
                    config.autoRotate && o.isPlaying && o.RunTimer();
                }),
                $(element).on("swipeleft", o.galleryContainer, function(e) {
                  o.StopTimer();
                  var i = $(
                    ".mmg-slide.active + .mmg-slide",
                    o.galleryContainer
                  ).length
                    ? $(".mmg-slide.active + .mmg-slide", o.galleryContainer)
                    : $(".mmg-slide:first", o.galleryContainer);
                  o.RunTransition({
                    defaultNext: !0,
                    bullet: { click: !1, keydown: !1 },
                    thumbnail: { click: !1, keydown: !1 },
                    currentImage: $(".mmg-slide.active", o.galleryContainer),
                    nextImage: i
                  }),
                    config.autoRotate && o.isPlaying && o.RunTimer();
                })),
              config.playPauseControl &&
                1 < this.recordNum &&
                $(element).on(
                  "click keydown",
                  ".mmg-control.play-pause",
                  function(e) {
                    o.AllyClick(e) &&
                      (e.preventDefault(),
                      $(this).hasClass("playing")
                        ? ($(this)
                            .toggleClass("playing paused")
                            .attr("aria-label", "Play gallery"),
                          o.UpdateAttributes({
                            ".mmg-container": { "data-play-state": "paused" }
                          }),
                          (o.isPlaying = !1),
                          o.StopTimer())
                        : ($(this)
                            .toggleClass("paused playing")
                            .attr("aria-label", "Pause gallery"),
                          !config.autoRotate ||
                            o.isHovering ||
                            o.isTouching ||
                            o.hasFocus ||
                            (o.UpdateAttributes({
                              ".mmg-container": { "data-play-state": "playing" }
                            }),
                            (o.isPlaying = !0),
                            o.StopTimer(),
                            o.RunTimer())));
                  }
                ),
              config.bullets &&
                1 < this.recordNum &&
                $(element).on("click keydown", ".mmg-bullet", function(e) {
                  if (
                    o.AllyClick(e) &&
                    !o.isAnimating &&
                    (e.preventDefault(), !$(this).hasClass("active"))
                  ) {
                    o.StopTimer();
                    var i = $(this).attr("data-record-index");
                    o.RunTransition({
                      defaultNext: !1,
                      bullet: {
                        click: "click" == e.type,
                        keydown: "keydown" == e.type
                      },
                      thumbnail: { click: !1, keydown: !1 },
                      currentImage: $(".mmg-slide.active", o.galleryContainer),
                      nextImage: $(
                        ".mmg-slide[data-gallery-index='" + i + "']",
                        o.galleryContainer
                      )
                    }),
                      config.autoRotate && o.isPlaying && o.RunTimer();
                  }
                }),
              config.thumbnails &&
                1 < this.recordNum &&
                ($(element).on("click keydown", ".mmg-thumbnail", function(e) {
                  if (
                    o.AllyClick(e) &&
                    !o.isAnimating &&
                    (e.preventDefault(), !$(this).hasClass("active"))
                  ) {
                    o.StopTimer();
                    var i = $(this).attr("data-record-index");
                    o.RunTransition({
                      defaultNext: !1,
                      bullet: { click: !1, keydown: !1 },
                      thumbnail: {
                        click: "click" == e.type,
                        keydown: "keydown" == e.type
                      },
                      currentImage: $(".mmg-slide.active", o.galleryContainer),
                      nextImage: $(
                        ".mmg-slide[data-gallery-index='" + i + "']",
                        o.galleryContainer
                      )
                    }),
                      config.autoRotate && o.isPlaying && o.RunTimer();
                  }
                }),
                $(element).on(
                  "click keydown",
                  ".mmg-thumbnail-control.back, .mmg-thumbnail-control.next",
                  function(e) {
                    o.AllyClick(e) &&
                      !o.thumbnailsAnimating &&
                      (e.preventDefault(),
                      (o.thumbnailsAnimating = !0),
                      $(this).hasClass("back")
                        ? o.AnimateThumbnails({ action: "back" })
                        : o.AnimateThumbnails({ action: "next" }));
                  }
                )),
              $(element).on(
                "click keydown",
                ".mmg-description-link.watch-video",
                function(e) {
                  if (o.AllyClick(e)) {
                    e.preventDefault(),
                      o.StopTimer(),
                      o.UpdateAttributes({
                        ".mmg-container": {
                          "data-is-hovering": "false",
                          "data-has-focus": "false",
                          "data-is-touching": "false",
                          "data-play-state": "paused"
                        }
                      }),
                      (o.isHovering = !1),
                      (o.hasFocus = !1),
                      (o.isTouching = !1),
                      (o.isPlaying = !1);
                    var i = $(o.galleryContainer).attr(
                      "data-active-record-index"
                    );
                    $(o.galleryContainer).append(
                      '<div class="mmg-video-window"><div class="mmg-video-outer"><div class="mmg-video-viewer"><div class="mmg-loader"><div class="mmg-loader-set one"></div><div class="mmg-loader-set two"></div></div>' +
                        ((n = MMG.records[i].videoIframe),
                        ((r = document.createElement(
                          "textarea"
                        )).innerHTML = n),
                        (t = r.value),
                        (a = ""),
                        -1 < t.indexOf("youtube.com/embed") &&
                          (-1 == t.indexOf("rel=") && (a += "&rel=0"),
                          -1 == t.indexOf("autoplay=") && (a += "&autoplay=1"),
                          -1 == t.indexOf("?")
                            ? ((a = a.substr(1)),
                              (t = t.replace(
                                /youtube.com\/embed\/[^\s]+?[^"]+/gi,
                                "$&?" + a
                              )))
                            : (t = t.replace(
                                /youtube.com\/embed\/[^\s]+?[^"]+/gi,
                                "$&" + a
                              ))),
                        -1 < t.indexOf("vimeo.com/video/") &&
                          (-1 == t.indexOf("autoplay=") && (a += "&autoplay=1"),
                          -1 == t.indexOf("?")
                            ? ((a = a.substr(1)),
                              (t = t.replace(
                                /vimeo.com\/video\/[^\s]+?[^"]+/gi,
                                "$&?" + a
                              )))
                            : (t = t.replace(
                                /vimeo.com\/video\/[^\s]+?[^"]+/gi,
                                "$&" + a
                              ))),
                        -1 < t.indexOf("teachertube.com/embed/video/") &&
                          (-1 == t.indexOf("autoplay=") &&
                            (a += "&autoplay=true"),
                          -1 == t.indexOf("?")
                            ? ((a = a.substr(1)),
                              (t = t.replace(
                                /teachertube.com\/embed\/video\/[^\s]+?[^"]+/gi,
                                "$&?" + a
                              )))
                            : (t = t.replace(
                                /teachertube.com\/embed\/video\/[^\s]+?[^"]+/gi,
                                "$&" + a
                              ))),
                        t) +
                        '</div><a href="#" class="mmg-video-close" aria-label="Close video dialog" role="button">Close</a></div></div>'
                    ),
                      $(".mmg-video-close", o.galleryContainer).focus();
                  }
                  var t, a, n, r;
                }
              ),
              $(element).on("click keydown", ".mmg-video-close", function(e) {
                (o.AllyClick(e) &&
                  (e.preventDefault(),
                  $(".mmg-video-window", o.galleryContainer).addClass(
                    "close-video"
                  ),
                  setTimeout(function() {
                    $(".mmg-video-window", o.galleryContainer).remove(),
                      $(".mmg-description-outer", o.galleryContainer).length
                        ? $(
                            ".mmg-description-outer .mmg-description-link.watch-video",
                            o.galleryContainer
                          ).focus()
                        : $(
                            ".mmg-slide.active .mmg-description-link.watch-video",
                            o.galleryContainer
                          ).focus();
                  }, 1e3),
                  config.autoRotate &&
                    1 < o.recordNum &&
                    !$(".mmg-control.play-pause", o.galleryContainer).hasClass(
                      "paused"
                    ) &&
                    (o.UpdateAttributes({
                      ".mmg-container": { "data-play-state": "playing" }
                    }),
                    (o.isPlaying = !0),
                    o.StopTimer(),
                    o.RunTimer())),
                "keydown" == e.type && e.keyCode == o.keyCodes.tab) &&
                  (e.preventDefault(),
                  $(
                    ".mmg-video-viewer iframe",
                    o.galleryContainer
                  )[0].contentWindow.focus());
              }),
              $(o.galleryContainer).on(
                "focusout",
                ".mmg-video-window",
                function() {
                  $(".mmg-video-close", o.galleryContainer).focus();
                }
              );
          },
          RunTransition: function(e) {
            var i = this,
              t = $(e.currentImage).attr("data-record-index"),
              a = $(e.currentImage).attr("data-gallery-index"),
              n = $(e.nextImage).attr("data-record-index"),
              r = $(e.nextImage).attr("data-gallery-index");
            if (
              ($(e.nextImage).addClass("next"),
              config.bullets &&
                ($(".mmg-bullet.active", this.galleryContainer)
                  .removeClass("active")
                  .attr("aria-label", "Navigate to Slide " + (parseInt(a) + 1)),
                $(
                  ".mmg-bullet[data-record-index='" + r + "']",
                  this.galleryContainer
                )
                  .addClass("active")
                  .attr(
                    "aria-label",
                    "Slide " + (parseInt(r) + 1) + ": Current Item"
                  )),
              config.thumbnails &&
                ($(".mmg-thumbnail.active", this.galleryContainer)
                  .removeClass("active")
                  .attr("aria-label", "Navigate to Slide " + (parseInt(a) + 1)),
                $(
                  ".mmg-thumbnail[data-record-index='" + r + "']",
                  this.galleryContainer
                )
                  .addClass("active")
                  .attr(
                    "aria-label",
                    "Slide " + (parseInt(r) + 1) + ": Current Item"
                  )),
              i.UpdateAttributes({
                ".mmg-container": {
                  "data-is-animating": "true",
                  "data-active-record-index": n,
                  "data-active-gallery-index": r,
                  "data-active-slide-title":
                    "True" != MMG.records[n].hideTitle ? "true" : "false",
                  "data-active-slide-caption":
                    "True" != MMG.records[n].hideCaption &&
                    "" != $.trim(MMG.records[n].caption)
                      ? "true"
                      : "false",
                  "data-active-slide-link":
                    "True" == MMG.records[n].isLinked ? "true" : "false",
                  "data-active-slide-video":
                    "True" == MMG.records[n].videoIsEmbedded ? "true" : "false"
                }
              }),
              (i.isAnimating = !0),
              i.UpdateElements({
                currentImage: e.currentImage,
                currentRecordIndex: t,
                currentGalleryIndex: a,
                nextImage: e.nextImage,
                nextRecordIndex: n,
                nextGalleryIndex: r
              }),
              config.onTransitionStart.call(this, {
                element: element,
                currentRecordIndex: t,
                currentGalleryIndex: a,
                nextRecordIndex: n,
                nextGalleryIndex: r,
                mmgRecords: MMG.records
              }),
              MMG.props.defaultGallery)
            ) {
              var o = MMG.records[n].imageWidth,
                s = MMG.records[n].imageHeight;
              $(".mmg-slides-outer", i.galleryContainer).css(
                "padding-top",
                (s / o) * 100 + "%"
              );
            }
            switch (config.transitionType) {
              case "slide":
                var l = $(".mmg-slides", i.galleryContainer).get(0).style.left;
                l = parseInt(l.replace("%", ""));
                var d = !0,
                  m = 0,
                  g = 0;
                if (e.defaultNext)
                  (m = -200),
                    config.efficientLoad &&
                      ($(e.nextImage).hasClass("rest") &&
                        this.LoadImages({
                          handle: "rest",
                          galleryIndex: $(e.nextImage).attr(
                            "data-gallery-index"
                          )
                        }),
                      $(" + .mmg-slide.rest", e.nextImage).length &&
                        this.LoadImages({
                          handle: "rest",
                          galleryIndex: $(
                            " + .mmg-slide.rest",
                            e.nextImage
                          ).attr("data-gallery-index")
                        }));
                else if (a < r) {
                  m = l + -100 * (g = r - a);
                  for (var c = 0; c < g - 1; c++)
                    $(".mmg-slides", i.galleryContainer).append(
                      $(".mmg-slide", i.galleryContainer)
                        .eq(c)
                        .clone()
                        .addClass("mmg-slide-clone")
                        .removeClass("active")
                    );
                } else {
                  (d = !1), (m = l - -100 * (g = a - r));
                  for (var A = 1; A <= g; A++)
                    $(".mmg-slides", i.galleryContainer).prepend(
                      $(
                        ".mmg-slide:nth-last-child(" + A + ")",
                        i.galleryContainer
                      )
                        .clone()
                        .addClass("mmg-slide-clone")
                        .removeClass("active")
                        .css({
                          position: "absolute",
                          top: "0px",
                          right: 100 * A + "%"
                        })
                    );
                }
                $(".mmg-slide.rest", i.galleryContainer).each(function() {
                  i.LoadImages({
                    handle: "rest",
                    galleryIndex: $(this).attr("data-gallery-index")
                  });
                }),
                  $(".mmg-slides", i.galleryContainer).css("left", m + "%"),
                  setTimeout(function() {
                    $(e.nextImage)
                      .toggleClass("next active")
                      .attr("aria-hidden", "false")
                      .css("display", ""),
                      $(e.currentImage)
                        .toggleClass("active")
                        .attr("aria-hidden", "true"),
                      e.bullet.keydown &&
                        $(".mmg-slide.active", i.galleryContainer).focus(),
                      i.UpdateAttributes({
                        ".mmg-container": { "data-is-animating": "false" }
                      }),
                      (i.isAnimating = !1),
                      e.defaultNext
                        ? $(".mmg-slides", i.galleryContainer)
                            .append($(".mmg-slide:first", i.galleryContainer))
                            .css("left", "-100%")
                        : ($(
                            ".mmg-slide.mmg-slide-clone",
                            i.galleryContainer
                          ).remove(),
                          d
                            ? $(".mmg-slides", i.galleryContainer)
                                .append(
                                  $(
                                    ".mmg-slide:nth-child(-n+" + g + ")",
                                    i.galleryContainer
                                  )
                                )
                                .css("left", "-100%")
                            : $(".mmg-slides", i.galleryContainer)
                                .prepend(
                                  $(
                                    ".mmg-slide:nth-last-child(-n+" + g + ")",
                                    i.galleryContainer
                                  )
                                )
                                .css("left", "-100%")),
                      $(".mmg-live-feedback", element).empty(),
                      e.bullet.keydown &&
                        $(".mmg-slide.active")
                          .attr("tabindex", "-1")
                          .focus(),
                      config.onTransitionEnd.call(this, {
                        element: element,
                        currentRecordIndex: n,
                        currentGalleryIndex: r,
                        mmgRecords: MMG.records
                      });
                  }, 1e3 * config.transitionSpeed);
                break;
              default:
                config.efficientLoad &&
                  ($(e.nextImage).hasClass("rest") &&
                    this.LoadImages({
                      handle: "rest",
                      galleryIndex: $(e.nextImage).attr("data-gallery-index")
                    }),
                  $(" + .mmg-slide.rest", e.nextImage).length &&
                    this.LoadImages({
                      handle: "rest",
                      galleryIndex: $(" + .mmg-slide.rest", e.nextImage).attr(
                        "data-gallery-index"
                      )
                    })),
                  setTimeout(function() {
                    $(e.nextImage)
                      .toggleClass("next active")
                      .attr("aria-hidden", "false")
                      .css("display", ""),
                      $(e.currentImage)
                        .toggleClass("active")
                        .attr("aria-hidden", "true"),
                      e.bullet.keydown &&
                        $(".mmg-slide.active", i.galleryContainer).focus(),
                      i.UpdateAttributes({
                        ".mmg-container": { "data-is-animating": "false" }
                      }),
                      (i.isAnimating = !1),
                      $(".mmg-live-feedback", element).empty(),
                      config.onTransitionEnd.call(this, {
                        element: element,
                        currentRecordIndex: n,
                        currentGalleryIndex: r,
                        mmgRecords: MMG.records
                      });
                  }, 1e3 * config.transitionSpeed);
            }
          },
          UpdateAttributes: function(e) {
            $.each(e, function(t, e) {
              $.each(e, function(e, i) {
                $(t, element).attr(e, i);
              });
            });
          },
          UpdateElements: function(e) {
            -1 < config.linkedElement.indexOf("image") &&
              ($(".mmg-slide > a", this.galleryContainer).attr(
                "tabindex",
                "-1"
              ),
              "True" == MMG.records[e.nextRecordIndex].isLinked &&
                $("> a", e.nextImage).attr("tabindex", "0")),
              config.galleryOverlay &&
                -1 < config.linkedElement.indexOf("overlay") &&
                ($(".mmg-overlay", this.galleryContainer).toggleClass(
                  "mmg-hidden",
                  "True" != MMG.records[e.nextRecordIndex].isLinked
                ),
                this.UpdateAttributes({
                  ".mmg-overlay": {
                    "aria-label":
                      "" == $.trim(MMG.records[e.nextRecordIndex].linkText)
                        ? "MMG Link Hidden"
                        : $.trim(MMG.records[e.nextRecordIndex].linkText),
                    href:
                      "" == $.trim(MMG.records[e.nextRecordIndex].linkUrl)
                        ? "#"
                        : $.trim(MMG.records[e.nextRecordIndex].linkUrl),
                    tabindex:
                      "True" == MMG.records[e.nextRecordIndex].isLinked
                        ? "0"
                        : "-1",
                    target:
                      "True" ==
                      MMG.records[e.nextRecordIndex].openLinkInNewWindow
                        ? "_blank"
                        : "_self",
                    "aria-hidden":
                      "True" == MMG.records[e.nextRecordIndex].isLinked
                        ? "false"
                        : "true"
                  }
                }));
            var i = parseInt(this.GetBreakPoint());
            -1 < config.mobileDescriptionContainer.indexOf(i)
              ? ($(".mmg-description-outer", this.galleryContainer).length ||
                  $(
                    '<div class="mmg-description-outer"><div class="mmg-description"></div></div>'
                  ).insertAfter($(".mmg-viewer", this.galleryContainer)),
                $(
                  ".mmg-description-outer .mmg-description",
                  this.galleryContainer
                ).html(
                  ("True" != MMG.records[e.nextRecordIndex].hideTitle
                    ? '<h2 class="mmg-description-title">' +
                      (-1 < config.linkedElement.indexOf("title") &&
                      "True" == MMG.records[e.nextRecordIndex].isLinked
                        ? '<a href="' +
                          MMG.records[e.nextRecordIndex].linkUrl +
                          '" target="' +
                          ("True" ==
                          MMG.records[e.nextRecordIndex].openLinkInNewWindow
                            ? "_blank"
                            : "_self") +
                          '">'
                        : "") +
                      MMG.records[e.nextRecordIndex].title +
                      (-1 < config.linkedElement.indexOf("title") &&
                      "True" == MMG.records[e.nextRecordIndex].isLinked
                        ? "</a>"
                        : "") +
                      "</h2>"
                    : "") +
                    ("True" != MMG.records[e.nextRecordIndex].hideCaption &&
                    "" != $.trim(MMG.records[e.nextRecordIndex].caption)
                      ? '<p class="mmg-description-caption">' +
                        MMG.records[e.nextRecordIndex].caption +
                        "</p>"
                      : "") +
                    ("True" == MMG.records[e.nextRecordIndex].isLinked ||
                    "True" == MMG.records[e.nextRecordIndex].videoIsEmbedded
                      ? '<div class="mmg-description-links">'
                      : "") +
                    ("True" == MMG.records[e.nextRecordIndex].isLinked
                      ? '<a class="mmg-description-link read-more" href="' +
                        MMG.records[e.nextRecordIndex].linkUrl +
                        '" target="' +
                        ("True" ==
                        MMG.records[e.nextRecordIndex].openLinkInNewWindow
                          ? "_blank"
                          : "_self") +
                        '" tabindex="0">' +
                        MMG.records[e.nextRecordIndex].linkText +
                        "</a>"
                      : "") +
                    ("True" == MMG.records[e.nextRecordIndex].videoIsEmbedded
                      ? '<a class="mmg-description-link watch-video" href="#" role="button" tabindex="0">' +
                        MMG.records[e.nextRecordIndex].videoLinkText +
                        "</a>"
                      : "") +
                    ("True" == MMG.records[e.nextRecordIndex].isLinked ||
                    "True" == MMG.records[e.nextRecordIndex].videoIsEmbedded
                      ? "</div>"
                      : "")
                ))
              : $(".mmg-description-outer", this.galleryContainer).length &&
                $(".mmg-description-outer", this.galleryContainer).remove();
          },
          SetFullScreenHeight: function() {
            if (config.fullScreenRotator) {
              var e = parseInt(this.GetBreakPoint()),
                i = $(window).height() - $(this.galleryContainer).offset().top;
              -1 < config.fullScreenBreakpoints.indexOf(e)
                ? $(this.galleryContainer).css("height", i)
                : $(this.galleryContainer).css("height", "");
            }
          },
          RunTimer: function() {
            var e = this;
            this.galleryTimer[this.pmi] = setInterval(function() {
              e.RunTransition({
                defaultNext: !0,
                bullet: { click: !1, key: !1 },
                thumbnail: { click: !1, key: !1 },
                currentImage: $(".mmg-slide.active", e.galleryContainer),
                nextImage: $(
                  ".mmg-slide.active + .mmg-slide",
                  e.galleryContainer
                ).length
                  ? $(".mmg-slide.active + .mmg-slide", e.galleryContainer)
                  : $(".mmg-slide:first", e.galleryContainer)
              });
            }, 1e3 * config.transitionDelay + 1e3 * config.transitionSpeed);
          },
          StopTimer: function() {
            clearInterval(this.galleryTimer[this.pmi]);
          },
          BuildStyleSheet: function() {
            var a = this,
              e = document.createElement("style");
            if (e) {
              e.setAttribute("type", "text/css");
              var i = document.getElementsByTagName("head")[0];
              i && i.insertBefore(e, i.childNodes[0]);
              var n =
                '@import url("https://fonts.googleapis.com/css?family=Noto+Serif:400i|Open+Sans:400,700");@font-face {font-family: "mmg";src: url("data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBOIAAAC8AAAAYGNtYXAXVtKIAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZklJbYMAAAF4AAAAzGhlYWQPd5ghAAACRAAAADZoaGVhBtMDxwAAAnwAAAAkaG10eAwmAAAAAAKgAAAAGGxvY2EAjgBeAAACuAAAAA5tYXhwAAkAHgAAAsgAAAAgbmFtZS6AoGUAAALoAAABVnBvc3QAAwAAAAAEQAAAACAAAwK3AZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpAQPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6QH//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAACAAD/wAMRA8AADQAbAAAXIiY1ETQ2MzIWFREUBiEiJjURNDYzMhYVERQGYCs1NSsrNDQCJis1NSsrNTxANSsDQCs1NSv8wCQ8NSsDQCs1NSv8wCQ8AAAAAQAA/9MC5gOtAAwAADcRNDYXARYUBwEGJjUAZTECUCoq/bAxZR4DRDg2I/5jHGgc/mMjNjgAAAABAAAAAQAAu7sZuV8PPPUACwQAAAAAANajqdIAAAAA1qOp0gAA/8ADEQPAAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAMRAAEAAAAAAAAAAAAAAAAAAAAGBAAAAAAAAAAAAAAAAgAAAAMRAAADFQAAAAAAAAAKABQAHgBKAGYAAAABAAAABgAcAAIAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEAAwAAAAEAAAAAAAIABwA8AAEAAAAAAAMAAwAqAAEAAAAAAAQAAwBRAAEAAAAAAAUACwAJAAEAAAAAAAYAAwAzAAEAAAAAAAoAGgBaAAMAAQQJAAEABgADAAMAAQQJAAIADgBDAAMAAQQJAAMABgAtAAMAAQQJAAQABgBUAAMAAQQJAAUAFgAUAAMAAQQJAAYABgA2AAMAAQQJAAoANAB0bW1nAG0AbQBnVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwbW1nAG0AbQBnbW1nAG0AbQBnUmVndWxhcgBSAGUAZwB1AGwAYQBybW1nAG0AbQBnRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==") format("truetype");font-weight: normal;font-style: normal;}#pmi-' +
                MMG.props.pageModuleInstanceId +
                ':before {content: "960";display: none;}@media (max-width: 1023px) {#pmi-' +
                MMG.props.pageModuleInstanceId +
                ':before {content: "768";}}@media (max-width: 767px) {#pmi-' +
                MMG.props.pageModuleInstanceId +
                ':before {content: "640";}}@media (max-width: 639px) {#pmi-' +
                MMG.props.pageModuleInstanceId +
                ':before {content: "480";}}@media (max-width: 479px) {#pmi-' +
                MMG.props.pageModuleInstanceId +
                ':before {content: "320";}}.mmg-hidden {display: none;}.mmg-ally-hidden {width: 0 !important;height: 0 !important;display: inline-block !important;padding: 0 !important;margin: 0 !important;border: 0 !important;overflow: hidden !important;}' +
                this.galleryContainer +
                " {position: relative;}" +
                this.galleryContainer +
                " .mmg-viewer {position: relative;}" +
                this.galleryContainer +
                '[data-gallery-type="default"] .mmg-viewer {overflow: hidden;}' +
                this.galleryContainer +
                '[data-gallery-type="default"][data-is-animating="true"] .mmg-slides-outer {-ms-transition: padding ' +
                config.transitionSpeed +
                "s ease 0s;-moz-transition: padding " +
                config.transitionSpeed +
                "s ease 0s;-webkit-transition: padding " +
                config.transitionSpeed +
                "s ease 0s;transition: padding " +
                config.transitionSpeed +
                "s ease 0s;}" +
                this.galleryContainer +
                " .mmg-slides {list-style: none;padding: 0px;margin: 0px;width: 100%;height: 100%;position: absolute;top: 0px;left: 0px;box-sizing: border-box;}" +
                this.galleryContainer +
                '[data-transition="fade"] .mmg-slides {overflow: hidden;}' +
                this.galleryContainer +
                '[data-transition="slide"] .mmg-slides {display: -ms-flexbox;display: -webkit-flex;display: flex;left: -100%;}' +
                this.galleryContainer +
                '[data-transition="slide"][data-is-animating="true"] .mmg-slides {-ms-transition: left ' +
                config.transitionSpeed +
                "s ease 0s;-moz-transition: left " +
                config.transitionSpeed +
                "s ease 0s;-webkit-transition: left " +
                config.transitionSpeed +
                "s ease 0s;transition: left " +
                config.transitionSpeed +
                "s ease 0s;}" +
                this.galleryContainer +
                " .mmg-slide {width: 100%;height: 100%;position: absolute;top: 0px;left: 0px;box-sizing: border-box;z-index: 1;visibility: hidden;}" +
                this.galleryContainer +
                " .mmg-slide.loading," +
                this.galleryContainer +
                " .mmg-slide.rest {background: #000;}" +
                this.galleryContainer +
                '[data-transition="slide"] .mmg-slide {position: relative;top: auto;left: auto;-webkit-flex: 1 0 auto;-ms-flex: 1 0 auto;flex: 1 0 auto;visibility: visible;overflow: hidden;background: #000;}' +
                this.galleryContainer +
                " .mmg-slide.next {z-index: 3;visibility: visible;}" +
                this.galleryContainer +
                " .mmg-slide.active {z-index: 2;visibility: visible;}" +
                this.galleryContainer +
                " .mmg-slide .mmg-image {" +
                (config.fullScreenRotator ? "" : "display: block;") +
                "width: 100%;height: 100%;position: relative;box-sizing: border-box;}" +
                this.galleryContainer +
                " .mmg-slide img {display: block;width: 100%;height: 100%;box-sizing: border-box;}" +
                this.galleryContainer +
                '[data-transition="fade"] .mmg-slide.next img {animation: mmgAnimateImageIn ' +
                config.transitionSpeed +
                "s;}" +
                this.galleryContainer +
                '[data-transition="slide"] .mmg-slide img {filter: blur(4px);-ms-transition: filter ' +
                config.transitionSpeed +
                "s ease 0s;-moz-transition: filter " +
                config.transitionSpeed +
                "s ease 0s;-webkit-transition: filter " +
                config.transitionSpeed +
                "s ease 0s;transition: filter " +
                config.transitionSpeed +
                "s ease 0s;}" +
                this.galleryContainer +
                '[data-transition="slide"] .mmg-slide.active img {filter: blur(0px);}' +
                this.galleryContainer +
                '[data-transition="slide"][data-is-animating="true"] .mmg-slide.active img {filter: blur(4px);}' +
                this.galleryContainer +
                '[data-transition="slide"][data-is-animating="true"] .mmg-slide.next img {filter: blur(0px);}' +
                this.galleryContainer +
                " .mmg-slide .mmg-description {position: absolute;bottom: 0px;left: 0px;background: rgba(255, 255, 255, .80);z-index: 5;}" +
                this.galleryContainer +
                " .mmg-description {width: 100%;box-sizing: border-box;padding: 5px 10px;}" +
                this.galleryContainer +
                '[data-transition="fade"][data-is-animating="true"] .mmg-slide.active .mmg-description {display: none;}' +
                this.galleryContainer +
                '[data-transition="fade"][data-is-animating="true"] .mmg-slide.next .mmg-description {animation: mmgAnimateDescriptionIn ' +
                config.transitionSpeed +
                "s;}" +
                this.galleryContainer +
                '[data-transition="slide"] .mmg-slide .mmg-description {display: none;}' +
                this.galleryContainer +
                '[data-transition="slide"] .mmg-slide.active .mmg-description {display: block;}' +
                this.galleryContainer +
                '[data-transition="slide"][data-is-animating="true"] .mmg-slide.active .mmg-description {animation: mmgAnimateDescriptionOut ' +
                config.transitionSpeed +
                "s;animation-fill-mode: forwards;}" +
                this.galleryContainer +
                '[data-transition="slide"][data-is-animating="true"] .mmg-slide.next .mmg-description {display: block;animation: mmgAnimateDescriptionIn ' +
                config.transitionSpeed +
                "s;}" +
                this.galleryContainer +
                " .mmg-slide .mmg-description {max-height: 100%;overflow: auto;}" +
                this.galleryContainer +
                ' .mmg-description-title {color: #333;font-family: "Open Sans", sans-serif;font-weight: bold;font-size: 15px;line-height: 1.3em;margin: 5px 0px;padding: 0px;}' +
                this.galleryContainer +
                ' .mmg-description-caption {color: #333;font-family: "Open Sans", sans-serif;font-size: 12px;line-height: 1.3em;margin: 5px 0px;padding: 0px;}' +
                this.galleryContainer +
                ' .mmg-description-link {color: #333;display: inline-block;font-family: "Noto Serif", serif;font-size: 12px;line-height: 1.3em;margin: 0px 10px 5px 0px;padding: 0px;text-decoration: underline;}' +
                this.galleryContainer +
                '[data-gallery-type="default"] .mmg-description-link {font-style: italic;}' +
                this.galleryContainer +
                " .mmg-description-link.mmg-hidden {display: none;}" +
                this.galleryContainer +
                '[data-gallery-type="default"] .mmg-bullets-outer {background: #FFF;}' +
                this.galleryContainer +
                " .mmg-bullets {list-style: none;margin: 0px;padding: 0px;text-align: center;}" +
                this.galleryContainer +
                " .mmg-bullets li {display: inline-block;}" +
                this.galleryContainer +
                " .mmg-bullet {width: 10px;height: 10px;display: block;border: solid 1px #555;background: transparent;border-radius: 50%;margin: 10px 4px;padding: 0px;cursor: pointer;-ms-transition: background .5s ease 0s;-moz-transition: background .5s ease 0s;-webkit-transition: background .5s ease 0s;transition: background .5s ease 0s;}" +
                this.galleryContainer +
                " .mmg-bullet.active {background: #555;}" +
                this.galleryContainer +
                " .mmg-thumbnails-outer {display: -ms-flexbox;display: -webkit-flex;display: flex;}" +
                this.galleryContainer +
                " .mmg-thumbnail-viewer {display: -ms-flexbox;display: -webkit-flex;display: flex;-webkit-flex: 1 1 auto;-ms-flex: 1 1 auto;flex: 1 1 auto;overflow: hidden;box-sizing: border-box;padding: 0px 2.5px;}" +
                this.galleryContainer +
                " .mmg-thumbnails {width: 100%;list-style: none;margin: 0px;padding: 0px;position: relative;display: -ms-flexbox;display: -webkit-flex;display: flex;-webkit-flex-direction: row;-ms-flex-direction: row;flex-direction: row;}" +
                this.galleryContainer +
                " .mmg-thumbnails > li {display: block;position: relative;-webkit-flex: none;-ms-flex: none;flex: none;box-sizing: border-box;}" +
                this.galleryContainer +
                ' .mmg-thumbnails > li:before {content: "";display: block;padding-top: ' +
                (config.imageHeight / config.imageWidth) * 100 +
                "%;}" +
                this.galleryContainer +
                ' .mmg-thumbnails > li[aria-hidden="true"] {visibility: hidden;}' +
                this.galleryContainer +
                " .mmg-thumbnail {width: 100%;height: 100%;display: block;position: absolute;top: 0px;left: 0px;background: none;border: none;border-radius: 0px;box-sizing: border-box;padding: 0px 2.5px;margin: 0px;cursor: pointer;opacity: .50;-ms-transition: opacity .3s ease 0s;-moz-transition: opacity .3s ease 0s;-webkit-transition: opacity .3s ease 0s;transition: opacity .3s ease 0s;}" +
                this.galleryContainer +
                " .mmg-thumbnail.active," +
                this.galleryContainer +
                " .mmg-thumbnail:hover," +
                this.galleryContainer +
                " .mmg-thumbnail:focus {opacity: 1;}" +
                this.galleryContainer +
                " .mmg-thumbnail img {width: 100%;height: 100%;display: block;}" +
                this.galleryContainer +
                " .mmg-thumbnail-control {width: 25px;display: block;background: none;border: none;border-radius: 0px;margin: 0px;padding: 0px;cursor: pointer;}" +
                this.galleryContainer +
                ' .mmg-thumbnail-control[aria-hidden="true"] {display: none;}' +
                this.galleryContainer +
                ' .mmg-thumbnail-control.back {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAqCAYAAABGB/BgAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTEvMTAvMTfOH2EYAAABW0lEQVRYhbXWPU7DQBCG4XFEQUfB3fgXFRUFQiLkR0lJkTJACg6AREHBGbgGJ+AIIBG/FE7QWKy9u57xVLa848fzrWVZxLmAOfCkzt2Ba+ALWAMrdwSYUq8SWLohwIxwlcBy4ABMROSu4XIhIp9moGGCbV2a4koAhpt1nYFxBLhRa/sFOiEJwG2gxxUYNfS5AeOWXhdgEuk3A9OEh+wXaEWAkQfQiCRMMEsFgkgCMM8B/iEJEWUDNQS46gP4Q4Bhy81/2HxNLchARPZa1qxF5MOCbKUCWLRMUwJHhvtXB2VZFsBjBDo0IQp6iEDHJiRjohMToqCV10RBREEu0TUiCopFd2pCFBSL7syEeEyUhCgotkdBKBlR0H0ulIVkQLU9ykYUtEyFOiEZE52bkAzowIQoqC26b+DCpqRBL2ZEQaHo3oB9F0RBC6r/AoBXYMe8Jw3QM/AO7IpUb9cvzr6pOE2Ehs0AAAAASUVORK5CYII=") center center/13px auto no-repeat rgba(0, 0, 0, .75);}' +
                this.galleryContainer +
                ' .mmg-thumbnail-control.next {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAqCAYAAABGB/BgAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTEvMTAvMTfOH2EYAAABTklEQVRYhbXRvU7EMAzA8ejEwMTA0/EtFhYGhETp3ekY0Y3QuwExszAw8Ay8BzuvgEDHn8VFLU0bJ049NY2dn2w71wjgEVi4jAG0Dg/AD/AJXGZHgDXdmGdDgMoD1GEeHeAmzrmPgZxbYGaFau18oBss0P/FF2NALUR+XAWgqRkZA/IicnGdC+pF5LLMAQ0ikjC1QkFEkmYWSIVI4jwVUiMWKApRQqUZkaJFTEdJiBTeaKFkRAmVZkQJXZgRgQpgMwAVEzvj3p1zm4H7HdPrwEFgXEvr4vcDwErykoHDAFA1cpOAI00HyYiig7WnJitQ9dSpgeOYEUUjwEnsiKIQSwcqRAF4d6BGFMC9BuhFFDtQA15EAdzFAB0EOM3ZQQcB9sYA/hDgDPjKOSIf8jwW0ER2gdecI+og8rEFvMjj38AyB9BC5LANvAFPuYAa+QVAxHab+Ul5sgAAAABJRU5ErkJggg==") center center/13px auto no-repeat rgba(0, 0, 0, .75);}' +
                this.galleryContainer +
                " .mmg-control {display: block;border: none;margin: 0px;padding: 0px;cursor: pointer;background: none;border-radius: 0px;}" +
                this.galleryContainer +
                " .mmg-control.back," +
                this.galleryContainer +
                " .mmg-control.next {width: 45px;height: 80px;position: absolute;top: calc(50% - 40px);z-index: 7;}" +
                this.galleryContainer +
                ' .mmg-control.back {left: 0px;background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAqCAYAAABGB/BgAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTEvMTAvMTfOH2EYAAABW0lEQVRYhbXWPU7DQBCG4XFEQUfB3fgXFRUFQiLkR0lJkTJACg6AREHBGbgGJ+AIIBG/FE7QWKy9u57xVLa848fzrWVZxLmAOfCkzt2Ba+ALWAMrdwSYUq8SWLohwIxwlcBy4ABMROSu4XIhIp9moGGCbV2a4koAhpt1nYFxBLhRa/sFOiEJwG2gxxUYNfS5AeOWXhdgEuk3A9OEh+wXaEWAkQfQiCRMMEsFgkgCMM8B/iEJEWUDNQS46gP4Q4Bhy81/2HxNLchARPZa1qxF5MOCbKUCWLRMUwJHhvtXB2VZFsBjBDo0IQp6iEDHJiRjohMToqCV10RBREEu0TUiCopFd2pCFBSL7syEeEyUhCgotkdBKBlR0H0ulIVkQLU9ykYUtEyFOiEZE52bkAzowIQoqC26b+DCpqRBL2ZEQaHo3oB9F0RBC6r/AoBXYMe8Jw3QM/AO7IpUb9cvzr6pOE2Ehs0AAAAASUVORK5CYII=") center center no-repeat rgba(0, 0, 0, .75);}' +
                this.galleryContainer +
                ' .mmg-control.next {right: 0px;background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAqCAYAAABGB/BgAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTEvMTAvMTfOH2EYAAABTklEQVRYhbXRvU7EMAzA8ejEwMTA0/EtFhYGhETp3ekY0Y3QuwExszAw8Ay8BzuvgEDHn8VFLU0bJ049NY2dn2w71wjgEVi4jAG0Dg/AD/AJXGZHgDXdmGdDgMoD1GEeHeAmzrmPgZxbYGaFau18oBss0P/FF2NALUR+XAWgqRkZA/IicnGdC+pF5LLMAQ0ikjC1QkFEkmYWSIVI4jwVUiMWKApRQqUZkaJFTEdJiBTeaKFkRAmVZkQJXZgRgQpgMwAVEzvj3p1zm4H7HdPrwEFgXEvr4vcDwErykoHDAFA1cpOAI00HyYiig7WnJitQ9dSpgeOYEUUjwEnsiKIQSwcqRAF4d6BGFMC9BuhFFDtQA15EAdzFAB0EOM3ZQQcB9sYA/hDgDPjKOSIf8jwW0ER2gdecI+og8rEFvMjj38AyB9BC5LANvAFPuYAa+QVAxHab+Ul5sgAAAABJRU5ErkJggg==") center center no-repeat rgba(0, 0, 0, .75);}' +
                this.galleryContainer +
                " .mmg-control.play-pause {width: 24px;height: 25px;position: absolute;top: 10px;left: 10px;z-index: 6;}" +
                this.galleryContainer +
                " .mmg-control.play-pause span {width: 24px;height: 25px;display: block;color: #FFF;background: rgba(0, 0, 0, .80);border-radius: 2px;-moz-transform-style: preserve-3d;-webkit-transform-style: preserve-3d;transform-style: preserve-3d;-ms-transition: transform .3s ease 0s;-moz-transition: transform .3s ease 0s;-webkit-transition: transform .3s ease 0s;transition: transform .3s ease 0s;}" +
                this.galleryContainer +
                " .mmg-control.play-pause.paused span {-moz-transform: rotateY(180deg);-webkit-transform: rotateY(180deg);-ms-transform: rotateY(180deg);transform: rotateY(180deg);}" +
                this.galleryContainer +
                " .mmg-control.play-pause span:before," +
                this.galleryContainer +
                ' .mmg-control.play-pause span:after {content: "";display: block;position: absolute;top: 7px;left: 7.5px;-moz-backface-visibility: hidden;-webkit-backface-visibility: hidden;backface-visibility: hidden;}' +
                this.galleryContainer +
                ' .mmg-control.play-pause span:before {content: "\\e900";font-family: "mmg" !important;speak: none;font-style: normal;font-weight: normal;font-variant: normal;text-transform: none;line-height: 1;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}' +
                this.galleryContainer +
                ' .mmg-control.play-pause span:after {content: "\\e901";font-family: "mmg" !important;speak: none;font-style: normal;font-weight: normal;font-variant: normal;text-transform: none;line-height: 1;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;-moz-transform: rotateY(180deg);-webkit-transform: rotateY(180deg);-ms-transform: rotateY(180deg);transform: rotateY(180deg);}' +
                this.galleryContainer +
                " .mmg-video-window {width: 100%;height: 100%;position: fixed;top: 0px;left: 0px;box-sizing: border-box;background: rgba(0, 0, 0, .75);animation: mmgAnimateVideoWindowIn .3s;z-index: 9999999999;}" +
                this.galleryContainer +
                " .mmg-video-window.close-video {animation: mmgAnimateVideoWindowOut 1s;animation-fill-mode: forwards;}" +
                this.galleryContainer +
                " .mmg-video-outer {width: calc(100% - 80px);height: calc(100% - 80px);margin: 40px 0px 0px 40px;padding: 20px 20px 40px;box-sizing: border-box;animation: mmgAnimateVideoIn 1s;background: #FFF;position: relative;}@media (max-width: 767px) {" +
                this.galleryContainer +
                " .mmg-video-outer {width: calc(100% - 30px);height: calc(100% - 30px);margin: 15px 0px 0px 15px;padding: 15px 15px 30px;box-sizing: border-box;animation: mmgAnimateVideoIn 1s;background: #FFF;position: relative;}}" +
                this.galleryContainer +
                " .mmg-video-window.close-video .mmg-video-outer {animation: mmgAnimateVideoOut 1s;animation-fill-mode: forwards;}" +
                this.galleryContainer +
                " .mmg-video-viewer {width: 100%;height: 100%;box-sizing: border-box;background: #000;position: relative;overflow: hidden;}" +
                this.galleryContainer +
                " .mmg-video-viewer iframe {width: 100%;height: 100%;box-sizing: border-box;position: relative;z-index: 2;background: #000;}" +
                this.galleryContainer +
                ' .mmg-video-close {position: absolute;right: 20px;bottom: 15px;color: #333;line-height: 1;font-size: 16px;font-family: "Trebuchet MS", "Lucida Sans", Tahoma, sans-serif;text-decoration: underline;}@media (max-width: 767px) {' +
                this.galleryContainer +
                " .mmg-video-close {bottom: 7px;}}" +
                this.galleryContainer +
                " .mmg-loader {position: absolute;top: calc(50% - 45px);left: calc(50% - 45px);margin: auto;animation: mmgLoaderAnimateTwo 1.15s infinite;width: 90px;height: 90px;}" +
                this.galleryContainer +
                " .mmg-loader-set {width: 90px;height: 90px;position: absolute;}" +
                this.galleryContainer +
                " .mmg-loader-set:before," +
                this.galleryContainer +
                ' .mmg-loader-set:after {content: "";display: block;width: 40px;height: 40px;border-radius: 50%;position: absolute;animation: mmgLoaderAnimateOne 1.15s infinite ease;}' +
                this.galleryContainer +
                " .mmg-loader-set.one:before {background-color: rgb(52,150,202);top: 0px;left: 0px;}" +
                this.galleryContainer +
                " .mmg-loader-set.one:after {background-color: rgb(185,47,144);top: 0px;left: 50px;}" +
                this.galleryContainer +
                " .mmg-loader-set.two:before {background-color: rgb(241,127,70);top: 50px;left: 0px;}" +
                this.galleryContainer +
                " .mmg-loader-set.two:after {background-color: rgb(66,184,145);top: 50px;left: 50px;}@keyframes mmgLoaderAnimateOne {0% {position: absolute;}50% {top: 25px;left: 25px;position: absolute;opacity: 0.5;}100% {position: absolute;}}@-webkit-keyframes mmgLoaderAnimateOne {0% {position: absolute;}50% {top: 25px;left: 25px;position: absolute;opacity: 0.5;}100% {position: absolute;}}@keyframes mmgLoaderAnimateTwo {0% {-moz-transform: rotate(0deg) scale(1);-webkit-transform: rotate(0deg) scale(1);-ms-transform: rotate(0deg) scale(1);transform: rotate(0deg) scale(1);}50% {-moz-transform: rotate(360deg) scale(1.3);-webkit-transform: rotate(360deg) scale(1.3);-ms-transform: rotate(360deg) scale(1.3);transform: rotate(360deg) scale(1.3);}100% {-moz-transform: rotate(720deg) scale(1);-webkit-transform: rotate(720deg) scale(1);-ms-transform: rotate(720deg) scale(1);transform: rotate(720deg) scale(1);}}@-webkit-keyframes mmgLoaderAnimateTwo {0% {-webkit-transform: rotate(0deg) scale(1);}50% {-webkit-transform: rotate(360deg) scale(1.3);}100% {-webkit-transform: rotate(720deg) scale(1);}}@keyframes mmgAnimateImageIn {0% {opacity: 0;}100% {opacity: 1;}}@-webkit-keyframes mmgAnimateImageIn {0% {opacity: 0;}100% {opacity: 1;}}@keyframes mmgAnimateDescriptionIn {0% {opacity: 0;-moz-transform: translate3d(0, 100%, 0);-webkit-transform: translate3d(0, 100%, 0);-ms-transform: translate3d(0, 100%, 0);transform: translate3d(0, 100%, 0);}100% {opacity: 1;-moz-transform: none;-webkit-transform: none;-ms-transform: none;transform: none;}}@-webkit-keyframes mmgAnimateDescriptionIn {0% {opacity: 0;-webkit-transform: translate3d(0, 100%, 0);}100% {opacity: 1;-webkit-transform: none;}}@keyframes mmgAnimateDescriptionOut {0% {opacity: 1;-moz-transform: none;-webkit-transform: none;-ms-transform: none;transform: none;}100% {opacity: 0;-moz-transform: translate3d(0, 100%, 0);-webkit-transform: translate3d(0, 100%, 0);-ms-transform: translate3d(0, 100%, 0);transform: translate3d(0, 100%, 0);}}@-webkit-keyframes mmgAnimateDescriptionOut {0% {opacity: 1;-webkit-transform: none;}100% {opacity: 0;-webkit-transform: translate3d(0, 100%, 0);}}@keyframes mmgAnimateVideoWindowIn {0% {background: rgba(0, 0, 0, 0);}100% {background: rgba(0, 0, 0, .75);}}@-webkit-keyframes mmgAnimateVideoWindowIn {0% {background: rgba(0, 0, 0, 0);}100% {background: rgba(0, 0, 0, .75);}}@keyframes mmgAnimateVideoWindowOut {0% {background: rgba(0, 0, 0, .75);}70% {background: rgba(0, 0, 0, .75);}to {background: rgba(0, 0, 0, 0);}}@-webkit-keyframes mmgAnimateVideoWindowOut {0% {background: rgba(0, 0, 0, .75);}70% {background: rgba(0, 0, 0, .75);}to {background: rgba(0, 0, 0, 0);}}@keyframes mmgAnimateVideoIn {from, 60%, 75%, 90%, to {-moz-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);-webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);-ms-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);}0% {opacity: 0;-moz-transform: translate3d(0, -3000px, 0);-webkit-transform: translate3d(0, -3000px, 0);-ms-transform: translate3d(0, -3000px, 0);transform: translate3d(0, -3000px, 0);}60% {opacity: 1;-moz-transform: translate3d(0, 25px, 0);-webkit-transform: translate3d(0, 25px, 0);-ms-transform: translate3d(0, 25px, 0);transform: translate3d(0, 25px, 0);}75% {-moz-transform: translate3d(0, -10px, 0);-webkit-transform: translate3d(0, -10px, 0);-ms-transform: translate3d(0, -10px, 0);transform: translate3d(0, -10px, 0);}90% {-moz-transform: translate3d(0, 5px, 0);-webkit-transform: translate3d(0, 5px, 0);-ms-transform: translate3d(0, 5px, 0);transform: translate3d(0, 5px, 0);}to {-moz-transform: none;-webkit-transform: none;-ms-transform: none;transform: none;}}@-webkit-keyframes mmgAnimateVideoIn {from, 60%, 75%, 90%, to {-webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);}0% {opacity: 0;-webkit-transform: translate3d(0, -3000px, 0);}60% {opacity: 1;-webkit-transform: translate3d(0, 25px, 0);}75% {-webkit-transform: translate3d(0, -10px, 0);}90% {-webkit-transform: translate3d(0, 5px, 0);}to {-webkit-transform: none;}}@keyframes mmgAnimateVideoOut {20% {-moz-transform: translate3d(0, -10px, 0);-webkit-transform: translate3d(0, -10px, 0);-ms-transform: translate3d(0, -10px, 0);transform: translate3d(0, -10px, 0);}40%, 45% {opacity: 1;-moz-transform: translate3d(0, 20px, 0);-webkit-transform: translate3d(0, 20px, 0);-ms-transform: translate3d(0, 20px, 0);transform: translate3d(0, 20px, 0);}to {opacity: 0;-moz-transform: translate3d(0, -2000px, 0);-webkit-transform: translate3d(0, -2000px, 0);-ms-transform: translate3d(0, -2000px, 0);transform: translate3d(0, -2000px, 0);}}";
              if (MMG.props.defaultGallery) {
                var t = MMG.records[0].imageWidth,
                  r = MMG.records[0].imageHeight;
                n +=
                  a.galleryContainer +
                  " .mmg-slides-outer {position: relative;padding-top: " +
                  (r / t) * 100 +
                  "%;}";
              } else
                n +=
                  a.galleryContainer +
                  " .mmg-slides-outer {position: relative;padding-top: " +
                  (config.imageHeight / config.imageWidth) * 100 +
                  "%;}";
              $.each(config.mobileDescriptionContainer, function(e, i) {
                var t =
                  a.galleryContainer +
                  '[data-gallery-type="default"] .mmg-description-outer {background: #FFF;}' +
                  a.galleryContainer +
                  " .mmg-slide .mmg-description {display: none !important;}";
                switch (i) {
                  case 960:
                    n += "@media (min-width: 1024px) {" + t + "}";
                    break;
                  case 768:
                    n +=
                      "@media (max-width: 1023px) and (min-width: 768px) {" +
                      t +
                      "}";
                    break;
                  case 640:
                    n +=
                      "@media (max-width: 767px) and (min-width: 640px) {" +
                      t +
                      "}";
                    break;
                  case 480:
                    n +=
                      "@media (max-width: 639px) and (min-width: 480px) {" +
                      t +
                      "}";
                    break;
                  case 320:
                    n += "@media (max-width: 479px) {" + t + "}";
                }
              }),
                config.thumbnails &&
                  $.each(config.thumbnailViewerNum, function(e, i) {
                    var t =
                      a.galleryContainer +
                      " .mmg-thumbnails li { width: " +
                      100 / i +
                      "%; }";
                    switch (e) {
                      case 0:
                        n += t;
                        break;
                      case 1:
                        n += "@media (max-width: 1023px) {" + t + "}";
                        break;
                      case 2:
                        n += "@media (max-width: 767px) {" + t + "}";
                        break;
                      case 3:
                        n += "@media (max-width: 639px) {" + t + "}";
                        break;
                      case 4:
                        n += "@media (max-width: 479px) {" + t + "}";
                    }
                  }),
                config.fullScreenRotator &&
                  $.each(config.fullScreenBreakpoints, function(e, i) {
                    var t =
                      a.galleryContainer +
                      " .mmg-viewer," +
                      a.galleryContainer +
                      " .mmg-slides-outer {height: 100%;padding: 0px;}" +
                      a.galleryContainer +
                      " .mmg-image {overflow: hidden;display: -ms-flexbox;display: -webkit-flex;display: flex;-webkit-align-items: center;-ms-flex-align: center;align-items: center;-webkit-justify-content: center;-ms-flex-pack: center;justify-content: center;}" +
                      a.galleryContainer +
                      " .mmg-image img {width: 100vw;height: 100vh;min-width: calc(100vh / " +
                      config.imageHeight / config.imageWidth +
                      ");min-height: calc(100vw * " +
                      config.imageHeight / config.imageWidth +
                      ");}";
                    switch (i) {
                      case 960:
                        n += "@media (min-width: 1024px) {" + t + "}";
                        break;
                      case 768:
                        n +=
                          "@media (max-width: 1023px) and (min-width: 768px) {" +
                          t +
                          "}";
                        break;
                      case 640:
                        n +=
                          "@media (max-width: 767px) and (min-width: 640px) {" +
                          t +
                          "}";
                        break;
                      case 480:
                        n +=
                          "@media (max-width: 639px) and (min-width: 480px) {" +
                          t +
                          "}";
                        break;
                      case 320:
                        n += "@media (max-width: 479px) {" + t + "}";
                    }
                  }),
                MMG.props.defaultGallery ||
                  (n +=
                    '[data-pmi="' +
                    MMG.props.pageModuleInstanceId +
                    '"] .ui-widget-header,[data-pmi="' +
                    MMG.props.pageModuleInstanceId +
                    '"] .ui-widget-footer {display: none;}');
              var o = document.createTextNode(n);
              e.styleSheet ? (e.styleSheet.cssText = n) : e.appendChild(o);
            }
          },
          GetBreakPoint: function() {
            return window
              .getComputedStyle(
                document.getElementById(
                  "pmi-" + MMG.props.pageModuleInstanceId
                ),
                ":before"
              )
              .getPropertyValue("content")
              .replace(/"|'/g, "");
          },
          AllyClick: function(e) {
            return (
              "click" == e.type ||
              ("keydown" == e.type &&
                (e.keyCode == this.keyCodes.space ||
                  e.keyCode == this.keyCodes.enter))
            );
          },
          WindowLoad: function() {
            this.SetFullScreenHeight();
          },
          WindowResize: function() {
            if ((this.SetFullScreenHeight(), config.thumbnails)) {
              var e = this.GetThumbnailRange();
              (this.thumbnailWidth = $(
                ".mmg-thumbnails > li:first-child",
                this.galleryContainer
              ).outerWidth(!0)),
                $(".mmg-thumbnails > li", this.galleryContainer).attr(
                  "aria-hidden",
                  "false"
                ),
                $(
                  ".mmg-thumbnails > li:nth-child(n+" + (e + 1) + ")",
                  this.galleryContainer
                ).attr("aria-hidden", "true"),
                this.recordNum > e
                  ? $(".mmg-thumbnail-control", this.galleryContainer).attr(
                      "aria-hidden",
                      "false"
                    )
                  : $(".mmg-thumbnail-control", this.galleryContainer).attr(
                      "aria-hidden",
                      "true"
                    );
            }
            var i = parseInt(this.GetBreakPoint());
            if (-1 < config.mobileDescriptionContainer.indexOf(i)) {
              $(".mmg-description-outer", this.galleryContainer).length ||
                $(
                  '<div class="mmg-description-outer"><div class="mmg-description"></div></div>'
                ).insertAfter($(".mmg-viewer", this.galleryContainer));
              var t = parseInt(
                $(this.galleryContainer).attr("data-active-record-index")
              );
              $(
                ".mmg-description-outer .mmg-description",
                this.galleryContainer
              ).html(
                ("True" != MMG.records[t].hideTitle
                  ? '<h2 class="mmg-description-title">' +
                    (-1 < config.linkedElement.indexOf("title") &&
                    "True" == MMG.records[t].isLinked
                      ? '<a href="' +
                        MMG.records[t].linkUrl +
                        '" target="' +
                        ("True" == MMG.records[t].openLinkInNewWindow
                          ? "_blank"
                          : "_self") +
                        '">'
                      : "") +
                    MMG.records[t].title +
                    (-1 < config.linkedElement.indexOf("title") &&
                    "True" == MMG.records[t].isLinked
                      ? "</a>"
                      : "") +
                    "</h2>"
                  : "") +
                  ("True" != MMG.records[t].hideCaption &&
                  "" != $.trim(MMG.records[t].caption)
                    ? '<p class="mmg-description-caption">' +
                      MMG.records[t].caption +
                      "</p>"
                    : "") +
                  ("True" == MMG.records[t].isLinked ||
                  "True" == MMG.records[t].videoIsEmbedded
                    ? '<div class="mmg-description-links">'
                    : "") +
                  ("True" == MMG.records[t].isLinked
                    ? '<a class="mmg-description-link read-more" href="' +
                      MMG.records[t].linkUrl +
                      '" target="' +
                      ("True" == MMG.records[t].openLinkInNewWindow
                        ? "_blank"
                        : "_self") +
                      '" tabindex="0">' +
                      MMG.records[t].linkText +
                      "</a>"
                    : "") +
                  ("True" == MMG.records[t].videoIsEmbedded
                    ? '<a class="mmg-description-link watch-video" href="#" role="button" tabindex="0">' +
                      MMG.records[t].videoLinkText +
                      "</a>"
                    : "") +
                  ("True" == MMG.records[t].isLinked ||
                  "True" == MMG.records[t].videoIsEmbedded
                    ? "</div>"
                    : "")
              );
            } else
              $(".mmg-description-outer", this.galleryContainer).length &&
                $(".mmg-description-outer", this.galleryContainer).remove();
            config.onWindowResize.call(this, {
              element: element,
              mmgRecords: MMG.records
            });
          }
        };
        0 < MultimediaGallery.recordNum && MultimediaGallery.Init();
      })
    );
  };
})(jQuery),
  (function(i, t, a) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function(e) {
          return a(e, i, t), e.mobile;
        })
      : a(i.jQuery, i, t);
  })(this, document, function(e, i, a, t) {
    var n, r;
    (function(c, e, i, A) {
      function u(e) {
        for (; e && void 0 !== e.originalEvent; ) e = e.originalEvent;
        return e;
      }
      function r(e) {
        for (var i, t, a = {}; e; ) {
          for (t in (i = c.data(e, x)))
            i[t] && (a[t] = a.hasVirtualBinding = !0);
          e = e.parentNode;
        }
        return a;
      }
      function n() {
        L = !0;
      }
      function o() {
        L = !1;
      }
      function s() {
        l(),
          (G = setTimeout(function() {
            (F = G = 0), (R.length = 0), (S = !1), n();
          }, c.vmouse.resetTimerDuration));
      }
      function l() {
        G && (clearTimeout(G), (G = 0));
      }
      function d(e, i, t) {
        var a;
        return (
          ((t && t[e]) ||
            (!t &&
              (function(e, i) {
                for (var t; e; ) {
                  if ((t = c.data(e, x)) && (!i || t[i])) return e;
                  e = e.parentNode;
                }
                return null;
              })(i.target, e))) &&
            ((a = (function(e, i) {
              var t,
                a,
                n,
                r,
                o,
                s,
                l,
                d,
                m,
                g = e.type;
              if (
                (((e = c.Event(e)).type = i),
                (t = e.originalEvent),
                (a = c.event.props),
                -1 < g.search(/^(mouse|click)/) && (a = I),
                t)
              )
                for (l = a.length; l; ) e[(r = a[--l])] = t[r];
              if (
                (-1 < g.search(/mouse(down|up)|click/) &&
                  !e.which &&
                  (e.which = 1),
                -1 !== g.search(/^touch/) &&
                  ((g = (n = u(t)).touches),
                  (o = n.changedTouches),
                  (s = g && g.length ? g[0] : o && o.length ? o[0] : A)))
              )
                for (d = 0, m = M.length; d < m; d++) e[(r = M[d])] = s[r];
              return e;
            })(i, e)),
            c(i.target).trigger(a)),
          a
        );
      }
      function m(e) {
        var i,
          t = c.data(e.target, k);
        !S &&
          (!F || F !== t) &&
          ((i = d("v" + e.type, e)) &&
            (i.isDefaultPrevented() && e.preventDefault(),
            i.isPropagationStopped() && e.stopPropagation(),
            i.isImmediatePropagationStopped() && e.stopImmediatePropagation()));
      }
      function g(e) {
        var i,
          t,
          a,
          n = u(e).touches;
        n &&
          1 === n.length &&
          ((t = r((i = e.target))).hasVirtualBinding &&
            ((F = U++),
            c.data(i, k, F),
            l(),
            o(),
            (B = !1),
            (a = u(e).touches[0]),
            ($ = a.pageX),
            (E = a.pageY),
            d("vmouseover", e, t),
            d("vmousedown", e, t)));
      }
      function p(e) {
        L || (B || d("vmousecancel", e, r(e.target)), (B = !0), s());
      }
      function h(e) {
        if (!L) {
          var i = u(e).touches[0],
            t = B,
            a = c.vmouse.moveDistanceThreshold,
            n = r(e.target);
          (B = B || Math.abs(i.pageX - $) > a || Math.abs(i.pageY - E) > a) &&
            !t &&
            d("vmousecancel", e, n),
            d("vmousemove", e, n),
            s();
        }
      }
      function f(e) {
        if (!L) {
          n();
          var i,
            t,
            a = r(e.target);
          d("vmouseup", e, a),
            B ||
              ((i = d("vclick", e, a)) &&
                i.isDefaultPrevented() &&
                ((t = u(e).changedTouches[0]),
                R.push({ touchID: F, x: t.clientX, y: t.clientY }),
                (S = !0))),
            d("vmouseout", e, a),
            (B = !1),
            s();
        }
      }
      function b(e) {
        var i,
          t = c.data(e, x);
        if (t) for (i in t) if (t[i]) return !0;
        return !1;
      }
      function v() {}
      function t(t) {
        var a = t.substr(1);
        return {
          setup: function() {
            b(this) || c.data(this, x, {}),
              (c.data(this, x)[t] = !0),
              (T[t] = (T[t] || 0) + 1),
              1 === T[t] && N.bind(a, m),
              c(this).bind(a, v),
              Q &&
                ((T.touchstart = (T.touchstart || 0) + 1),
                1 === T.touchstart &&
                  N.bind("touchstart", g)
                    .bind("touchend", f)
                    .bind("touchmove", h)
                    .bind("scroll", p));
          },
          teardown: function() {
            --T[t],
              T[t] || N.unbind(a, m),
              Q &&
                (--T.touchstart,
                T.touchstart ||
                  N.unbind("touchstart", g)
                    .unbind("touchmove", h)
                    .unbind("touchend", f)
                    .unbind("scroll", p));
            var e = c(this),
              i = c.data(this, x);
            i && (i[t] = !1), e.unbind(a, v), b(this) || e.removeData(x);
          }
        };
      }
      var y,
        a,
        x = "virtualMouseBindings",
        k = "virtualTouchID",
        w = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(
          " "
        ),
        M = "clientX clientY pageX pageY screenX screenY".split(" "),
        C = c.event.mouseHooks ? c.event.mouseHooks.props : [],
        I = c.event.props.concat(C),
        T = {},
        G = 0,
        $ = 0,
        E = 0,
        B = !1,
        R = [],
        S = !1,
        L = !1,
        Q = "addEventListener" in i,
        N = c(i),
        U = 1,
        F = 0;
      for (
        c.vmouse = {
          moveDistanceThreshold: 10,
          clickDistanceThreshold: 10,
          resetTimerDuration: 1500
        },
          a = 0;
        a < w.length;
        a++
      )
        c.event.special[w[a]] = t(w[a]);
      Q &&
        i.addEventListener(
          "click",
          function(e) {
            var i,
              t,
              a,
              n,
              r,
              o = R.length,
              s = e.target;
            if (o)
              for (
                i = e.clientX,
                  t = e.clientY,
                  y = c.vmouse.clickDistanceThreshold,
                  a = s;
                a;

              ) {
                for (n = 0; n < o; n++)
                  if (
                    ((r = R[n]),
                    0,
                    (a === s &&
                      Math.abs(r.x - i) < y &&
                      Math.abs(r.y - t) < y) ||
                      c.data(a, k) === r.touchID)
                  )
                    return e.preventDefault(), void e.stopPropagation();
                a = a.parentNode;
              }
          },
          !0
        );
    })(e, 0, a),
      (e.mobile = {}),
      (r = { touch: "ontouchend" in a }),
      ((n = e).mobile.support = n.mobile.support || {}),
      n.extend(n.support, r),
      n.extend(n.mobile.support, r),
      (function(d, r, o) {
        function m(e, i, t, a) {
          var n = t.type;
          (t.type = i),
            a ? d.event.trigger(t, o, e) : d.event.dispatch.call(e, t),
            (t.type = n);
        }
        var g = d(a),
          e = d.mobile.support.touch,
          s = "touchmove scroll",
          t = e ? "touchstart" : "mousedown",
          l = e ? "touchend" : "mouseup",
          c = e ? "touchmove" : "mousemove";
        d.each(
          "touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(
            " "
          ),
          function(e, i) {
            (d.fn[i] = function(e) {
              return e ? this.bind(i, e) : this.trigger(i);
            }),
              d.attrFn && (d.attrFn[i] = !0);
          }
        ),
          (d.event.special.scrollstart = {
            enabled: !0,
            setup: function() {
              function i(e, i) {
                m(n, (t = i) ? "scrollstart" : "scrollstop", e);
              }
              var t,
                a,
                n = this;
              d(n).bind(s, function(e) {
                d.event.special.scrollstart.enabled &&
                  (t || i(e, !0),
                  clearTimeout(a),
                  (a = setTimeout(function() {
                    i(e, !1);
                  }, 50)));
              });
            },
            teardown: function() {
              d(this).unbind(s);
            }
          }),
          (d.event.special.tap = {
            tapholdThreshold: 750,
            emitTapOnTaphold: !0,
            setup: function() {
              var o = this,
                s = d(o),
                l = !1;
              s.bind("vmousedown", function(e) {
                function i() {
                  clearTimeout(n);
                }
                function t() {
                  i(),
                    s.unbind("vclick", a).unbind("vmouseup", i),
                    g.unbind("vmousecancel", t);
                }
                function a(e) {
                  t(),
                    l || r !== e.target
                      ? l && e.preventDefault()
                      : m(o, "tap", e);
                }
                if (((l = !1), e.which && 1 !== e.which)) return !1;
                var n,
                  r = e.target;
                s.bind("vmouseup", i).bind("vclick", a),
                  g.bind("vmousecancel", t),
                  (n = setTimeout(function() {
                    d.event.special.tap.emitTapOnTaphold || (l = !0),
                      m(o, "taphold", d.Event("taphold", { target: r }));
                  }, d.event.special.tap.tapholdThreshold));
              });
            },
            teardown: function() {
              d(this)
                .unbind("vmousedown")
                .unbind("vclick")
                .unbind("vmouseup"),
                g.unbind("vmousecancel");
            }
          }),
          (d.event.special.swipe = {
            scrollSupressionThreshold: 30,
            durationThreshold: 1e3,
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 30,
            getLocation: function(e) {
              var i = r.pageXOffset,
                t = r.pageYOffset,
                a = e.clientX,
                n = e.clientY;
              return (
                (0 === e.pageY && Math.floor(n) > Math.floor(e.pageY)) ||
                (0 === e.pageX && Math.floor(a) > Math.floor(e.pageX))
                  ? ((a -= i), (n -= t))
                  : (n < e.pageY - t || a < e.pageX - i) &&
                    ((a = e.pageX - i), (n = e.pageY - t)),
                { x: a, y: n }
              );
            },
            start: function(e) {
              var i = e.originalEvent.touches ? e.originalEvent.touches[0] : e,
                t = d.event.special.swipe.getLocation(i);
              return {
                time: new Date().getTime(),
                coords: [t.x, t.y],
                origin: d(e.target)
              };
            },
            stop: function(e) {
              var i = e.originalEvent.touches ? e.originalEvent.touches[0] : e,
                t = d.event.special.swipe.getLocation(i);
              return { time: new Date().getTime(), coords: [t.x, t.y] };
            },
            handleSwipe: function(e, i, t, a) {
              if (
                i.time - e.time < d.event.special.swipe.durationThreshold &&
                Math.abs(e.coords[0] - i.coords[0]) >
                  d.event.special.swipe.horizontalDistanceThreshold &&
                Math.abs(e.coords[1] - i.coords[1]) <
                  d.event.special.swipe.verticalDistanceThreshold
              ) {
                var n = e.coords[0] > i.coords[0] ? "swipeleft" : "swiperight";
                return (
                  m(
                    t,
                    "swipe",
                    d.Event("swipe", {
                      target: a,
                      swipestart: e,
                      swipestop: i
                    }),
                    !0
                  ),
                  m(
                    t,
                    n,
                    d.Event(n, { target: a, swipestart: e, swipestop: i }),
                    !0
                  ),
                  !0
                );
              }
              return !1;
            },
            eventInProgress: !1,
            setup: function() {
              var e,
                r = this,
                i = d(r),
                o = {};
              (e = d.data(this, "mobile-events")) ||
                ((e = { length: 0 }), d.data(this, "mobile-events", e)),
                e.length++,
                ((e.swipe = o).start = function(e) {
                  if (!d.event.special.swipe.eventInProgress) {
                    d.event.special.swipe.eventInProgress = !0;
                    var i,
                      t = d.event.special.swipe.start(e),
                      a = e.target,
                      n = !1;
                    (o.move = function(e) {
                      t &&
                        !e.isDefaultPrevented() &&
                        ((i = d.event.special.swipe.stop(e)),
                        n ||
                          ((n = d.event.special.swipe.handleSwipe(
                            t,
                            i,
                            r,
                            a
                          )) &&
                            (d.event.special.swipe.eventInProgress = !1)),
                        Math.abs(t.coords[0] - i.coords[0]) >
                          d.event.special.swipe.scrollSupressionThreshold &&
                          e.preventDefault());
                    }),
                      (o.stop = function() {
                        (n = !0),
                          (d.event.special.swipe.eventInProgress = !1),
                          g.off(c, o.move),
                          (o.move = null);
                      }),
                      g.on(c, o.move).one(l, o.stop);
                  }
                }),
                i.on(t, o.start);
            },
            teardown: function() {
              var e, i;
              (e = d.data(this, "mobile-events")) &&
                ((i = e.swipe),
                delete e.swipe,
                e.length--,
                0 === e.length && d.removeData(this, "mobile-events")),
                i &&
                  (i.start && d(this).off(t, i.start),
                  i.move && g.off(c, i.move),
                  i.stop && g.off(l, i.stop));
            }
          }),
          d.each(
            {
              scrollstop: "scrollstart",
              taphold: "tap",
              swipeleft: "swipe.left",
              swiperight: "swipe.right"
            },
            function(e, i) {
              d.event.special[e] = {
                setup: function() {
                  d(this).bind(i, d.noop);
                },
                teardown: function() {
                  d(this).unbind(i);
                }
              };
            }
          );
      })(e, this);
  });

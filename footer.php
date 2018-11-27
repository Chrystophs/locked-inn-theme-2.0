<?php /**
* The template for displaying the footer
*
* @package WordPress
**/
  ?>
  <footer>
      <div class="gb-footer-info gc-thirds gc-jc gc-aic">
          <a href="<?php echo get_option('home'); ?>" alt="<?php the_title(); ?>" class="footer-logo">
              <img src="<?php bloginfo('template_url'); ?>/img/logo2.png"/>
          </a>
          <div class="gb-intouch gc-jc">
              <h2>GET IN TOUCH</h2>
              <a href="mailto:info@lockedinncayman.com">info@lockedinncayman.com</a>
          </div>
          <div id="gb-social-wrapper">
            <h2>FOLLOW US</h2>
            <a href="https://www.facebook.com/LockedInnCayman?ref=hl" target="_blank">
              <svg id="facebook" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.3 412"><path d="M223.22,71.23c16.07-15.3,38.92-20.47,60.48-21.11,22.8-.21,45.59-0.08,68.39-0.07q0.13,36.08,0,72.16c-14.73,0-29.48,0-44.21,0-9.34-.58-18.94,6.5-20.64,15.76-0.22,16.09-.08,32.2-0.07,48.29,21.61,0.09,43.22,0,64.83.05-1.58,23.28-4.47,46.46-7.86,69.54-19.09.18-38.19,0-57.27,0.1-0.17,68.67.09,137.33-.13,206-28.35.12-56.72-.05-85.07,0.08-0.54-68.67,0-137.38-.29-206.07-13.83-.14-27.67.1-41.5-0.12,0.05-23.09,0-46.17,0-69.25,13.82-.17,27.65,0,41.48-0.1,0.42-22.44-.42-44.91.44-67.33C203.18,101.38,209.94,83.49,223.22,71.23Z" transform="translate(-159.85 -50)" class="facebook-path"></path></svg>
            </a>
            <a href="https://instagram.com/lockedinncayman/" target="_blank">
              <svg id="instagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 535.29 536.17"><path d="M767.65,665.07h0V451.84H644.48a154,154,0,0,1,14.82,66c0,85.7-70,155.41-155.94,155.41S347.42,603.57,347.42,517.87a154.06,154.06,0,0,1,14.82-66H232.36V665.07c0,56.8,46.37,103,103.36,103H664.28C721.28,768.08,767.65,721.87,767.65,665.07Z" transform="translate(-232.36 -231.91)" class="instagram-path1"></path><path d="M568.1,517.87a64.73,64.73,0,1,0-64.73,64.52A64.7,64.7,0,0,0,568.1,517.87Z" transform="translate(-232.36 -231.91)" class="instagram-path2"></path><path d="M664.28,231.91H335.72c-57,0-103.36,46.21-103.36,103v56.32H413.12a155.84,155.84,0,0,1,180.48,0h174V334.93C767.65,278.12,721.28,231.91,664.28,231.91ZM720,343a18.26,18.26,0,0,1-18.24,18.18H645.4A18.26,18.26,0,0,1,627.16,343V286.84a18.26,18.26,0,0,1,18.24-18.18h56.36A18.26,18.26,0,0,1,720,286.84V343Z" transform="translate(-232.36 -231.91)" class="instagram-path3"></path></svg>
            </a>
            <a href="https://twitter.com/LockedInnCayman" target="_blank">
              <svg id="twitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471.9 384"><path d="M492,109.5a195.74,195.74,0,0,1-55.6,15.3A97.16,97.16,0,0,0,479,71.2a192.38,192.38,0,0,1-61.5,23.5A96.79,96.79,0,0,0,250,160.9a94.79,94.79,0,0,0,2.5,22.1A274.37,274.37,0,0,1,52.9,81.7,97,97,0,0,0,83,211.1,94.56,94.56,0,0,1,39,199v1.2a96.9,96.9,0,0,0,77.7,95,97.46,97.46,0,0,1-25.5,3.4A91.34,91.34,0,0,1,73,296.8a97,97,0,0,0,90.5,67.3A194.11,194.11,0,0,1,43.2,405.6a196.25,196.25,0,0,1-23.1-1.4A270.62,270.62,0,0,0,168.3,448C346.6,448,444,300.3,444,172.2c0-4.2-.1-8.4-0.3-12.5A197.08,197.08,0,0,0,492,109.5Z" transform="translate(-20.1 -64)" class="twitter-path"></path></svg>
            </a>
          </div>
      </div>
    <hr/>
    <div class="gb-footer-lower gc-thirds gc-jc gc-aic">
      <div id="gb-copyright">
        <div class="gb-copyright">Copyright &#169; <?php echo date('Y'); ?> Locked Inn. All Right Reserved.</div>
        <div class="gb-author">Template Developed by Christopher Schultz.</div>
      </div>
      <button id="gb-to-top" class="cs-btn-reset cs-btn-top">
        <svg id="arrow-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54"><path class="top-circle" d="M55.5,28.5a27,27,0,1,0-27,27A27,27,0,0,0,55.5,28.5Zm-35.1,6c-0.1,0-.2.1-0.3,0.1a3.76,3.76,0,0,1-1.1,0,3,3,0,0,1-.7-0.5,1.3,1.3,0,0,1-.3-0.9,2.35,2.35,0,0,1,.7-1.4,2.65,2.65,0,0,1,.6-0.5c1.4-1.4,2.8-2.7,4.3-4.1,1.7-1.6,3.4-3.2,5-4.8l5.2,4.9c1.5,1.4,2.9,2.8,4.4,4.1,0.1,0.1.2,0.1,0.3,0.2a0.69,0.69,0,0,1,.3.4,2.74,2.74,0,0,0,.4.5,0.9,0.9,0,0,1,.1.5,1.49,1.49,0,0,1-.2.9,1,1,0,0,1-.7.5,1.78,1.78,0,0,1-1.1.1,2.33,2.33,0,0,1-1.2-.8l-0.3-.3c-2.4-2.2-4.8-4.4-7.1-6.7C28.5,26.9,20.4,34.5,20.4,34.5Z" transform="translate(-1.5 -1.5)"></path><path class="top-arrow" d="M18.1,33.45a1.58,1.58,0,0,0,1.61,1.29,2.92,2.92,0,0,0,.9-0.21c0.1,0,8-7.67,8-7.67l7.16,6.54a2.8,2.8,0,0,0,1.81,1.18h0.5a1.45,1.45,0,0,0,1.19-1.21v-0.6a1.69,1.69,0,0,0-.2-0.5c0-.1-3.53-3.37-10.49-9.81-3.47,3.33-6.54,6.26-9.32,8.88A2.81,2.81,0,0,0,18,33.15v0.3h0.1Z" transform="translate(-1.5 -1.5)"></path></svg>
      </button>
      <nav id="gb-bottom-nav">
        <?php wp_nav_menu( array(
        'theme_location' => 'Main Menu',
        'depth'=> 2,
        'container'=> false,
        'menu_class' => 'footer-nav navigation',
        'fallback_cb'    => '__return_false')
        ); ?>
      </nav>
    </div>
  </footer>

  <?php wp_footer(); ?>
 
</body>

</html>
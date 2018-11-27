<?php /*
*Template Name: Contact Us Page
*/
get_header(); ?>
<div class="body-bg">
    <div id="map-container">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.6756228651393!2d-81.3845286846665!3d19.296467486961763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f25865fa09cc429%3A0xaed4aeecb342877!2sLocked+Inn!5e0!3m2!1sen!2sus!4v1537058692354" width="100%" height="500" frameborder="0" style="border:0"></iframe>
    </div>
  <div id="walking-map" class="lightbox-wrapper">
    <div class="lightbox-inner gc gc-jcc gc-aic">
      <img src="<?php bloginfo('template_url'); ?>/img/walking-map.png"/>
    </div>
  </div>
  <section id="sp-contact">
    <div class="contact-thirds gc gc-thirds gc-jcc">
      <div class="contact-tile left">
        <h2 class="contact-title underline">LOCATION</h2>
        <div class="address-inner">
          <?php $p = do_shortcode("[contact type='phone']"); ?>
          <?php $e = do_shortcode("[contact type='email_address']"); ?>
          <?php $a = do_shortcode("[contact type='address']"); ?>
          <?php $c = do_shortcode("[contact type='city']"); ?>
          <?php $s = do_shortcode("[contact type='state']"); ?>
          <?php $s = do_shortcode("[contact type='state']"); ?>
          <?php $f = do_shortcode("[contact type='friday']"); ?>
          <?php $we = do_shortcode("[contact type='wednesday']"); ?>
          <?php $w = do_shortcode("[contact type='weekend']"); ?>
          <?php $m = do_shortcode("[contact type='mon-fri']"); ?>
          <?php $g = do_shortcode("[contact type='groups']"); ?>
          <div class="address">
            <span>Address</span>: 18 Fort Street, 2nd Floor
            <br/>Grand Cayman, Cayman Islands
          </div>
          <a href="tel:<?php echo $p; ?>" class="phone">
            <span>Phone</span>: <?php echo $p; ?>
          </a>
          <a href="mailto:<?php echo $e; ?>" class="email">
            <span>Email</span>: <?php echo $e; ?>
          </a>
        </div>
      </div>
      <div class="contact-tile middle gc gc-jcc gc-aic">
        <button class="cs-btn-reset btn-walk">WALKING<span>INSTRUCTIONS</span></button>
      </div>
      <div class="contact-tile right">
        <h2 class="contact-title underline">HOURS</h2>
        <div class="hours">
          <span>Mon - Fri:</span> <?php echo $m; ?>
        <br/>
        <span>Wed:</span> <?php echo $we; ?>
        <br/>
        <span>Fri:</span> <?php echo $f; ?>
        <br/>
        <span>Sat:</span> <?php echo $w; ?>
        <br/>
        <span>Large Groups / Special Events:</span> <?php echo $g; ?>
        </div>
      </div>
    </div>
    <div class="gc">
      <?php if(have_posts() ) : while(have_posts() ) : the_post(); ?>
      <div class="container">
        <h2 class="contact-title underline">CONTACT US</h2>
        <?php the_content(); ?>
      </div>
      <?php endwhile; else: ?>
        Sorry There May Be A Problem;
      <?php get_search_form(); ?>
      <?php endif; ?>
      <?php wp_reset_query();  ?>
    </div>
  </section>
</div><?php get_footer(); ?>
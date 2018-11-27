<?php /*
* Template Name: Home Page
*/
get_header(); ?>
<div id="hp-container">
  <div id="hp-overlay-wrapper" class="gc-fh">
    <div class="hp-overlay-inner">
      <button class="btn close-btn" aria-label="Close Overlay" tabindex="-1">X</button>
      <?php $i = 1;
        $args = array('post_type'=>'overlay', 'posts_per_page'=> -1, 'order'=>'ASC' );
        $loop = new WP_Query($args);
        $time = date(Ymd);
        $time = (int)$time; ?>
        <?php 
          if($loop -> have_posts()) : while ($loop -> have_posts()) : $loop->the_post();
          $startdate = get_field('start_date');
          $enddate = get_field('end_date');
            if(($time >= $startdate) && ($time <= $enddate)) { ?>
            <img src="<?php the_post_thumbnail_url('full'); ?>"/>
            <?php $i++; ?>
            <?php } ?>
          <?php endwhile; else : ?>
            Oops.... Looks like our content may still be locked in a room. Try Searching here for it.
            <?php get_search_form(); ?>
        <?php endif; ?>
        <?php wp_reset_query(); ?>
    </div>
  </div>
  <div id="hp-head-image" class="gc-fh">
    <div class="hp-img-overlay gc-half gc-ace">
      <div class="hp-button-wrapper gc-thirds gc-jcc gc-aic">
        <button id="hp-btn-learn" alt="About Us" class="gc gc-jcc gc-aic cs-btn-reset cs-btn-learn-more"><span>LEARN</span>MORE</button>
        <a href="https://bookeo.com/lockedincayman" alt="Book Now" target="_blank" class="gc gc-jcc gc-aic cs-btn book-now"> 
          <img src="<?php bloginfo('template_url'); ?>/img/book-now.png" alt="Book Now"/>
        </a>
      <button class="gc gc-jcc gc-aic cs-btn-reset cs-btn-watch-video"><span>WATCH</span>MORE</button>
      </div>
      <a class="cs-tripadvisor-btn gc gc-jce gc-aic" href="http://www.tripadvisor.com/Attraction_Review-g147366-d9603779-Reviews-Locked_Inn_Cayman-George_Town_Grand_Cayman_Cayman_Islands.html" target="_blank" class="btn advisor-btn">
        <img src="http://www.tripadvisor.com/img/cdsi/img2/branding/tripadvisor_sticker_logo_88x55-18961-2.png"/>
      </a>
    </div>
  </div>
  <div id="head-video-outer" class="lightbox-wrapper">
    <div id="head-video-inner" class="lightbox-inner">
      <video id="lockedinn-vid" controls>
        <source src="<?php bloginfo('template_url'); ?>/vids/login.mp4" type="video/mp4">
        Your browser does not support the video.
      </video>
    </div>
  </div>
  <section id="hp-about" data-parallax-container="true">
    <div class="parallax" aria-hidden="true" data-parallax="true" data-direction="slide-down" data-shown="false">
      <h2 class="hp-header underline">WELCOME TO LOCKED INN</h2>
      <p>
        Welcome to our charming little inn nestled in the Cayman Islands. We hope you enjoy your stay. 
        <br/>
        If you're looking for cozy and quiet, look elsewhere. This inn is different than any others you've visited...
      </p>
    </div>
  </section>
  <section id="hp-welcome" data-parallax-container="true">
    <img data-parallax="true" data-direction="slide-up" data-shown="false" aria-hidden="true" src="<?php bloginfo('template_url'); ?>/img/welcome.jpg" alt="What is an escape room? 6 poeple enter a themed room with 45 minutes to find clues and solve puzzles in n attempt to make their way out. Escape into a world of altered reality. Tons of fun as you test your skill. Do you have waht it takesto get out or will you stay Locked Inn?"/>
  </section>
  <section id="hp-rooms" data-parallax-container="true">
    <h2 class="hp-header underline" data-parallax="true" data-direction="slide-down" data-shown="false" aria-hidden="true">THE ROOMS</h2>
    <?php 
      $i = 1;
      $args = array('post_type'=>'rooms','posts_per_page'=> -1, 'orderby'=>'menu_order', 'order'=>'ASC' );
      $loop = new WP_Query($args); 
    ?>
    <?php if($loop -> have_posts()) : while ($loop -> have_posts()) : $loop->the_post(); ?>
      <?php if($i < 2){ ?>
      <div class="gc-half room rm1" data-parallax-container="true">
        <?php if(get_field('room_image')){  ?>
          <img src="<?php the_field("room_image"); ?>" alt="<?php the_title();?>" data-parallax="true" aria-hidden="true" data-direction="slide-right" data-shown="false"/>
        <?php } ?>
        <div class="room-content" data-parallax="true" aria-hidden="true" data-direction="slide-left" data-shown="false">
          <h3 class="room-name underline">
            <?php the_title(); ?>
          </h3>
          <?php the_excerpt(); ?>
          <a class="cs-btn-reset cs-btn-read-more" href="<?php echo get_permalink(); ?>">READ MORE</a>
        </div>
        <?php $i++; ?>
      </div>
      <?php } else { ?>
      <div class="gc-half room rm2" data-parallax-container="true">
        <div class="room-content" data-parallax="true" aria-hidden="true" data-direction="slide-right" data-shown="false">
          <h3 class="room-name underline">
            <?php the_title(); ?>
          </h3>
          <?php the_excerpt(); ?>
          <a class="cs-btn-reset cs-btn-read-more" href="<?php echo get_permalink(); ?>">READ MORE</a>
        </div>
        <?php if(get_field('room_image')){  ?>
          <img src="<?php the_field("room_image"); ?>" alt="<?php the_title();?>" data-parallax="true" aria-hidden="true" data-direction="slide-left" data-shown="false"/>
        <?php } ?>
      </div>
      <?php $i = 1; ?>
      <?php } ?>
      <?php endwhile; else : ?>
        Oops.... Looks like some content may still be locked in a room. Try Searching here for it.
      <?php get_search_form(); ?>
      <?php endif; ?>
      <?php wp_reset_query(); ?>
    </div>
  </section>
  <section id="hp-faqs">
    <h2 class="hp-header underline" data-parallax="true" data-direction="slide-down" data-shown="false" aria-hidden="true">FAQS</h2>
    <p data-parallax="true" data-direction="slide-down" data-shown="false" aria-hidden="true">Get answers to your most frequently asked queries</p>
    <div class="gc-half">
      <ul class="faq-questions left" data-parallax="true" data-direction="slide-right" data-shown="false" aria-hidden="true">
        <?php $i = 1;
          $args = array('post_type'=>'faq','posts_per_page'=> -1, 'orderby'=>'menu_order', 'order'=>'ASC' );
          $posts = wp_count_posts('faq')->publish;
          $loop = new WP_Query($args);
          $posts_per_col = ceil($posts / 2); 
        ?>
        <?php if($loop -> have_posts()) : while ($loop -> have_posts()) : $loop->the_post(); ?>
          <?php if($i <= $posts_per_col){ ?>
            <li class="question" aria-haspopup="true" aria-expanded="false"> 
              <svg class="lock-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.71 8.49">
                <title>Lock SVG</title>
                <path d="M7.27,7.74a0.72,0.72,0,0,1-.45.19A0.73,0.73,0,0,1,6.3,7.74l0-.27a0.31,0.31,0,0,0,.33-0.29A0.3,0.3,0,0,0,6.29,7l0-.46c0-.88,0-0.92,0-1A2,2,0,0,0,5.22,4a2,2,0,0,0-2.16.25,2.74,2.74,0,0,0-.64,1.8,10.08,10.08,0,0,0-.06,1.59c0,0.53,0,.75,0,1.57,0,0.61,0,1.09,0,1.4H1.6c0-.51,0-1.26,0-2.18,0-.7,0-1,0-1.27C1.62,5.51,1.64,4.66,2.15,4a2.89,2.89,0,0,1,2-1,3,3,0,0,1,2.21.83,4.25,4.25,0,0,1,.89,2.65A8.54,8.54,0,0,1,7.27,7.74Z" transform="translate(-0.69 -3)" class="lock-path1"></path>
                <path d="M8,6.72H1.13a0.44,0.44,0,0,0-.44.44V11a0.44,0.44,0,0,0,.44.44H8A0.44,0.44,0,0,0,8.4,11V7.16A0.44,0.44,0,0,0,8,6.72ZM4.87,9.2V10a0.27,0.27,0,1,1-.54,0V9.19A0.65,0.65,0,1,1,4.87,9.2Z" transform="translate(-0.69 -3)" class="lock-path2"></path>
              </svg><?php the_title(); ?>
              <ul class="dropdown" aria-hidden="true ">
                <li class="answer"><?php the_content(); ?>
                </li>
              </ul>
            </li>
            <?php $i++ ?>
          <?php } ?>
        <?php endwhile; else : ?>
          Oops.... Looks like some content may still be locked in a room. Try Searching here for it.
          <?php get_search_form(); ?>
        <?php endif; ?>
        <?php wp_reset_query(); ?>
      </ul>
      <ul class="faq-questions right" data-parallax="true" data-direction="slide-left" data-shown="false" aria-hidden="true">
        <?php $i = 1;
          $args = array('post_type'=>'faq','posts_per_page'=> -1, 'orderby'=>'menu_order', 'order'=>'ASC' );
          $posts = wp_count_posts('faq')->publish;
          $loop = new WP_Query($args);
          $posts_per_col = ceil($posts / 2); 
        ?>
        <?php if($loop -> have_posts()) : while ($loop -> have_posts()) : $loop->the_post(); ?>
          <?php if($i > $posts_per_col){ ?>
            <li class="question" aria-haspopup="true" aria-expanded="false"> 
              <svg class="lock-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.71 8.49">
                <title>Lock SVG</title>
                <path d="M7.27,7.74a0.72,0.72,0,0,1-.45.19A0.73,0.73,0,0,1,6.3,7.74l0-.27a0.31,0.31,0,0,0,.33-0.29A0.3,0.3,0,0,0,6.29,7l0-.46c0-.88,0-0.92,0-1A2,2,0,0,0,5.22,4a2,2,0,0,0-2.16.25,2.74,2.74,0,0,0-.64,1.8,10.08,10.08,0,0,0-.06,1.59c0,0.53,0,.75,0,1.57,0,0.61,0,1.09,0,1.4H1.6c0-.51,0-1.26,0-2.18,0-.7,0-1,0-1.27C1.62,5.51,1.64,4.66,2.15,4a2.89,2.89,0,0,1,2-1,3,3,0,0,1,2.21.83,4.25,4.25,0,0,1,.89,2.65A8.54,8.54,0,0,1,7.27,7.74Z" transform="translate(-0.69 -3)" class="lock-path1"></path>
                <path d="M8,6.72H1.13a0.44,0.44,0,0,0-.44.44V11a0.44,0.44,0,0,0,.44.44H8A0.44,0.44,0,0,0,8.4,11V7.16A0.44,0.44,0,0,0,8,6.72ZM4.87,9.2V10a0.27,0.27,0,1,1-.54,0V9.19A0.65,0.65,0,1,1,4.87,9.2Z" transform="translate(-0.69 -3)" class="lock-path2"></path>
              </svg><?php the_title(); ?>
              <ul class="dropdown" aria-hidden="true">
                <li class="answer"><?php the_content(); ?>
                </li>
              </ul>
            </li>
          <?php } ?>
          <?php $i++ ?>
        <?php endwhile; else : ?>
          Oops.... Looks like some content may still be locked in a room. Try Searching here for it.
          <?php get_search_form(); ?>
        <?php endif; ?>
        <?php wp_reset_query(); ?>
      </ul>
    </div>
  </section>
  <section id="hp-comments">
    <h1 class="hp-header underline" data-parallax="true" data-direction="slide-down" data-shown="false" aria-hidden="true">WHAT OTHERS ARE SAYING</h1>
      <?php 
        $i = 1;
        $args = array('post_type'=>'rumor','posts_per_page'=> -1, 'orderby'=>'menu_order', 'order'=>'ASC' );
        $posts = wp_count_posts('rumor')->publish;
        $loop = new WP_Query($args); 
      ?>
    <div class="hp-slide-wrapper">
      <div id="hp-comment-slider" class="gb-slider" data-slideshow="true" data-playing="false" data-parallax="true" data-direction="slide-up" data-shown="false" aria-hidden="true">
          <?php do_action( 'wprev_tripadvisor_plugin_action', 1 ); ?>
    </div>
    </div>
  </section>
</div>
<script src="http://www.jscache.com/wejs?wtype=cdsscrollingravewide&amp;amp;uniq=37&amp;amp;locationId=9603779&amp;amp;lang=en_US&amp;amp;border=true&amp;amp;display_version=2"></script>

<?php get_footer(); ?>
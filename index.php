<?php /**
* The main template file
*
* This is Used for Single Room Pages
*
* @package WordPress
*/
get_header();
 ?>
 <div id="sp-container">
   <?php if( have_posts() ) : while ( have_posts() ) : the_post() ?>
     <article class="sp-article">
        <h1 class="sp-title underline">
          <?php the_title() ?>
        </h1>
       <section class="sp-section gc gc-half">
        <?php if(get_field('room_image')){  ?>
            <img class="sp-room-img" src="<?php the_field("room_image"); ?>" alt="<?php the_title();?>"/>
         <?php } ?>
         <div class="sp-content">
          <?php the_content(); ?> 
          <a class="cs-btn-reset btn-book" href="https://bookeo.com/lockedincayman" target="_blank">BOOK</a>
        </div>
       </section>
     </article>
     <h2 class="sp-sub-title underline" data-parallax="true" aria-hidden="true" data-direction="slide-down" data-shown="false">Related Rooms<h2>
     <div id="sp-related-rooms">
      <?php 
          $currentTitle = get_the_title();
          $args = array('post_type'=>'rooms','posts_per_page'=> -1, 'orderby'=>'menu_order', 'order'=>'ASC' );
          $loop = new WP_Query($args);
          $delay = 1;
        ?>
        <?php if($loop -> have_posts()) : while ($loop -> have_posts()) : $loop->the_post(); ?>
          <?php if($currentTitle !== get_the_title()) {?>
              <div class="sp-room-tile" data-parallax="true" aria-hidden="true" data-direction="slide-up" data-shown="false" data-delay="<?php echo $delay; ?>">
              <a class="cs-btn-reset" href="<?php echo get_permalink(); ?>">
                <h3 class="room-name underline">
                  <?php the_title(); ?>
                </h3>
                <?php if(get_field('room_image')){  ?>
                  <div class="img-wrapper">
                    <img src="<?php the_field("room_image"); ?>" alt="<?php the_title();?>"/>
                    <div class="img-overlay">
                      <?php the_excerpt(); ?>
                    </div>
                  </div>
                <?php } ?>
              </a>
            </div>
            <?php $delay++ ?>
          <?php } ?>
        <?php endwhile; else : ?>
          Oops.... Looks like some content may still be locked in a room. Try Searching here for it.
          <?php get_search_form(); ?>
        <?php endif; ?>
        <?php wp_reset_query(); ?>
      </div>
   <?php endwhile; else : ?>
     Sorry there may be a problem.
   <?php get_search_form(); ?>
   <?php endif; ?>
   <?php wp_reset_query(); ?>
 </div>
   <?php get_footer(); ?>
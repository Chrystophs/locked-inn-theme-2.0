<?php /**
* The main template file
*
* This is Used for Single Room Pages
*
* @package WordPress
*/
get_header();
 ?>
<div class="body-bg">
  <div class="container">
    <div class="row">
      <div class="col-xs-12"><?php if( have_posts() ) : while ( have_posts() ) : the_post() ?>
        <article>
          <div class="col-xs-12">
            <header class="center">
              <h1 itemprop="headline" class="page-title"><?php the_title() ?>
              </h1>
              <div class="underline"></div>
            </header>
            <section id="single-room" itemprop="articleBody">
              <div class="col-xs-12 col-md-6"><?php if( get_field('room_image')){ ?>
                <div class="room-image"><img src="<?php the_field("room_image"); ?>"/></div><?php } ?>
              </div>
              <div class="col-xs-12 col-md-6"><?php the_content(); ?>
                <div class="col-xs-12 center">
                  <div class="btn btn-book"><a href="https://bookeo.com/lockedincayman" target="_blank">BOOK</a></div>
                </div>
              </div>
            </section>
          </div>
        </article><?php endwhile; else : ?>Sorry there may be a problem.<?php get_search_form(); ?><?php endif; ?><?php wp_reset_query(); ?>
      </div>
    </div>
  </div>
</div><?php get_footer(); ?>
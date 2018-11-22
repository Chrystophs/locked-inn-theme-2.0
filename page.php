<?php /**
* The template for displaying pages
*
* Default template
*
* @package WordPress
*
*/
get_header() ?>
<div id="sp-container">
  <?php if( have_posts() ) : while ( have_posts() ) : the_post() ?>
    <article class="">
      <header>
        <h1 itemprop="headline" class="page-title">
          <?php the_title() ?>
        </h1>
      </header>
      <section itemprop="articleBody">
        <?php if(has_post_thumbnail() ){ ?>
          <?php the_post_thumbnail(array(200,200), array('class'=>'img-thumbail pull-left margin-right')) ?>
        <?php } ?>
        <?php the_content() ?>
      </section>
    </article>
  <?php endwhile; else : ?>
    Sorry there may be a problem.
  <?php get_search_form(); ?>
  <?php endif; ?>
  <?php wp_reset_query(); ?>
  <?php get_footer(); ?>
</div>
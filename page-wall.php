<?php /*
* Template Name: Wall Page
*/
get_header(); ?>
<ul id="preload-rooms-container" class="hidden"><?php $i = 1;
$args = array('post_type'=>'wall','posts_per_page'=> -1, 'order'=>'ASC' );
$loop = new WP_Query($args);
$room = get_field('room_name'); ?><?php if( $loop->have_posts() ) : while( $loop->have_posts() ) : $loop->the_post(); ?>
  <li data-room-name="<?php the_field('room_name'); ?>" data-room-month="<?php the_time('F'); ?>" data-room-year="<?php the_time('Y'); ?>" class="room-image">
    <div class="room-image-inner"><img src="<?php the_field('team_image'); ?>"/></div>
    <div class="room-content"><span class="room-type hidden"><?php the_field('room_name'); ?></span>
      <h1 class="room-title"><?php the_title(); ?>
      </h1>
      <div class="underline"><span class="hidden">Underline</span></div><?php the_content(); ?><span class="room-time"><?php echo "Escaped: "; ?><?php the_time('F j, Y'); ?></span>
    </div>
  </li><?php $i++; ?><?php endwhile; else: ?>Sorry There May Be A Problem;<?php get_search_form(); ?><?php endif; ?><?php wp_reset_query(); ?>
</ul>
<div id="wall-overlay-outer">
  <div id="wall-overlay-inner">
    <div id="wall-overlay-close-btn">
      <div class="close-btn-container">
        <div class="close-btn"><span class="hidden">Cross</span></div>
        <div class="close-btn"><span class="hidden">Cross</span></div>
        <div class="close-btn"><span class="hidden">Cross</span></div>
        <div class="close-btn"><span class="hidden">Cross</span></div>
      </div>
    </div>
    <ul id="wall-images-outer"></ul>
    <div id="wall-controls-outer">
      <div class="wall-control-outer next">
        <div class="wall-control-inner">
          <div class="arrow"><span class="hidden">arrow</span></div>
          <div class="arrow"><span class="hidden">arrow</span></div>
        </div>
      </div>
      <div class="wall-control-outer prev">
        <div class="wall-control-inner">
          <div class="arrow"><span class="hidden">arrow</span></div>
          <div class="arrow"><span class="hidden">arrow</span></div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="body-bg">
  <section id="wall-of-fame">
    <div class="row">
      <div class="container">
        <div class="wall-filters"><span>Filter by:</span>
          <form class="wall-filter"><span class="filter-container">
              <label for="Room">Room</label>
              <input id="use-room-filter" type="checkbox"/>
              <select id="room-filter" name="Room">
                <option value="All">All</option>
                <option value="asylumn">The Asylum</option>
                <option value="pirate">Pirate's Cellar</option>
                <option value="death">Death Row</option>
                <option value="outbreak">Outbreak</option>
              </select></span><span class="filter-container">
              <label for="Month">Month</label>
              <input id="use-month-filter" type="checkbox"/>
              <select id="month-filter" name="Month">
                <option value="January">Jan</option>
                <option value="February">Feb</option>
                <option value="March">Mar</option>
                <option value="April">Apr</option>
                <option value="May">May</option>
                <option value="June">Jun</option>
                <option value="July">Jul</option>
                <option value="August">Aug</option>
                <option value="Septepmber">Sept</option>
                <option value="October">Oct</option>
                <option value="November">Nov</option>
                <optoin value="December">Dec</optoin>
              </select></span><span class="filter-container">
              <label for="Year">Year</label>
              <input id="use-year-filter" type="checkbox"/>
              <select id="year-filter" name="Year">
                <option value="2016">2016</option>
              </select></span>
            <button type="submit" id="apply-filters">Apply</button>
          </form>
        </div>
        <h1>Wall Of Fame</h1>
        <div class="underline"></div>
        <p class="center">The Wall of Fame is reserved for groups who have successfully escaped our rooms using only one hint or less! This page gives them all the glory they deserve!</p>
        <div id="wall-thumbnail-container"></div>
      </div>
    </div>
  </section>
</div><?php get_footer(); ?>
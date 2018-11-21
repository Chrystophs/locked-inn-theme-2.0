
<form id="searchform" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" class="searchform">
  <div>
    <input id="searchsubmit" type="submit" value="<?php echo esc_attr_x( 'Search', 'submit button' ); ?>"/>
    <label for="s" class="screen-reader-text"><?php _x( 'Search for:', 'label' ); ?>
    </label>
    <input id="autocomplete" title="type &quot;a&quot;" type="text" value="<?php echo get_search_query(); ?>" name="s" placeholder=" Help you find anything?"/>
  </div>
</form>
<?php /**
* The sidebar containing the main widget area
*
* @package WordPress
*
*/ ?><?php if ( has_nav_menu( 'primary' ) || has_nav_menu( 'social' ) || is_active_sidebar( 'sidebar-1' )  ) : ?>
<div id="secondary" class="secondary"><?php if ( has_nav_menu( 'primary' ) ) : ?>
  <nav id="site-navigation" role="navigation" class="main-navigation"><?php // Primary navigation menu.
wp_nav_menu( array(
    'menu_class'     => 'nav-menu',
    'theme_location' => 'primary',
) ); ?><?php endif; ?>
  </nav><?php if ( has_nav_menu( 'social' ) ) : ?>
  <nav id="social-navigation" role="navigation" class="social-navigation"><?php // Social links navigation menu.
wp_nav_menu( array(
'theme_location' => 'social',
'depth'          => 1,
'link_before'    => '<span class="screen-reader-text">',
'link_after'     => '</span>',
) ); ?><?php endif; ?>
  </nav><?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
  <div id="widget-area" role="complementary" class="widget-area"><?php dynamic_sidebar( 'sidebar-1' ); ?>
  </div><?php endif; ?>
</div><?php endif; ?>
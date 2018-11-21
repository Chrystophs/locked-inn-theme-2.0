<?php /**
* The template for displaying search results pages.
*
* @package WordPress
*/
get_header(); ?>
<section id="primary" class="content-area">
  <div id="main" role="main" class="main site-main"><?php if ( have_posts() ) : ?>
    <div class="container"></div>
    <div class="container-box">
      <header class="page-header">
        <h1 class="page-title"><?php printf( __( 'Search Results for: %s' ), get_search_query() ); ?>
        </h1>
      </header><?php // Start the loop.
while ( have_posts() ) : the_post();
    /*
    * Run the loop for the search to output the results.
    * If you want to overload this in a child theme then include a file
    * called content-search.php and that will be used instead.
    */
    get_template_part( 'content', 'search' ); 
// End the loop.
endwhile; ?><?php // Previous/next page navigation.
the_posts_pagination( array(
    'prev_text'          => __( 'Previous page' ),
    'next_text'          => __( 'Next page' ),
    'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page' ) . ' </span>',
) ); ?><?php // If no content, include the "No posts found" template.
else :
get_template_part( 'content', 'none' ); ?>
    </div><?php endif; ?>
  </div>
</section><?php get_footer(); ?>
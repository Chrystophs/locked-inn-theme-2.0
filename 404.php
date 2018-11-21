<?php /*
*
* The template for displaying 404 pages (not found)
*
*/
get_header(); ?>
<div id="primary" class="content-area">
  <main id="main" role="main" class="site-main">
    <div class="container">
      <section class="error-404 not-found">
        <header class="page-header">
          <h1 class="page-title"><?php _e( 'You look lost?'); ?>
          </h1>
          <div class="page-content">
            <p><?php _e( 'May I suggest using the search to find what you are looking for?'); ?>
            </p><?php get_search_form(); ?>
          </div>
        </header>
      </section>
    </div>
  </main>
</div><?php get_footer(); ?>
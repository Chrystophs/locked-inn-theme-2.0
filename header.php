<?php /*
* The template for displaying the header
* Displays all of the head element and everything up until the "site-content" div.
* @package WordPress
*/
 ?><!DOCTYPE html> 
<html <?php language_attributes(); ?> lang="en" class="no-js">
<head>
  <title><?php wp_title(''); ?></title>
  <meta charset="<?php bloginfo( 'charset' ) ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
  <!-- Sheet Styles-->
  <link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_directory'); ?>/css/style.css">
  <!-- Google Fonts-->
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Yanone+Kaffeesatz:200,300" rel="stylesheet" type="text/css">
  <!--JavaScript-->
  <script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery.min.js"></script>
  <script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery-ui.min.js"></script>
  <script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/cs-parallax.js"></script>
  <script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/functions.js"></script>
  <!--Google Tag Manager-->
  <iframe src="//www.googletagmanager.com/ns.html?id=GTM-P832WW"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-P832WW');</script>
   
  <?php wp_head(); ?>

</head> 
<body>
  <header id="top" class="gc-header">
    <div class="gc-half">
      <a class="gb-header-address" href="<?php echo get_option('home'); ?>/contact-us/">
        18 FORT STREET, GRAND CAYMAN
      </a>
      <nav id="gb-top-nav">
        <button class="cs-btn-reset nav-btn">
          <span class="menu-line line1"></span>
          <span class="menu-line line2"></span>
          <span class="menu-line line3"></span>
        </button>
        <?php wp_nav_menu( array(
          'theme_location' => 'Main Menu',
          'depth'=> 2,
          'container'=> false,
          'menu_class' => 'gb-navigation gc-full',
          'fallback_cb'    => '__return_false')
          );  
        ?>
      </nav>
      <a id="gb-logo" href="<?php echo get_option('home'); ?>" alt="<?php the_title(); ?>">
        <img class="large-logo" src="<?php bloginfo('template_url'); ?>/img/logo-big.png" />
        <img class="small-logo" src="<?php bloginfo('template_url'); ?>/img/logo2.png" />
      </a> 
    </div>
  </header>
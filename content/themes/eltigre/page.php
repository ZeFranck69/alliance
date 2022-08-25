<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * To generate specific templates for your pages you can use:
 * /mytheme/templates/page-mypage.twig
 * (which will still route through this PHP file)
 * OR
 * /mytheme/page-mypage.php
 * (in which case you'll want to duplicate this file and save to the above path)
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::context();

$timber_post     = new Timber\Post();
$context['post'] = $timber_post;

if ( post_password_required( $timber_post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
    $context['template'] = 'page-' . $timber_post->slug;
    $context['sections'] = get_field( 'sections' );
	
	foreach(  $context['sections'] as $key => $section ) {
        switch ( $section['acf_fc_layout'] ) {
           
            case 'news_short' :
                $context = array_merge( $context, Eltigre\Controllers\News::get_context( $section ) );
            break;

            case 'blog':
                $paged = get_query_var( 'paged' ) ? get_query_var( 'paged' ) :
                    (get_query_var( 'page' ) ? get_query_var( 'page' ) : 1);
                $search = get_query_var( 'search' ) ? get_query_var( 'search' ) : '';

                $args = array(
                    'posts_per_page' => $section['nb_posts'],
                    'paged'          => $paged,
                    'orderby'        => 'post_date',
                    'order'          => 'DESC'
                );

                if ( ! empty( $search ) ) {
                    $args[ 's' ] = $search;
                }

                $context['posts'] = new Timber\PostQuery( $args );
                break;  
            default: 
            break;
        }
    }


    Timber::render( array( 'page-' . $timber_post->post_name . '.twig', 'page.twig' ), $context );
}

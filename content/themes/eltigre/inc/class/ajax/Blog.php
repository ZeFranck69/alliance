<?php

namespace Eltigre\Ajax;
use Timber;
class Blog {

    public function __construct() {
        add_action('wp_ajax_filter_posts', array($this, 'filter_posts'));
        add_action('wp_ajax_nopriv_filter_posts', array($this, 'filter_posts'));
    }


    public static function filter_posts() {
      $args = array( 
        'posts_per_page' => 4,
        'orderby'        => 'post_date',
        'post_type'      => 'post',
        'order'          => 'DESC'
      );


      if ( ! empty( $_POST[ 's' ] ) ) {
        $args[ 's' ] = $_POST['s'];
      }

      $posts = Timber::get_posts( $args );

      ob_start(); 
      foreach ( $posts as $post ) : ?>
        <div class="post">
          <?php Timber::render( 'partial/tease-post.twig', array( 'post' => $post ) ); ?>
        </div><?php
      endforeach;
      $content = ob_get_clean();
      
      wp_send_json_success( $content );

    }

}

new Blog();

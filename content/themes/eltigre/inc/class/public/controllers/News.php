<?php

namespace Eltigre\Controllers;

if ( !class_exists( 'Eltigre\Controllers\News' ) ) {
    class News {
        public static function get_context( $section = array() ) {
            $context = array( // Tableau qui va être mergé dans $context
                'news' => array( // Nom de la variable qui va être accessible dans twig
                    'posts' => self::get_posts( $section['number_of_posts'] ),
                )
            );
            
            return $context;
        }

        private static function get_posts( $posts_per_page ) {
            $query_args = array(
                'post_type'         => 'post',
                'posts_per_page'    => $posts_per_page
            );
    
            $query = new \WP_Query( $query_args );
            $posts = array();
    
            while ( $query->have_posts() ) {
                $query->the_post();
				$author_id = get_the_author_meta( 'ID' );
				$next =  get_next_post();
                $posts[] = array(
                    'title'     => get_the_title(),
                    'thumbnail' => get_the_post_thumbnail_url(),
                    'content'   => get_the_content(),
                    'excerpt'   => get_the_excerpt(),
                    'link'      => get_permalink(),
					'fullname'  => get_the_author_meta('display_name', $author_id),
					'date'		=> get_post_time( get_option( 'date_format' ), false, $next, true ),
                );
            }

            return $posts;
        }
    }

}

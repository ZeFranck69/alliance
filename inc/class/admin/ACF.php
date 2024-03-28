<?php

namespace Eltigre\Admin;

if ( ! class_exists( 'Eltigre\Admin\ACF' ) ) {

  class ACF {
  
      public function __construct() {
        add_filter( 'tiny_mce_before_init', array( $this,'custom_wysiwyg_colors' ) );
        add_filter( 'acf/fields/wysiwyg/toolbars', array( $this,'customize_tinymce_toolbars' ), 999, 1 );
        add_action( 'acf/input/admin_enqueue_scripts', array( $this, 'register_scripts' ) );
      }

      public static function register_scripts() {
        wp_enqueue_script ( 'acf-admin', get_template_directory_uri() . '/inc/js/acf-admin.js' );
        wp_localize_script( 'acf-admin', 'acfAdminColors', COLORS );
      }


      public static function customize_tinymce_toolbars( $toolbars ) {
        $toolbar_1 = array();
        foreach ( $toolbars['Full'][1] as $item ) {
          $toolbar_1[] = $item;
          if ( $item === 'formatselect') {
            $toolbar_1[] = 'fontsizeselect';
          }
        }

        $toolbars['Full'][1] = $toolbar_1;

        return $toolbars;
      }
      public static function custom_wysiwyg_colors( $init ) {
          $colors = array();
          foreach( COLORS as $hex => $color ) {
              if ( $color[ 'name' ] ) {
                  array_push( $colors, "'$hex', '" . $color['name'] . "'" );
              }
          }
  
          $textcolor_map = implode( ',', $colors );
  
      $init['textcolor_map'] = '['.$textcolor_map.']';
      $init['textcolor_rows'] = 8; 
      $init['fontsize_formats'] =  '8px 10px 12px 14px 16px 20px 24px 28px 32px 36px 48px 60px 72px 96px';
      return $init;
    }
  
  }
  
  new ACF();
  
}
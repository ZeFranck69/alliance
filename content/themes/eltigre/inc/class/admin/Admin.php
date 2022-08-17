<?php

namespace Eltigre;

class Admin {
    
    public static $colors = array(

        '000000' => array( 'name' => 'black' ),
        'ffffff' => array( 'name' => 'white' ),
        'D6D6D6' => array( 'name' => 'grey' ),
        'B6AC9A' => array( 'name' => 'lightgrey' ),
        'E1B920' => array( 'name' => 'moutarde' ),
        'A38A41' => array( 'name' => 'gold' ),
        'CBA08C' => array( 'name' => 'brown' ),
        'A84C76' => array( 'name' => 'violet' ),

	);

    public function __construct() {
        add_filter( 'tiny_mce_before_init', array( $this,'custom_wysiwyg_colors' ) );
        add_action( 'acf/input/admin_enqueue_scripts', array( $this, 'acf_color_picker_color_palette' ), 99 );
    }

    public function custom_wysiwyg_colors( $init ) {
        $colors = array();

        foreach( self::$colors as $hex => $color ) {
            if ( $color[ 'name' ] ) {
                array_push( $colors, "'$hex', '" . $color['name'] . "'" );
            }
        }

        $textcolor_map = implode( ',', $colors );

		$init['textcolor_map'] = '['.$textcolor_map.']';
		$init['textcolor_rows'] = 8; 
		
		return $init;
	}


    public function acf_color_picker_color_palette() { ?>
        <script id="color-palette" type="text/javascript">
            document.addEventListener("DOMContentLoaded", function() {
                acf.add_filter('color_picker_args', function( args, field ) {    
                    args.palettes = [<?php foreach( self::$colors as $hex => $color ) echo "'#$hex',"; ?>];
                    return args;
                });
            });
        </script><?php
    }

    
}

new Admin();

<?php
/**
 * El-Tigre functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Eltigre
 */

require 'inc/timber-init.php';


if ( class_exists( 'Timber' ) ) {
	class Eltigre_Init extends Timber\Site {
   
		public function __construct() {
			require 'class/Eltigre.php';
			
			add_filter( 'stylesheet_directory_uri', array( $this, 'update_stylesheet_directory' ), 10, 2 );
			add_action( 'theme_meta_description', array( $this, 'get_meta_description' ) );
			add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
			add_filter( 'upload_mimes', array( $this, 'wpc_mime_types' ) );
			add_action( 'init', array( $this, 'register_post_types' ) );
			add_action( 'init', array( $this, 'register_taxonomies' ) );
			add_action( 'wp_enqueue_scripts', array($this, 'register_styles' ));
			add_action( 'wp_enqueue_scripts', array($this, 'register_scripts' ));
	
			add_filter( 'timber/context', array( $this, 'add_to_context' ) );
	
			parent::__construct();

			$this->load_extras();
		}


		public function update_stylesheet_directory( $stylesheet_dir_uri, $theme_name ) {
			return $stylesheet_dir_uri . '/dist/';
		}


		public static function get_meta_description() { 
			if ( class_exists( 'WPSEO_Options' ) ) {
				return null;
			}

			ob_start(); ?>

			 <meta name="description" content="<?php echo $this->description; ?>"><?php

			 return apply_filters( 'theme_meta_description', ob_get_clean() );
		}
	
	
		/** This is where you add some context
			*
			* @param string $context context['this'] Being the Twig's {{ this }}.
			*/
		public function add_to_context( $context ) {
			
			// Menus
			$context['menu']  = new Timber\Menu();
			
			// Logo
			$logo_ID 				= get_theme_mod( 'custom_logo' );
			$context['logo'] 		= wp_get_attachment_image( $logo_ID , '', false, array( 'class' => 'site-logo' ) );
			$context['logo_src']	= wp_get_attachment_image_src( $logo_ID , 'full' )[0];

			// Global options
			$context['options'] 	= get_fields( 'options' );
	
			// Global site
			$context['site']  = $this;
			return $context;
		}
	
	
		public function register_post_types() {
			/** This is where you can register custom post types. */
		}
	
	
		public function register_taxonomies() {
			/** This is where you can register custom taxonomies. */
		}
	
	
		public function enqueue() {
			// SWIPER
			wp_enqueue_style( 'swiper', 'https://unpkg.com/swiper/swiper-bundle.min.css' );
			wp_enqueue_script( 'swiper', 'https://unpkg.com/swiper/swiper-bundle.min.js' );
	
			// CUSTOM
			$files = scandir( dirname( __FILE__ ) . '/dist' );
			foreach ( $files as $file ) {
				$fullName = basename( $file );
				$name = substr( basename( $fullName ), 0, strpos( basename( $fullName ), '.' ) );
				if ( pathinfo( $file, PATHINFO_EXTENSION ) === 'js' ) {
					wp_enqueue_script( $name, get_stylesheet_directory_uri() . $fullName, array(), null, true );
					wp_localize_script( $name, 'site', array(
						'url' 		=> home_url(),
						'ajaxurl' 	=> admin_url( 'admin-ajax.php' ),
						'theme_url' => get_template_directory_uri(),
						)  
					);
				} else if ( pathinfo( $file, PATHINFO_EXTENSION ) === 'css' ) {
					wp_enqueue_style( $name, get_stylesheet_directory_uri() . $fullName );
				}
			}
		}
	
		public function theme_supports() {
			// Adds ACF global options page
			if ( function_exists('acf_add_options_page') ) {
				acf_add_options_page('Global options');	
			}
	
			add_theme_support( 'automatic-feed-links' );
			add_theme_support( 'menus' );
			add_theme_support( 'title-tag' );
			add_theme_support( 'post-thumbnails' );
			add_theme_support( 'custom-logo' );
			add_theme_support(
				'html5',
				array(
					'comment-form',
					'comment-list',
					'gallery',
					'caption',
				)
			);
	
			/*
				* Enable support for Post Formats.
				*
				* See: https://codex.wordpress.org/Post_Formats
				*/
			add_theme_support(
				'post-formats',
				array(
					'image',
					'video',
					'quote',
					'link',
					'gallery',
					'audio',
				)
			);
		}
	
		// Allow SVG
		public function wpc_mime_types($mimes) {
			$mimes['svg'] = 'image/svg+xml';
			return $mimes;
		}


		private function load_extras() {
			include_once 'inc/helper-functions.php';
		}
	}
   
   
   new Eltigre_Init();
}

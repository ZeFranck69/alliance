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
	
	
		public function register_styles() {
			// VENDOR STYLES


			// CUSTOM STYLES
			wp_enqueue_style( 'app', get_template_directory_uri() . '/dist/app.css' );
		}
	
	
		public function register_scripts() {
			// VENDOR SCRIPTS


			// CUSTOM SCRIPTS
			wp_enqueue_script( 'app', get_template_directory_uri() . '/dist/app.js' );
			wp_localize_script('app', 'site', array(
				'url' 		=> home_url(),
				'ajaxurl' 	=> admin_url( 'admin-ajax.php' ),
				'theme_url' => get_template_directory_uri(),
			)  );
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

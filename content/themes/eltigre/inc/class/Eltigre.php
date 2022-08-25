<?php

if ( ! defined( 'ABSPATH' ) ) exit;

use Eltigre\Services\Support;
use Eltigre\Services\Contact;
use Eltigre\Services\ACF;

define( 'SERVICES', 
    array(
        'Support'       => Support::class,
        'Contact'       => Contact::class,
        'ACF'           => ACF::class,
    ) 
);

class Eltigre {

    public static $services;

    public function __construct() {
        $this->register_services();
        $this->init();
    }


    private function init() {
        $this->load_service( 'ACF' );

        if ( self::is_ajax() ) 
            $this->load_ajax();

        else if ( self::is_admin() ) 
            $this->load_admin();

        else if ( self::is_public() ) 
            $this->load_public();
    }

    
    private function load_ajax() {
        $this->load_service( 'Contact' );
        self::require_folder( 'ajax' );
    }

    
    private function load_admin() {
        $this->load_service( 'Support' );
        self::require_folder( 'admin' );
    }


    private function load_public() {
        self::require_folder( 'public' );
        self::require_folder( 'public/controllers' );
    }


    public static function require( $file_path, $dir = __DIR__ ) {
        $file = $dir . $file_path;
        if ( file_exists( $file ) ) {
          include $file;
        }
      }

    public static function require_folder( $folder, $dir = __DIR__ ) {
        $files = array_diff( scandir( $dir . "/$folder" ), array( '.', '..' ) );
        $included_files = array();

        foreach ( $files as $file ) {
            $fullName = basename( $file );
            $name = substr( basename( $fullName ), 0, strpos( basename( $fullName ), '.' ) );
            if ( pathinfo( $file, PATHINFO_EXTENSION ) === 'php' ) {
                $included_files[] = include_once  "$dir/$folder/$file";
            }
        }
        
        return $included_files;
    }

    /**
     * 
     * @param string $dir Path to directory
     * @param string|bool $filename Optional. Only enqueue files which contains filename, enqueues all file if false
     * @return void
     */
    public static function enqueue_directory( $path = '/dist', $filename = false ) {
        $dir = trailingslashit( get_template_directory() . $path );
        $dir_uri = trailingslashit( get_template_directory_uri() . $path );

        if ( ! is_dir( $dir ) ) return;

        $files = array_diff( scandir( $dir ), array( '.', '..' ) );

        if ( $filename ) {
            $files =  array_filter( $files, function( $file ) use ( $filename ) {
                return strpos( $file, $filename ) > -1;
                }
            );
        }

        foreach ( $files as $file ) {
            $fullName = basename( $file );
            $name = substr( basename( $fullName ), 0, strpos( basename( $fullName ), '.' ) );
            if ( pathinfo( $file, PATHINFO_EXTENSION ) === 'js' ) {
                wp_enqueue_script( $name, $dir_uri . $fullName, array(), null, true );
            } else if ( pathinfo( $file, PATHINFO_EXTENSION ) === 'css' ) {
                wp_enqueue_style( $name, $dir_uri . $fullName );
            }
        }
    }


    private function load_service( $name ) {
        $services = SERVICES;
        if ( array_key_exists( $name, $services ) && class_exists( $services[ $name ] ) ) {
            self::$services[ $name ] = new $services[ $name ]();
            return self::$services[ $name ];
        }
    }

    private function register_services( ) {
        include_once get_services_directory() . '/AbstractService.php';

        foreach( SERVICES as $name => $class ) {
            $this->register_service( $name );
        }
    }


    private function register_service( $name ) {
        $dir = strtolower( $name );
        $service = get_services_directory() . "/$dir/$name.php";
        if ( file_exists( $service ) ) {
            include_once $service;
        }
    }


    public static function is_ajax() {
        return wp_doing_ajax();
    }


    public static function is_admin() {
        return is_admin()  && ! wp_doing_ajax();
    }


    public static function is_public() {
        return ! is_admin();
    }
}

new Eltigre();

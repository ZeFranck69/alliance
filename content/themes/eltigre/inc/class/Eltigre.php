<?php

class Eltigre {

    public function __construct() {
        $this->load_classes();
    }

    private function load_classes() {
        if ( is_admin() && wp_doing_ajax() ) {
            $this->load_ajax();
        } else if ( is_admin() && !wp_doing_ajax() ) {
            $this->load_admin();
        } else {
            $this->load_public();
        }
    }

    
    private function load_ajax() {
        include_once 'ajax/Contact.php';
    }
    
    private function load_admin() {
        include_once 'admin/Uploads.php';
        include_once 'admin/ACF.php';
        include_once 'admin/Admin.php';
        include_once 'admin/Support.php';
        
    }


    private function load_public() {

    }
}

new Eltigre();
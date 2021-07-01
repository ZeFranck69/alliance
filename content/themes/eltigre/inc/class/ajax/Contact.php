<?php

namespace Eltigre\Ajax;

class Contact {
    
    public function __construct() {
        add_action('wp_ajax_submit_contact_form', array( $this, 'submit_contact_form' ) );
        add_action('wp_ajax_nopriv_submit_contact_form', array( $this, 'submit_contact_form' ) );
    }


    public function submit_contact_form() {
        
        // Retrieve form fields
        $fields = $this->get_fields();

        if ( $this->validate_fields( $fields ) ) {

            // Format message
            $message = '';
            foreach ( $fields as $field ) {
                $message .= $field['label'] . ': ' . $field['value'] . "\n"; 
            }
            $message .= "Message: \n\n" . sanitize_textarea_field( $_POST['message'] );

    
            // Set E-Mail subject
            $subject = get_bloginfo( 'name' ) . ' - Contact Form';
    
    
            // Set E-Mail recipients
            $referer_post_ID = url_to_postid( $_SERVER['HTTP_REFERER'] );
            $recipients = array();
            $sections = get_field( 'sections', $referer_post_ID );
            if ( !empty( $sections ) ) {
                foreach ( $sections as $section ) {
                    if ( $section['acf_fc_layout'] === 'contact_form' ) {
                        $recipients = array( $section[ 'recipient' ] );
                        break;
                    }
                }
            }

            if ( empty( $recipients ) ) {
                $recipients = array( get_bloginfo( 'admin_email' ) );
            }
                
    
    
            // Build email headers
            $headers = array();
            $headers[] = 'Content-Type: text/plain; charset=UTF-8';
            $headers[] = 'From: ' . get_bloginfo( 'name' ) . ' <site@wordpress.com>';
            $headers[] = 'Reply-To: ' . $fields['firstname']['value'] . ' ' . $fields['lastname']['value'] . ' <' . $fields['email']['value'] . '>';
    
    
            // Send email
            if ( wp_mail( $recipients, $subject, $message, $headers ) ) {
                wp_send_json_success(' Success message' );
            } else {
                wp_send_json_error( 'Error message' );
            }
    
    
            wp_die();
        }
    }


    private function get_fields() {
        return array(
            'lastname' => array(
                'value' => isset( $_POST['lastname'] ) ? sanitize_text_field( $_POST['lastname'] ) : null,
                'label' => __( 'Name', 'eltigre' ),
                'required' => true
            ),
            'entreprise' => array(
                'value' => isset( $_POST['entreprise'] ) ? sanitize_text_field( $_POST['entreprise'] ) : null,
                'label' => __( 'Company', 'eltigre' ),
                'required' => true
            ),
            'email' => array(
                'value' => isset( $_POST['email'] ) ? sanitize_email( $_POST['email'] ) : null,
                'label' => __( 'Email', 'eltigre' ),
                'required' => true
            )
        );
    }


    private function validate_fields( $fields  = array() ) {
        foreach ( $fields as $key => $field ) {
            if ( $field['required'] && empty( $field['value'] ) ) {
                wp_send_json_error( "$key: cannot be empty" );
            }
        }

        return true;
    }
}

new Contact();
<?php 
/**
* Template Name: Advisors
* The template for displaying the advisor page
*/

get_header();

$template = __DIR__ . '/' . basename(__FILE__, '.php') . '.haml';
include(locate_template('helpers/haml-require.php'));

get_footer();
?>
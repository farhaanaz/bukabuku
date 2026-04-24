<?php
get_header();

$js = get_vite_asset('index.html');
$css = get_vite_asset('index.html', 'css');
?>

<link rel="stylesheet" href="<?php echo get_template_directory_uri() . '/dist/assets/' . $css; ?>">

<div id="root"></div>

<script type="module" src="<?php echo get_template_directory_uri() . '/dist/assets/' . $js; ?>"></script>

<?php get_footer(); ?>
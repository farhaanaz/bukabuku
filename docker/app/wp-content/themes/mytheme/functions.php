<?php
function remove_wp_styles() {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('global-styles');
}
add_action('wp_enqueue_scripts', 'remove_wp_styles', 100);

function get_vite_asset($entry, $type = 'js') {
    $manifest_path = get_template_directory() . '/dist/manifest.json';

    if (!file_exists($manifest_path)) return '';

    $manifest = json_decode(file_get_contents($manifest_path), true);

    if (!isset($manifest[$entry])) return '';

    if ($type === 'css') {
        return $manifest[$entry]['css'][0] ?? '';
    }

    return $manifest[$entry]['file'];
}
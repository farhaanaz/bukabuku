<?php
function remove_wp_styles() {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('global-styles');
}
add_action('wp_enqueue_scripts', 'remove_wp_styles', 100);

function mytheme_enqueue_assets() {
    $manifest_path = get_template_directory() . '/dist/manifest.json';

    if (!file_exists($manifest_path)) {
        error_log("Manifest not found");
        return;
    }

    $manifest = json_decode(file_get_contents($manifest_path), true);

    $entry = $manifest['index.html'] ?? null;

    if (!$entry) {
        error_log("Entry index.html not found");
        return;
    }

    // CSS
    if (!empty($entry['css'])) {
        foreach ($entry['css'] as $css) {
            wp_enqueue_style(
                'mytheme-css',
                get_template_directory_uri() . '/dist/' . $css,
                [],
                null
            );
        }
    }

    // JS
    if (!empty($entry['file'])) {
        wp_enqueue_script(
            'mytheme-js',
            get_template_directory_uri() . '/dist/' . $entry['file'],
            [],
            null,
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'mytheme_enqueue_assets');
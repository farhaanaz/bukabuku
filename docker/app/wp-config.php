<?php
define('DB_NAME', 'wordpress');
define('DB_USER', 'wpuser');
define('DB_PASSWORD', 'wppassword');
define('DB_HOST', 'db');

define('WP_HOME', ('WP_HOME') ?: 'http://localhost');
define('WP_SITEURL', ('WP_SITEURL') ?: 'http://localhost');

define('WP_DEBUG', false);
define('WP_DEBUG_LOG', false);
define('WP_DEBUG_DISPLAY', true);

$table_prefix = 'wp_';

if ( !defined('ABSPATH') )
  define('ABSPATH', __DIR__ . '/');

require_once ABSPATH . 'wp-settings.php';
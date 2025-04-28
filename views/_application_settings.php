<?php
    $application_settings_details = $api->get_data_details_one_parameter('application settings', '1');
    $login_bg = $application_settings_details[0]['LOGIN_BG'];
    $logo_light = $application_settings_details[0]['LOGO_LIGHT'];
    $logo_dark = $application_settings_details[0]['LOGO_DARK'];
    $logo_icon_light = $application_settings_details[0]['LOGO_ICON_LIGHT'];
    $logo_icon_dark = $application_settings_details[0]['LOGO_ICON_DARK'];
    $favicon = $application_settings_details[0]['FAVICON'];
?>
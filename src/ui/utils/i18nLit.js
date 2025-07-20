// Helper to integrate i18n with LitElement components

// Get the i18n functions from window object (exposed via preload)
export function t(key, params) {
    if (window.i18n && window.i18n.t) {
        return window.i18n.t(key, params);
    }
    // Fallback if i18n not available
    return key;
}

export function setLanguage(lang) {
    if (window.i18n && window.i18n.setLanguage) {
        window.i18n.setLanguage(lang);
    }
}

export function getLanguage() {
    if (window.i18n && window.i18n.getLanguage) {
        return window.i18n.getLanguage();
    }
    return 'en';
}
// Simple i18n implementation for Pickle Glass
let currentLanguage = 'pt'; // Portuguese as default
let translations = {};

// Load translations
function loadTranslations() {
    try {
        translations.en = require('./locales/en.json');
        translations.pt = require('./locales/pt.json');
    } catch (error) {
        console.error('Failed to load translations:', error);
        translations.en = {};
        translations.pt = {};
    }
}

// Initialize
loadTranslations();

// Get translation function
function t(key, params = {}) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
        if (!value || typeof value !== 'object') break;
        value = value[k];
    }
    
    // Fallback to English if translation not found
    if (!value && currentLanguage !== 'en') {
        value = translations.en;
        for (const k of keys) {
            if (!value || typeof value !== 'object') break;
            value = value[k];
        }
    }
    
    // If still no value, return the key
    if (!value || typeof value !== 'string') {
        return key;
    }
    
    // Replace parameters
    let result = value;
    Object.keys(params).forEach(param => {
        result = result.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
    });
    
    return result;
}

// Set language
function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        // Notify all windows about language change
        if (typeof window !== 'undefined' && window.electronAPI) {
            window.electronAPI.broadcast('language-changed', lang);
        }
    }
}

// Get current language
function getLanguage() {
    return currentLanguage;
}

// Export for use in React components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { t, setLanguage, getLanguage, loadTranslations };
}

// Make available globally for browser context
if (typeof window !== 'undefined') {
    window.i18n = { t, setLanguage, getLanguage };
}
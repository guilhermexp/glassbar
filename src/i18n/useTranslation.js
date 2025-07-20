import { useState, useEffect } from 'react';
import { t, setLanguage, getLanguage } from './i18n';

export function useTranslation() {
    const [, forceUpdate] = useState(0);
    
    useEffect(() => {
        // Listen for language changes
        const handleLanguageChange = () => {
            forceUpdate(n => n + 1);
        };
        
        if (window.electronAPI) {
            window.electronAPI.on('language-changed', handleLanguageChange);
            
            return () => {
                window.electronAPI.removeListener('language-changed', handleLanguageChange);
            };
        }
    }, []);
    
    return {
        t,
        setLanguage,
        getLanguage
    };
}
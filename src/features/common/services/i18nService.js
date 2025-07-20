const { ipcMain, BrowserWindow } = require('electron');
const settingsService = require('../../settings/settingsService');

// Initialize i18n service with language from settings
async function initializeLanguage() {
    try {
        const settings = await settingsService.loadSettings();
        const language = settings?.language || 'pt'; // Default to Portuguese
        
        // Broadcast language to all windows
        const windows = BrowserWindow.getAllWindows();
        windows.forEach(window => {
            window.webContents.send('language-changed', language);
        });
        
        return language;
    } catch (error) {
        console.error('Failed to initialize language:', error);
        return 'pt'; // Default to Portuguese on error
    }
}

// Handle language change requests
ipcMain.handle('i18n:set-language', async (event, lang) => {
    try {
        // Save to settings
        await settingsService.updateSettings({ language: lang });
        
        // Broadcast to all windows
        const windows = BrowserWindow.getAllWindows();
        windows.forEach(window => {
            window.webContents.send('language-changed', lang);
        });
        
        return { success: true };
    } catch (error) {
        console.error('Failed to set language:', error);
        return { success: false, error: error.message };
    }
});

// Get current language
ipcMain.handle('i18n:get-language', async () => {
    try {
        const settings = await settingsService.loadSettings();
        return settings?.language || 'pt';
    } catch (error) {
        console.error('Failed to get language:', error);
        return 'pt';
    }
});

module.exports = {
    initializeLanguage
};
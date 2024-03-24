let settings = readSettingsFromLocalStorage();

export function readSettingsFromLocalStorage() {
    const settingsString = localStorage.getItem('settings');
    if (settingsString) {
        return JSON.parse(settingsString);
    } else {
        const defaultSettings = {
            IntelgentPast: false,
            formateCopy: false,
            formate: ""
        };
        writeSettingsToLocalStorage(defaultSettings);
        return defaultSettings;
    }
}

export function writeSettingsToLocalStorage(settings) {
    const settingsString = JSON.stringify(settings);
    localStorage.setItem('settings', settingsString);
}

function updateSettingGui() {
    const settingsgui = readSettingsFromLocalStorage();
    const chk_formateCopy = document.getElementById('chk_formateCopy');
    chk_formateCopy.checked = settingsgui.formateCopy;
    const chk_IntelgentPast = document.getElementById('chk_IntelgentPast');
    chk_IntelgentPast.checked = settingsgui.IntelgentPast;
    const txt_formate = document.getElementById('txt_formate');
    txt_formate.value = settingsgui.formate;
}

try{
updateSettingGui();
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('txt_formate').addEventListener('input', function (event) {
        settings.formate = event.target.value;
        console.log(settings.formate);
        writeSettingsToLocalStorage(settings);
    });
    document.getElementById('chk_formateCopy').addEventListener('change', function () {
        settings.formateCopy = this.checked ? true : false;
        console.log(settings.formateCopy);
        writeSettingsToLocalStorage(settings);
    });
    document.getElementById('chk_IntelgentPast').addEventListener('change', function () {
        settings.IntelgentPast = this.checked ? true : false;
        console.log(settings.IntelgentPast);
        writeSettingsToLocalStorage(settings);
    });
});
}
catch(Uncaught){}
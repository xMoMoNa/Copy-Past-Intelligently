import { readSettingsFromLocalStorage } from './settings.js';
let settings = readSettingsFromLocalStorage();
let IntelgentPast;
let formateCopy;
let formate;

function extractUrls(text) {
    const urlRegex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))/gi;
    return text.match(urlRegex);
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('copyBtn').addEventListener('click', copyTabs);
    document.getElementById('pasteBtn').addEventListener('click', pasteTabs);
    document.getElementById('openRandomBtn').addEventListener('click', openRandomTab);
    document.getElementById('openReverseBtn').addEventListener('click', openTabsInReverse);
    document.getElementById('openTabsRandomlyBtn').addEventListener('click', openTabsRandomly);
});


function copyTabs() {
    formate = settings.formate
    formateCopy = settings.formateCopy;
    if (formateCopy) {
        chrome.windows.getCurrent({ populate: true }, function (window) {
            let tabUrls = window.tabs.map(tab => tab.url);
            let tabTitles = window.tabs.map(tab => tab.title);
            let url_title = [];
            for (let i = 0; i < tabUrls.length; i++) {
                let x = formate;
                x = x.replace("$url", tabUrls[i]);
                x = x.replace("$title", tabTitles[i]);
                url_title.push(x);
            }
            let clipboardContent = url_title.join('');
            navigator.clipboard.writeText(clipboardContent)

                .catch(error => console.error('Failed to copy tabs URLs: ', error));
        });
    }
    else {
        chrome.windows.getCurrent({ populate: true }, function (window) {
            let tabUrls = window.tabs.map(tab => tab.url);
            let clipboardContent = tabUrls.join('\n');
            navigator.clipboard.writeText(clipboardContent)

                .catch(error => console.error('Failed to copy tabs URLs: ', error));
        });
    }
    window.close();
}

function pasteTabs() {
    IntelgentPast = settings.IntelgentPast
    if (IntelgentPast) {
        navigator.clipboard.readText()
            .then(text => {
                let urls = extractUrls(text);
                urls.forEach(url => {
                    chrome.tabs.create({ url: url });
                });
            })
            .catch(error => console.error('Failed to open tabs: ', error));
    }
    else {
        navigator.clipboard.readText()
            .then(text => {
                let urls = text.split('\n');
                urls.forEach(url => {
                    chrome.tabs.create({ url: url });
                });
            })
            .catch(error => console.error('Failed to open tabs: ', error));
    }
    window.close();
}

function openRandomTab() {
    IntelgentPast = settings.IntelgentPast
    if (IntelgentPast) {
        navigator.clipboard.readText()
            .then(text => {
                let urls = extractUrls(text);
                let randomIndex = Math.floor(Math.random() * urls.length);
                chrome.tabs.create({ url: urls[randomIndex] });
            })
            .catch(error => console.error('Failed to open tab: ', error));
    }
    else {
        navigator.clipboard.readText()
            .then(text => {
                let urls = text.split('\n');
                let randomIndex = Math.floor(Math.random() * urls.length);
                chrome.tabs.create({ url: urls[randomIndex] });
            })
            .catch(error => console.error('Failed to open tab: ', error));
    }
    window.close();
}

function openTabsRandomly() {
    IntelgentPast = settings.IntelgentPast
    if (IntelgentPast) {
        navigator.clipboard.readText()
            .then(text => {
                let urls = extractUrls(text);
                let randomUrls = [];
                while (urls.length > 0) {
                    let randomIndex = Math.floor(Math.random() * urls.length);
                    randomUrls.push(urls[randomIndex]);
                    urls.splice(randomIndex, 1);
                }
                randomUrls.forEach(url => {
                    chrome.tabs.create({ url: url });
                });
            })
            .catch(error => console.error('Failed to open tabs: ', error));
    }
    else {
        navigator.clipboard.readText()
            .then(text => {
                let urls = text.split('\n');
                let randomUrls = [];
                while (urls.length > 0) {
                    let randomIndex = Math.floor(Math.random() * urls.length);
                    randomUrls.push(urls[randomIndex]);
                    urls.splice(randomIndex, 1);
                }
                randomUrls.forEach(url => {
                    chrome.tabs.create({ url: url });
                });
            })
            .catch(error => console.error('Failed to open tabs: ', error));

    }
    window.close();
}

function openTabsInReverse() {
    IntelgentPast = settings.IntelgentPast
    if (IntelgentPast) {
        navigator.clipboard.readText()
            .then(text => {
                let urls = extractUrls(text);
                urls.reverse().forEach(url => {
                    chrome.tabs.create({ url: url });
                });
            })
            .catch(error => console.error('Failed to open tabs: ', error));
    }
    else {
        navigator.clipboard.readText()
            .then(text => {
                let urls = text.split('\n');
                urls.reverse().forEach(url => {
                    chrome.tabs.create({ url: url });
                });
            })
            .catch(error => console.error('Failed to open tabs: ', error));

    }
    window.close();
}

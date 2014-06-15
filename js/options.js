function saveOptions() {
    var iconEmoji        = document.getElementById('iconEmoji').value;
    var webhookSubdomain = document.getElementById('webhookSubdomain').value;
    var webhookToken     = document.getElementById('webhookToken').value;

    chrome.storage.sync.set({
        iconEmoji        : iconEmoji,
        webhookSubdomain : webhookSubdomain,
        webhookToken     : webhookToken
    }, function() {
            var status         = document.getElementById('status');
            status.textContent = 'Options saved.';
            
            setTimeout(function() {
                status.textContent = '';
            }, 750);
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        iconEmoji        : ':hex:',
        webhookSubdomain : null,
        webhookToken     : null
    }, function(values) {
        document.getElementById('webhookSubdomain').value = values.webhookSubdomain || '';
        document.getElementById('webhookToken').value     = values.webhookToken || '';
        document.getElementById('iconEmoji').value        = values.iconEmoji || ':hex:';
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
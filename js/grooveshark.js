javascript:(function() {
    var currentSongID;
    var iconEmoji;
    var webhookSubdomain;
    var webhookToken;
    var webhookUri = 'slack.com/services/hooks/incoming-webhook?token=';

    function linkify($link) {
        return $link.text();
    };

    function updateSongStatus() {
        var $artistName = $('.now-playing-link.artist');
        var $songName   = $('.now-playing-link.song');
        var $username   = $('#profile-button .title');

        var songID = $artistName.text() + ' - ' + $songName.text();

        if ($artistName.text() && $songName.text() && (currentSongID !== songID))
        {
            var payload = {
                icon_emoji : iconEmoji,
                text       : linkify($artistName) + ' - ' + linkify($songName),
                username   : $username.text()
            };

            currentSongID = songID;

            if (webhookSubdomain && webhookToken)
            {
                $.post(
                    'https://' + webhookSubdomain + '.' + webhookUri + webhookToken,
                    JSON.stringify(payload),
                    null,
                    'json'
                );
            }
            else
            {
                if ( ! webhookSubdomain)
                    throw 'Error: missing webhook subdomain';
             
                if ( ! webhookToken)
                    throw 'Error: missing webhook token';
            }
        }
    };

    chrome.storage.sync.get({
        iconEmoji        : ':hex:',
        webhookSubdomain : null,
        webhookToken     : null
    }, function(values) {
        iconEmoji        = values.iconEmoji;
        webhookSubdomain = values.webhookSubdomain;
        webhookToken     = values.webhookToken;

        updateSongStatus();
        setInterval(updateSongStatus, 5000);
    });
})();
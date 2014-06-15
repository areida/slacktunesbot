javascript:(function() {
    var currentSongID;
    var iconEmoji;
    var webhookSubdomain;
    var webhookToken;
    var webhookUri = 'slack.com/services/hooks/incoming-webhook?token=';

    function linkify($link) {
        return '<' + $link.attr('href') + '|' + $link.text() +'>';
    };

    function updateSongStatus() {
        var $artistName = $('.currentSongDetails .title');
        var $songName   = $('.currentSongAdditionalDetails a:first-child');
        var $username   = $('.greeting');
        var songID      = $artistName.text() + ' - ' + $songName.text();

        if ($artistName.length && $songName.length && $username.length && (currentSongID !== songID))
        {
            var usernameParts = $username.text().split(' ');
            var payload = {
                icon_emoji : iconEmoji,
                text       : linkify($artistName) + ' - ' + linkify($songName),
                username   : (usernameParts[1] + ' ' + usernameParts[2]).split('.')[0]
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
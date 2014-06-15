javascript:(function() {
    var currentSongID;
    var iconEmoji;
    var webhookSubdomain;
    var webhookToken;
    var webhookUri = 'slack.com/services/hooks/incoming-webhook?token=';

    function linkify($link) {
        var url = 'http://rdio.com' + $link.attr('href');

        return '<' + url + '|' + $link.text() +'>';
    };

    function updateSongStatus() {
        var $artistName = $('.App_PlayerFooter .artist_title');
        var $songName   = $('.App_PlayerFooter .song_title');
        var $songID     = $('.App_PlayerFooter .text_metadata .drag_container');
        var $username   = $('.username_link');

        if ($songID.length && (currentSongID !== $songID.text()))
        {
            var payload = {
                icon_emoji : iconEmoji,
                text       : linkify($artistName) + ' - ' + linkify($songName),
                username   : $username.text()
            };

            currentSongID = $songID.text();

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
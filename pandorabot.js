javascript:(function() {
    var webhookUri = 'slack.com/services/hooks/incoming-webhook?token=';
    var webhookUrl = 'https://' + window.webhookSubdomain + '.' + webhookUri + window.webhookToken;

    var currentSongID;

    function linkify($link) {
        return '<' + $link.attr('href') + '|' + $link.text() +'>';
    };

    function updateSongStatus() {
        var $artistName = $('.playerBarArtist');
        var $songName   = $('.playerBarSong');

        var songID = $artistName.text() + ' - ' + $songName.text();

        if (currentSongID !== songID)
        {
            var payload = {
                icon_emoji : ':parking:',
                text       : linkify($artistName) + ' - ' + linkify($songName),
                username   : window.webhookUsername
            };

            currentSongID = songID;

            $.post(
                webhookUrl,
                JSON.stringify(payload),
                null,
                'json'
            );
        }
    };

    updateSongStatus();
    setInterval(updateSongStatus, 5000);
})();
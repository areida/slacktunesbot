javascript:(function() {
    var webhookUri = 'slack.com/services/hooks/incoming-webhook?token=';
    var webhookUrl = 'https://' + window.webhookSubdomain + '.' + webhookUri + window.webhookToken;

    var currentSongID;

    function linkify($link) {
        var url = 'http://rdio.com' + $link.attr('href');

        return '<' + url + '|' + $link.text() +'>';
    };

    function updateSongStatus() {
        var songID = $('.App_PlayerFooter .text_metadata .drag_container').text();

        if (currentSongID !== songID)
        {
            var $artistName = $('.App_PlayerFooter .artist_title');
            var $songName   = $('.App_PlayerFooter .song_title');

            var payload = {
                icon_emoji : ':notes:',
                text       : linkify($artistName) + ' - ' + linkify($songName),
                username   : window.webhookUsername
            };

            currentSongID = songID;

            $.post(
                'https://' + window.webhookSubdomain + '.' + webhookUri + window.webhookToken,
                JSON.stringify(payload),
                null,
                'json'
            );
        }
    };

    updateSongStatus();
    setInterval(updateSongStatus, 5000);
})();
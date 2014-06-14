javascript:(function() {
    var webhookUri = 'slack.com/services/hooks/incoming-webhook?token=';
    var webhookUrl = 'https://' + window.webhookSubdomain + '.' + webhookUri + window.webhookToken;

    var currentSongID;

    function updateSongStatus() {
        var songStatus = window.Grooveshark.getCurrentSongStatus();

        if (songStatus && songStatus.status === 'playing')
        {
            var song = songStatus.song;

            if (currentSongID !== song.songID)
            {
                var payload = {
                    icon_emoji : ':shark:',
                    text       : song.artistName + ' - ' + song.songName,
                    username   : window.webhookUsername
                };

                currentSongID = song.songID;

                $.post(
                    webhookUrl,
                    JSON.stringify(payload),
                    null,
                    'json'
                );
            }
        }
    };

    if (window.Grooveshark)
    {
        updateSongStatus();
        setInterval(updateSongStatus, 5000);
    }
})();
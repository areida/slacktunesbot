javascript:(function() {
    var webhookUri = 'slack.com/services/hooks/incoming-webhook?token=';
    var webhookUrl = 'https://' + window.webhookSubdomain + '.' + webhookUri + window.webhookToken;
    
    var currentSongID;

    var jQuery    = document.createElement('script');
    jQuery.src    = '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
    jQuery.onload = execute;
    document.body.appendChild(jQuery);

    function updateSongStatus() {
        var $artistName = $('.currentSongDetails .title');
        var $songName   = $('.currentSongAdditionalDetails a:first-child');
        var songID      = $artistName.text() + ' - ' + $songName.text();

        if (currentSongID !== songID)
        {
            var payload = {
                icon_emoji : ':metal:',
                text       : songID,
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

    function execute() {
        updateSongStatus();
        setInterval(updateSongStatus, 5000);
    };
})();
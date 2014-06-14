## Installation Instruction
1. Choose a script source for your music platform
  * Amazon Prime: `https://raw.githubusercontent.com/areida/slacktunesbot/master/amazonprimebot.js`
  * Grooveshark: `https://raw.githubusercontent.com/areida/slacktunesbot/master/groovesharkbot.js`
  * Pandora: `https://raw.githubusercontent.com/areida/slacktunesbot/master/pandorabot.js`
  * Rdio: `https://raw.githubusercontent.com/areida/slacktunesbot/master/rdiobot.js`
2. Build a javscript bookmarklet from this template:
    ``` javascript
    javascript: (function () {
    	var scriptSource        = '[script source]';
    	window.webhookSubdomain = 'synapse';
    	window.webhookToken     = '[token]';
    	window.webhookUsername  = '[name]';
    
        var application = document.createElement('script');
        application.src = scriptSource;
        document.body.appendChild(application);
     }());
     ```
3. Add your bookmarklet to Chrome
  * Open the Bookmark Manager (`Ctrl + Shift + O` or `Hamburger -> Bookmarks -> Bookmarks Manager`)
  * Right Click -> Add Page
  * Name the bookmark and put the bookmarklet you created as the URL
4. Open your music playing platform
5. When the page is loaded click the bookmark

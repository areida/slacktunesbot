javascript: (function () {
	var scriptSource        = '[script source]';
	window.webhookSubdomain = 'synapse';
	window.webhookToken     = '[token]';
	window.webhookUsername  = '[full name]';

    var application = document.createElement('script');
    application.src = scriptSource;
    document.body.appendChild(application);
 }());
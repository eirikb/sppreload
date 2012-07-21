// http://stackoverflow.com/questions/756382/bookmarklet-wait-until-javascript-is-loaded
(function() {
    var i, p;

    genius.loadScript = function (name, url, callback) {
        if (arguments.length === 1) return genius.preload.push({ url: name });
        if (typeof url === 'function') {
            callback = url;
            url = null;
        }
        if (genius.loaded[name]) return callback();

        if (name && !genius.callbacks[name]) genius.callbacks[name] = [];
        if (callback) genius.callbacks[name].push(callback);
        if (url) loadScript({ name: name, url: url, callback: callback });
    };

    for (i = 0; i < genius.preload.length; i++) {
        p = genius.preload[i];
        genius.loadScript(p.name, p.url, p.callback);
    }

    function loadScript(preload) {
        var head, script, done;
        head = document.getElementsByTagName('head')[0];
        script = document.createElement('script');
        script.src = preload.url;

        // Attach handlers for all browsers
        done = false;
        if (preload.name) {
            script.onload = script.onreadystatechange = function() {
                var j, callbacks;

                if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                    done = true;
                    genius.loaded[preload.name] = true;
                    // Continue your code
                    callbacks = genius.callbacks[preload.name];
                    if (callbacks) {
                        for (j = 0; j < callbacks.length; j++) {
                            callbacks[j]();
                        }
                    }
                    // Handle memory leak in IE
                    script.onload = script.onreadystatechange = null;
                    head.removeChild(script);
                }
            };
        }
        head.appendChild(script);
    }
})();
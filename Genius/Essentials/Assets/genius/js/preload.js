// http://stackoverflow.com/questions/756382/bookmarklet-wait-until-javascript-is-loaded
(function() {
    var i, p;

    genius.loaded = { };
    genius.callbacks = { };

    genius.load = function (type, name, url, callback) {
        if (!genius.loaded[type]) genius.loaded[type] = { };
        if (!genius.callbacks[type]) genius.callbacks[type] = { };

        if (!url && !callback) return load({ type: type, url: name });
        if (typeof url === 'function') {
            callback = url;
            url = null;
        }

        if (genius.loaded[type][name]) return callback();

        if (name && !genius.callbacks[type][name]) genius.callbacks[type][name] = [];
        if (callback) genius.callbacks[type][name].push(callback);
        if (url) load({ type: type, name: name, url: url, callback: callback });
    };

    genius.loadScript = function(name, url, callback) {
        genius.load('script', name, url, callback);
    };

    genius.loadStyle = function(name, url, callback) {
        genius.load('style', name, url, callback);
    };

    for (i = 0; i < genius.preload.length; i++) {
        p = genius.preload[i];
        genius.load(p.type, p.name, p.url, p.callback);
    }

    function load(preload) {
        var head, element, done;

        head = document.getElementsByTagName('head')[0];
        if (preload.type === 'script') {
            element = document.createElement('script');
            element.src = preload.url;
        } else {
            element = document.createElement('link');
            element.rel = 'stylesheet';
            element.href = preload.url;
        }

        // Attach handlers for all browsers
        done = false;
        if (preload.name) {
            element.onload = element.onreadystatechange = function () {
                var j, callbacks;

                if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                    done = true;
                    genius.loaded[preload.type][preload.name] = true;
                    // Continue your code
                    callbacks = genius.callbacks[preload.type][preload.name];
                    if (callbacks) {
                        for (j = 0; j < callbacks.length; j++) {
                            callbacks[j]();
                        }
                    }
                    // Handle memory leak in IE
                    element.onload = element.onreadystatechange = null;
                    head.removeChild(element);
                }
            };
        }
        head.appendChild(element);
    }
})();
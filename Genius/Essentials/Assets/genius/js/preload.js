// http://stackoverflow.com/questions/756382/bookmarklet-wait-until-javascript-is-loaded
(function() {
    var i, p;

    function loadScript(preload) {
        var head, script;
        head = document.getElementsByTagName('head')[0];
        script = document.createElement('script');
        script.src = preload.url;

        // Attach handlers for all browsers
        var done = false;
        script.onload = script.onreadystatechange = function() {
            var j;
            if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                done = true;
                // Continue your code
                for (j = 0; j < genius.callbacks[preload.name].length; j++) {
                    genius.callbacks[preload.name][j]();
                }
                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;
                head.removeChild(script);
                genius.loaded[preload.name] = true;
            }
        };
        head.appendChild(script);
    }

    for (i = 0; i < genius.preload.length; i++) {
        p= genius.preload[i];
        if (!genius.callbacks[p.name]) {
            genius.callbacks[p.name] = [];
            loadScript(p);
        }
        if (p.callback) genius.callbacks[p.name].push(p.callback);
    }
})();
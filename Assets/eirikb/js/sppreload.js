(function() {

    var js = { };
    var queue = [];

    function each(array, cb) {
        for (var i = 0; i < array.length; i++) {
            cb(array[i], i);
        }
    }

    each(loadcss.l, function(src) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = src[0];
        document.head.appendChild(link);
    });

    each(loadjs.l, function(script) {
        var hasDeps = Object.prototype.toString.call(script[0]) === '[object Array]';

        script = Array.prototype.slice.call(script, 0);

        if (hasDeps) queue.push(script);
        else preload(script);
    });

    // Finally set loadjs to loadScript for convenience
    window.loadjs = loadScript;

    function preload(script) {
        if (script.length === 1) {
            loadScript(script[0]);
            return;
        }

        var name = script[0];
        var url = script[1];
        if (js[name]) return;

        loadScript(url, function() {
            js[name] = true;
            onScriptLoaded(name);
        });
    }

    function onScriptLoaded(name) {
        each(queue, function(script) {
            var index = script[0].indexOf(name);
            if (index < 0) return;

            script[0].splice(index, 1);
            if (script[0].length === 0) preload(script.slice(1));
        });
    }

    // http://stackoverflow.com/questions/756382/bookmarklet-wait-until-javascript-is-loaded

    function loadScript(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = url;

        var done = false;
        if (callback) {
            script.onload = script.onreadystatechange = function() {
                if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                    done = true;

                    callback();

                    script.onload = script.onreadystatechange = null;
                    head.removeChild(script);
                }
            };
        }

        head.appendChild(script);
    }

})();
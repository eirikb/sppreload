# SPPreload

Preloading for SharePoint sandboxed solutions (SharePoint Online support).  

Including JavaScript and CSS into SharePoint is not always pretty, and there are several ways of doing it.  
This solutions presents a way to standarize inclusion of scripts and styles to any SharePoint version.  
And prevent duplication of scripts at the same time.

## Usage

```javascript
// Load jQuery, both http and https
loadjs('jquery', '//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');

// Load underscore
loadjs('underscore', '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js');

// Try to load jQuery once again, it will not load more than once so this will be ignored
loadjs('jquery', 'http://code.jquery.com/jquery.min.js');

// Load your own script, depending on jQuery and underscore
loadjs(['jquery', 'underscore'], 'mymodule', '/scripts/mymodule.js');

// Load another of your scripts depending on mymodule, no need to give it a name
loadjs(['mymodule'], '/scripts/myohtermodule.js');

// Load a independent script
loadjs('/scripts/myutils.js');

// Load some styles
loadcss('/styles/mystyls.css');
```
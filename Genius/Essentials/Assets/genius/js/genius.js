genius.loadScript('jquery', function() {
    $(function() {
        // This ensures that all scripts are added and run
        if (!SP.ClientContext && typeof _spBodyOnLoadWrapper !== 'undefined') _spBodyOnLoadWrapper();
    });
});
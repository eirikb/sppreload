genius.loadScript('jquery', function() {
    console.log('test');
    $(function() {
        // This ensures that all scripts are added and run
        if (!SP.ClientContext && typeof _spBodyOnLoadWrapper !== 'undefined') _spBodyOnLoadWrapper();
    });
});
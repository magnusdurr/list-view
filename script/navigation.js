var eaNav = (function () {
    var defaultContent = '/content/intro.html';

    // triggered by internal links
    var internalLink = function (event) {
        event.preventDefault();
        navigateTo($(this).attr("href"))
    };

    // triggered by history.back
    var historyBack = function (event) {
        console.debug("[nav] pop state", event.originalEvent.state);
        var state = event.originalEvent.state;

        if (state !== null)
        {
            loadContent(state.url);
        }
        else
        {
            loadContent(defaultContent);
        }
    };

    var navigateTo = function (url) {
        if (!history.state || url !== history.state.url)
        {
            console.debug("[nav] push state", url);
            history.pushState({
                url: url
            }, null, null);
        }

        loadContent(url);
    };

    var reloadPage = function () {
        // Default landing page if history is empty
        if (!history.state || !history.state.url)
        {
            navigateTo(defaultContent);
        }
        else
        {
            navigateTo(history.state.url);
        }
    };

    var loadContent = function (page) {
        $("#content").load(page);
    };

    return {
        to: navigateTo,
        reload: reloadPage,
        linkHandler: internalLink,
        historyBackHandler: historyBack
    }
})();
define(['jquery'], function($) {
    return $.ajax({
        url: 'https://cdn.rawgit.com/ozh/github-colors/master/colors.json',
        cache: true,
        async: false,
        success: function(data) { return data }
    })
})

define(['jquery'], function() {
    return $.getJSON('//cdn.rawgit.com/doda/github-language-colors/master/colors.json',
            function(data) {
        return data
    })
})

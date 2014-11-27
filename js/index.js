require.config({
    paths: {
        text: 'text.min',
        json: 'json.min',

        d3: '//cdnjs.cloudflare.com/ajax/libs/d3/3.4.13/d3.min',
        jquery: '//code.jquery.com/jquery-1.11.0.min'
    }
})

require(['jquery', 'd3'], function($, d3, colors) {
    var width  = $(window).width(),
        height = $(window).height()

    $.when(
        $.get('https://cdn.rawgit.com/doda/github-language-colors/master/colors.json')
    )
})

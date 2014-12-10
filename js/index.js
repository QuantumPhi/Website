require.config({
    paths: {
        text: 'text.min',
        json: 'json.min',
        colors: 'colors.min',
        repos: 'repos.min',

        d3: '//cdnjs.cloudflare.com/ajax/libs/d3/3.4.13/d3.min',
        jquery: '//code.jquery.com/jquery-1.11.0.min'
    }
})

require(['jquery', 'd3'], function($, d3) {
    var width  = $(window).width(),
        height = $(window).height()

    var color = function(language) {
            if(language === null)
                return [76, '#2c3e50']
            return colors[language]
        },
        force = d3.layout.force()
            .charge(-240)
            .linkDistance(100)
            .size([width, height]),
        svg = d3.select('#content')
            .append('svg')
            .attr('width', width)
            .attr('height', height)

    var nodes = function() {
        var array = [{
            'index': 0,
            'color': '#000',
            'group': -1,
            'name': 'ME!'
        }]
        $.each(repos, function(key, value) {
            array.push({
                'index': key + 1,
                'color': color(value['language'])[1],
                'group': color(value['language'])[0],
                'name': value['name']
            })
        })
        return array
    }()

    var links = function() {
        var array = []
        for(var i = 1; i < nodes.length; i++)
            array.push({
                'source': 0,
                'target': i
            })
        return array
    }()

    force
        .nodes(nodes)
        .links(links)
        .start();

    var node = svg.selectAll('.node')
            .data(nodes)
        .enter().append('circle')
            .attr('class', 'node')
            .style('r', 10)
            .style('fill', function(d) { return d.color })
            .call(force.drag)

    node.append('title')
        .text(function(d) { return d.name })

    force.on('tick', function() {
        node.attr('cx', function(d) { return d.x })
            .attr('cy', function(d) { return d.y; })
    })
})

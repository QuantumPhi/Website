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

require(['jquery', 'd3', 'colors', 'repos'], function($, d3) {
    var width  = $(window).width(),
        height = $(window).height(),
        colors = require('colors').responseJSON,
        repos = require('repos').responseJSON

    var color = function(language) {
            if(language == null)
                return [76, '#2c3e50']
            return colors[language].color
        },
        force = d3.layout.force()
            .charge(-300)
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
            'name': 'ME!',
            'url': 'https://github.com/QuantumPhi'
        }]
        $.each(repos, function(key, value) {
            array.push({
                'index': key + 1,
                'color': color(value['language']),
                'group': color(value['language']),
                'name': value['name'],
                'url': value['html_url']
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
        .enter()
            .append('circle')
                .attr('class', 'node')
                .attr('r', 10)
                .style('fill', function(d) { return d.color })
                //.on('click', function(d) { window.open(d.url) }) <- Allow movement of graph
                .on('mouseover', function(d) {
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .attr('r', 25)
                })
                .on('mouseout', function(d) {
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .attr('r', 10)
                })
                .call(force.drag)

    force.on('tick', function() {
        node.attr('cx', function(d) { return d.x })
            .attr('cy', function(d) { return d.y; })
    })
})

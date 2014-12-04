require.config({
    paths: {
        text: 'text.min',
        json: 'json.min',

        d3: '//cdnjs.cloudflare.com/ajax/libs/d3/3.4.13/d3.min',
        jquery: '//code.jquery.com/jquery-1.11.0.min'
    }
})

require(['jquery', 'd3', 'json!../res/colors.json', 'json!../res/repos.json'], function($, d3, colors, repos) {
    var width  = $(window).width(),
        height = $(window).height()

    var color = function(language) {
            if(language === null)
                return [76, '#2c3e50']
            return colors[language]
        },
        force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
            .size([width, height]),
        svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height)

    var nodes = function() {
        var array = []
        $.each(repos, function(index, repo) {
            array.push({
                'index': index,
                'color': color(repo['language'])[1],
                'group': color(repo['language'])[0],
                'name': repo['name']
            })
        })
        return array
    }()

    force
        .nodes(nodes)
        .start();

    var node = svg.selectAll(".node")
            .data(nodes)
        .enter().append("circle")
            .attr("class", "node")
            .attr("r", 5)
            .style("fill", function(d) { return d.color })
            .call(force.drag)

    node.append("title")
        .text(function(d) { return d.name })

    force.on("tick", function() {
        node.attr("cx", function(d) { return d.x })
            .attr("cy", function(d) { return d.y; })
    })
})

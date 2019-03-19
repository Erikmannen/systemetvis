function paraCords(data) {
    var clientHeight = document.getElementById('paradiv').clientHeight;
    var clientWidth = document.getElementById('paradiv').clientWidth;
    var margin = {
            top: 30,
            right: 50,
            bottom: 10,
            left: 50
        },
        width = clientWidth - margin.left - margin.right,
        height = clientHeight - margin.top - margin.bottom;
    var keys = Object.keys(data);
    var temp = data[keys[0]]
    var axisnames = [];
    for (var i = 0; i < temp.length - 1; i++) {
        axisnames[i] = (Object.keys(temp[i]))[0]
    }
    var svgs = document.getElementsByTagName("svg");
    var drawLinesNow;
    if (svgs.length >= 1) {
        d3.select("#paradiv").select("svg").remove();
        drawLinesNow = 1;
    } else {
        drawLinesNow = 0;
    }
    var pcSvg = d3.select("#paradiv").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // Define drag beavior
    var dragging = {};
    var paraCo = setupPC(axisnames, data)
    // Parse the Data
    function setupPC(axisnames, dataset) {
        var color = d3.scaleLinear().domain([1, 20]).clamp(true).range(['#fff', '#409A99']);
        var utanRike = Object.values(dataset)
        utanRike.pop();
        var len = Object.keys(dataset).length;
        // For each dimension, I build a linear scale. I store all in a y object
        dimensions = axisnames;
        // For each dimension, I build a linear scale. I store all in a y object
        var y = {}
        var domainvar = {};
        for (i in dimensions) {
            domainvar[i] = [d3.extent(utanRike, function(d) {
                returnvar = Object.values(d[i])[0].replace(/ /g, '');
                return +returnvar;
            })]
            name = dimensions[i]
            y[name] = d3.scaleLinear().domain(domainvar[i][0]).range([height, 0])
        }
        // Build the X scale -> it find the best position for each Y axis
        x = d3.scalePoint().range([0, width]).domain(dimensions);
        var dkeys = Object.keys(utanRike[0]);
        var cats = Array(dkeys.length);
        for (var i = 0; i < dkeys.length; i++) {
            cats[i] = Object.keys(utanRike[0][dkeys[i]])[0];
        }
        // The path function used to draw lines
        function path(d) {
            var counter = 0;
            return d3.line()(dimensions.map(function(p) {
                var ci = cats.findIndex(cat => cat == p);
                var value = Object.values(d[ci])[0].replace(/ /g, '');
                counter = counter + 1;
                return [position(p), y[p](value)];
            }));
        }
        var lan = Object.values(data[keys[0]])
        // Add blue lineLayer lines for focus.
        if (drawLinesNow) {
            // Draw lines
            var lineLayer = pcSvg.append("g").attr("class", "lineLayer").selectAll("path").data(utanRike).enter().append("path").attr("d", path).style("fill", "none").style("stroke", function(d) {
                return (color(20))
            }).style("opacity", 0.5);
        }
        // Create axisgroup
        var parac = pcSvg.selectAll("myAxis")
            // For each dimension of the dataset I add a 'g' element:
            .data(dimensions).enter().append("g").attr("class", "axis").attr("transform", function(d) {
                return "translate(" + x(d) + ")";
            })
            // handle draging of axis
            .call(d3.drag().subject(function(d) {
                return {
                    x: x(d)
                };
            }).on("start", function(d) {
                dragging[d] = x(d);
            }).on("drag", function(d) {
                dragging[d] = Math.min(width, Math.max(0, d3.event.x));
                lineLayer.attr("d", path);
                dimensions.sort(function(a, b) {
                    return position(a) - position(b);
                });
                x.domain(dimensions);
                parac.attr("transform", function(d) {
                    return "translate(" + position(d) + ")";
                })
            }))
        // Add an axis and title. (so we can see it)
        parac.append("g").attr("class", "axis").each(function(d) {
            d3.select(this).call(d3.axisLeft(y[d]));
        }).append("text").attr("fill", "black").style("text-anchor", "middle").attr("y", -9).text(function(d) {
            return d;
        });
    }

    function position(d) {
        var v = dragging[d];
        return v == null ? x(d) : v;
    }
};
function updateparaCords(data) {
    // Setup size for parallel coordinates
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
    // Names of axis used in parallel coordinates
    var keys = Object.keys(data);
    var temp = data[keys[0]]
    var axisnames = [];
    for (var i = 0; i < temp.length - 1; i++) {
        axisnames[i] = (Object.keys(temp[i]))[0]
    }
    // Because it already exists it can always be deleted and created.
    var svgs = document.getElementsByTagName("svg");
    var pcSvg = d3.select("#paradiv").select("svg")
    d3.select("#paradiv").select("svg").remove();
    var pcSvg = d3.select("#paradiv").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var drawLines = (chosenData >= 0)
    // Define drag beavior
    var dragging = {};
    // Colors for lines and tooldips declearation.
    var div = d3.select("body").append("div").attr("class", "tooltip").style("display", "none");
    var color = d3.scaleLinear().domain([0, 1, 2, 3, 4]).range(['#7f7fff', '#0d0b0d', '#7acc7a', '#ff7f7f', 'orange']);
    var lineLayer = {};
    // To display 4 quarters
    fyraKvartal = {};
    for (var i = 0; i < 4; i++) {
        if (chosenData < 0) {
            fyraKvartal[i] = data_vals[0 + i];
        } else {
            fyraKvartal[i] = data_vals[chosenData + i]
        }
    }
    var paraCo = setupPC(axisnames, fyraKvartal)
    // Parse the Data
    function setupPC(axisnames, indataset) {
        // Step 1 , define all axis used ( will be same for each quarter)
        var y = {}
        var domainvar = {}
        var finaldomain = {};
        // For each dimension/axisname
        dimensions = axisnames;
        // For each dimension create a linear scale
        for (var n = 0; n < 4; n++) {
            var da = fyraKvartal[n][0];
            var rik = Object.values(da);
            rik.pop(); // Dont want totalt rike
            for (i in dimensions) {
                domainvar[i] = [d3.extent(rik, function(d) {
                    returnvar = Object.values(d[i])[0].replace(/ /g, '');
                    return +returnvar;
                })]
                if (n == 0) { // first time set previous limits for max and min
                    finaldomain[i] = new Array(2)
                    finaldomain[i][0] = Infinity;
                    finaldomain[i][1] = 0;
                }
                // Final domain that is used to scale each axis so data for all 4 quarters fits.
                finaldomain[i] = [Math.min((domainvar[i][0])[0], finaldomain[i][0]), Math.max((domainvar[i][0])[1], finaldomain[i][1])];
            }
        }
        for (i in dimensions) {
            name = dimensions[i]
            y[name] = d3.scaleLinear().domain([finaldomain[i][0], finaldomain[i][1]]).range([height, 0])
        }
        for (var k = 0; k < 4; k++) { // For each quarter
            dataset = fyraKvartal[k][0];
            //Blue Quarter 1 , Yellow Quarter 2 ,Green Quarter 3,Red Quarter 4
            var utanRike = Object.values(dataset)
            utanRike.pop(); // pop total rike
            var len = Object.keys(dataset).length;
            // find best position for each Y axis
            x = d3.scalePoint().range([0, width]).domain(dimensions);
            var dkeys = Object.keys(utanRike[0]);
            var cats = Array(dkeys.length);
            for (var i = 0; i < dkeys.length; i++) {
                cats[i] = Object.keys(utanRike[0][dkeys[i]])[0];
            }
            // The path function is used to draw lines.
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
            if (drawLines) {
                // Draw lines
                lineLayer[k] = pcSvg.append("g").attr("class", "lineLayer").selectAll("path").data(utanRike).enter().append("path").attr("d", path).style("fill", "none").style("stroke", function(d) {
                    for (var i = 0; i < Object.values(fyraKvartal[k][0]).length; i++) {
                        //console.log(Object.values(data)[i])
                        if (Object.values(fyraKvartal[k][0])[i] == d) {
                            index = i;
                            continue;
                        }
                    }
                    // Is used when selecting counties
                    var thisLan = keys[index];
                    if (valtLan == "Totalt riket") return (color(k));
                    else if (valtLan == thisLan) {
                        return (color(4));
                    }
                    return (color(k))
                }).style("opacity", function(d) {
                    for (var i = 0; i < Object.values(fyraKvartal[k][0]).length; i++) {
                        //console.log(Object.values(data)[i])
                        if (Object.values(fyraKvartal[k][0])[i] == d) {
                            index = i;
                            continue;
                        }
                    }
                    var thisLan = keys[index];
                    if (valtLan == "Totalt riket") return 0.5;
                    else if (valtLan == thisLan) {
                        return 1;
                    }
                    return 0.5
                }).style("stroke-width", function(d) {
                    for (var i = 0; i < Object.values(fyraKvartal[k][0]).length; i++) {
                        //console.log(Object.values(data)[i])
                        if (Object.values(fyraKvartal[k][0])[i] == d) {
                            index = i;
                            continue;
                        }
                    }
                    var thisLan = keys[index];
                    if (valtLan == "Totalt riket") return 2;
                    else if (valtLan == thisLan) {
                        return 5;
                    }
                    return 2;
                }).on('mouseover', mouseover).on('mouseout', mouseout).on("mousemove", mousemove).on('click', clicked);
            }
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
                for (var l = 0; l < 4; ++l) { // To move every linelayer
                    lineLayer[l].attr("d", path);
                    dimensions.sort(function(a, b) {
                        return position(a) - position(b);
                    });
                    x.domain(dimensions);
                    parac.attr("transform", function(d) {
                        return "translate(" + position(d) + ")";
                    })
                }
            }).on("end", function(d) {
                delete dragging[d];
                transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
                for (var l = 0; l < 4; ++l) {
                    transition(lineLayer[l]).attr("d", path);
                }
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

    function transition(g) {
        return g.transition().duration(500);
    }

    function mousemove(d) {
        var index;
        for (var k = 0; k < 4; k++) {
            for (var i = 0; i < Object.values(fyraKvartal[k][0]).length; i++) {
                if (Object.values(fyraKvartal[k][0])[i] == d) {
                    index = i;
                    continue;
                }
            }
        }
        var lan = keys[index];
        div.text(lan).style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY) + "px");
    }

    function mouseover(d) {
        div.style("display", null);
        d3.select(this).moveToFront().style('stroke-width', '5').style("stroke", "orange").style('opacity', 1);
    }

    function mouseout(d) {
        var colorIndex;
        // return colors to normal
        for (var k = 0; k < 4; k++) {
            for (var i = 0; i < Object.values(fyraKvartal[k][0]).length; i++) {
                if (Object.values(fyraKvartal[k][0])[i] == d) {
                    colorIndex = k;
                    continue;
                }
            }
            for (var i = 0; i < Object.values(fyraKvartal[k][0]).length; i++) {
                if (Object.values(fyraKvartal[k][0])[i] == d) {
                    index = i;
                    continue;
                }
            }
            var thisLan = keys[index];
        }
        if (thisLan != valtLan || valtLan == "Totalt riket") {
            d3.select(this).style('stroke-width', '2').style("stroke", function(d) {
                return (color(colorIndex))
            }).style('opacity', 0.5)
        }
        div.style("display", "none");
    }

    function clicked(d) {
        if (d) {
            var index;
            // Find related line / county.
            for (var k = 0; k < 4; k++) {
                for (var i = 0; i < Object.values(fyraKvartal[k][0]).length; i++) {
                    if (Object.values(fyraKvartal[k][0])[i] == d) {
                        index = i;
                        continue;
                    }
                }
            }
            valtLan = keys[index]
        } else {
            valtLan = "Totalt riket";
        }
        var table = document.getElementById("tabell");
        table.rows[0].cells[0].innerHTML = valtLan;
        var header = document.getElementById("alcoholHeader");
        header.innerHTML = valtLan + "s alkoholvanor";
        var hitLan = false;
        createChart();
        changeImage()
    }
    //http://bl.ocks.org/eesur/4e0a69d57d3bfc8a82c2
    d3.selection.prototype.moveToFront = function() {
        return this.each(function() {
            this.parentNode.appendChild(this);
        });
    };
};
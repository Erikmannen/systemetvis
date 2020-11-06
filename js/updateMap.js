function updateMap() {
    // Check if needed to paint gray
    var dontRunCode = (chosenType < 0 || chosenData < 0);
    // Size of window
    var mapWidth = document.body.clientWidth / 2;
    var mapHeight = document.body.clientHeight;
    var clientHeight = document.getElementById('mapid').clientHeight;
    var clientWidth = document.getElementById('mapid').clientWidth;
    var svgs = document.getElementsByTagName("svg");
    var color = d3.scaleOrdinal().domain([0, 1, 2, 3, 4, 5]).range(["#ffffcc", "#c2e699", "#78c679", "#31a354", "#006837", "A6A6A6"])
    // Set up projection for sweden and correct view depending on screen
    var chosenProjection = d3.geoMercator().scale(900).center([16, 63]).translate([clientWidth / 2, clientHeight / 2]);
    // Path corresponds to län 
    var path = d3.geoPath().projection(chosenProjection);
    // Set svg width & height 
    var svg = d3.select('#mapid').select("svg")
    // Create g tag  
    var g = svg.select("g")
    svg.selectAll('.map-layer').remove();
    // Maplayer needed for visual
    var mapLayer = g.append('g').classed('map-layer', true);
    var maxval = 0;
    var minval = 0;
    if (!dontRunCode) {
        // Declear all the vars
        var yearData1 = data_vals[keys[chosenData]];
        var yearData2 = data_vals[keys[chosenData + 1]];
        var yearData3 = data_vals[keys[chosenData + 2]];
        var yearData4 = data_vals[keys[chosenData + 3]];
        var lanname = Object.keys(yearData1[0]);
        var lan = yearData1[0];
        var lan_values1 = Object.values(yearData1[0]);
        var lan_values2 = Object.values(yearData2[0]);
        var lan_values3 = Object.values(yearData3[0]);
        var lan_values4 = Object.values(yearData4[0]);
        var volym;
        var folk;
        var value;
        var maxi;
        // Color coding ranges
        for (var i = 0; i < lanname.length - 1; i++) {
            //console.log(Object.values(lan_values[i][chosenType]))
            volym = parseFloat(Object.values(lan_values1[i][chosenType]).toString().replace(' ', ''));
            volym += parseFloat(Object.values(lan_values2[i][chosenType]).toString().replace(' ', ''));
            volym += parseFloat(Object.values(lan_values3[i][chosenType]).toString().replace(' ', ''));
            volym += parseFloat(Object.values(lan_values4[i][chosenType]).toString().replace(' ', ''));
            var stepSize = 0;
            //console.log(befolkningData)
            if (layout == 0) {
                value = volym;
            } else {
                folk = parseFloat(befolkningMedel[lanname[i]].replace(',', '.'))
                value = volym / folk;
            }
            if (value >= maxval) {
                maxval = value;
                console.log(lanname[i])
            }
            if (value <= minval) {
                minval = value;
            }
        }
        // Set color spans
        var Valuerange = maxval
        if (layout == 0) {
            stepSize = Math.round(Valuerange / 6);
            var limit4 = stepSize;
            var limit3 = (stepSize * 2);
            var limit2 = (stepSize * 3);
            var limit1 = (stepSize * 4);
            updateColorCoding(limit1, limit2, limit3, limit4);
        } else { // tofixed limits numbers of decimal
            stepSize = Valuerange / 6;
            var limit4 = stepSize.toFixed(5);
            var limit3 = (stepSize * 2).toFixed(5);
            var limit2 = (stepSize * 3).toFixed(5);
            var limit1 = (stepSize * 4).toFixed(5);
            updateColorCoding(limit1, limit2, limit3, limit4);
        }
    } else {
        // Set text for colorcoded divs
        var unit = "";
        if (layout == 0) unit = " liter";
        else unit = " liter/person";
        var text1 = document.getElementById("codingText1");
        text1.innerHTML = "";
        var text2 = document.getElementById("codingText2");
        text2.innerHTML = "";
        var text3 = document.getElementById("codingText3");
        text3.innerHTML = "";
        var text4 = document.getElementById("codingText4");
        text4.innerHTML = "";
        var text5 = document.getElementById("codingText5");
        text5.innerHTML = "";
    }
    //Code build on this example
    //https://bl.ocks.org/john-guerra/43c7656821069d00dcbc
    // He we get the data. 
    d3.json("Data/sweden-counties.geo.json", function(error, geoData) {
        // Get features aka names and geometry if wanted
        var counties_features = geoData.features;
        // only for debug / explanation
        //console.log(counties_features)
        //console.log(Object.keys(lan))
        //console.log(lan_values[0]) // första länets värden
        //console.log(lan_values[0][chosenType]) // första länets första spritsort o värde
        //console.log(Object.values(lan_values[0][chosenType])) // värde*/
        if (dontRunCode) // Paint gray case
        {
            // Draw each counties as a path
            mapLayer.selectAll('path').data(counties_features).enter().append('path').attr('d', path).attr('vector-effect', 'non-scaling-stroke').style('fill', "A6A6A6").on('mouseover', mouseover).on('mouseout', mouseout).on('click', clicked);
        } else { // Based on vals
            // Draw each counties as a path
            mapLayer.selectAll('path').data(counties_features).enter().append('path').attr('d', path).attr('vector-effect', 'non-scaling-stroke').style('fill', fillFn).on('mouseover', mouseover).on('mouseout', mouseout).on('click', clicked);
        }
    });
    // Get province color should be connected with the datavals from json.
    function fillFn(d) {
        var lanValue = getValue(d.properties.name);
        return color(determineColor(lanValue));
    }

    function getValue(d) {
        returnarray = {};
        for (var i = 0; i < lanname.length; i++) {
            if (d == lanname[i].trim()) {
                var befolkKeys = (befolkningMedel);
                returnarray[0] = parseFloat(Object.values(lan_values1[i][chosenType]).toString().replace(' ', ''));
                returnarray[0] += parseFloat(Object.values(lan_values2[i][chosenType]).toString().replace(' ', ''));
                returnarray[0] += parseFloat(Object.values(lan_values3[i][chosenType]).toString().replace(' ', ''));
                returnarray[0] += parseFloat(Object.values(lan_values4[i][chosenType]).toString().replace(' ', ''));
                var keys = Object.keys(data_vals);
                if (layout == 0) {
                    value = returnarray[0];
                } else {
                    returnarray[1] = parseFloat(befolkningMedel[lanname[i]].replace(',', '.'))
                    value = returnarray[0] / returnarray[1];
                }
                return value;
            }
        }
        console.log("fel")
    }
    // Set color depending on which span the value is in.
    function determineColor(inLanVal) {
        var inVal = inLanVal
        if (inVal >= limit1) {
            return 4;
        } else if (inVal < limit1 && inVal >= limit2) {
            return 3;
        } else if (inVal < limit2 && inVal >= limit3) {
            return 2;
        } else if (inVal < limit3 && inVal >= limit4) {
            return 1;
        } else {
            return 0;
        }
    }
    // Update colorcoding if change has been made in dropdowns / settings
    function updateColorCoding(limit1, limit2, limit3, limit4) {
        if (chosenData >= 0 && chosenType > 0) {
            var unit = "";
            if (layout == 0) unit = " liter";
            else unit = " liter/person";
            var text1 = document.getElementById("codingText1");
            text1.innerHTML = "0 - " + limit4.toString() + unit;
            var text2 = document.getElementById("codingText2");
            text2.innerHTML = limit4.toString() + " - " + limit3.toString() + unit;
            var text3 = document.getElementById("codingText3");
            text3.innerHTML = limit3.toString() + " - " + limit2.toString() + unit;
            var text4 = document.getElementById("codingText4");
            text4.innerHTML = limit2.toString() + " - " + limit1.toString() + unit;
            var text5 = document.getElementById("codingText5");
            text5.innerHTML = ">" + limit1.toString() + unit;
        }
    }

    function mouseover(d) {
        // Highlight hovered province
        d3.select(this).style('fill', 'orange');
    }

    function mouseout(d) {
        // Draw with right color
        if (dontRunCode) {
            mapLayer.selectAll('path').style('fill', "A6A6A6")
        } else {
            mapLayer.selectAll('path').style('fill', fillFn)
        }
    }

    function clicked(d) {
        if (d) {
            valtLan = d.properties.name
        } else {
            valtLan = "Totalt riket";
        }
        var table = document.getElementById("tabell");
        table.rows[0].cells[0].innerHTML = valtLan;
        var header = document.getElementById("alcoholHeader");
        var year = (2017 - chosenData / 4).toString();
        header.innerHTML = valtLan + "s alkoholvanor " + year;
        var hitLan = false;
        // Update other views
        createChart();
        changeImage();
        changePara();
        changeImage()
    }
};

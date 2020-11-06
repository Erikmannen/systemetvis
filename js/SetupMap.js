function SetupMap(yearData, befolkningData) {
    // Size of window
    var mapWidth = document.body.clientWidth / 2;
    var mapHeight = document.body.clientHeight;
    // Set up divs
    var clientHeight = document.getElementById('mapid').clientHeight;
    var clientWidth = document.getElementById('mapid').clientWidth;
    var svgs = document.getElementsByTagName("svg");
    // Map colors
    var color = d3.scaleOrdinal().domain([0, 1, 2, 3, 4]).range(["#ffffcc", "#c2e699", "#78c679", "#31a354", "#006837"])
    // Set up projection for sweden and correct view depending on screen
    var chosenProjection = d3.geoMercator().scale(900).center([16, 63]).translate([clientWidth / 2, clientHeight / 2]);
    // Path corresponds to län 
    var path = d3.geoPath().projection(chosenProjection);
    // Set svg width & height 
    var svg = d3.select('#mapid').append("svg").attr("width", '100%').attr("height", '100%')
    // Add background so that we can paint on it
    svg.append('rect').attr('class', 'background').attr("width", '100%').attr("height", '100%').on("click", clicked)
    // create g tag  
    var g = svg.append('g');
    // maplayer needed for visual
    var mapLayer = g.append('g').classed('map-layer', true);
    var lanname = Object.keys(yearData[0]);
    var lan = yearData[0];
    var lan_values = Object.values(yearData[0]);
    //Code build on this example
    //https://bl.ocks.org/john-guerra/43c7656821069d00dcbc
    // He we get the data. 
    d3.json("Data/sweden-counties.geo.json", function(error, geoData) {
        // Get features aka names and geometry if wanted
        var counties_features = geoData.features;
        // Draw each counties as a path
        mapLayer.selectAll('path').data(counties_features).enter().append('path').attr('d', path).attr('vector-effect', 'non-scaling-stroke').style('fill', "A6A6A6").on('mouseover', mouseover).on('mouseout', mouseout).on('click', clicked);
    });

    function mouseover(d) {
        // Highlight hovered province
        d3.select(this).style('fill', 'orange');
    }

    function mouseout(d) {
        // Fill with gray in default map
        mapLayer.selectAll('path').style('fill', "A6A6A6")
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
        console.log(valtLan)
        var hitLan = false;
        // Update other views
        createChart();
        changeImage();
        changePara();
    }
}

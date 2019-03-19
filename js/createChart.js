// JavaScript source code
function createChart() {
    var konsumtion = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var type = "";
    var index = document.getElementById("typeDropDown").selectedIndex;
    if (index != 0) {
        var keys = Object.keys(data_vals);
        for (var i = 0; i < 12; ++i) {
            for (var j = 0; j < 4; ++j) {
                var stringNr = Object.values(Object.values(data_vals[keys[i * 4 + j]][0][valtLan])[chosenType])[0].replace(/ /g, '');
                konsumtion[i] += parseFloat(stringNr);
            }
        }
        if (chosenType == 0) type = "av sprit";
        else if (chosenType == 1) type = "av vin";
        else if (chosenType == 2) type = "av " + decodeURI('%C3%B6') + "l";
        else if (chosenType == 3) type = "av cider och blanddrycker";
        else if (chosenType == 4) type = "av alkoholfritt";
        else if (chosenType == 5) type = "totalt";
    }
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: valtLan + "s konsumtion " + type + " 2006-2017"
        },
        axisY: {
            includeZero: false
        },
        data: [{
            xValueFormatString: "YYYY",
            yValueFormatString: "# liter",
            color: "#4CAF50",
            type: "line",
            dataPoints: [{
                x: new Date(2006, 0),
                y: konsumtion[11]
            }, {
                x: new Date(2007, 0),
                y: konsumtion[10]
            }, {
                x: new Date(2008, 0),
                y: konsumtion[9]
            }, {
                x: new Date(2009, 0),
                y: konsumtion[8]
            }, {
                x: new Date(2010, 0),
                y: konsumtion[7]
            }, {
                x: new Date(2011, 0),
                y: konsumtion[6]
            }, {
                x: new Date(2012, 0),
                y: konsumtion[5]
            }, {
                x: new Date(2013, 0),
                y: konsumtion[4]
            }, {
                x: new Date(2014, 0),
                y: konsumtion[3]
            }, {
                x: new Date(2015, 0),
                y: konsumtion[2]
            }, {
                x: new Date(2016, 0),
                y: konsumtion[1]
            }, {
                x: new Date(2017, 0),
                y: konsumtion[0]
            }]
        }]
    });
    chart.render();
}
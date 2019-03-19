// Function to update the line chart, starts when a new county or type is selected
function createChart() {
    var konsumtion = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Array containing the data for 11 years
    var type = ""; // Variable for displaying later
    var index = document.getElementById("typeDropDown").selectedIndex; // Gets the index of the type to make sure something is picked

    // If a type is picked the data is gathered, parsed and put into the array
    if (index != 0) {
        var keys = Object.keys(data_vals);
        for (var i = 0; i < 12; ++i) {
            // Loops through each quarter each year
            for (var j = 0; j < 4; ++j) {
                var stringNr = Object.values(Object.values(data_vals[keys[i * 4 + j]][0][valtLan])[chosenType])[0].replace(/ /g, '');
                konsumtion[i] += parseFloat(stringNr); // Accumulates the quarters to the years total value
            }
        }
        // Checks which type is chosen and changes the title of the graph according to that
        if (chosenType == 0) type = "av sprit";
        else if (chosenType == 1) type = "av vin";
        else if (chosenType == 2) type = "av " + decodeURI('%C3%B6') + "l";
        else if (chosenType == 3) type = "av cider och blanddrycker";
        else if (chosenType == 4) type = "av alkoholfritt";
        else if (chosenType == 5) type = "totalt";

    }
    // Code creating the line chart using the CanvasJS library (gathered at https://canvasjs.com/html5-javascript-line-chart/)
    var chart = new CanvasJS.Chart("chartContainer", { // Get the div from the index and create the chart there
        animationEnabled: true,
        theme: "light2",
        title: {
            text: valtLan + "s konsumtion " + type + " 2006-2017" // The title depends on the selected county and type
        },
        axisY: {
            includeZero: false,
            minimum: 0

        },
        data: [{
            xValueFormatString: "YYYY", // x-axis displays in years
            yValueFormatString: "# liter", // y-axis displays in liters
            color: "#4CAF50", // Color of the line (same color as the drop-downs etc.)
            type: "line",

            // Prints the line using the data in konsumtion
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
    chart.render(); // Render the graph
}
// Function for updating the application when something changes, this function updates the table and the bars containing alcohol habits
function changeImage() {
    // Get which options that are selected in the drop-downs
    var selected = document.getElementById("typeDropDown");
    var index1 = selected.selectedIndex;
    var index2 = document.getElementById("yearDropDown").selectedIndex;

    // Sets chosenData and chosenType to use in this and other scripts
    chosenData = (index2 - 1) * 4; // Multiply by 4 to get the first quarter each year since all quarters are used simultaneously
    chosenType = index1 - 1;

    // Get all elements from the HTML that needs to be changed
    var table = document.getElementById("tabell");
    var header = document.getElementById("alcoholHeader");
    var year = (2017 - chosenData / 4);
    var yearString = year.toString();
    if (year == 2018)
        yearString = "";
    header.innerHTML = valtLan + "s alkoholvanor " + yearString; // Change the title of the alcohol habits part
    var value1 = '';
    var value2 = '';
    var value3 = '';
    var value4 = '';
    var keys = Object.keys(data_vals); // Get the keys so that we can search in the data using the name of the county
    if (!(index1 == 0 || index2 == 0)) {
        // Get the value from the data_vals with the chosen data and chosen type
        value1 = Object.values(Object.values(data_vals[keys[chosenData]][0][valtLan])[chosenType])[0].replace(/ /g, '');
        value2 = Object.values(Object.values(data_vals[keys[chosenData + 1]][0][valtLan])[chosenType])[0].replace(/ /g, '');
        value3 = Object.values(Object.values(data_vals[keys[chosenData + 2]][0][valtLan])[chosenType])[0].replace(/ /g, '');
        value4 = Object.values(Object.values(data_vals[keys[chosenData + 3]][0][valtLan])[chosenType])[0].replace(/ /g, '');

        // If the layout is one the table should display per person
        if (layout == 1) {
            // Parse the values to make us able to divide it with the number of people
            var value1Float = parseFloat(value1);
            var value2Float = parseFloat(value2);
            var value3Float = parseFloat(value3);
            var value4Float = parseFloat(value4);
            var yearFloat = parseFloat((befolkningMedel[valtLan]).replace(',', '.')); // Population of the given county
            value1Float = value1Float / yearFloat;
            value2Float = value2Float / yearFloat;
            value3Float = value3Float / yearFloat;
            value4Float = value4Float / yearFloat;

            // Turn the values to strings with only 5 decimals
            value1 = value1Float.toFixed(5).toString();
            value2 = value2Float.toFixed(5).toString();
            value3 = value3Float.toFixed(5).toString();
            value4 = value4Float.toFixed(5).toString();
        }
        // Some years have no data for alcohol free beverages, better to write that there is no data then to write 0
        if (value1 == 0) value1 = "Data saknas";
        if (value2 == 0) value2 = "Data saknas";
        if (value3 == 0) value3 = "Data saknas";
        if (value4 == 0) value4 = "Data saknas";
    }
    // Change the table to display the correct values
    table.rows[2].cells[1].innerHTML = value1;
    table.rows[3].cells[1].innerHTML = value2;
    table.rows[4].cells[1].innerHTML = value3;
    table.rows[5].cells[1].innerHTML = value4;

    // Get the divs and text for the alcohol habit bars
    var riskDiv = document.getElementById("risk");
    var ejRiskDiv = document.getElementById("ejRisk");
    var ejDruckitDiv = document.getElementById("ejDruckit");
    var riskText = document.getElementById("riskText");
    var ejRiskText = document.getElementById("ejRiskText");
    var ejDruckitText = document.getElementById("ejDruckitText");

    if (chosenData >= 0) {
        var year = chosenData / 4; // Get the year
        if (year > 9) year = 9; // 2006-2008 lie in the same span and therefore should be the same for the alcohol habits

        // Get the data for all three percentages and parse them to floats
        var riskVanor = Object.values(Object.values(vanor[0])[0][valtLan][year]);
        var ejRiskVanor = Object.values(Object.values(vanor[4])[0][valtLan][year]);
        var ejDruckitVanor = Object.values(Object.values(vanor[3])[0][valtLan][year]);
        var riskVanorFloat = parseFloat(riskVanor);
        var ejRiskVanorFloat = parseFloat(ejRiskVanor);
        var ejDruckitVanorFloat = parseFloat(ejDruckitVanor);

        // Same years the total percentage becomes 99 or 101, not a good solution to this but there is really no better way to solve this
        if (riskVanorFloat + ejRiskVanorFloat + ejDruckitVanorFloat > 100) {
            ejRiskVanorFloat -= 1;
        } else if (riskVanorFloat + ejRiskVanorFloat + ejDruckitVanorFloat < 100) {
            ejRiskVanorFloat += 1;
        }

        // Change the color of the bars since they are gray at the start
        riskDiv.style.backgroundColor = '#cc3c3c';
        ejRiskDiv.style.backgroundColor = '#4CAF50';
        ejDruckitDiv.style.backgroundColor = '#ffffcc';

        // Set the width of the bars, 30 is the total and then multiple by the percentages of each habit to get the correct width
        var riskWidth = 30 * (riskVanorFloat / 100).toString();
        var ejRiskWidth = 30 * (ejRiskVanorFloat / 100).toString();
        var ejDruckitWidth = 30 * (ejDruckitVanorFloat / 100).toString();
        riskDiv.style.width = riskWidth + "vw";
        ejRiskDiv.style.width = ejRiskWidth + "vw";
        ejDruckitDiv.style.width = ejDruckitWidth + "vw";

        // Change the text inside the bars
        riskText.innerHTML = riskVanor + "%";
        ejRiskText.innerHTML = ejRiskVanor + "%";
        ejDruckitText.innerHTML = ejDruckitVanor + "%";
    } else {
        // If no year is selected then the bars are gray and empty
        riskDiv.style.backgroundColor = '#a6a6a6';
        ejRiskDiv.style.backgroundColor = '#a6a6a6';
        ejDruckitDiv.style.backgroundColor = '#a6a6a6';

        riskText.innerHTML = "";
        ejRiskText.innerHTML = "";
        ejDruckitText.innerHTML = "";
    }
}
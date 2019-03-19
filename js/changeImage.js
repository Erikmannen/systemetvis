// JavaScript source code
function changeImage() {
    var selected = document.getElementById("typeDropDown");
    var img = selected.options[selected.selectedIndex].value;
    var index1 = selected.selectedIndex;
    var index2 = document.getElementById("yearDropDown").selectedIndex;
    chosenData = (index2 - 1) * 4;
    chosenType = index1 - 1;
    var table = document.getElementById("tabell");
    var header = document.getElementById("alcoholHeader");
    var year = (2017 - chosenData / 4);
    var yearString = year.toString();
    if (year == 2018)
        yearString = "";
    header.innerHTML = valtLan + "s alkoholvanor " + yearString;
    var value1 = '';
    var value2 = '';
    var value3 = '';
    var value4 = '';
    var keys = Object.keys(data_vals);
    if (!(index1 == 0 || index2 == 0)) {
        // Get the value from the data_vals with the chosen data and chosen type
        value1 = Object.values(Object.values(data_vals[keys[chosenData]][0][valtLan])[chosenType])[0].replace(/ /g, '');
        value2 = Object.values(Object.values(data_vals[keys[chosenData + 1]][0][valtLan])[chosenType])[0].replace(/ /g, '');
        value3 = Object.values(Object.values(data_vals[keys[chosenData + 2]][0][valtLan])[chosenType])[0].replace(/ /g, '');
        value4 = Object.values(Object.values(data_vals[keys[chosenData + 3]][0][valtLan])[chosenType])[0].replace(/ /g, '');
        if (layout == 1) {
            var value1Float = parseFloat(value1);
            var value2Float = parseFloat(value2);
            var value3Float = parseFloat(value3);
            var value4Float = parseFloat(value4);
            //Hämta befolkning och dividera
            var yearFloat = parseFloat((befolkningMedel[valtLan]).replace(',', '.'));
            value1Float = value1Float / yearFloat;
            value2Float = value2Float / yearFloat;
            value3Float = value3Float / yearFloat;
            value4Float = value4Float / yearFloat;
            value1 = value1Float.toFixed(5).toString();
            value2 = value2Float.toFixed(5).toString();
            value3 = value3Float.toFixed(5).toString();
            value4 = value4Float.toFixed(5).toString();
        }
        if (value1 == 0) value1 = "Data saknas";
        if (value2 == 0) value2 = "Data saknas";
        if (value3 == 0) value3 = "Data saknas";
        if (value4 == 0) value4 = "Data saknas";
    }
    table.rows[2].cells[1].innerHTML = value1;
    table.rows[3].cells[1].innerHTML = value2;
    table.rows[4].cells[1].innerHTML = value3;
    table.rows[5].cells[1].innerHTML = value4;
    var riskDiv = document.getElementById("risk");
    var ejRiskDiv = document.getElementById("ejRisk");
    var ejDruckitDiv = document.getElementById("ejDruckit");
    var riskText = document.getElementById("riskText");
    var ejRiskText = document.getElementById("ejRiskText");
    var ejDruckitText = document.getElementById("ejDruckitText");
    if (chosenData >= 0) {
        var year = chosenData / 4;
        if (year > 9) year = 9;
        var riskVanor = Object.values(Object.values(vanor[0])[0][valtLan][year]);
        var ejRiskVanor = Object.values(Object.values(vanor[4])[0][valtLan][year]);
        var ejDruckitVanor = Object.values(Object.values(vanor[3])[0][valtLan][year]);
        var riskVanorFloat = parseFloat(riskVanor);
        var ejRiskVanorFloat = parseFloat(ejRiskVanor);
        var ejDruckitVanorFloat = parseFloat(ejDruckitVanor);
        if (riskVanorFloat + ejRiskVanorFloat + ejDruckitVanorFloat > 100) {
            ejRiskVanorFloat -= 1;
        } else if (riskVanorFloat + ejRiskVanorFloat + ejDruckitVanorFloat < 100) {
            ejRiskVanorFloat += 1;
        }
        riskDiv.style.backgroundColor = '#cc3c3c';
        ejRiskDiv.style.backgroundColor = '#4CAF50';
        ejDruckitDiv.style.backgroundColor = '#ffffcc';
        var riskWidth = 30 * (riskVanorFloat / 100).toString();
        var ejRiskWidth = 30 * (ejRiskVanorFloat / 100).toString();
        var ejDruckitWidth = 30 * (ejDruckitVanorFloat / 100).toString();
        riskDiv.style.width = riskWidth + "vw";
        ejRiskDiv.style.width = ejRiskWidth + "vw";
        ejDruckitDiv.style.width = ejDruckitWidth + "vw";
        riskText.innerHTML = riskVanor + "%";
        ejRiskText.innerHTML = ejRiskVanor + "%";
        ejDruckitText.innerHTML = ejDruckitVanor + "%";
    } else {
        riskDiv.style.backgroundColor = '#a6a6a6';
        ejRiskDiv.style.backgroundColor = '#a6a6a6';
        ejDruckitDiv.style.backgroundColor = '#a6a6a6';

        riskText.innerHTML = "";
        ejRiskText.innerHTML = "";
        ejDruckitText.innerHTML = "";
    }
}
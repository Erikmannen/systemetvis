// Functions that change the application depending on if it displays total or per person on the map and in the table

// Starts if the total button is pressed
function changeLayoutTotalt() {
    layout = 0; // Variable that is used in other scripts to change the layout
    // Updates the table in changImage() and the map in updateMap()
    changeImage();
    updateMap();
    // Changes the buttons so that the pressed one is darker and the other one is lighter
    document.getElementById("totaltButton").style.backgroundColor = "darkgreen";
    document.getElementById("personButton").style.backgroundColor = "#4CAF50";
    // Changes the top of the table to say total konsumtion in liters
    var table = document.getElementById("tabell");
    table.rows[1].cells[1].innerHTML = "Konsumtion(liter)";
}

// Starts if the per person button is pressed
function changeLayoutPerson() {
    layout = 1; // Variable that is used in other scripts to change the layout
    // Updates the table in changImage() and the map in updateMap()
    changeImage();
    updateMap();
    // Changes the buttons so that the pressed one is darker and the other one is lighter
    document.getElementById("personButton").style.backgroundColor = "darkgreen";
    document.getElementById("totaltButton").style.backgroundColor = "#4CAF50";
    // Changes the top of the table to say konsumtion in liters/person
    var table = document.getElementById("tabell");
    table.rows[1].cells[1].innerHTML = "Konsumtion(liter/person)";
}
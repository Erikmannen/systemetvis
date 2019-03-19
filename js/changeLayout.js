function changeLayoutTotalt() {
    layout = 0;
    changeImage();
    updateMap();
    document.getElementById("totaltButton").style.backgroundColor = "darkgreen";
    document.getElementById("personButton").style.backgroundColor = "#4CAF50";
    var table = document.getElementById("tabell");
    table.rows[1].cells[1].innerHTML = "Konsumtion(liter)";
}

function changeLayoutPerson() {
    layout = 1;
    changeImage();
    updateMap();
    document.getElementById("personButton").style.backgroundColor = "darkgreen";
    document.getElementById("totaltButton").style.backgroundColor = "#4CAF50";
    var table = document.getElementById("tabell");
    table.rows[1].cells[1].innerHTML = "Konsumtion(liter/person)";
}
// declare vars
var pc;
var paracoord;
var befolkningMedel;
var antalKvartal;
var data_vals;
var keys;
var befolkningsmedelAlla;
// Load all sales data for each alcohol group.
d3.json("Data/data.json", function(error, data2) {
    if (error) throw error;
    // He we get the data. 
    data_vals = data2; // Save it for later 
    console.log(data_vals) // Innehåller alla vals
    keys = Object.keys(data_vals);
    antalKvartal = keys.length;
    getBefolkning()
    paracoord = new paraCords(data_vals[chosenData][0]);
});
// Loads the inhabitanes per county data and then updates the inhabitans var for the chosen year.
function getBefolkning() {
    d3.json("Data/databefolkning.json", function(error, databefolkning) {
        if (error) throw error;
        befolkningsmedelAlla = databefolkning; // All years
        console.log(data_vals)
        var choseIndex = 0;
        befolkningMedel = {};
        var befolkningMedelKeys = Object.keys(databefolkning);
        // Match countys with their values
        for (var i = 0; i < befolkningMedelKeys.length; i++) {
            console.log(Object.values(databefolkning[befolkningMedelKeys[i]][choseIndex])[0])
            befolkningMedel[Object.keys(data_vals[keys[0]][0])[i]] = Object.values(databefolkning[befolkningMedelKeys[i]][choseIndex])[0];
        }
        // Create a map.
        pc = new SetupMap(data_vals[keys[chosenData]], befolkningMedel);
    });
};
// Alcohol habits
d3.json("Data/datavanor.json", function(error, datavanor) {
    if (error) throw error;
    vanor = datavanor;
    console.log(datavanor)
});
// There already exist a map so need to update it. 
function updateBefolkning() {
    if (chosenData < 0) { // If no year chosen
    } else {
        // Get data for right year. 
        var choseIndex = Math.floor((chosenData) / 4);
        var befolkningMedelKeys = Object.keys(befolkningsmedelAlla);
        for (var i = 0; i < befolkningMedelKeys.length; i++) {
            befolkningMedel[Object.keys(data_vals[keys[0]][0])[i]] = Object.values(befolkningsmedelAlla[befolkningMedelKeys[i]][choseIndex])[0];
        }
        changeMap(); // Updates the map
    }
}

function changePara() {
    var paraIndex;
    if (chosenData < 0) {
        paraIndex = 0;
    } else {
        paraIndex = chosenData;
    }
    // get the index of what to fill the paracoords with
    paracoord = new updateparaCords(data_vals[paraIndex][0]);
}

function changeMap() {
    pc = new updateMap();
}
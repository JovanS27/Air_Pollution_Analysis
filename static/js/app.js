
let globalGP = {};

function optionChanged(calledGP) {
    //replace display with selected value
    console.log("checkpoint: option changed");
    console.log(calledGP);

    //find the new selection in the data
    GPid = gp_practice_dict.gp.findIndex((element) => element == calledGP);
    console.log(GPid);
    let currentGP = gp_practice_dict.metadata[GPid];
    globalGP = currentGP;

    //instantiate the metadata
    console.log("checkpoint infopanel");
    let keys = Object.keys(currentGP);
    console.log(keys);
    console.log(currentGP);

    //reduce keys to just air quality measures
    const airKeys = ["aqi", "co", "nh3", "no", "no2", "o3", "pm10", "pm2_5", "so2"];
    console.log(airKeys);

    // start building the metadata html to display in the infobox
    let metaText = "Surgary: " + calledGP + "<hr>";
    //loop through the keys and insert the relevant text into the metadata
    for (i = 0; i < airKeys.length; i++) {
        // console.log(currentGP[airKeys[i]]);
        metaText = metaText + airKeys[i] + ": " + currentGP[airKeys[i]] + "<br>";
    }
    // replace the contents of the infobox with the new metadata html string
    d3.select('#sample-metadata').html(metaText);
    

    // get the air quality data
    let timestamps = air_pollution_data.date_time;
    console.log(timestamps);
    let dateStrings = []
    //copy the data into javascript format by multiplying by 1000
    for (let i = 0; i < timestamps.length; i++){
        dateStrings[i] = (timestamps[i] * 1000);
    }
    console.log(dateStrings);

    

    //instantiate a wrapper for the different measures of air quality
    let yvalues = [];
    for (i = 0; i< airKeys.length; i++){
        yvalues[i] = [];
    };
    console.log(yvalues);

    // loop through ALL of the metadata
    for (let i = 0; i < air_pollution_data.metadata.length; i++) {
        //identify the data for the correct GP
        if (air_pollution_data.metadata[i].gp == calledGP){
            // write in the different data measures into the yvalues array, using the defined array airKeys
            for( j=0; j<airKeys.length; j++){
                yvalues[j].push(air_pollution_data.metadata[i][airKeys[j]]);
            }
        }
    };

    //loop to create all the data traces
    let traceData = []
    for (i = 0; i < yvalues.length; i++){
        traceData[i] = {
            x: dateStrings,
            y: yvalues[i],
            type: "scatter",  
            mode: "lines",
            name: airKeys[i],
            line: {color: i}
        }
    };

    // Apply layout settings
    let layout = {
        title: calledGP,
        height: 500,
        width: 800,
        xaxis: {
            autorange: true,
            type: 'linear',
            rangeselector: {buttons: [        
                {        
                  count: 1,        
                  label: '24 hours',        
                  step: 'day',        
                  stepmode: 'backward'        
                },
                {step: 'all'}
              ]},
            rangeslider: {range: [dateStrings[0], dateStrings[dateStrings.length - 1]]},
            type: 'date'
        },
        yaxis: {
            autorange: true,
            type: 'linear',
            title: {
                text: "micrograms/cubic metre"
            }
        }
    };

    // Render the plot to the div tag with id "time-graph"
    Plotly.newPlot("time-graph", traceData, layout);

    newScat(airKeys[0], currentGP);

    //new HEATMAP

};

function newScat(calledPollutant, currentGP = globalGP){
    // new SCATTER DIAGARM
    console.log("new scatter");
    scatterX = [];
    scatterY = [];
    scatter_labels = [];
    scatter_colours = [];

    console.log(gp_practice_dict.gp.length);
    
    for (let i = 0; i < gp_practice_dict.gp.length; i++) {
        scatterX[i] = gp_practice_dict.metadata[i][calledPollutant];
        scatterY[i]  = gp_practice_dict.metadata[i].asthma_percentage;
        scatter_labels[i]  = gp_practice_dict.metadata[i].gp;
        scatter_colours[i] = i
    }
    
    console.log("czechpoint scatter");
    // console.log(scatterX);
    // console.log(scatterY);
    // console.log(scatter_labels);
    // console.log(scatter_colours);



    var trace3 = {
        type: "scatter",
        x: scatterX,
        y: scatterY,
        text: scatter_labels,
        mode: 'markers',
        marker: {
            size: 13,
            color: scatter_colours
        }
    };
    var highlight = {
        type: "scatter",
        x: [currentGP[calledPollutant]],
        y: [currentGP.asthma_percentage],
        text: currentGP.gp,
        mode: 'markers',
        opacity: 0.61,
        marker: {
            size: 21,
            color: "#FFFF00"
        }
    };
    data = [trace3, highlight];
    layout = {
        title: 'How well air quality predicts asthma prevalence',
        showlegend: false,
        height: 500,
        width: 800,
        xaxis: {
            title: {
                text: calledPollutant
            },
        },
        yaxis: {
            title: {
                text: "Asthma Percentage at this GP surgary"
            },
        }
    };
    Plotly.newPlot('scat', data, layout);

};


// Display the default plots
function init() {
        
    console.log("czechpoint init");
    console.log(gp_practice_dict);
    console.log(typeof gp_practice_dict);
    console.log(air_pollution_data);
    console.log(typeof air_pollution_data);
    // instantiate from the initial data passed from flask app.py to index.html to here
       

    let defaultGP = gp_practice_dict.metadata[100].gp;
    console.log("default GP set to:");
    console.log(defaultGP);


    // Use D3 to select the dropdown and add options to it;
    let dropDown = d3.select("#selDataset");
    var options = dropDown.selectAll("option")
        .data(gp_practice_dict.gp)
        .enter()
        .append("option");

    options.text(function(d) {
            return d;
        })
        .attr("value", function(d) {
            return d;
        });

    //reduce keys to just air quality measures
    const airKeys = ["aqi", "co", "nh3", "no", "no2", "o3", "pm10", "pm2_5", "so2"];
    console.log(airKeys);

    // Use D3 to select the dropdown and add options to it;
    let polSelect = d3.select("#selectPollutant");
    var options = polSelect.selectAll("option")
        .data(airKeys)
        .enter()
        .append("option");

    options.text(function(d) {
            return d;
        })
        .attr("value", function(d) {
            return d;
        });

    

    optionChanged(defaultGP)

}

console.log("czechpoint 2");
console.log(gp_practice_dict);
console.log(air_pollution_data);
init();
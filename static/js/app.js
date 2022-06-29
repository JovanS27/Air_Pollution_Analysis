


function optionChanged(calledGP) {
    //replace display with selected value
    console.log("checkpoint: option changed");
    console.log(calledGP);

    //find the new selection in the data
    GPid = gp_practice_dict.gp.findIndex((element) => element == calledGP);
    console.log(GPid);
    

    // get the air quality data
    let timestamps = air_pollution_data.date_time;
    let yvalues = [];
    yvalues[0] = [];
    yvalues[1] = [];
    yvalues[2] = [];
    
    console.log(timestamps);
    let dateStrings = []

    //copy the data into javascript format by multiplying by 1000
    for (let i = 0; i < timestamps.length; i++){
        dateStrings[i] = (timestamps[i] * 1000);
    }
    console.log(dateStrings);
    console.log(yvalues);

    // find the series of readings for the current GP surgery and write them into the yvalues list
    for (let i = 0; i < air_pollution_data.metadata.length; i++) {
        if (air_pollution_data.metadata[i].gp == calledGP){
            yvalues[0].push(air_pollution_data.metadata[i].pm10);
            yvalues[1].push(air_pollution_data.metadata[i].pm2_5);
            yvalues[2].push(air_pollution_data.metadata[i].aqi);
        }
    }

    // Trace for the Data
    let trace1 = {
        x: dateStrings,
        y: yvalues[0],
        type: "scatter",  
        mode: "lines",
        name: 'Particulates M10 ',
        line: {color: '#DF0000'}
    };

    // Trace for the Data
    let trace2 = {
        x: dateStrings,
        y: yvalues[1],
        type: "scatter",  
        mode: "lines",
        name: 'Particulates M2.5',
        line: {color: '#00DF00'}
    };

    // Trace for the Data
    let trace0 = {
        x: dateStrings,
        y: yvalues[2],
        type: "scatter",  
        mode: "lines",
        name: 'AQI',
        line: {color: '#0000DF'}
    };

    // Data trace array
    let traceData = [trace0, trace1, trace2];

    // Apply title to the layout
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
                text: "Particles per million, maybe"
            }
        }
    };

    // Render the plot to the div tag with id "time-graph"
    Plotly.newPlot("time-graph", traceData, layout);

    //instantiate the metadata
    console.log("checkpoint infopanel");
    let keys = Object.keys(gp_practice_dict.metadata[GPid]);
    console.log(keys);
    console.log(gp_practice_dict.metadata[GPid]);

    // start building the metadata html to display in the infobox
    let metaText = "Surgary: " + calledGP + "<hr>";
    //loop through the keys and insert the relevant text into the metadata
    for (i = 0; i < keys.length; i++) {
        // console.log(gp_practice_dict.metadata[GPid][keys[i]]);
        metaText = metaText + keys[i] + ": " + gp_practice_dict.metadata[GPid][keys[i]] + "<br>";
    }
    // replace the contents of the infobox with the new metadata html string
    d3.select('#sample-metadata').html(metaText);


    // //new pie chart

    // //find the total number of microbes
    // var microbeTotal = 0;

    // for (let i = 0; i < data2.samples[subjectNumb].sample_values.length; i++) {
    //     microbeTotal = microbeTotal + data2.samples[subjectNumb].sample_values[i]
    // }

    // var microbeTotalTop10 = 0;

    // for (let i = 0; i < newValues.length; i++) {
    //     microbeTotalTop10 = microbeTotalTop10 + newValues[i]
    // };

    // console.log(microbeTotal);
    // console.log(microbeTotalTop10);
    // //create a final 'other' dummy microbe and append it to the top ten
    // newValues.push(microbeTotal - microbeTotalTop10);
    // newLabels.push("other")

    // console.log("pieValues: " + newValues.length + ", pielabels: " + newLabels.length)

    // // Trace for the Data
    // let trace1 = {
    //     type: "pie",
    //     values: newValues,
    //     labels: newLabels,
    //     textinfo: "label+percent",
    //     textposition: "outside",
    //     automargin: false
    // };

    // // Data trace array
    // traceData = [trace1];

    // // Apply title to the layout
    // layout = {
    //     height: "600px",
    //     title: "...and with others grouped together.",
    //     showlegend: false
    // };
    // // Render the plot to the div tag with id "plot"
    // Plotly.newPlot("pie", traceData, layout);


    //new HEATMAP

}


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

    // new SCATTER DIAGARM
    console.log("new scatter");
    scatterX = [];
    scatterY = [];
    scatter_labels = [];
    scatter_colours = [];

    console.log(gp_practice_dict.gp.length);
    
    for (let i = 0; i < gp_practice_dict.gp.length; i++) {
        scatterX[i] = gp_practice_dict.metadata[i].pm10;
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
            color: scatter_colours
        }
    };
    data = [trace3];
    layout = {
        title: 'How well air quality predicts asthma prevalence',
        showlegend: false,
        height: 500,
        width: 800,
        xaxis: {
            title: {
                text: "Average AQI score for this co-ordinate"
        },
        yaxis: {
            title: {
                text: "Asthma Percentage at this GP surgary"
            }
        }
    };
    Plotly.newPlot('scat', data, layout);

    optionChanged(defaultGP)

}

console.log("czechpoint 2");
console.log(gp_practice_dict);
console.log(air_pollution_data);
init();
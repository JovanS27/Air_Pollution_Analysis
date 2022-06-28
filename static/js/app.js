


function optionChanged(calledGP) {
    //replace display with selected value
    console.log("checkpoint: option changed");
    console.log(calledGP);

    //find the new selection in the data
    GPid = gp_practice_dict.gp.findIndex((element) => element == calledGP);
    console.log(GPid);

    // for (let i = 0; i < displaySize; i++) {
    //     newValues[i] = data2.samples[subjectNumb].sample_values[i];
    //     newLabels[i] = "OTU " + data2.samples[subjectNumb].otu_ids[i];
    //     newTooltips[i] = data2.samples[subjectNumb].otu_labels[i];
    // }
    // // Trace for the Data
    // let trace2 = {
    //     x: newValues.reverse(),
    //     y: newLabels.reverse(),
    //     text: newTooltips.reverse(),
    //     type: "bar",
    //     orientation: 'h'
    // };

    // // Data trace array
    // let traceData = [trace2];

    // // Apply title to the layout
    // let layout = {
    //     title: calledGP.gp
    // };

    // // Render the plot to the div tag with id "plot"
    // Plotly.newPlot("bar", traceData, layout);

    //instantiate the metadata
    console.log("checkpoint infopanel");
    let keys = Object.keys(calledGP);
    console.log(keys);

    // start building the metadata html to display in the infobox
    let metaText = "Surgary: " + calledGP.gp + "<hr>";
    //loop through the keys and insert the relevant text into the metadata
    for (i = 0; i < keys.length; i++) {
        metaText = metaText + keys[i] + ": " + calledGP[keys[i]] + "<br>";
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

    // new SCATTER DIAGARM
    console.log("new scatter");
    scatterX = [];
    scatterY = [];
    scatter_labels = [];
    scatter_colours = [];

    console.log(gp_practice_dict.gp.length);
    
    for (let i = 0; i < gp_practice_dict.gp.length; i++) {
        scatterX[i] = gp_practice_dict.metadata[i].aqi;
        scatterY[i]  = gp_practice_dict.metadata[i].asthma_percentage;
        scatter_labels[i]  = gp_practice_dict.metadata[i].gp;
        scatter_colours[i] = i
    }
    
    console.log("czechpoint scatter");
    console.log(scatterX);
    console.log(scatterY);
    console.log(scatter_labels);
    console.log(scatter_colours);



    var trace3 = {
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
        width: 800
    };
    Plotly.newPlot('scatter', data, layout);
}


// Display the default plots
function init() {
        
    console.log("czechpoint 3");
    console.log(gp_practice_dict);
    console.log(typeof gp_practice_dict);
    console.log(air_pollution_data);
    console.log(typeof air_pollution_data);
    // instantiate from the initial data passed from flask app.py to index.html to here
       

    let defaultGP = gp_practice_dict.metadata[0];


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


        optionChanged(defaultGP)

}

console.log("czechpoint 2");
console.log( gp_practice_dict.gp[0]);
console.log( gp_practice_dict.metadata[0]);
console.log(typeof air_pollution_data);

init(gp_practice_dict, air_pollution_data);
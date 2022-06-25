


function optionChanged(testSubject) {
    //replace display with selected value
    console.log(testSubject)
    let newValues = [];
    let newLabels = [];
    let newTooltips = [];
    let displaySize = 10;

    url.then(function(data2) {
        //find the new selection in the data
        subjectNumb = data2.names.findIndex((element) => element == testSubject);
        console.log(subjectNumb);

        for (let i = 0; i < displaySize; i++) {
            newValues[i] = data2.samples[subjectNumb].sample_values[i];
            newLabels[i] = "OTU " + data2.samples[subjectNumb].otu_ids[i];
            newTooltips[i] = data2.samples[subjectNumb].otu_labels[i];
        }
        // Trace for the Data
        let trace2 = {
            x: newValues.reverse(),
            y: newLabels.reverse(),
            text: newTooltips.reverse(),
            type: "bar",
            orientation: 'h'
        };

        // Data trace array
        let traceData = [trace2];

        // Apply title to the layout
        let layout = {
            title: "Top ten Microbes in belly button of test subject " + testSubject.toString()
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", traceData, layout);

        //instantiate the metadata
        let metadata = data2.metadata[subjectNumb];
        console.log(metadata);
        let keys = Object.keys(metadata);

        // start building the metadata html to display in the infobox
        let metaText = "Test Subject " + testSubject + "<hr>";
        //loop through the keys and insert the relevant text into the metadata
        for (i = 0; i < keys.length; i++) {
            metaText = metaText + keys[i] + ": " + metadata[keys[i]] + "<br>";
        }
        // replace the contents of the infobox with the new metadata html string
        d3.select('#sample-metadata').html(metaText);


        //new pie chart

        //find the total number of microbes
        var microbeTotal = 0;

        for (let i = 0; i < data2.samples[subjectNumb].sample_values.length; i++) {
            microbeTotal = microbeTotal + data2.samples[subjectNumb].sample_values[i]
        }

        var microbeTotalTop10 = 0;

        for (let i = 0; i < newValues.length; i++) {
            microbeTotalTop10 = microbeTotalTop10 + newValues[i]
        };

        console.log(microbeTotal);
        console.log(microbeTotalTop10);
        //create a final 'other' dummy microbe and append it to the top ten
        newValues.push(microbeTotal - microbeTotalTop10);
        newLabels.push("other")

        console.log("pieValues: " + newValues.length + ", pielabels: " + newLabels.length)

        // Trace for the Data
        let trace1 = {
            type: "pie",
            values: newValues,
            labels: newLabels,
            textinfo: "label+percent",
            textposition: "outside",
            automargin: false
        };

        // Data trace array
        traceData = [trace1];

        // Apply title to the layout
        layout = {
            height: "600px",
            title: "...and with others grouped together.",
            showlegend: false
        };
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("pie", traceData, layout);


        //new HEATMAP

        // repeat for loop but this time using ALL of the data (not just top ten)
        for (let i = 0; i < data2.samples[subjectNumb].sample_values.length; i++) {
            newValues[i] = data2.samples[subjectNumb].sample_values[i];
            newLabels[i] = data2.samples[subjectNumb].otu_ids[i];
            newTooltips[i] = data2.samples[subjectNumb].otu_labels[i]
        };
        var trace3 = {
            x: newLabels,
            y: newValues,
            text: newTooltips,
            mode: 'markers',
            marker: {
                color: newLabels,
                size: newValues
            }
        };
        data = [trace3];
        layout = {
            title: 'Diversity of Ompholosian Fauna',
            showlegend: false,
            height: 500,
            width: 1300
        };
        Plotly.newPlot('bubble', data, layout);
    });
}


// Display the default plots
function init(GP, AIR) {
    // instantiate from the initial data passed from flask app.py to index.html to here
    
   
    

    GP.then(function(data) {
        let defaultGP = data.GP[0].id;


        // Use D3 to select the dropdown and add options to it;
        let dropDown = d3.select("#selDataset");
        var options = dropDown.selectAll("option")
            .data(intial_data.names)
            .enter()
            .append("option");

        options.text(function(d) {
                return d;
            })
            .attr("value", function(d) {
                return d;
            });


        //optionChanged(intial_data)

    });
}

console.log(type(gp_practice_dict));

init(gp_practice_dict, air_pollution_data);
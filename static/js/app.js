// Fetch the JSON data and console log it
    d3.json("data/samples.json").then((data) => {
        console.log(data)

// select the names of the data sets
        var subjectId = data.names
        var sampleData = data.samples
        console.log(subjectId)
        console.log(sampleData)

// loop through each name and append names to drop down menu
        subjectId.forEach(function(id)  {
            var selectId = d3.select("#selDataset")
            var option = selectId.append("option");
            option.text(id)
            selectId.property("value")
        });


        var filterData = sampleData.filter(sample => sample.id === "940")
        console.log(filterData[0])

        filterData = filterData[0]

        //bar chart

        var barData = [{
            x: filterData.sample_values.slice(0,10).reverse(), 
            y: `${filterData.otu_ids.slice(0,10).reverse()}`,
            text: filterData.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }];

        var layout = {
            title: "Belly Button"
        }

       
        Plotly.newPlot("bar", barData, layout);

        //bubble chart

        
        
        var bubbleData = [{ 
            x: subjectId,
            y: filterData.sample_values,
            mode: 'markers',
            marker : {
                color: `${filterData.otu_ids}`,
                size: sampleData.sample_values
            }
        }];

        var bubbleLayout = {
            title: "Belly Button"
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    

        //demographics table 
        var metadata = data.metadata
        console.log(metadata)

        var filterMetadata = metadata.filter(individual => individual.id[0])
        console.log(filterMetadata)

        var demographicsTable = d3.select("#sample-metadata");
        

        Object.entries(filterMetadata).forEach(([key, value])=> {
            demographicsTable.append(`${key} : ${value}`);

        });


        d3.selectAll("#selDataset").on("change", updatePlotly);

        function updatePlotly() {
            var dropDown = d3.select("#selDataset")

            var dataset = dropDown.property("value")
        };


    });
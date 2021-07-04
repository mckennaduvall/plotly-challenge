// Fetch the JSON data and console log it
    d3.json("data/samples.json").then((data) => {
        console.log(data)

        var subjectId = data.names
        console.log(subjectId)

        subjectId.forEach(function(id)  {
            var selectId = d3.select("#selDataset")
            var option = selectId.append("option");
            option.text(id)
        
            var initId = selectId.property("value")

        
        });
    
     });


function buildMetadata(sample) {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let metadata = data.metadata;
    // Filter the data for the object with the desired sample number
   let filtered = metadata.filter(obj=>obj.id==sample)[0];
    
    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");
      for (key in filtered){panel.append("h6").text(`${key}: ${filtered[key]}`)};

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    
    // BONUS: Build the Gauge Chart
    
  });
}

function buildCharts(sample) {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
let filtered= data.samples.filter(obj=>obj.id==sample)[0];
let otuids = filtered.otu_ids
let otulabels =filtered.otu_labels
let samplevalues = filtered.sample_values
    // Build Bubble Chart
let bubbleLayout =  {xaxis:{title:"otuid"}};
let bubbleData = [{x:otuids,y:samplevalues,text:otulabels,mode:"markers",marker:{size:samplevalues,color:otuids}}];

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
let barlayout = {title: "Top 10 Otu's"}
let bardata = [{y:otuids.slice(0,10).map(obj=>`otu ${obj}`).reverse(),
                x:samplevalues.slice(0,10).reverse(), text: otulabels.slice(0,10).reverse(), type:"bar", orientation: "h"}];
      Plotly.newPlot("bar", bardata, barlayout);
 });
}
   
function init() {
  // Grab a reference to the dropdown select element
    let selector = d3.select("#selDataset");
  // Use the list of sample names to populate the select options
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
 for (let i = 0; i < data.names.length; i ++){selector.append("option").text(data.names[i]).property("value",data.names[i]);}

      buildCharts(data.names[0]);
      buildMetadata(data.names[0]);
    });                   
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
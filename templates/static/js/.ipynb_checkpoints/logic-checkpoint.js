// Set a same-site cookie for first-party contexts
document.cookie = 'cookie1=value1; SameSite=Lax';
// Set a cross-site cookie for third-party contexts
document.cookie = 'cookie2=value2; SameSite=None; Secure';

// Create function to select marker color for District filter
function chooseColor(frl_count) {
    return frl_count >= 66 ? 'red' :
        frl_count < 33 ? 'green' :
        'yellow';
}
// Create function to select marker color for Minority filter
function chooseMinority(frl_count, per_white) {
    return frl_count >= 66 && per_white >= 50 ? 'red' :
        frl_count >= 66 && per_white < 50 ? 'blue' :
        frl_count < 33 && per_white < 50 ? 'blue' :
        frl_count >= 33 && frl_count < 66 && per_white < 50 ? 'blue' :
        frl_count < 33 && per_white > 50 ? 'green' :
        frl_count >= 33 && frl_count < 66 && per_white >= 50 ? 'yellow' :
        'blue';
}

function chooseDemo(per_white) {
    return per_white < 50 ? 'blue' :
    'red' ;
}
// Create variable to link drop down menu
var dropdownmenu = d3.select('#selDataset');

// API links
var schoolLink = "https://school-data-server.herokuapp.com/school_api";

var schoolMarkers = [];
var minorityMarkers = [];
var demoMarkers = [];

function piechart(data, school){
    
    var width = 200;
    var height = 200;
    var margin = {left:20,right:20,top:20,bottom:20};


    var div = d3.create("div")
    var svg = div.append("svg")
      .attr("width", width+margin.left+margin.right)
      .attr("height", height+margin.top+margin.bottom);
    var g=svg.append("g")
      .attr("transform","translate(" + (width / 2 -30) + "," + height / 2 + ")");  

    
    var color = d3.scaleOrdinal().domain(data).range(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c'])
    
    // Compute the position of each group on the pie:
    var pie = d3.pie()
    .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    
    g.selectAll(null)
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', d3.arc()
    .innerRadius(30)
    .outerRadius(50)
    )
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7);

    svg.append("g")
               .attr("transform", "translate(" + (width / 2 - 80) + "," + 20 + ")")
               .append("text")
               .text(school)
               .attr("class", "title")
               .style("textLength", "120")


    var labelHeight = 15;
    const legend = svg
    .append('g')
    .attr('transform', "translate(" + (70*2) + "," + 50 + ")");

    legend
    .selectAll(null)
    .data(data_ready)
    .enter()
    .append('rect')
    .attr('y', d => labelHeight * d.index * 1.8)
    .attr('width', labelHeight)
    .attr('height', labelHeight)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr('stroke', 'grey')
    .style('stroke-width', '1px');

    legend
    .selectAll(null)
    .data(data_ready)
    .enter()
    .append('text')
    .text(d => d.data.key)
    .attr('x', labelHeight * 1.2)
    .attr('y', d => labelHeight * d.index * 1.8 + labelHeight)
    .style('font-family', 'sans-serif')
    .style('font-size', `${labelHeight}px`);

    return div.node();
}

function optionChanged(value) {
    console.log("#demo-piechart")
    d3.select("#demo-piechart").html('')
    var link = "https://school-data-server.herokuapp.com/school_api";
        d3.json(link, function(data) {
            var i=value;
            var school_name= data.school_data[i].school;
            var demo_data = {White:Math.round(data.school_data[i].prcnt_wht), Black:Math.round(data.school_data[i].prcnt_bk), Hispanic:Math.round(data.school_data[i].prcnt_hisp), Asian:Math.round(data.school_data[i].prcnt_asn), Other:Math.round(data.school_data[i].prcnt_othr)}
            populate_piechart(demo_data, school_name);
        });
};

function populate_piechart(data){
    var width = 400;
    var height = 300;
    var margin = {left:20,right:20,top:20,bottom:20};
    var svg =d3.select("#demo-piechart")
      .append("svg")
      .attr("width", width+margin.left+margin.right)
      .attr("height", height+margin.top+margin.bottom);
    var g=svg.append("g")
      .attr("transform","translate(" + ((width / 3)+50) + "," + height / 2 + ")");  

    
    var color = d3.scaleOrdinal().domain(data).range(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c'])
    
    // Compute the position of each group on the pie:
    var pie = d3.pie()
    .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    
    var arc = d3.arc()
    .innerRadius(50)
    .outerRadius(80);

    var label = d3.arc()
        .outerRadius(50)
        .innerRadius(80);


    g.selectAll(null)
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
    .transition()
    .duration(1000)
    .attrTween("d", function (d) {
        var i = d3.interpolate(d.endAngle, d.startAngle);
        return function (t) {
            d.startAngle = i(t);
            return arc(d);
        }
    });
    
    svg.append("g")
               .attr("transform", "translate(" + (width / 2 - 300) + "," + 20 + ")")
               .append("text")
               .attr("class", "title");

    var labelHeight = 18;
    const legend = svg
    .append('g')
    .attr('transform', "translate(" + (100*3) + "," + 80 + ")");
    
    legend
    .selectAll(null)
    .data(data_ready)
    .enter()
    .append('rect')
    .attr('y', d => labelHeight * d.index * 1.8)
    .attr('width', labelHeight)
    .attr('height', labelHeight)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr('stroke', 'grey')
    .style('stroke-width', '1px');

    legend
    .selectAll(null)
    .data(data_ready)
    .enter()
    .append('text')
    // .text(d => d.data.key)
    .text(function (d) { return (d.data.value+'% '+d.data.key); })
    // .text(piechart_text(data_ready))
    .attr('x', labelHeight * 1.2)
    .attr('y', d => labelHeight * d.index * 1.8 + labelHeight)
    .style('font-family', 'sans-serif')
    .style('font-size', `${labelHeight}px`);
  }

function createMap(schools) {
    // Create base layers
    // Streetmap Layer
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        maxZoom: 18,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }); 

    // Carto Topo Layer
    var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        accessToken: API_KEY,
        maxZoom: 18
    });
    // Create layer groups
    var schools = L.layerGroup(schoolMarkers);
    var minorities = L.layerGroup(minorityMarkers);
    var demo = L.layerGroup(demoMarkers);

    // Create a baseMaps object
    var baseMaps = {
        "Street Map": streetmap,
        "Light Map": light,
    };

    // Create an overlay object
    var overlayMaps = {
        "All Schools": schools,
        "Majority-Minority": minorities,
        "Demographics": demo,
    };

    // Create map object
    var map = L.map("map", {
        center: [42.33, -83.04],
        zoom: 9,
        layers: [streetmap, light, schools]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: true
    }).addTo(map);
};

// Read markers data from cleaned_data.csv
function createLayers(data) {
    //var districtMarkers = []
    // For each row in data, create a marker and add it to the map
    // For each row, columns `lat`, `lng`, and `eligible_for_frl` are required
    for (var i = 0; i < data.school_data.length; i++) {
        var lat = data.school_data[i].lat;
        var lng = data.school_data[i].lng;
        var school = data.school_data[i].school;
        var frl_count = data.school_data[i].prcnt_stdnts_eligible_for_frl;
        var majority_minority = data.school_data[i].majority_minority;
        var school_location = [lat,lng];
        var per_white = data.school_data[i].prcnt_wht;
                
        var marker = 
            L.circle(school_location, 500, {
                stroke: true,
                color: chooseColor(frl_count, per_white),
                opacity: 1,
                fill: true,
                fillColor: chooseColor(frl_count, per_white),
                fillOpacity: 1,
            
            }).bindPopup(school + "<br> Free and Reduced Lunch Eligibility: " + frl_count + "%" + "<br> Majority-Minority School: " + majority_minority)
        schoolMarkers.push(marker);  
    }
    //createMap(L.layerGroup(districtMarkers));

    //var minorityMarkers = []

    for (var i=0; i < data.school_data.length; i++) {
        var lat = data.school_data[i].lat;
        var lng = data.school_data[i].lng;
        var school = data.school_data[i].school;
        var frl_count = data.school_data[i].prcnt_stdnts_eligible_for_frl;
        var majority_minority = data.school_data[i].majority_minority;
        var school_location = [lat,lng];
        var per_white = data.school_data[i].prcnt_wht;
        
    
        var marker = L.circle(school_location, 500, {
            stroke: true,
            color: chooseMinority(frl_count, per_white),
            opacity: 1,
            fill: true,
            fillColor: chooseMinority(frl_count, per_white),
            fillOpacity: 1,  
        }).bindPopup(school + "<br> Free and Reduced Lunch Eligibility: " + frl_count + "%" + "<br> Majority-Minority School: " + majority_minority)
    minorityMarkers.push(marker);  
    }
    

    for (var i = 0; i < data.school_data.length; i++) {
        var lat = +data.school_data[i].lat;
        var lng = +data.school_data[i].lng;
        var school = data.school_data[i].school;
        var demo_data = {White:data.school_data[i].prcnt_wht, Black:data.school_data[i].prcnt_bk, Hispanic:data.school_data[i].prcnt_hisp, Asian:data.school_data[i].prcnt_asn, Other:data.school_data[i].prcnt_othr}
        var per_white = data.school_data[i].prcnt_wht;
        var frl_count = data.school_data[i].prcnt_stdnts_eligible_for_frl;
        var school_location = [lat, lng];

        var marker = L.circle(school_location, 500, {
            stroke: true,
            opacity: 1,
            fillOpacity: 0.75,
            color: chooseDemo(per_white),
            fillColor: chooseDemo(per_white),
            // Adjust radius
            radius: 2000
        }).bindPopup(piechart(demo_data, school))
    demoMarkers.push(marker);
    }

    var data_schoolnames = data.school_data;
    data_schoolnames.forEach(function (d) {
        dropdownmenu
            .append("option")
            .attr('value', d.index)
            .text(d.school);
    });

    createMap(schoolMarkers, minorityMarkers, demoMarkers);
};


d3.json(schoolLink, createLayers);




//piechart

var value = //
var label = 

var data = [{
    values: [19, 26, 55],
    labels: ['Residential', 'Non-Residential', 'Utility'],
    type: 'pie'
    }];
var layout = {
    height: 300,
    width: 500
};

Plotly.newPlot('myDiv', data,layout);
    

   




//gauge
// Enter a speed between 0 and 180...this should equal data point. arrow sets to this number
var level = 175;

// Trig to calc meter point
var degrees = 180 - level,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
  rotation: 90,
  text: ['TOO FAST!', 'Pretty Fast', 'Fast', 'Average',
            'Slow', 'Super Slow', ''],
  textinfo: 'text',
  textposition:'inside',      
  marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                         'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                         'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                         'rgba(255, 255, 255, 0)']},
  labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: '<b>Gauge</b> <br> Speed 0-100',
  height: 1000,
  width: 1000,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('myDiv', data, layout);


//Bubble hover events for scatter plot
var myPlot = document.getElementById('myDiv'),
    hoverInfo = document.getElementById('hoverinfo'),
    d3 = Plotly.d3,
    N = 16,
    x = d3.range(N),
    y1 = d3.range(N).map( d3.random.normal() ),
    y2 = d3.range(N).map( d3.random.normal() ),
    data = [ { x:x, y:y1, type:'scatter', name:'Trial 1',
        mode:'markers', marker:{size:16} },
        { x:x, y:y2, type:'scatter', name:'Trial 2',
        mode:'markers', marker:{size:16} } ];
    layout = {
        hovermode:'closest',
        title:'Hover on Points'
     };

Plotly.plot('myDiv', data, layout);

myPlot.on('plotly_hover', function(data){
    var infotext = data.points.map(function(d){
      return (d.data.name+': x= '+d.x+', y= '+d.y.toPrecision(3));
    });

    hoverInfo.innerHTML = infotext.join('
');
})
 .on('plotly_unhover', function(data){
    hoverInfo.innerHTML = '';
});
// Access the parameters that end-users filled in using webapp config
// For example, for a parameter called "input_dataset"
// input_dataset = dataiku.getWebAppConfig()['input_dataset']

var color_dict = {"Low":'#2ecc71', "Medium":'#f39c12', "High":'#e74c3c'}

$('.predict').on('click',function(){
   $('.form_screen').hide()
   $('.screen_result').show()
    
   var params={}
   $(".form_screen input").each(function(){
       
   params[this.id]=this.value
   console.log(this.value)
    });
    
   params['endpoint_url'] = $('#api_node').val()
   console.log(params)
    var flow_run =$.getJSON(getWebAppBackendUrl('get_predictions')+'/'+JSON.stringify(params),function(data){
        console.log(data)
        /* modifying html to show the dataset as a table */
        
    $('#category').text(data["risk"])
    $('#category').css('color', color_dict[data['risk']])
   $('#raw_container').val(data['raw'])
    $('#raw_query').show()

    
var wrapper = document.getElementById('progress');
var start = 0;
var end = data["prediction"];

var colours = {
  fill: color_dict[data['risk']],
  track: '#' + wrapper.dataset.trackColour,
  text: color_dict[data['risk']],
  stroke: '#' + wrapper.dataset.strokeColour,
}

var radius = 50;
var border = wrapper.dataset.trackWidth;
var strokeSpacing = wrapper.dataset.strokeSpacing;
var endAngle = Math.PI * 2;
var formatText = d3.format('.0%');
var boxSize = radius * 2;
var count = end;
var progress = start;
var step = end < start ? -0.01 : 0.01;

//Define the circle
var circle = d3.svg.arc()
  .startAngle(0)
  .innerRadius(radius)
  .outerRadius(radius - border);

//setup SVG wrapper
var svg = d3.select(wrapper)
  .append('svg')
  .attr('width', boxSize)
  .attr('height', boxSize);

// ADD Group container
var g = svg.append('g')
  .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

//Setup track
var track = g.append('g').attr('class', 'radial-progress');
track.append('path')
  .attr('class', 'radial-progress__background')
  .attr('fill', colours.track)
  .attr('stroke', colours.stroke)
  .attr('stroke-width', strokeSpacing + 'px')
  .attr('d', circle.endAngle(endAngle));

//Add colour fill
var value = track.append('path')
  .attr('class', 'radial-progress__value')
  .attr('fill', colours.fill)
  .attr('stroke', colours.stroke)
  .attr('stroke-width', strokeSpacing + 'px');

//Add text value
var numberText = track.append('text')
  .attr('class', 'radial-progress__text')
  .attr('fill', colours.text)
  .attr('text-anchor', 'middle')
  .attr('dy', '.5rem');

function update(progress) {
  //update position of endAngle
  value.attr('d', circle.endAngle(endAngle * progress));
  //update text value
  numberText.text(formatText(progress));
} 

(function iterate() {
  //call update to begin animation
  update(progress);
  if (count > 0) {
    //reduce count till it reaches 0
    count--;
    //increase progress
    progress += step;
    //Control the speed of the fill
    setTimeout(iterate, 10);
  }
})();
}
)
 })

$('.back').on('click',function(){
    
    $('#progress').empty();
    $('.screen_result').hide();
    $('#raw_query').hide();
    $('.form_screen').fadeIn();
    
})


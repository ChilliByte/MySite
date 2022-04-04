const animCanvas = document.getElementById("anim");
const graphDiv = document.getElementById("graph");

window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  setInterval(main, 300);
});

var labels = [
	'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];

var data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };
  
const plugin = {
  id: 'custom_canvas_background_color',
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};
  
var config = {
    type: 'line',
    data: data,
    options: {},
	plugins: [plugin]
};
  
var currentChart = new Chart(
    document.getElementById('chart'),
    config
); 

function main() {
	ahah("IMUdata.json","data");
} 

function back() {
	animCanvas.style.display = "block";
	graphDiv.style.display = "none";
}

function showGraph() {
	animCanvas.style.display = "none";
	graphDiv.style.display = "block";
}

function clickhandler(data) {
	showGraph();
} 
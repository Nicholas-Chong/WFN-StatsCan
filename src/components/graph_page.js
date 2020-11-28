import React from 'react'
import Chart from 'chart.js'
import * as ChartAnnotation from 'chartjs-plugin-annotation'
import '../css/graph.css'

var percentiles = [
    "5th Percentile",
    "10th Percentile",
    "15th Percentile",
    "20th Percentile",
    "25th Percentile",
    "30th Percentile",
    "35th Percentile",
    "40th Percentile",
    "45th Percentile",
    "50th Percentile",
    "55th Percentile",
    "60th Percentile",
    "65th Percentile",
    "70th Percentile",
    "75th Percentile",
    "80th Percentile",
    "85th Percentile",
    "90th Percentile",
    "95th Percentile",
    "96th Percentile",
    "97th Percentile",
    "98th Percentile",
    "99th Percentile",
]

var values = [
    2446,
    6946,
    10587,
    13577,
    16650,
    19382,
    22404,
    25982,
    30005,
    34204,
    38532,
    43007,
    47925,
    53532,
    60168,
    68332,
    78758,
    93339,
    120219,
    130728,
    146183,
    172507,
    234130,
]

class Graph extends React.Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        var gradient = myChartRef.createLinearGradient(0, 0, 0, 1000)
        gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
        gradient.addColorStop(0.40, 'rgba(255, 0, 0, 0.25)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        
        Chart.Tooltip.positioners.custom = function (elements, position) {
            var offset = 0

            if (position.x === 0) {
                offset = 10
            } else if (position.x === window.width) {
                offset = -20
            }

            return {
                x: position.x + offset,
                y: elements[0]._model.y,
            }
        }
        
        const c = new Chart(myChartRef, {
            plugins: [ChartAnnotation],
            type: "line",
            data: {
                //Bring in data
                labels: percentiles,
                datasets: [
                    {
                        label: "Earnings",
                        data: values,
                        backgroundColor: gradient,
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: '#911215',
                    }
                ]
            },
            options: {
                //Customize chart options
                tooltips: {
                    position: 'custom'
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false,
                    }]
                },
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false,
                annotation: {
                    annotations: [
                        {
                            type: 'line',
                            mode: 'vertical',
                            scaleID: 'x-axis-0',
                            value: '50th Percentile',
                            borderColor: 'black',
                            borderWidth: 4,
                            borderDash: [15, 8],
                        }
                    ]
                }
            }
        });

       var meta = c.getDatasetMeta(0)
       var rectangle = c.canvas.getBoundingClientRect();
       var point = meta.data[15].getCenterPoint();

       var mouseMoveEvent = new MouseEvent('mousemove', {
            clientX: rectangle.left + point.x,
            clientY: rectangle.top + point.y
        });

        c.canvas.dispatchEvent(mouseMoveEvent);

        document.addEventListener('click', function(e) {
            console.log(e.clientX, e.clientY)
        })
    }

    render() {
        return (
            <div className='Graph-container'>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default Graph
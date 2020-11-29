import React from 'react'
import Chart from 'chart.js'
import * as ChartAnnotation from 'chartjs-plugin-annotation'
import '../css/graph.css'
import { values, percentiles } from './data'

class Graph extends React.Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        // Reference the chart
        const myChartRef = this.chartRef.current.getContext("2d");

        // Create the gradient
        var gradient = myChartRef.createLinearGradient(0, 0, 0, 1000)
        gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
        gradient.addColorStop(0.60, 'rgba(255, 0, 0, 0.25)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        
        // Create custom chart tooltip positioner
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
        
        // Create the chart
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
                    drawTime: 'afterDatasetsDraw',
                    annotations: [
                        {
                            type: 'line',
                            mode: 'vertical',
                            scaleID: 'x-axis-0',
                            value: this.props.selectedPercentile,
                            borderColor: 'black',
                            borderWidth: 4,
                            borderDash: [15, 8],
                        }
                    ]
                }
            }
        });

        // var meta = c.getDatasetMeta(0)
        // var rectangle = c.canvas.getBoundingClientRect();
        // var point = meta.data[15].getCenterPoint();

        // var mouseMoveEvent = new MouseEvent('mousemove', {
        //         bubbles: true,
        //         cancelable: false,
        //         clientX: rectangle.left + point.x,
        //         clientY: rectangle.top + point.y
        //     });

        // c.canvas.dispatchEvent(mouseMoveEvent);
    }

    componentDidUpdate(prevProps) {
        // If the props changed, update the chart annotation
        if (prevProps.selectedPercentile !== this.props.selectedPercentile) {
            var chart = Chart.instances[0]
            chart.options.annotation.annotations[0].value = this.props.selectedPercentile
            chart.update()
        }
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
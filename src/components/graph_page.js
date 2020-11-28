import React from 'react'
import Chart from 'chart.js'
import '../css/graph.css'

class Graph extends React.Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        var gradient = myChartRef.createLinearGradient(0, 0, 0, 1400)
        gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        
        new Chart(myChartRef, {
            backgroundColor: "black",
            type: "line",
            data: {
                //Bring in data
                labels: ["Jan", "Feb", "March"],
                datasets: [
                    {
                        label: "Sales",
                        data: [86, 67, 91],
                        backgroundColor: gradient,
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: '#911215',
                    }
                ]
            },
            options: {
                //Customize chart options
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
            }
        });
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
class GraphChart {
    constructor(context, type, variableData) {
      this.context = context; 
      this.type = type;
      this.variableData = variableData;
      this.configGraph();
    };

    configGraph = function() {
        var chartColors = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(201, 203, 207)'
        };
        
        var dataSet = function onRefresh(chart) {
            chart.config.data.datasets.forEach(function(dataset) {
                dataset.data.push({
                    x: Date.now(),
                    y: dataReceived
                });
            });
        }
        
        var color = Chart.helpers.color;
        var config = {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Umidade do ar',
                    backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
                    borderColor: chartColors.green,
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                    data: []
                }]
            },
            options: {
                title: {
                    display: true,
                    //text: 'Grafico de Linha'
                },
                scales: {
                    xAxes: [{
                        type: 'realtime'
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Valor",
        
                        },
                        ticks: {
                            beginAtZero: true,
                            max: 100
                        }
        
                    }]
                },
                tooltips: {
                    mode: 'nearest',
                    intersect: false
                },
                hover: {
                    mode: 'nearest',
                    intersect: false
                },
                plugins: {
                    streaming: {
                        duration: 20000,
                        refresh: 1000,
                        delay: 1000,
                        onRefresh: dataSet
                    }
                }
            }
        };
        
          
        return config;  
    };

    loadGraph = function(){
        
    }
}

const quadrado = new Retangulo(10, 10);

console.log(quadrado.area);
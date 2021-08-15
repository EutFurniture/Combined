import React, { Component } from "react";
import Chart from "react-apexcharts";

function GenerateReport() {
    return (
        <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={ {
                chart: {
                  height: 350,
                  type: 'bar',
                  events: {
                    click: function(chart, w, e) {
                    }
                  }
                },
                
                plotOptions: {
                  bar: {
                    columnWidth: '45%',
                    distributed: true,
                  }
                },
                dataLabels: {
                  enabled: false
                },
                legend: {
                  show: false
                },
                
                xaxis: {
                  categories: [
                    ['John', 'Doe'],
                    ['Joe', 'Smith'],
                    ['Jake', 'Williams'],
                    'Amber',
                    ['Peter', 'Brown'],
                    ['Mary', 'Evans'],
                    ['David', 'Wilson'],
                    ['Lily', 'Roberts'], 
                  ],
                  labels: {
                    style: {
                      
                      fontSize: '12px'
                    }
                  }
                }
              }}
              series={[
                {
                  name: "series-1",
                  data: [21, 22, 10, 28, 16, 21, 13, 30]
                }
              ]}
              type="bar"
              width="500"
              height="350"
            />
          </div>
        </div>
      </div>
    )
}

export default GenerateReport;
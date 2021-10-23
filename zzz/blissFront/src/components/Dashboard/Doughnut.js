import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const BarChart = () => {
  
  return (
    <>
      <Doughnut
        data={{
          labels: ["Planning & Approval", "Construction", "Quality Inspection", "QA Sign off", "Final Approval"],

          datasets: [{
            data: [1, 1, 2, 6, 1],
            backgroundColor: ['#FA6164', '#0C1826', '#79EC7D', '#FDD422', '#DBDBDB'],
          }]
        }}
        width={400}
        height={300}
        options={{
          title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
        
      />
    </>
  )
}

export default BarChart;
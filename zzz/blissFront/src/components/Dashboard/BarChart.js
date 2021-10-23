import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  
  return (
    <>
      <Bar
        data={{
          labels: ["Planning & Appro", "Construction", "Quality Inspection", "QA sign off ", "Final Approval"],

          datasets: [{
            data: [3, 2, 5, 6, 1],
            backgroundColor: ['#FA6164', '#FFBC39', '#79EC7D', '#79EC7D', '#79EC7D'],
          }]
        }}
        width={400}
        height={300}
        options={{ indexAxis: 'y' }}
      />
    </>
  )
}

export default BarChart;
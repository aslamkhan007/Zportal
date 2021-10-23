import React, { Component, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts-gantt.src";


const GanttChart = (props) => {

    console.log("data from props", props.data);

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType="ganttChart"
                allowChartUpdate={true}
                options={{
                    chart: {
                        backgroundColor: "transparent"
                    },

                    yAxis: {
                        type: "treegrid",
                        uniqueNames: true
                    },
                    rangeSelector: {
                        selected: 2
                    },

                    series: [
                        {
                            data: props.data
                        }
                    ]
                }}
            />
        </div>
    );
};

export default GanttChart;

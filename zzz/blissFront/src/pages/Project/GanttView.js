import React, { Component } from "react";
import { render } from "react-dom";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts-gantt.src";
import GanttChart from "./../../components/Project/GantChart";


const GanttView = () => {
    const [data, setData] = React.useState([]);

    const addOneChild = () => {
        setData([
            {
                name: "Parent1",
                start: new Date('03/24/2019'),
                end: new Date('07/06/2019'),
                color: "rgba(0,0,255,0.6)",
                id: "parent_1",
                collapsed: false
            },
            {
                name: "Parent1",
                start: 1558526400000,
                end: 1558548000000,
                color: "rgba(0,0,255,0.6)",
                collapsed: false
            },
            {
                name: "Child 1",
                id: "child_1",
                parent: "parent_1",
                start: 1558519200000,
                end: 1558533600000,
                color: "rgba(0,255,255,0.6)"
            },
            {
                name: "Child 1",
                parent: "parent_1",
                start: 1558555200000,
                end: 1558562400000,
                color: "rgba(0,255,255,0.6)"
            }
        ]);
    };

    const addTwoChildren = () => {
        setData([
            {
                name: "Parent2",
                start: 1558569600000,
                end: 1558598400000,
                color: "rgba(0,0,255,0.6)",
                id: "parent_2",
                collapsed: false
            },
            {
                name: "Parent2",
                start: 1558623600000,
                end: 1558638000000,
                color: "rgba(0,0,255,0.6)",
                collapsed: false
            },
            {
                name: "Child 10",
                id: "child_10",
                parent: "parent_2",
                start: 1558580400000,
                end: 1558587600000,
                color: "rgba(0,255,255,0.6)"
            },
            {
                name: "Child 10",
                parent: "parent_2",
                start: 1558602000000,
                end: 1558627200000,
                color: "rgba(0,255,255,0.6)"
            },
            {
                name: "Child 11",
                id: "child_2",
                parent: "parent_2",
                start: 1558634400000,
                end: 1558645200000,
                color: "rgba(0,255,255,0.6)"
            }
        ]);
    };

    const addFiveChildren = () => {
        setData([
            {
                name: "Parent5",
                start: 1558656000000,
                end: 1558666800000,
                color: "rgba(0,0,255,0.6)",
                id: "parent_5",
                collapsed: false
            },
            {
                name: "Parent5",
                start: 1558674000000,
                end: 1558681200000,
                color: "rgba(0,0,255,0.6)",
                collapsed: false
            },
            {
                name: "Child 20",
                id: "child_20",
                parent: "parent_5",
                start: 1558674000000,
                end: 1558688400000,
                color: "rgba(0,255,255,0.6)"
            },
            {
                name: "Child 20",
                parent: "parent_5",
                start: 1558706400000,
                end: 1558717200000,
                color: "rgba(0,255,255,0.6)"
            },
            {
                name: "Child 21",
                id: "child_21",
                parent: "parent_5",
                start: 1558724400000,
                end: 1558728000000,
                color: "rgba(0,255,255,0.6)"
            },
            {
                name: "Child 22",
                id: "child_22",
                parent: "parent_5",
                start: 1558670400000,
                end: 1558674000000,
                color: "rgba(0,255,255,0.6)"
            },
            {
                name: "Child 23",
                id: "child_23",
                parent: "parent_5",
                start: 1558681200000,
                end: 1558695600000,
                color: "rgba(0,255,255,0.6)"
            },
            {
                name: "Child 24",
                id: "child_24",
                parent: "parent_5",
                start: 1558688400000,
                end: 1558710000000,
                color: "rgba(0,255,255,0.6)"
            }
        ]);
    };

    return (
        <div style={{ height: "100%" }}>
            {/* <button onClick={() => addOneChild()}>Add parent with one child</button>
            <button onClick={() => addTwoChildren()}>Add parent with two children</button> */}
            <button onClick={() => addFiveChildren()}>push data</button>
            <GanttChart data={data} />
        </div>
    );
};

export default GanttView;
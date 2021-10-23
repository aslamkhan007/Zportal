import React, { Component, useState, useEffect } from "react";
import Gantt from "./../../components/Project/Gantt";
import Toolbar from "./../../components/Project/Toolbar";
import MessageArea from "./../../components/Project/MessageArea";
import { getProjectGanttView } from "../../redux/Action/project.action";
const data = {
    data: [
        {
            id: 1,
            text: "Task #1",
            start_date: "2020-02-12",
            end_date: "2020-02-13",
            duration: 1,
            progress: 0.6,
        },
        {
            id: 2,
            text: "Task #2",
            start_date: "2020-02-16",

            duration: 3,
            progress: 0.4,
        },
    ],
    links: [],
};
// { id: 1, source: 1, target: 2, type: "0" }
const GantView = (props) => {
    const [currentZoom, setCurrentZoom] = React.useState("day");
    const [messages, setMessages] = React.useState([]);
    const [ganttData, setGanttData] = React.useState([]);

    const addMessage = (message) => {
        const maxLogLength = 5;
        const newMessate = { message };
        const messagees = [newMessate, messages];

        // if (messagees.length > maxLogLength) {
        //     messagees.length = maxLogLength;
        // }
        setMessages(messagees);
    }

    const logDataUpdate = (type, action, item, id) => {
        let text = item && item.text ? ` (${item.text})` : "";
        let message = `${type} ${action}: ${id} ${text}`;
        if (type === "link" && action !== "delete") {
            message += ` ( source: ${item.source}, target: ${item.target} )`;
        }
        addMessage(message);
    };

    const handleZoomChange = (zoom) => {
        setCurrentZoom(zoom);
    };
    const getProject = async () => {

        const response = await getProjectGanttView(props.projectId)
        if (response.status === 200) {
            console.log("response p:::", response)
            setGanttData(response.results)

        }
    }

    const createStage = () => {
        //setGanttData([])
        props.isShowCreateStagePopup(true)
    }

    useEffect(() => {
        setGanttData([])
        getProject();
    }, [props.projectId]);

    useEffect(() => {
        if (props.stageChangeOrAdd) {
            getProject();
        }

    }, [props.stageChangeOrAdd]);



    const Gant = (props) => {

        return (<div>
            <div className="zoom-bar">
                <Toolbar zoom={currentZoom} onZoomChange={handleZoomChange} />
            </div>
            <div className="gantt-container">
                <Gantt
                    tasks={props.ganttData}
                    zoom={currentZoom}
                    onDataUpdated={logDataUpdate}
                />
            </div>

        </div>
        )
    }
    //console.log("ganttData==",ganttData)
    return (
        <>
            {ganttData && ganttData.data && ganttData.data.length > 0 &&
                <Gant
                    ganttData={ganttData}
                />
            }

            <button
                className="bg-transparent border-0 px-3 py-2"
                onClick={createStage}
            >
                Add Stage
            </button>
        </>
    );

}

export default GantView;
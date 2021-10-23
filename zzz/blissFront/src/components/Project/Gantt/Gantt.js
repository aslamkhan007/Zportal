import React, { Component } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

export default class Gantt extends Component {
  constructor(props) {
    super(props);
    this.initZoom();
  }

  // instance of gantt.dataProcessor
  dataProcessor = null;

  initZoom = () => {
    var zoomConfig = {
      levels: [
        {
          name: "day",
          scale_height: 27,
          min_column_width: 80,
          scales: [{ unit: "day", step: 1, format: "%d %M" }],
        },
        {
          name: "week",
          scale_height: 50,
          min_column_width: 50,
          scales: [
            {
              unit: "week",
              step: 1,
              format: function (date) {
                var dateToStr = gantt.date.date_to_str("%d %M");
                var endDate = gantt.date.add(date, 6, "day");
                var weekNum = gantt.date.date_to_str("%W")(date);
                return (
                  "#" +
                  weekNum +
                  ", " +
                  dateToStr(date) +
                  " - " +
                  dateToStr(endDate)
                );
              },
            },
            { unit: "day", step: 1, format: "%j %D" },
          ],
        },
        {
          name: "month",
          scale_height: 50,
          min_column_width: 120,
          scales: [
            { unit: "month", format: "%F, %Y" },
            { unit: "week", format: "Week #%W" },
          ],
        },
        {
          name: "quarter",
          height: 50,
          min_column_width: 90,
          scales: [
            { unit: "month", step: 1, format: "%M" },
            {
              unit: "quarter",
              step: 1,
              format: function (date) {
                var dateToStr = gantt.date.date_to_str("%M");
                var endDate = gantt.date.add(
                  gantt.date.add(date, 3, "month"),
                  -1,
                  "day"
                );
                return dateToStr(date) + " - " + dateToStr(endDate);
              },
            },
          ],
        },
        {
          name: "year",
          scale_height: 50,
          min_column_width: 50,
          scales: [{ unit: "year", step: 1, format: "%Y" }],
        },
      ],
    };
    gantt.ext.zoom.init(zoomConfig);
  };

  setZoom(value) {
    console.log("value", value);
    gantt.ext.zoom.setLevel(value);
  }

  initGanttDataProcessor() {
    /**
     * type: "task"|"link"
     * action: "create"|"update"|"delete"
     * item: data object object
     */
    const onDataUpdated = this.props.onDataUpdated;

    this.dataProcessor = gantt.createDataProcessor((type, action, item, id) => {
      return new Promise((resolve, reject) => {
        if (onDataUpdated) {
          onDataUpdated(type, action, item, id);
        }

        // if onDataUpdated changes returns a permanent id of the created item, you can return it from here so dhtmlxGantt could apply it
        // resolve({id: databaseId});
        return resolve();
      });
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.zoom !== nextProps.zoom;
  }

  
  componentDidMount() {
    gantt.clearAll();
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.config.columns = [
      {
        name: "text",
        tree: true,
        resize: false,
        label: "Programs",
        width: 200,
      },
    ];
    gantt.attachEvent("onTaskClick", function (id, e) {
      e.preventDefault()
      return false
    });
    //gantt.clearAll();
    let tasks = []
    tasks = this.props.tasks;
    
    //console.log("tasks==",tasks)
    gantt.init(this.ganttContainer);
    this.initGanttDataProcessor();
    gantt.parse(tasks);
  }

  componentWillUnmount() {
    if (this.dataProcessor) {
      this.dataProcessor.destructor();
      this.dataProcessor = null;
    }
  }

  render() {
    const { zoom } = this.props;
    this.setZoom(zoom);
    return (
      <>
      <div
        ref={(input) => {
          this.ganttContainer = input;
        }}
        style={{ width: "100%", height: "100%" }}
      ></div>
      </>
    );
  }
}

import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Form, Button, Dropdown, Modal } from 'react-bootstrap';
import Sidebar from "./../../components/Common/Sidebar";
import Topbar from "./../../components/Common/Topbar";
import Board, { moveCard } from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'
import '../Dashboard/Dashboard.scss';



function Cards() {
  
  
    const sidebar = {
      sidebarSubTitle: [
        {
          "name": "My Dashboard",
          "link": "dashboard",
          
        },
        {
          "name": "Site 1056 - Feltham...",
          "link": "dashboard-project",
        },
        {
          "name": "Digital Transformation",
          "link": "dashboard-digital-transformation",
        },
      ]
    }

    const board = {
        columns: [
          {
            id: 1,
            title: "Backlog",
            cards: [
              {
                id: 1,
                title: "Card title 1",
                description: "Card content"
              },
              {
                id: 2,
                title: "Card title 2",
                description: "Card content"
              },
              {
                id: 3,
                title: "Card title 3",
                description: "Card content"
              }
            ]
          },
          {
            id: 2,
            title: "Doing",
            cards: [
              {
                id: 9,
                title: "Card title 9",
                description: "Card content"
              }
            ]
          },
          {
            id: 3,
            title: "Q&A",
            cards: [
              {
                id: 10,
                title: "Card title 10",
                description: "Card content"
              },
              {
                id: 11,
                title: "Card title 11",
                description: "Card content"
              }
            ]
          },
          {
            id: 4,
            title: "Production",
            cards: [
              {
                id: 12,
                title: "Card title 12",
                description: "Card content"
              },
              {
                id: 13,
                title: "Card title 13",
                description: "Card content"
              }
            ]
          }
        ]
      };
    const [controlledBoard, setBoard] = useState(board);

    function handleCardMove(_card, source, destination) {
        //const updatedBoard = moveCard(controlledBoard, source, destination);
        //setBoard(updatedBoard);
        console.log("cars",_card)
        console.log("source",source)
        console.log("destination",destination)
      }  
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const YourCard = ({dragging,children})=>{
        return <div dragging={dragging}>{children}</div>
    }

    const editCard =(id)=>{
        
        console.log("id",id)
    }
    return (
      <React.Fragment>
        
          <div className="main-sec">
          <Sidebar sidebarTitle={"Dashboards"} sidebar={sidebar} />

            <div className="right-sec">
            
            <div className="top-bar bg-white">
              <Topbar topBarTitle={"Good Morning, Harry"} />
              <div className="d-flex justify-content-between">
                <h5 className="d-none d-md-inline-block">On this day: 1966, 1st soft landing on Moon (Soviet Luna 9)</h5>
                <div className="mb-2 text-nowrap">
                  <Button variant="outline-secondary" type="submit" className="btn-sm">
                    Run Report
                  </Button>
                  <Button variant="outline-secondary" type="submit" className="btn-sm ms-2">
                    Add Widget
                  </Button>
                </div>
              </div>
            </div>

            <div className="right-content-wrap">
            <Board
                allowRemoveLane
                allowRenameColumn
                allowRemoveCard
                allowEditCard={console.log("edit")}
                onLaneRemove={console.log}
                onCardRemove={console.log}
                onLaneRename={console.log}
                initialBoard={board}
                allowAddCard={{ on: "top" }}
                onNewCardConfirm={draftCard => ({
                    id: new Date().getTime(),
                    ...draftCard
                })}
                onCardNew={console.log}
                onCardDragEnd={handleCardMove}
                renderCard={({ title, description,id }, { removeCard, dragging}) => (
                    <YourCard dragging={dragging}>
                      <input type="text" value={title}/>
                      <textarea>{description}</textarea>
                      <button type="button" onClick={removeCard}>Remove Card</button>
                      <button type="button" onClick={()=>editCard(id)}>Edit Card</button>
                    </YourCard>
                  )}
                />
              </div>
            </div>
          </div>
          
      </React.Fragment>
    )
  
}
export default Cards;
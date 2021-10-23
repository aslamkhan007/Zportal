import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Form, Button, Dropdown, Modal } from "react-bootstrap";
import Sidebar from "../../components/Common/Sidebar";
import Topbar from "../../components/Common/Topbar";
import Board, { moveCard } from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import { getProjectBoardView } from "../../redux/Action/project.action";
import { editTicketAction } from "../../redux/Action/tickets.action";
import { createStatusAction, editStatusAction } from "../../redux/Action";
import ModalPopup from "../../components/Project/modal_popup";
import StageContainer from "../../components/Project/boardView/StageContainer";
import TicketContainer from "../../components/Project/boardView/TicketContainer";
import { ConfirmDeleteModal } from "../../components/Project/ConfirmDeleteModal";
import { createNotification } from "../../Helper/helper";
//import '../Dashboard/Dashboard.scss';

const BoardView = (props) => {
  const sidebar = {
    sidebarSubTitle: [
      {
        name: "My Dashboard",
        link: "dashboard",
      },
      {
        name: "Site 1056 - Feltham...",
        link: "dashboard-project",
      },
      {
        name: "Digital Transformation",
        link: "dashboard-digital-transformation",
      },
    ],
  };

  const [controlledBoard, setControlledBoard] = useState({ columns: [] });
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [operationType, setOperationType] = useState("delete");
  const [popupMessage, setPopupMessage] = useState("Are you sure");
  const [selectedTicketId, setSelectedTicketId] = useState("Are you sure");
  const getProject = async () => {
    const response = await getProjectBoardView(props.projectId);
    if (response.status === 200) {
      setControlledBoard({ columns: response.results.columns });
    }
  };

  function handleCardMove(_cards, source, destination, dumm) {
    console.log("cards::", _cards);
    console.log("source::", source);
    console.log("destination::", destination);
    console.log("dumm::", dumm);
    changeTicketStageId(_cards, source, destination.fromColumnId);
  }

  const onColumnDragEnd = async (data, source, destination, dum) => {
    let statusIds = data.columns.map((stage) => stage.id);
    const response = await editStatusAction({ statusIds });
    console.log("response::::", response);
    console.log("ids:::", statusIds);
  };

  const changeTicketStageId = async (stages, ticket, prevStatusId) => {
    let status = "";
    let ticketIds = [];
    stages.columns.map((stage) => {
      if (stage.cards) {
        let found = stage.cards.find((card) => card.id === ticket.id);

        if (found) {
          status = stage.id;
          ticketIds = stage.cards.map((ticket) => ticket.id);
        }
      }
    });
    console.log("ticketIds:::", ticketIds);
    //call here api to change the drag
    const response = await editTicketAction({
      operationType: "edit",
      status,
      ticketId: ticket.id,
      prevStatusId,
      ticketIds,
    });
    console.log("response::", response);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editCard = (id) => {
    console.log("id", id);
  };
  const HandleStatusCreate = () => {
    props.addStatusPopupHandler(true);
  };

  const HandleStatusEdit = (data) => {
    props.editStatusPopupHandler(true, data.id, data.title);
  };

  const HandleStatusDelete = (data) => {
    setSelectedTicketId(data.id);
    setShowConfirmPopup(true);
    setOperationType("statusDelete");
    setPopupMessage([
      <p>You are about to permenantly delete selected status.</p>,
      <p> Please confirm this is the action you wish to take</p>,
    ]);
  };

  const HandleStageCreate = () => {
    props.isShowCreateStagePopup(true);
  };

  const HandleStageEdit = (data) => {
    props.isShowEditStagePopup(true, data.id, data.title, data.description);
  };
  const HandleStageDelete = (data) => {
    props.isShowDeleteStagePopup(true, data.id);
  };
  const HandleStageArchive = (data) => {
    props.isShowArchiveStagePopup(true, data.id);
  };
  const HandleTicketCreate = () => {
    props.setShowModalPopup(true);
  };

  // ticket operatons
  const handleDeleteTicket = (id) => {
    setSelectedTicketId(id);
    setShowConfirmPopup(true);
    setOperationType("delete");
    setPopupMessage([
      <p>You are about to delete selected items </p>,
      <p> Please confirm this is the action you wish to take</p>,
    ]);
  };
  // ticket operatons
  const handleArchiveTicket = (id) => {
    setSelectedTicketId(id);
    setShowConfirmPopup(true);
    setOperationType("archive");
    setPopupMessage([
      <p>You are about to archive selected items </p>,
      <p> Please confirm this is the action you wish to take</p>,
    ]);
  };

  const popupConfirmHandler = async ({ ot }) => {
    if (ot === "statusDelete") {
      const response = await editStatusAction({
        operationType: "delete",
        statusId: selectedTicketId,
        projectId: props.projectId,
      });
      console.log("response:::", response);
      if (response.status === 200) {
        props.setOp(true);
        createNotification("success", response.message);
      }
    }

    if (ot === "delete") {
      const response = await editTicketAction({
        operationType: ot,
        ticketId: selectedTicketId,
      });
      if (response.status === 200) {
        props.setOp(true);
        createNotification("success", response.message);
      }
    }
    if (ot === "archive") {
      const response = await editTicketAction({
        operationType: ot,
        ticketId: selectedTicketId,
      });
      if (response.status === 200) {
        props.setOp(true);
        createNotification("success", response.message);
      }
    }

    setShowConfirmPopup(false);
  };
  const popupCancelHandler = async () => {
    setShowConfirmPopup(false);
  };

  const GetBoard = () => {
    console.log("controlledBoard==", controlledBoard);
    return (
      <>
        <ConfirmDeleteModal
          showModalPopup={showConfirmPopup}
          popupMessage={popupMessage}
          operationType={operationType}
          onConfirm={popupConfirmHandler}
          onPopupClose={popupCancelHandler}
        />
        <Board
          allowRemoveLane
          //allowRenameColumn
          allowRemoveCard
          allowEditCard={console.log("edit")}
          onLaneRemove={console.log}
          onCardRemove={console.log()}
          onLaneRename={console.log}
          initialBoard={controlledBoard}
          // allowAddCard={{ on: "top" }}
          onNewCardConfirm={(draftCard) => ({
            id: new Date().getTime(),
            ...draftCard,
          })}
          renderColumnHeader={(
            { title, description, id },
            { removeColumn, renameColumn, addCard, dragging }
          ) => (
            <StageContainer
              dragging={dragging}
              id={id}
              title={title}
              description={"description"}
              HandleStageCreate={HandleStageCreate}
              HandleStageEdit={HandleStageEdit}
              HandleStageDelete={HandleStageDelete}
              HandleStageArchive={HandleStageArchive}
              HandleTicketCreate={HandleTicketCreate}
              HandleStatusCreate={HandleStatusCreate}
              HandleStatusEdit={HandleStatusEdit}
              HandleStatusDelete={HandleStatusDelete}
            />
          )}
          onCardNew={console.log()}
          onCardDragEnd={handleCardMove}
          onColumnDragEnd={onColumnDragEnd}
          renderCard={(
            {
              title,
              description,
              id,
              ticketCode,
              stageId,
              projectId,
              status,
              ...rest
            },
            { removeCard, dragging }
          ) => {
            let obj = {
              _id: id,
              title: title,
              description: description,
              ticketCode: ticketCode,
              stageId: stageId,
              projectId: projectId,
              status: status,
              ...rest,
            };
            return (
              <TicketContainer
                dragging={dragging}
                handleArchiveTicket={handleArchiveTicket}
                handleDeleteTicket={handleDeleteTicket}
                ticket={obj}
                isShowEditTicketPopup={props.isShowEditTicketPopup}
              />
            );
          }}
        />
      </>
    );
  };

  useEffect(() => {
    getProject();

    props.setOp(false);
  }, [props.projectId, props.op]);
  return (
    <React.Fragment>
      {controlledBoard &&
        controlledBoard.columns &&
        controlledBoard.columns.length > 0 && <GetBoard />}
    </React.Fragment>
  );
};
export default BoardView;

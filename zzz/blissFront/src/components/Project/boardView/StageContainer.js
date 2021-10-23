import React from 'react';
import { Dropdown } from 'react-bootstrap';

const StageContainer = ({ id, title, dragging, description, HandleStageEdit, HandleStageCreate, HandleTicketCreate, HandleStageArchive, HandleStageDelete, HandleStatusCreate, HandleStatusEdit, HandleStatusDelete }) => {
    return (

        <div dragging={dragging} className="board-head-name">
            <div className="bb-tn">
                {title}
                <Dropdown>
                    <Dropdown.Toggle
                        className="p-0 bg-transparent border-0"
                        id="dropdown-basic"
                    >
                        <svg
                            width="19"
                            height="6"
                            viewBox="0 0 19 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <ellipse
                                cx="2.475"
                                cy="2.72402"
                                rx="2.475"
                                ry="2.475"
                                fill="#DBDBDB"
                            />
                            <ellipse
                                cx="9.07559"
                                cy="2.72402"
                                rx="2.475"
                                ry="2.475"
                                fill="#DBDBDB"
                            />
                            <circle
                                cx="15.6752"
                                cy="2.72402"
                                r="2.475"
                                fill="#DBDBDB"
                            />
                        </svg>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="right">
                        {/* <Dropdown.Item
                         onClick={() => HandleStageEdit({ title, id, description })}
                     >
                         Rename
                     </Dropdown.Item>
                     <Dropdown.Item
                         onClick={() => HandleStageCreate()}
                     >
                         New Stage
                     </Dropdown.Item> */}

                        <Dropdown.Item onClick={() => HandleStatusCreate()}>
                            Add Status
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => HandleTicketCreate()}>
                            New ticket
                        </Dropdown.Item>

                        {title && title !== 'DONE' && <>
                            <Dropdown.Item onClick={() => HandleStatusDelete({ id })}>
                                Delete
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => HandleStatusEdit({ title, id })}>
                                Rename Status
                            </Dropdown.Item>
                        </>
                        }


                        {/* <Dropdown.Item onClick={() => HandleStageArchive({ title, id })}>
                         Archive
                     </Dropdown.Item>
                     <Dropdown.Item onClick={() => HandleStageDelete({ title, id })}>
                         Delete
                     </Dropdown.Item> */}
                    </Dropdown.Menu>
                </Dropdown>


            </div>
        </div>
    )
}

export default StageContainer


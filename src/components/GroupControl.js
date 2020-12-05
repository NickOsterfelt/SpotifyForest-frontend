import React from "react";
import "../static/GroupControl.css";
import "@fortawesome/fontawesome-free"

function GroupControl({ incrementControl, decrementControl, groupName, idx, numGroups }) {
    let leftBtn;
    let rightBtn;

    if (idx > 0) {
        leftBtn = (
            <button
                className={"btn btn-outline-success mx-2"}
                onClick={decrementControl}>
                {<i className="fas fa-arrow-left"></i>}
            </button>
        )
    }

    if (idx < numGroups -1 ) {
        rightBtn = (
            <button
                className={"btn btn-outline-success mx-2"}
                onClick={incrementControl}>
                {<i className="fas fa-arrow-right"></i>}
            </button>
        );
    }

    return (
        <div className="group-control pt-3">
            {leftBtn}
            <h4>{groupName}</h4>
            {rightBtn}
        </div>
    );
}

export default GroupControl;
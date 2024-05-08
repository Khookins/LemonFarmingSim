import React from "react";
import "../css/dialog.css";

function ConfirmationDialog(props) {
    return (
        <div className="confirmationDialog">
            <div>{props.msg}</div>
            <p>{props.dialog}</p>
            <div className="buttonContainer">
                <button onClick={props.onCancel}>{props.cancelMsg}</button>
                <button onClick={props.onConfirm}>{props.confirmMsg}</button>
            </div>
        </div>
    );
}

export default ConfirmationDialog;

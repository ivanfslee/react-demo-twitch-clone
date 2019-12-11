import React from 'react';
import ReactDOM from 'react-dom'; //importing reactDOM here

const Modal = props => {
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active">
            <div className="ui standard modal visible active">
                test modal
            </div>
        </div>,
        document.querySelector('#modal') //rederence to an html element 
    );
};

export default Modal;
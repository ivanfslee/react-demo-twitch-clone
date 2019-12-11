import React from 'react';
import ReactDOM from 'react-dom'; //importing reactDOM here
import history from '../history';

const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={() => history.push('/')} className="ui dimmer modals visible active">
            <div onClick={e => e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">{props.title}</div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal') //rederence to an html element 
    );
};

export default Modal;
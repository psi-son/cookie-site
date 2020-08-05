import React, { useState } from 'react';
import Constants from './Constants.js';
import { Badge, Modal, Button } from 'react-bootstrap';

function Tag(props) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    var name = props.name;
    var type = props.type;
    var whiteList = type === "tag" ? Constants.getTagWhiteList() : Constants.getGirlWhiteList();
    var blackList = type === "tag" ?  Constants.getTagBlackList() : Constants.getGirlBlackList();
    
    var color;
    if (whiteList.includes(name)) {
        color = "success";
    } else if (blackList.includes(name)) {
        color = "danger";
    } else {
        color = "secondary"
    }

    const addToWhiteList = function () {
        if (type === "tag") {
            Constants.addToTagWhiteList(name);
        } else {
            Constants.addToGirlWhiteList(name);
        }
        handleClose()
    }
    const addToBlackList = function () {
        if (type === "tag") {
            Constants.addToTagBlackList(name);
        } else {
            Constants.addToGirlBlackList(name);
        }
        handleClose()
    }
    const removeFromList = function () {
        if (type === "tag") {
            if (color === "success") {
                Constants.removeFromTagWhiteList(name);
            } else {
                Constants.removeFromTagBlackList(name);
            }
        } else {
            if (color === "success") {
                Constants.removeFromGirlWhiteList(name);
            } else {
                Constants.removeFromGirlBlackList(name);
            }
        }
        handleClose()
    }
    const moveToWhiteList = function () {
        removeFromList()
        addToWhiteList()
    }
    const moveToBlackList = function () {
        removeFromList()
        addToBlackList()
    }

    var footerButtons = color === "success" ?
        (<div>
            <Button variant="secondary" onClick={removeFromList}>
                Remove from Whitelist
            </Button>
            <Button variant="danger" onClick={moveToBlackList}>
                Move to Blacklist
            </Button>
        </div>) : color === "danger" ?
        (<div>
            <Button variant="secondary" onClick={removeFromList}>
                Remove from Blacklist
            </Button>
            <Button variant="success" onClick={moveToWhiteList}>
                Move to Whitelist
            </Button>
        </div>) :
        (<div>
            <Button variant="success" onClick={addToWhiteList}>
                Add to Whitelist
            </Button>
            <Button variant="danger" onClick={addToBlackList}>
                Add to Blacklist
            </Button>
        </div>)

    return (<div>
        <Badge variant={color} pill onClick={handleShow}>{name}</Badge>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                {footerButtons}
            </Modal.Footer>
        </Modal>
    </div>)
}

export default Tag;
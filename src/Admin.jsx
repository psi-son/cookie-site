import React, { useState, useEffect } from 'react'
import firebase from './firebase.js'
import constants from './Constants.js'
import GirlLink from './GirlLink.jsx'

var updateAll = function() {
    firebase.database().ref("Images").once("value").then(function (snap) {
        var tagsList = {};
        var girlList = {};
        var gameList = {};
        snap.val().forEach(function (elem, idx) {
            elem.Game = elem.Game || "";
            elem.Girl = elem.Girl || [];
            elem.Name = elem.Name || "";
            elem.Tags = elem.Tags || [];

            if (elem.Game in gameList ) {
                elem.Girl.forEach(girl => gameList[elem.Game].add(girl));
            } else {
                gameList[elem.Game] = new Set();
                elem.Girl.forEach(girl => gameList[elem.Game].add(girl));
            }
            elem.Girl.forEach(function (girl) {
                if (girl in girlList) {
                    girlList[girl].push(idx);
                } else {
                    girlList[girl] = [idx];
                }
            });
            elem.Tags.forEach(function (tag) {
                if (tag in tagsList) {
                    tagsList[tag].push(idx);
                } else {
                    tagsList[tag] = [idx];
                }
            })

        })
        delete gameList[""];
        firebase.database().ref("Tags").set(tagsList);
        firebase.database().ref("Girls").set(girlList);
        for (var game in gameList) {
            let arr = []
            gameList[game].forEach(e => arr.push(e))
            gameList[game] = arr
        }
        firebase.database().ref("Game").set(gameList);
    });
}

function Admin() {
    const [edit, setEdit] = useState(constants.getEditMode())
    const [info, setInfo] = useState([]);
    
    useEffect(() => {
        firebase.database().ref("Images").once('value').then(function (snap) {
            var imInfo = []
            snap.forEach(function (smolSnap) {
                let val = smolSnap.val()
                let info = {
                    id: smolSnap.key,
                    Game: val.Game || "",
                    Girl: val.Girl ? val.Girl.join(", ") : "",
                    Name: val.Name || "",
                    Path: val.Path || "",
                    Tags: val.Tags ? val.Tags.join(", ") : ""
                }
                imInfo.push(info);
            })
            setInfo(imInfo);
        })
    }, [])
    
    function handleChange(event) {
        var bool = event.target.checked;
        constants.setEditMode(bool);
        setEdit(bool);
    }

    var todoList = info.filter(function (imInfo) {
        return imInfo.Game === ""
            || imInfo.Girl === ""
            || imInfo.Name === ""
            || imInfo.Path === ""
            || imInfo.Tags === ""
    }).map(function (imInfo) {
        return (<div className="col-lg-3 col-md-4 col-sm-6 col-12" key={imInfo.id}>
            <div className="card">
                <div className="card-body">
                    <GirlLink id={imInfo.id} imInfo={imInfo}/>
                </div>
            </div>
        </div>)
    })

    return (<div className="container mt-3">
        <div className="card">
            <h4 className="card-header">
                If you don't know what this is, don't mess with it
            </h4>
            <div className="card-body">
                <div className="input-group m-3">
                    <div className="input-group-prepend">
                        <button type="button" className="form-control btn btn-primary" onClick={updateAll}>Run</button>
                    </div>
                    <div className="form-control">
                        Update Tags, Girls, and Game search critera in db
                    </div>
                </div>
                <div className="input-group m-3">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <input type="checkbox" checked={edit} onChange={handleChange} />
                        </div>
                        
                    </div>
                    <div className="form-control">
                        Edit Mode
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3>Needs more info</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {todoList}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Admin;
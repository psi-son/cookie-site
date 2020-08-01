import React from 'react';
import firebase from './firebase.js';

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

    return (<div className="container mt-3">
        <div className="card">
            <h4 className="card-header">
                If you don't know what this is, don't mess with it
            </h4>
            <div className="card-body">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <button type="button" className="form-control btn btn-primary" onClick={updateAll}>Run</button>
                    </div>
                    <div className="form-control">
                        Update Tags, Girls, and Game search critera in db
                    </div>
                </div>
                
            </div>
        </div>
    </div>);
}

export default Admin;
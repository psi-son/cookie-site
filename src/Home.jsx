import React from 'react'
//import info from './info.json'
import Card from './Card.jsx'
import firebase from './firebase.js'
import { useHistory } from 'react-router-dom'

function GirlLink(props) {
    let hist = useHistory();
    function handle() {
        hist.push(process.env.PUBLIC_URL + '/Girl/'+props.id)
    }
    return (<div onClick={handle}>
        <Card info={props.imInfo} />
    </div>)
}

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            imgs: []
        }
        this.loadData()
    }
    
    loadData() {
        var comp = this;
        firebase.database().ref("Images").once('value').then(function (snap) {
            snap.forEach(function (smolSnap) {
                var info = smolSnap.val();
                var imInfo = {
                    Game: info.Game || "",
                    Girl: info.Girl ? info.Girl.join(", ") : "",
                    Name: info.Name || "",
                    Path: info.Path || "",
                    Tags: info.Tags ? info.Tags.join(", ") : ""
                }
                var newImgs = comp.state.imgs.concat(<div className="col-sm-6 col-md-4 col-lg-3" key={smolSnap.key}>
                    <GirlLink imInfo={imInfo} id={smolSnap.key}  />
                </div>);
                comp.setState({
                    imgs: newImgs
                })
            })
        });
    }
    
    render() {
        return (<div className="container">
            <div className="row">
                {this.state.imgs}
            </div>
        </div>);
    }
}


export default Home;
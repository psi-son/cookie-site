import React from 'react';
import Tag from './Tag.jsx'
import firebase from './firebase.js';
import Constants from './Constants.js';


class Tags extends React.Component {
    constructor() {
        super();
        this.state = {
            whiteList: Constants.getGirlWhiteList(),
            blackList: Constants.getGirlBlackList(),
            allGirls: []
        }

        var vm = this;
        firebase.database().ref("Girls").once("value").then(function (snap) {
            console.log(snap.val())
            var girls = []
            snap.forEach(function (smolSnap) {
                girls.push(smolSnap.key)
            })
            vm.setState({ allGirls: girls })
        })
    }

    handleWhiteList = () => this.setState({ whiteList: Constants.getGirlWhiteList() })
    handleBlackList = () => this.setState({ blackList: Constants.getGirlBlackList() })

    componentWillMount() {
        Constants.registerGirlWhiteListHandler(this.handleWhiteList)
        Constants.registerGirlBlackListHandler(this.handleBlackList)
    }

    componentWillUnmount() {
        Constants.unregisterGirlWhiteListHandler(this.handleWhiteList)
        Constants.unregisterGirlBlackListHandler(this.handleBlackList)
    }

    render() {
        return (<div className="container">
            <div className="card">
                <div className="card-header">
                    <h3>Girl List</h3>
                    Click on a Girl to change her location. 
                </div>
                <div className="card-body">
                    <div className="row">
                        <strong>White List:</strong>{this.state.whiteList.map(name => <Tag name={name} type="girl" key={name} />)}
                    </div>
                    <div className="row">
                        <strong>Black List:</strong>{this.state.blackList.map(name => <Tag name={name} type="girl" key={name} />)}
                    </div>
                </div>
                <div className="card-body">
                    <div>
                        <h5>All Girls</h5>
                    </div>
                    <div className="row">
                        {this.state.allGirls.map(name => <Tag name={name} type="girl" key={name} />)}
                    </div>
                </div>
            </div>
            
        </div>)
    }
}

export default Tags;
import React from 'react';
import Tag from './Tag.jsx'
import firebase from './firebase.js';
import Constants from './Constants.js';


class Tags extends React.Component {
    constructor() {
        super();
        this.state = {
            whiteList: Constants.getTagWhiteList(),
            blackList: Constants.getTagBlackList(),
            allTags: []
        }

        var vm = this;
        firebase.database().ref("Tags").once("value").then(function (snap) {
            console.log(snap.val())
            var tags = []
            snap.forEach(function (smolSnap) {
                tags.push(smolSnap.key)
            })
            vm.setState({ allTags: tags })
        })
    }

    handleWhiteList = () => this.setState({ whiteList: Constants.getTagWhiteList() })
    handleBlackList = () => this.setState({ blackList: Constants.getTagBlackList() })

    componentWillMount() {
        Constants.registerTagWhiteListHandler(this.handleWhiteList)
        Constants.registerTagBlackListHandler(this.handleBlackList)
    }

    componentWillUnmount() {
        Constants.unregisterTagWhiteListHandler(this.handleWhiteList)
        Constants.unregisterTagBlackListHandler(this.handleBlackList)
    }

    render() {
        return (<div className="container">
            <div className="card">
                <div className="card-header">
                    <h3>Tag List</h3>
                    Click on a Tag to change it's location.   
                </div>
                <div className="card-body">
                    <div className="row">
                        <strong>White List:</strong>{this.state.whiteList.map(name => <Tag name={name} type="tag" key={name} />)}
                    </div>
                    <div className="row">
                        <strong>Black List:</strong>{this.state.blackList.map(name => <Tag name={name} type="tag" key={name} />)}
                    </div>
                </div>
                <div className="card-body">
                    <div>
                        <h5>All Tags</h5>
                    </div>
                    <div className="row">
                        {this.state.allTags.map(name => <Tag name={name} type="tag" key={name} />)}
                    </div>
                </div>
            </div>
            
        </div>)
    }
}

export default Tags;
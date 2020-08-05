import React from 'react'
import firebase from './firebase.js'
import Carousel from 'react-bootstrap/Carousel'
import Constants from './Constants.js'
import Tag from './Tag.jsx'
import GirlLink from './GirlLink.jsx'

class Images extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            allImgInfo: [],
            tagWhiteList: Constants.getTagWhiteList(), 
            girlWhiteList: Constants.getGirlWhiteList(),
            tagBlackList: Constants.getTagBlackList(),
            girlBlackList: Constants.getGirlBlackList(),
        }
        this.loadData(this);
        Constants.registerTagWhiteListHandler(this.handleTagWhiteList)
        Constants.registerTagBlackListHandler(this.handleTagBlackList)
        Constants.registerGirlWhiteListHandler(this.handleGirlWhiteList)
        Constants.registerGirlBlackListHandler(this.handleGirlBlackList)
    }

    handleTagWhiteList = () => this.setState({ tagWhiteList: Constants.getTagWhiteList() })
    handleTagBlackList = () => this.setState({ tagBlackList: Constants.getTagBlackList() })
    handleGirlWhiteList = () => this.setState({ girlWhiteList: Constants.getGirlWhiteList() })
    handleGirlBlackList = () => this.setState({ girlBlackList: Constants.getGirlBlackList() })

    componentWillUnmount() {
        Constants.unregisterTagWhiteListHandler(this.handleTagWhiteList)
        Constants.unregisterTagBlackListHandler(this.handleTagBlackList)
        Constants.unregisterGirlWhiteListHandler(this.handleGirlWhiteList)
        Constants.unregisterGirlBlackListHandler(this.handleGirlBlackList)
    }
    
    loadData(vm) {
        firebase.database().ref("Images").once('value').then(function (snap) {
            var imgs = []
            snap.forEach(function (smolSnap) {
                var info = smolSnap.val();
                var imInfo = {
                    id: smolSnap.key,
                    Game: info.Game || "",
                    Girl: info.Girl ? info.Girl.join(", ") : "",
                    Name: info.Name || "",
                    Path: info.Path || "",
                    Tags: info.Tags ? info.Tags.join(", ") : ""
                }
                imgs.push(imInfo);
            })
            vm.setState({
                allImgInfo: imgs
            });
        });
    }
    
    render() {
        var vm = this;
        
        var tagWhiteList = this.state.tagWhiteList.length 
            ? this.state.tagWhiteList.map(n => <Tag name={n} type="tag" key={n} />)
            : <span className="badge badge-info">None Selected</span>
        var tagBlackList = this.state.tagBlackList.length 
            ? this.state.tagBlackList.map(n => <Tag name={n} type="tag" key={n}/>)
            : <span className="badge badge-info">None Selected</span>
        var girlWhiteList = this.state.girlWhiteList.length 
            ? this.state.girlWhiteList.map(n => <Tag name={n} type="girl" key={n}/>) 
            : <span className="badge badge-info">None Selected</span>
        var girlBlackList = this.state.girlBlackList.length 
            ? this.state.girlBlackList.map(n => <Tag name={n} type="girl" key={n}/>) 
            : <span className="badge badge-info">None Selected</span>

        var toDisplay = this.state.allImgInfo.filter(function (info) {
            let tags = info.Tags ? info.Tags.split(", ") : []
            let girl = info.Girl ? info.Girl.split(", ") : []
            
            var tagWhiteListIntersection = vm.state.tagWhiteList 
                ? tags.filter(t => vm.state.tagWhiteList.includes(t)).length
                : true
            var tagBlackListIntersection = tags.filter(t => vm.state.tagBlackList.includes(t)).length
            var girlWhiteListIntersection = vm.state.tagWhiteList
                ? girl.filter(g => vm.state.girlWhiteList.includes(g)).length
                : true
            var girlBlackListIntersection = girl.filter(g => vm.state.girlBlackList.includes(g)).length
            
            var noWhiteList = vm.state.tagWhiteList.length === 0 && vm.state.girlWhiteList.length === 0
            var whiteListCheck = tagWhiteListIntersection > 0 || girlWhiteListIntersection > 0 || noWhiteList 
            var blackListCheck = tagBlackListIntersection === 0 && girlBlackListIntersection === 0;
            return whiteListCheck && blackListCheck
        })

        return (<div className="container">
            <div className="card">
                <div className="card-body">
                    <div className="row justify-content-center" >
                        <Carousel className="col-lg-6 col-md-8 col-sm-10 col-12" >
                            {toDisplay.map(function (info, idx) {
                                return (<Carousel.Item key={idx} style={{background: "#CCCCCC"}}>
                                    <GirlLink id={info.id} imInfo={info} />
                                </Carousel.Item>)
                            })}
                        </Carousel>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="row">Tags</h3>
                            <div className="row mb-1">
                                <strong>White List:</strong>
                                {tagWhiteList}
                            </div>
                            <div className="row mb-1">
                                <strong>Black List:</strong>
                                {tagBlackList}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h3 className="row">Girls</h3>
                            <div className="row mb-1">
                                <strong>White List:</strong>
                                {girlWhiteList}
                            </div>
                            <div className="row mb-1">
                                <strong>Black List:</strong>
                                {girlBlackList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>);
    }
}


export default Images;
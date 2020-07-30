import React from 'react';
import info from './info.json'
import Card from './Card.jsx'

class Home extends React.Component {

    render() {
        var imgs = [];

        var pageLen = Math.min(20, info.Images.length)
        for (let i = 0; i < pageLen; i++) {
            var imInfo = info.Images[i]
            imgs.push(<Card info={imInfo} key={imInfo.Path}/>);
        }
        
        return (<div className="container">
            <div className="row">
                {imgs}
            </div>
        </div>);
    }
}


export default Home;
import React from 'react';
import Media from './Media.jsx'
import Tag from './Tag.jsx'

class Card extends React.Component {
    render () {
        var path = this.props.info.Path || "";
        var girl = this.props.info.Girl || "";
        var title = this.props.info.Name || "";
        var tags = this.props.info.Tags || "";
        
        var tagDivs = []
        tags.split(", ").forEach(name =>
            tagDivs.push(<Tag name={name} type="tag" key={name}/>)
        )
        var girlDivs = []
        girl.split(", ").forEach(girl => 
            girlDivs.push(<Tag name={girl} type="girl" key={girl} />)
        )

        return (<div className="card ">
        <div className="card-header">
            <Media className="card-image-top" src={path}/> 
        </div>
        <div className="card-body">
            <div className="row">
            <h4>{title}</h4>
            </div>
            <div className="row">
                <strong>Girl:</strong>
                {girlDivs}
            </div>
            <div className="row">
                <strong>Tags:</strong>
                {tagDivs}
            </div>
            
        </div>
    </div>);
    }
}

export default Card;
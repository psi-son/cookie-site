import React from 'react';
import Media from './Media.jsx'

class Card extends React.Component {
    render () {
        var path = this.props.info.Path;
        var girl = this.props.info.Girl;
        var tags = []
        for (let i = 0; i < this.props.info.Tags.length; i++) {
            tags.push(<span className="badge badge-secondary" style={{margin: "1px"}}>
                {this.props.info.Tags[i]}
            </span>);
        }

        return (<div className="card col-sm-6 col-md-4 col-lg-3">
        <div className="card-header">
            <Media className="card-image-top" src={path}/> 
        </div>
        <div className="card-body">
            <div class="row">
                <strong>Girl:</strong>
                <span className="badge badge-secondary" style={{margin: "1px"}}>
                    {girl}
                </span>
            </div>
            <div class="row">
                <strong>Tags:</strong>
                {tags}
            </div>
            
        </div>
    </div>);
    }
}

export default Card;
import React from 'react';

class Media extends React.Component {
    render() {
        var source = this.props.src
        var styler = {
            marginLeft: "auto",
            marginRight: "auto"
        }
        if (source.endsWith('.mp4')) {
            return (<video  className="d-block img-fluid" style={styler} loop controls>
                <source src={source} type="video/mp4" />
                Your browser doesn't support the video tag.
            </video>);
        }
        return <img src={source} className="d-block img-fluid" style={styler} alt={source}/>
    }
}

export default Media;
import React from 'react';

class Media extends React.Component {
    render() {
        var source = this.props.src
        if (source.endsWith('.mp4')) {
            return (<video style={{ width: "100%" }} className="img-fluid" loop controls>
                <source src={source} type="video/mp4" />
                Your browser doesn't support the video tag.
            </video>);
        }
        return <img src={source} style={{ width: "100%" }} className="img-fluid" alt={source}/>
    }
}

export default Media;
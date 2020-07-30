import React from 'react';

class Media extends React.Component {
    render() {
        var source = process.env.PUBLIC_URL + this.props.src.slice(1)
        if (source.endsWith('.mp4')) {
            return (<video style={{ width: "100%" }} loop controls>
                <source src={source} type="video/mp4" />
                Your browser doesn't support the video tag.
            </video>);
        }
        return <img src={source} style={{ width: "100%" }} alt={this.props.src}/>
    }
}

export default Media;
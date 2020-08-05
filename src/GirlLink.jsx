import React from 'react'
import { useHistory } from 'react-router-dom'
import Media from './Media.jsx'

function GirlLink(props) {
    let hist = useHistory();
    function handle() {
        hist.push(process.env.PUBLIC_URL + '/Girl/'+props.id)
    }
    
    return (<div onClick={handle} >
        <Media src={props.imInfo.Path} />
    </div>)
}

export default GirlLink;
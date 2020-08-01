import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from './firebase.js';
import Card from './Card.jsx';
import Media from './Media.jsx';

class GirlEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Name: "",
            Path: "",
            Girl: "",
            Tags: "",
            Game: ""    
        };
        
        var id = this.props.match.params.id;

        var vm = this
        firebase.database().ref('Images/' + id).once('value').then(function (snap) {
            var info = snap.val();
            info.Girl = info.Girl ? info.Girl.sort().join(", ") : "";
            info.Tags = info.Tags ? info.Tags.sort().join(", ") : "";
            console.log("Got Info")
            console.log(info);
            vm.setState(info);
        });

        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    save() {
        var id = this.props.match.params.id;
        var toSave = {
            Name: this.state.Name.trim(),
            Path: this.state.Path.trim(),
            Girl: this.state.Girl.split(",").map(e => e.trim()).filter(e => e !== ""),
            Tags: this.state.Tags.split(",").map(e => e.trim()).filter(e => e !== ""),
            Game: this.state.Game.trim()
        }
        firebase.database().ref("Images/" + id).set(toSave);
    }

    handleChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({ [name]: value });
    }

    
    render() {
        var edit = true;

        if (!edit) {
            return (<div className="row col-md-4 mx-auto mt-3">
                <Card info={this.state} />
            </div>)
        }
        
        var tags = [];
        this.state.Tags.split(", ").forEach(tag =>
            tags.push(<span className="badge badge-secondary" style={{margin: "1px"}} key={tag}>
                {tag}
            </span>)
        )

        var girl = [];
        this.state.Girl.split(", ").forEach(g =>
            girl.push(<span className="badge badge-secondary" style={{margin: "1px"}} key={g}>
                {g}
            </span>)
        )

        return (<div className="container row col-md-8 mx-auto mt-3">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <Media className="card-image-top" src={this.state.Path} />
                        </div>
                        <div className="col-md-6">
                            <div className="input-group m-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Image Name</span>
                                </div>
                                <input type="text" className="form-control" name="Name" value={this.state.Name} 
                                    placeholder="Image Name..." onChange={this.handleChange}/>
                            </div>
                            <div className="input-group m-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Image Path</span>
                                </div>
                                <input type="text" className="form-control" name="Path" value={this.state.Path} 
                                    placeholder="Image Path..." onChange={this.handleChange} />
                            </div>
                            <div className="input-group m-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Tags</span>
                                </div>
                                <input type="text" className="form-control" name="Tags" value={this.state.Tags}
                                    id="tagsEdit" placeholder="Tags..." onChange={this.handleChange} />
                            </div>
                            <div className="input-group m-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Girls</span>
                                </div>
                                <input type="text" className="form-control" name="Girl" value={this.state.Girl}
                                    id="girlEdit" placeholder="Girls..." onChange={this.handleChange} />
                            </div>
                            <div className="input-group m-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Game</span>
                                </div>
                                <input type="text" className="form-control" name="Game" value={this.state.Game}
                                    placeholder="Game..." onChange={this.handleChange} />
                            </div>
                            <div className="m-1 row justify-content-end">
                                <button onClick={this.save} className="btn btn-primary">Save</button>
                            </div>

                            <div className="card row mt-3">
                                <div className="card-body">
                                    <div className="row">
                                        <h4>{this.state.Name}</h4>
                                    </div>
                                    <div className="row">
                                        <strong>Tags:</strong> 
                                        {tags}
                                    </div>
                                    <div className="row">
                                        <strong>Girl:</strong> 
                                        {girl}
                                    </div>
                                    <div className="row">
                                        <strong>Game:</strong> 
                                        <span className="badge badge-secondary" style={{margin: "1px"}}>
                                            {this.state.Game}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            

                        </div>
                    </div>
                    
                </div>
            </div>
        </div>)
    }
    
}

export default withRouter(GirlEdit);
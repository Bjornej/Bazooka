﻿import React from "react";
import Header from "../Shared/Header";
import Actions from "./Actions";
import Button from "../Shared/Button";
import Grid from "../Shared/Grid";
import Select from "../Shared/Select";
import Modal from "../Shared/Modal";
import Input from "../Shared/Input";
import Card from "../Shared/Card";
import { connect } from 'react-redux';
import Notification from "../Shared/Notifications";

var TemplatedTaskCreationDialog = React.createClass({
    getInitialState(){
        return { name: "", description: ""}
    },

    close(){
        this.setState({ name: "", description: ""});
        this.props.onClose();
    },

    create(){
        if(this.state.name==""){
            return;
        }

        Actions.createTemplatedtask(this.state.name, this.state.description).then((x) => {
            Notification.Notify(x);
            if(x.Success){
                this.props.onClose();
                this.props.onCreate();
            }
        });
    },

    render(){
        return (<Modal onClose={this.onClose} {...this.props}>
                    <Modal.Header>Create new Templated task</Modal.Header>
                    <Modal.Body>
                        <Input title="Name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                        <Input title="Description" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Cancel</Button>
                        <Button primary onClick={this.create}>Create</Button>
                    </Modal.Footer>
                </Modal>)
    }
});


var TemplatedTasksPage= React.createClass({
    getInitialState(){
        return {show:false, tasks:[]};
    },

    componentDidMount() {
        this.update();
    },

    update(){
        Actions.loadTemplatedTasks().then(x => this.setState({ tasks: x }));
    },

    open() {

    },
    
    render(){
        return (<div>

            <h3>TemplatedTasks <Button onClick={() => this.setState({ show: true })} >Create new template</Button></h3>
            <TemplatedTaskCreationDialog show={this.state.show} onClose={() => this.setState({show:false})} onCreate={this.update} />

            <Grid fluid>
                <Grid.Row>
                    {this.state.tasks.map(x => (<Grid.Col className="taskTemplate" md={3}> <Card title={x.Name} onClick={this.open}>{x.Description}</Card></Grid.Col>))}
                </Grid.Row>
            </Grid>
            </div>
        )
    }
});

export default TemplatedTasksPage;
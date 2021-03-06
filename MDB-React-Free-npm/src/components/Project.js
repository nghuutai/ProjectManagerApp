import Nav from './Nav';
import React, { Component } from 'react'
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getAPI from '../action/action';
import Notification from './Notification';

class Project extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            modal: false,
            notification: false,
            notificationContent: 0,
            enableSave: true
        }
    }

    toggle = (value) => {
        this.setState({
            modal: !value,
            id: '',
            name: '',
            description: '',
        });
    }

    getProjectFromTable = (value) => {
        this.setState({
            id: value._id,
            name: value.name,
            description: value.description,
        })
    }

    handleShowModal = (value, modal) => {
        this.toggle(modal);
        this.getProjectFromTable(value);
        this.setState({
            enableSave: true
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            enableSave: false
        })
    }

    resetForm = () => {
        document.getElementById("name").value = ""
        document.getElementById("description").value = ""
    }

    handleCreateProject = () => {
        if(this.state.name !== '' && this.state.description !== '') {
            let project = {
                name: this.state.name,
                description: this.state.description
            }
            this.props.getAPI.createProject(project);
            this.resetForm();
            this.setState({
                notification: true,
                notificationContent: 3
            })
        }
    }

    handleEdit = (value) => {
        if(this.state.name !== '' && this.state.description !== '' ) {
            let editProject = {
                name: this.state.name,
                description: this.state.description
            }
            this.props.getAPI.editProject(editProject, this.state.id);
            this.toggle(value)
            this.setState({
                notification: true,
                notificationContent: 4,
            })
        }
    }

    componentWillMount() {
        this.props.getAPI.getProjects();
    }

    displayNotification = () => {
        if(this.state.notification) {
            return (
                <Notification 
                notificationContent={this.state.notificationContent} 
                offNotification={(value) => this.offNotification(value)} />
            )
        }
    }

    offNotification = (value) => {
        this.setState({
            notification: value
        })
    }

    disabledButton = (value) => {
        if(!value) {
            return (
                <MDBBtn color="primary" onClick={() => this.handleEdit(this.state.modal)}>Save changes</MDBBtn>
            )
        } else {
            return (
                <MDBBtn color="primary" disabled onClick={() => this.handleEdit(this.state.modal)}>Save changes</MDBBtn>
            )
        }
    }

    render() {
        return (
            <div>
                {
                    this.displayNotification()
                }
                <Nav />
                <div style={{textAlign: 'center', marginTop: '40px'}}>
                    <h1>Project Management</h1>
                </div>
                <div className="form-group" style={{marginTop: '10px'}}>
                    <label htmlFor="formGroupExampleInput">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        onChange={(event) => this.handleChange(event)}
                    />
                    <label htmlFor="formGroupExampleInput">Description</label>
                    <input
                        type="text"
                        name="description"
                        className="form-control"
                        id="description"
                        onChange={(event) => this.handleChange(event)}
                    />
                    <div style={{textAlign: 'center', marginTop: '10px'}}> 
                        <MDBBtn color="primary" onClick={() => this.handleCreateProject()}>Create</MDBBtn>
                    </div>
                    <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                this.props.projects.map((value, index) => {
                                    return (
                                        <>
                                        <tr>
                                            <td>{index}</td>
                                            <td>{value.name}</td>
                                            <td>{value.description}</td>
                                            <td><MDBBtn color="warning" onClick={() => this.handleShowModal(value, this.state.modal)}>Edit</MDBBtn></td>
                                        </tr>
                                        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                            <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader>
                                            <MDBModalBody>
                                            <label htmlFor="formGroupExampleInput">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                defaultValue={this.state.name}
                                                id="formGroupExampleInput1"
                                                onChange={(event) => this.handleChange(event)}
                                            />
                                            <label htmlFor="formGroupExampleInput">Phone</label>
                                            <input
                                                type="text"
                                                name="description"
                                                defaultValue={this.state.description}
                                                className="form-control"
                                                id="formGroupExampleInput2"
                                                onChange={(event) => this.handleChange(event)}
                                            />
                                            </MDBModalBody>
                                            <MDBModalFooter>
                                                <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                                                {
                                                    this.disabledButton(this.state.enableSave)
                                                }
                                                {/* <MDBBtn color="primary" onClick={() => this.handleEdit(this.state.modal)}>Save changes</MDBBtn> */}
                                            </MDBModalFooter>
                                        </MDBModal>
                                        </>
                                    )
                                })
                            }
                        </MDBTableBody>
                    </MDBTable>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAPI: bindActionCreators(getAPI, dispatch)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        projects: state.projects
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
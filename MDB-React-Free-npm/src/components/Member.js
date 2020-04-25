import Nav from './Nav';
import React, { Component } from 'react'
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getAPI from '../action/action';
import Notification from './Notification';

class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            birthday: '',
            id: '',
            modal: false,
            member: {},
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
            phone: '',
            birthday: ''
        });
    }

    getMemberFromTable = (value) => {
        this.setState({
            id: value._id,
            name: value.name,
            phone: value.phone,
            birthday: value.birthday,
        })
    }

    handleShowModal = (value, modal) => {
        this.toggle(modal);
        this.getMemberFromTable(value);
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
        document.getElementById("phone").value = ""
        document.getElementById("birthday").value = ""
    }

    handleCreateMember = () => {
        if(this.state.name !== '' && this.state.phone !== '' && this.state.birthday !== '') {
            let member = {
                name: this.state.name,
                phone: this.state.phone,
                birthday: this.state.birthday
            }
            this.props.getAPI.createMember(member);
            this.resetForm();
            this.setState({
                notification: true,
                notificationContent: 1
            })
        }
    }

    handleEdit = (value) => {
        if(this.state.name !== '' && this.state.phone !== '' && this.state.birthday !== '') {
            let editMembers = {
                name: this.state.name,
                phone: this.state.phone,
                birthday: this.state.birthday
            }
            this.props.getAPI.editMember(editMembers, this.state.id);
            this.toggle(value)
            this.setState({
                notification: true,
                notificationContent: 2,
            })
        }
    }

    componentWillMount() {
        this.props.getAPI.getMembers();
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
                <Nav />
                {
                    this.displayNotification()
                }
                <div style={{textAlign: 'center', marginTop: '40px'}}>
                    <h1>Member Management</h1>
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
                    <label htmlFor="formGroupExampleInput">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        className="form-control"
                        id="phone"
                        onChange={(event) => this.handleChange(event)}
                    />
                    <label htmlFor="formGroupExampleInput">Birthday</label>
                    <input
                        type="date"
                        name="birthday"
                        className="form-control"
                        id="birthday"
                        onChange={(event) => this.handleChange(event)}
                    />
                    <div style={{textAlign: 'center', marginTop: '10px'}}> 
                        <MDBBtn color="primary" onClick={() => this.handleCreateMember()}>Create</MDBBtn>
                    </div>
                    <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Birthday</th>
                                <th>Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                this.props.members.map((value, index) => {
                                    return (
                                        <>
                                        <tr>
                                            <td>{index}</td>
                                            <td>{value.name}</td>
                                            <td>{value.phone}</td>
                                            <td>{value.birthday}</td>
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
                                                name="phone"
                                                defaultValue={this.state.phone}
                                                className="form-control"
                                                id="formGroupExampleInput2"
                                                onChange={(event) => this.handleChange(event)}
                                            />
                                            <label htmlFor="formGroupExampleInput">Birthday</label>
                                            <input
                                                type="date"
                                                name="birthday"
                                                defaultValue={this.state.birthday}
                                                className="form-control"
                                                id="formGroupExampleInput3"
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
        members: state.members
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Member);
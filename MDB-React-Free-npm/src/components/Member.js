import Nav from './Nav';
import React, { Component } from 'react'
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getAPI from '../action/action';

class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            birthday: '',
            id: '',
            modal: false,
            member: {}
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
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
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
        }
    }

    handleEdit = (value) => {
        if(this.state.name !== '' && this.state.phone !== '' && this.state.birthday !== '') {
            // let editMembers = this.props.members.map((value) => {
            //     console.log(value._id)
            //     console.log(this.state.id)
            //     if(value.id === this.state.id){
            //         value.name = this.state.name;
            //         value.phone = this.state.phone;
            //         value.birthday = this.state.birthday;
            //     }
            //     return value;
            // })
            let editMembers = {
                name: this.state.name,
                phone: this.state.phone,
                birthday: this.state.birthday
            }
            this.props.getAPI.editMember(editMembers, this.state.id);
            this.toggle(value)
        }
    }

    componentWillMount() {
        this.props.getAPI.getMembers();
    }
    

    render() {
        return (
            <div>
                <Nav />
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
                                                <MDBBtn color="primary" onClick={() => this.handleEdit(this.state.modal)}>Save changes</MDBBtn>
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
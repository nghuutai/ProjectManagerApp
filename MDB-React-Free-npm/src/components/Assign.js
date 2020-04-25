import Nav from './Nav'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getAPI from '../action/action';
import { MDBBtn } from 'mdbreact';


class Assign extends Component {

    constructor(props) {
        super(props)
        this.state = {
            idProject: '',
            members: []
        }
    }

    componentWillMount() {
        this.props.getAPI.getMembers();
        this.props.getAPI.getProjects();
    }

    handleChangeProject = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            members: []
        });

    }

    handleChangeMember = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: this.state.members.concat([value])
        });

    }

    handleAssign = (members, id) => {
        this.props.getAPI.assignMember(members, id);
        this.setState({
            members: []
        })
    }

    render() {
        console.log(this.state.members);
        let selectMembers = this.props.members.filter(item => this.state.members.find(id => item._id === id));
        let listMember = selectMembers.map(value => {
            let member = {
                _id: value._id,
                name: value.name,
                phone: value.phone,
                birthday: value.birthday
            }
            return member
        })
        let memberAssign = {
            members: listMember
        }
        return (
            <div>
                <Nav />
                <h1 style={{textAlign: 'center'}}>Assign member to project</h1>
                <label htmlFor="formGroupExampleInput">Select Project</label>
                <select name="idProject" className="browser-default custom-select" onChange={(event) => this.handleChangeProject(event)}>
                    {
                        this.props.projects.map(value => {
                            return (
                            <option value={value._id}>{value.name}</option>
                            )
                        })
                    }
                </select>
                <label htmlFor="formGroupExampleInput" style={{marginTop: '10px'}}>Select Members</label>
                <select name="members" className="browser-default custom-select" onChange={(event) => this.handleChangeMember(event)}>
                    {
                        this.props.members.map(value => {
                            return (
                            <option value={value._id}>{value.name}</option>
                            )
                        })
                    }
                </select>
                <div style={{textAlign: 'center', marginTop: '10px'}}> 
                    <MDBBtn color="primary" onClick={() => this.handleAssign(memberAssign, this.state.idProject)}>Assign</MDBBtn>  
                </div>
                <label htmlFor="formGroupExampleInput" style={{marginTop: '10px'}}>List member of project</label>
                <ul class="list-group" style={{width: '200px'}}>
                    {
                        selectMembers.map(value => {
                            return (
                                <li class="list-group-item">{value.name}</li>
                            )
                        }) 
                    }
                </ul>
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
        projects: state.projects,
        members: state.members
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assign);

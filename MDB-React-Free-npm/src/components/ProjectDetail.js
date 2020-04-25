import React, { Component } from 'react'
import Nav from './Nav';
import { MDBRow, MDBCol, MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getAPI from '../action/action';

class ProjectDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idProject: '',
            show: false
        }
    }

    componentWillMount() {
        this.props.getAPI.getProjects();
    }

    handleChangeProject = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });

    }

    showDetail = (id) => {
        this.props.getAPI.showDetail(id);
        this.setState({
            show: true
        })
    }

    tableMember = () => {
        if(this.props.detail.length > 0) {
            return (
                <>
                <label htmlFor="formGroupExampleInput" style={{marginTop: '20px'}}>List Member of Project</label>
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Birthday</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            this.props.detail.map((value, index) => {
                                let birthday = value.birthday.slice(0,10);
                                return (
                                    <>
                                    <tr>
                                        <td>{index}</td>
                                        <td>{value.name}</td>
                                        <td>{value.phone}</td>
                                        <td>{birthday}</td>
                                    </tr>
                                    </>
                                )
                            })
                        }
                    </MDBTableBody>
                </MDBTable>
                </>
            )
        } else if(this.state.show){
            return (
                <>
                    <div style={{textAlign: 'center', marginTop: '30px'}}><label htmlFor="formGroupExampleInput">List member not found</label></div>
                </>
            )
        }
    }

    render() {
        console.log(this.props.detail);
        return (
            <div>
                <Nav />
                <h1 style={{textAlign: 'center'}}>Show Project detail</h1>
                <MDBRow>
                    <MDBCol size="4">
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
                    </MDBCol>
                    <MDBCol size="4">
                        <MDBBtn color="primary" style={{marginTop: '25px'}}
                        onClick={() => this.showDetail(this.state.idProject)}>Show detail</MDBBtn>
                    </MDBCol>
                </MDBRow>
                {
                    this.tableMember()
                }
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
        detail: state.detail
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);

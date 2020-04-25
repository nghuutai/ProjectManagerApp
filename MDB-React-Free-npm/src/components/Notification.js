import React, { Component } from 'react'
import { Alert, AlertContainer } from "react-bs-notifier";

class Notification extends Component {

    content = () => {
        if(this.props.notificationContent === 1) {
            return (
                <h5>Add member successfull</h5>
            )
        } else if(this.props.notificationContent === 2) {
            return (
                <h5>Update member successfull</h5>
            )
        } else if(this.props.notificationContent === 3) {
            return (
                <h5>Add project successfull</h5>
            )
        } else if(this.props.notificationContent === 4) {
            return (
                <h5>Update project successfull</h5>
            )
        } else if(this.props.notificationContent === 5) {
            return (
                <h5>Assign member successfull</h5>
            )
        }
    }

    render() {
        return (
            <div>
                <AlertContainer position="bottom-right">
                    <Alert onDismiss={() => this.props.offNotification(false)} timeout={2000}>{this.content()}</Alert>
                </AlertContainer>
            </div>
        )
    }
}

export default Notification
import React, {Component} from 'react';

import './Input.scss'

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
        }
    }



    updateLogin = (event) => {
        const newLogin = event.target.value
        this.setState({ login: newLogin })

        this.props.callbackFromParent(newLogin)
    }



    render() {
        const { placeholder } = this.props;

        return (
                <input
                    className='ui-input'
                    placeholder={placeholder}
                    onChange={this.updateLogin}
                />
        );
    }
}

export {Input};
import React, {Component} from 'react';
import './Button.scss'


class Button extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <input
                className={'button ' + this.props.name}
                type="button"
                value={this.props.text}
                onClick={this.props.submitPost}
            />
        );
    }
}

export default Button;
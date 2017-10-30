import {Component} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class ContactTableRow extends Component {
    static propTypes = {
        data: PropTypes.object,
        onDelete: PropTypes.func
    };

    static defaultProps = {
        data: {
            id: null,
            name: '',
            phoneNumber: '',
            email: ''
        },
        onDelete: () => {
        }
    };

    render() {
        return (
            <tr key={this.props.data.id}>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.phoneNumber}</td>
                <td>{this.props.data.email}</td>
                <td>
                    <Button bsStyle="danger"
                            className="pull-right"
                            onClick={() => this.props.onDelete(this.props.data.id)}>
                        Remove
                    </Button>
                </td>
            </tr>
        );
    }
}

export default ContactTableRow;

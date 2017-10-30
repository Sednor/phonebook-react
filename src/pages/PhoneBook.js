import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import ContactTable from '../components/ContactTable';

import * as contactActions from '../actions/contactsActions';

class PhoneBook extends Component {
    static initialState = {
        showModal: false,
        name: '',
        phoneNumber: '',
        email: '',
        query: '',
        nameError: null,
        phoneError: null,
        emailError: null
    };

    static sort(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

    state = {...PhoneBook.initialState};

    save() {
        const CONTACT = {
            id: Math.random(),
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email
        };

        this.props.actions.addContact(CONTACT);
        this.setState({...PhoneBook.initialState});
    }

    handleSave(e) {
        e.preventDefault();

        let nameError = null;
        let phoneError = null;
        let emailError = null;

        if (!this.state.name.length || this.state.name.length > 100) {
            nameError = 'error';
            this.setState({nameError});
        }
        if (!this.state.phoneNumber.length || this.state.phoneNumber.length !== 11) {
            phoneError = 'error';
            this.setState({phoneError});
        }
        if (!this.state.email.length || !this.state.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
            emailError = 'error';
            this.setState({emailError});
        }

        const ERROR = nameError || phoneError || emailError;

        if (!ERROR) {
            this.save();
        }
    }

    handleDelete(id) {
        this.props.actions.removeContact(id);
    }

    handleNumberChange(value) {
        const PHONE_NUMBER = value.replace(/[^\d-]+/, "");

        this.setState({phoneNumber: PHONE_NUMBER.replace(/^(\d{2})(\d{3})(\d)+$/, "$1-$2-$3"), phoneError: null})
    }

    filter(contact) {
        const REG_EXP = new RegExp(this.state.query, 'i');

        return REG_EXP.test(contact.name) || REG_EXP.test(contact.phoneNumber.replace(/-/g, ''));
    }

    render() {
        const CONTACTS = this.props.contactStore.contacts
            .sort((a, b) => PhoneBook.sort(a, b))
            .filter(contact => this.filter(contact));

        return (
            <div className="phone-book container">
                <div className="header">
                    <div className="title">
                        <h2>Phone Book</h2>
                    </div>
                </div>
                <div className="action-controls">
                    <Button bsStyle="primary" onClick={() => this.setState({showModal: true})}>Add Contact</Button>
                    <div />
                    <FormControl type="text"
                                 placeholder="Search"
                                 value={this.state.query}
                                 onChange={e => this.setState({query: e.target.value})}/>
                </div>
                {
                    CONTACTS.length ?
                        <ContactTable data={CONTACTS} onDelete={id => this.handleDelete(id)}/> :
                        <div className="no-contacts">No Contacts</div>
                }
                <Modal show={this.state.showModal} onHide={() => this.setState({ ...PhoneBook.initialState })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup validationState={this.state.nameError}>
                                <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.name}
                                    onChange={e => this.setState({name: e.target.value, nameError: null})}/>
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup validationState={this.state.phoneError}>
                                <ControlLabel>Phone Number</ControlLabel>
                                <FormControl
                                    type="text"
                                    maxLength="11"
                                    placeholder="XX-XXX-XXXX"
                                    value={this.state.phoneNumber}
                                    onChange={e => this.handleNumberChange(e.target.value)}/>
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup validationState={this.state.emailError}>
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    type="email"
                                    value={this.state.email}
                                    onChange={e => this.setState({email: e.target.value, emailError: null})}/>
                                <FormControl.Feedback />
                            </FormGroup>
                            <div className="action-buttons">
                                <button className="btn btn-primary" type="submit" onClick={(e) => this.handleSave(e)}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default connect(
    state => ({
        contactStore: state.contacts
    }),
    dispatch => ({
        actions: bindActionCreators(contactActions, dispatch)
    })
)(PhoneBook);

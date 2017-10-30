import {Component} from 'react';
import PropTypes from 'prop-types';
import {Table, Pagination, DropdownButton, MenuItem} from 'react-bootstrap';

import ContactTableRow from './ContactTableRow';

class ContactTable extends Component {
    static propTypes = {
        data: PropTypes.array,
        onDelete: PropTypes.func
    };

    static defaultProps = {
        data: [],
        onDelete: () => {
        }
    };

    state = {
        page: 1,
        pageSize: 5
    };

    render() {
        const { page, pageSize } = this.state;
        const DATA = this.props.data.slice((page - 1) * pageSize, page * pageSize);

        return (
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {
                        DATA.map(contact => (
                            <ContactTableRow
                                key={contact.id}
                                data={contact}
                                onDelete={id => this.props.onDelete(id)}/>
                        ))
                    }
                    </tbody>
                </Table>
                <div className="pagination-actions">
                    <DropdownButton title={`${pageSize} per page`}
                                    id={`page-size-dropdown`}
                                    onSelect={pageSize => this.setState({ pageSize })}>
                        <MenuItem eventKey={5} active={pageSize === 5}>5</MenuItem>
                        <MenuItem eventKey={10} active={pageSize === 10}>10</MenuItem>
                        <MenuItem eventKey={15} active={pageSize === 15}>15</MenuItem>
                        <MenuItem eventKey={20} active={pageSize === 20}>20</MenuItem>
                    </DropdownButton>
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        items={Math.ceil(this.props.data.length / pageSize)}
                        maxButtons={8}
                        activePage={page}
                        onSelect={page => this.setState({ page })} />
                </div>
            </div>
        );
    }
}

export default ContactTable;
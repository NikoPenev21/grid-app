import React from 'react';
import axios from 'axios';
import Row from '../Row/Row';
import Table from 'react-bootstrap/Table'
import './Grid.css';

class Grid extends React.Component {

    state = {
        data: [],
        isLoading: false,
        sort: {
            column: null,
            direction: 'default'
        },
    };


    renderTableData() {
        return this.state.data.map((personData) => {
            return (
                <Row key={personData.UserName} person={personData}></Row>
            )
        })
    }

    componentDidMount() {
        this.getData();
    }

    getData = (columnName, sortOrder) => {
        this.setState({
            isLoading: true
        });

        const urlParams = `?$orderby=${columnName}%20${sortOrder}`
        const url = `https://services.odata.org/TripPinRESTierService/(S(3jgtctz5a2wyzb0gi3pxikvb))/People${(columnName && sortOrder) ? urlParams : ''}`

        axios.get(url)
            .then(response => {
                this.setState({
                    data: response.data.value,
                    isLoading: false
                })
            });

    }

    onSort = (column) => () => {
        let direction = this.state.sort.direction;
        if (direction === 'default') {
            direction = 'asc'
        }

        this.getData(column, direction)
        this.setState({
            sort: {
                direction: `${direction === 'desc' ? 'asc' : 'desc'}`,
                column: column
            }
        })
    };

    render() {
        const sortTypes = {
            asc: {
                class: 'up',
            },
            desc: {
                class: 'down',
            },
            default: {
                class: 'sort',
            }
        };


        return (
            <div className="GridContainer">
                <h1 id='title'>Users Table</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th onClick={this.onSort('UserName')} className={this.state.isLoading ? 'disabled' : 'enabled'}>
                                User Name
                                {this.state.sort.column === 'UserName'
                                    && (<span className={`fas fa-arrow-${sortTypes[this.state.sort.direction].class}`} />)}
                            </th>
                            <th onClick={this.onSort('FirstName')} className={this.state.isLoading ? 'disabled' : 'enabled'}>
                                First Name
                                {this.state.sort.column === 'FirstName'
                                    && (<span className={`fas fa-arrow-${sortTypes[this.state.sort.direction].class}`} />)}
                            </th>
                            <th onClick={this.onSort('LastName')} className={this.state.isLoading ? 'disabled' : 'enabled'}>
                                Last Name
                                {this.state.sort.column === 'LastName'
                                    && (<span className={`fas fa-arrow-${sortTypes[this.state.sort.direction].class}`} />)}
                            </th>
                            <th onClick={this.onSort('Gender')} className={this.state.isLoading ? 'disabled' : 'enabled'}>
                                Gender
                                {this.state.sort.column === 'Gender'
                                    && (<span className={`fas fa-arrow-${sortTypes[this.state.sort.direction].class}`} />)}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.isLoading ? <tr><td id="loadingIndicator" colSpan={4}><i className="fas fa-5x fa-spinner fa-spin"></i></td></tr> : this.renderTableData()}
                    </tbody>
                </Table>
            </div>
        )
    }

}


export default Grid;
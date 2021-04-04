import React from 'react';


class Row extends React.Component {

    render() {
        const { UserName, FirstName, LastName, Gender } = this.props.person

        return (
            <tr>
                <td>{UserName}</td>
                <td>{FirstName}</td>
                <td>{LastName}</td>
                <td>{Gender}</td>
            </tr>
        )
    }

}


export default Row;
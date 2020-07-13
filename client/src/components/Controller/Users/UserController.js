import React, { useEffect, useState } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import api from '../../../api/index';;

const userController = React.memo(props => {

    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        getUserHandler();
    }, []);
    
    const getUserHandler = async() => {
        const editableUser = await api.getUserById(props.userId)
                        .then(user => console.log(user))
                        .catch(err => console.log(err));
        console.log(editableUser);
    };

    const editHandler = async(id) => {
        await api.updateUserById(id)
            .then(prod => console.log('updated'))
            .catch(err => console.log(err))
    };

    const deleteHandler = async(id) => {
        await api.deleteUserById(id)
        .then(prod => console.log('deleted'))
        .catch(err => console.log(err))
    };

    let form = usersList.map(user => (
        <Card key={user._id} className="card">
            <Card.Body className="card-body">
                <Card.Text><strong>ID:</strong> {user._id}</Card.Text>
                <Card.Text><strong>Username:</strong> {user.username}</Card.Text>
                <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
                <Card.Text><strong>OrderId:</strong> {user.orderId}</Card.Text>
                <Card.Text><strong>Date:</strong> {user.dataCreated}</Card.Text>
            </Card.Body>
            <ButtonGroup>
                <Button type="button" onClick={(event) => editHandler(event.target.params.id)} className="btn btn-info btn-space">EDIT</Button>
                <Button type="button" onClick={(event) => deleteHandler(event.target.params.id)} className="btn btn-danger btn-space">DELETE</Button>
            </ButtonGroup>
                    
        </Card>

    ));

    return(
        <div className="container">
            <div className="row">
                <form>
                  {form}
                </form>
            </div>
        </div>
    );
    
});

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    };
  };

export default connect(mapStateToProps)(userController);
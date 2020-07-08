import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';

import api from '../../../api/index';
import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../../shared/utility';

const productsController = React.memo(props => {

    const [editFields, setEditFields] = useState(false); 
    const [productsList, setProductsList] = useState([]);
    const [controls, setControls] = useState({
        id: {
            value: ''
        },
        name: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Nome do produto'
          },
          value: ''
        },
        brand: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Marca ou fabricante'
            },
            value: ''
          },
        description: {
            elementType: 'input',
            elementConfig: {
                type: 'textarea',
                placeholder: 'Descrição do produto'
            },
            value: ''
          },
        price: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Preço de venda'
            },
            value: ''
          },
        category: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Categoria'
            },
            value: ''
          },    
    });
    
    useEffect(() => {
        api.getAllProducts()
            .then(products => {
                console.log(products.data);
                
                setProductsList(products.data);
            })
            .catch(err => console.log(err));
    }, []);

    const editHandler = (index) => {
        
        setEditFields(!editFields);
        setControls({
            id: {
                value: productsList[index].id
            },
            name: {
                value: productsList[index].product 
            },
            brand: {
                value: productsList[index].brand 
            },
            category: {
                value: productsList[index].category 
            },
            price: {
                value: productsList[index].price
            },
        });
        console.log("controls: " + controls);
        console.log("productList: " + productsList);
        
        
    };

    const sendEditedHandler = async(id) => {
        
        await api.updateProductById(id)
            .then(prod => console.log(prod))
            .catch(err => console.log(err))
    };

    const deleteHandler = async(id) => {
        await api.deleteProductById(id)
        .then(prod => console.log('deleted'))
        .catch(err => console.log(err))
    };

    let form = productsList.map(product => (
            <Card key={product._id} className="card">
                <Card.Img className="card-img-top" variant="top" src={product.picture} />
                <Card.Body className="card-body">
                    <Card.Text><strong>Name: </strong>{product.product}</Card.Text>
                    <Card.Text><strong>Brand: </strong>{product.brand}</Card.Text>
                    <Card.Text><strong>Price: </strong>{product.price}</Card.Text>
                    <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
                </Card.Body>
            </Card>

    ));

    const inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( controls, {
            [controlName]: updateObject( controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, controls[controlName].validation ),
                touched: true
                })
            });
            setControls(updatedControls);
        };
  
    const formElementsArray = [];
        for ( let key in controls ) {
            formElementsArray.push( {
                id: key,
                config: controls[key]
            } );
    };

    if ( props.loading ) {
        form = <Spinner />
    }

    let errorMessage = null;

    if ( props.error ) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }

    if(editFields) {
        form = formElementsArray.map( formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={( event ) => inputChangedHandler( event, formElement.id )} />
            ));
    }

    return(
        <div className="container">
            <div className="row">
                <form>
                  {form}
                    <div className="col">
                        {!editFields ? 
                            <Button onClick={() => editHandler(index)} className="btn btn-warning">EDITAR</Button> :
                            <Button onClick={(event) => sendEditedHandler(event.target.params.id)} className="btn btn-info">ENVIAR</Button>
                        }
                    </div>
                    <div className="col">
                        <Button onClick={(event) => deleteHandler(event.target.params.id)} className="btn btn-danger btn-space">DELETE</Button>
                    </div>
                </form>
            </div>
        </div>
    );
    
});

export default productsController;
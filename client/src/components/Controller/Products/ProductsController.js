import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';

import api from '../../../api/index';
import Input from '../../UI/Input/Input';
import { updateObject, checkValidity } from '../../../shared/utility';

const productsController = React.memo(props => {

    const [editFields, setEditFields] = useState(false); 
    const [productsList, setProductsList] = useState([]);
    const [id, setId] = useState('');
    const [controls, setControls] = useState({
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
            elementType: 'textarea',
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
          }
    });
    
    useEffect(() => {
        api.getAllProducts()
            .then(products => {
                setProductsList(products.data);
            })
            .catch(err => console.log(err));
    }, []);

    const editHandler = () => {
        
        setEditFields(!editFields);
        setId(productsList[0]._id);
        setControls({
            name: {
                value: productsList[0].product 
            },
            brand: {
                value: productsList[0].brand 
            },
            category: {
                value: productsList[0].category 
            },
            price: {
                value: productsList[0].price
            },
            description: {
                value: productsList[0].description
            },
        });
    };

    const sendEditedHandler = async() => {
        const updateProduct = {
            product: controls.name.value,
            brand: controls.brand.value,
            category: controls.category.value,
            price: controls.price.value,
            description: controls.description.value,
        };

        await api.updateProductById(id, updateProduct )
            .then(prod => window.location.reload(true))
            .catch(err => console.log(err))
    };

    const deleteHandler = async(id) => {
        await api.deleteProductById(id)
        .then(prod => window.location.reload(true))
        .catch(err => console.log(err))
    };

    let form = productsList.map(product => (
            <Card key={product._id} className="card">
                <Card.Img className="card-img-top" variant="top" src={product.picture} />
                <Card.Body className="card-body">
                    <Card.Text><strong>Name: </strong>{product.product}</Card.Text>
                    <Card.Text><strong>Marca</strong>{product.brand}</Card.Text>
                    <Card.Text><strong>Preço: </strong>{product.price}</Card.Text>
                    <Card.Text><strong>Categoria: </strong>{product.category}</Card.Text>
                    <Card.Text><strong>Descrição:</strong> {product.description}</Card.Text>
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

    if(editFields) {
        form = formElementsArray.map( formElement => (
                <Input  
                    key={formElement.config.value}
                    label={formElement.id}
                    value={formElement.config.value}
                    changed={( event ) => inputChangedHandler( event, formElement.id )} />
            )
        )       
    };
    

    return(
        <div className="container">
            <div className="row">
                <form>
                  {form}
                    <div className="col">
                        {!editFields ? 
                            <Button onClick={(index) => editHandler(index)} className="btn btn-warning">EDITAR</Button> :
                            <Button onClick={() => sendEditedHandler()} className="btn btn-info">ENVIAR</Button>
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
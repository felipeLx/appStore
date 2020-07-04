// product that will be render in the scream
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import api from '../../api/index';

const product = React.memo(props => {
    const [selectedProduct, setSelectedProduct] = useState([]);


    useEffect(() => {
        api.getOneProduct(props.match.params.id)
                .then(product => {
                    console.log(product.data)
                    setSelectedProduct(product.data)
                    console.log(selectedProduct)})
                .catch(err => console.log(err))
    }, []);

    const productHandler = (product) => {
        return(
        <div key={product._id} className="Col">
            <Card style={{ width: '18rem' }}>
                <Card.Picture>
                    {product.picture}
                </Card.Picture>
                <Card.Body>
                    <Card.Title>{product.product}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle>
                    <Card.Text>
                    {product.description}
                    </Card.Text>
                    <Card.Link href="#">Comprar</Card.Link>
                </Card.Body>
            </Card>
        </div>
        )
    }
    

    return (
        <div className="Row">
        {selectedProduct.length > 0 ? (
                selectedProduct.map(product => {
                    return productHandler(product)
                    })
                ) : (
                <p>...Loading!</p>
                )}   
        </div>
    )
});

export default product;
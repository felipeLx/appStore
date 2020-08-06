import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateObject, checkValidity } from '../../../shared/utility';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from 'axios';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState = {
        form: 
            {name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nome Completo'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Endereço (rua, av, etc.)'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            complement: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Complemento'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false
            },
            neighborhood: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Bairro'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Cidade e Estado'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Código Postal'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: '+ Rápido'},
                        {value: 'cheapest', displayValue: '+ Barato'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    };

    const orderHandler = ( event ) => {
        event.preventDefault();
  
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {
            products: props.products,
            total: props.total,
            orderData: formData,
            userId: props.userId
        }

        props.onOrderProduct(order, props.token);
        
    }

    
    const inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm({form: updatedOrderForm, formIsValid: formIsValid});
    }


    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <Button btnType="Success" disabled={!orderForm.formIsValid}>ORDER</Button>
        </form>
    );
    if ( props.loading ) {
        form = <Spinner />;
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        products: state.product.products,
        total: state.product.products.total,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderProduct: (orderData,token) => dispatch(actions.purchaseProduct(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
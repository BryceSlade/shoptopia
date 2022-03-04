import React from 'react'
import { Dropdown, Badge, Nav, Container, FormControl, Navbar, Button } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context';

const Header = () => {

    const { state: {cart}, dispatch, productDispatch } = CartState();

  return (
    <div>
        <Navbar bg='dark' variant='dark' style={{ height: 80 }}>
            <Container>
                <Navbar.Brand>
                    <Link to='/'>Shopping Cart</Link>
                </Navbar.Brand>
                <Navbar.Text className='search'>
                    <FormControl
                        style={{ width: 500 }}
                        placeholder='Search a product'
                        className='m-auto'
                        onChange={(e) => {
                            productDispatch({
                                type: 'FILTER_BY_SEARCH',
                                payload: e.target.value
                            })
                        }}
                    />
                </Navbar.Text>
                <Nav>
                    <Dropdown alignright='true'>
                        <Dropdown.Toggle bg='success'>
                            <FaShoppingCart color='white' fontSize='25px'/>
                            <Badge>{cart.length}</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 370 }}>
                            {cart.length > 0 ? (
                                <>
                                    {cart.map((item) => (
                                        <span className='cartitem' key={item.id}>
                                        <img
                                            src={item.image}
                                            className='cartItemImg'
                                            alt={item.name}
                                        />
                                        <div className='cartItemDetail'>
                                            <span>{item.name}</span>
                                            <span>${item.price}</span>
                                        </div>
                                        <AiFillDelete
                                            fontSize='20px'
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => 
                                                dispatch({
                                                    type: 'REMOVE_FROM_CART',
                                                    payload: item,
                                                })
                                            }
                                        />
                                        </span>
                                    ))}
                                    <Link to='/cart'>
                                        <Button style={{width: '95%', margin: '0 10px'}}>
                                            Go To Cart
                                        </Button>
                                    </Link>
                                </>
                            ) : 
                            (
                                <span style={{ padding: 10 }}>Cart is empty!</span>
                            )}
                            
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
                
            </Container>
        </Navbar>
    </div>
  )
}

export default Header



import React, { useReducer, useEffect } from 'react'
import { shoppingInitialState, shoppingReducer } from '../reducers/shoppingReducer'
import ProductItem from './ProductItem';
import CartItem from './CartItem';
import { TYPES } from '../actions/shoppingAction';
import { useState } from "react";
import axios from 'axios';
import { BsCart4 } from "react-icons/bs";
import Modal from './Modal';

const ShoppingCartLogica = () => {
  const [showShoppingCart1, setShowShoppingCart1] = useState(false);

  function handleShopping1() {
    setShowShoppingCart1(!showShoppingCart1)
  }




  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState)

  const updateState = async () => {
    const productsURL = "http://localhost:3000/productos",
      cartURL = "http://localhost:3000/cart"

    const resProducts = await axios.get(productsURL),
      resCart = await axios.get(cartURL)

    const productsList = await resProducts.data,
      newCartItem = await resCart.data

    dispatch({ type: TYPES.READ_STATE, payload: [productsList, newCartItem] })
  }

  useEffect(() => {
    updateState()
  }, [])

  const { products, cart } = state

  const addToCart = (id) => {
    dispatch({ type: TYPES.ADD_TO_CART, payload: id })
  };
  const delFromCart = (id, all = false) => {
    if (all) {
      dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id })
    }
    else {
      dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id })
    }
  };
  const clearCart = () => {
    dispatch({ type: TYPES.CLEAR_CART })
  };

const cartValue = cart.map(item => item.price*item.quantity)

const totalPrice = cartValue.reduce((prev,current) => prev+current,0)

  return (
    <div>
      <div className='flex justify-self-center place-content-around mt-10 mb-10 '>
        <button onClick={handleShopping1} >                <div style={{ color: "black", fontSize: "6vh", marginRight: "25px" }} >
          <div className='flex justify-self-center place-content-around' ><button className='flex justify-self-center place-content-around px-4 py-2 bg-red-800 hover:bg-amber-600 text-center text-sm text-white rounded duration-300 text-xl'>TU COMPRA <div className='ml-4 '><BsCart4 /></div></button></div>
        </div>
        </button></div>

      {showShoppingCart1 && (
        <div className='z-10 fixed'>
          {/* <h2>Carrito de Compras</h2>
        <h3>Productos</h3> */}


          <div >

            {/* empieza el carrito, ??sto est?? comentado porque bloquea todo lo que se encuentra detr??s del Carrito y no me deja agregar productos*/}

            {/* <div class="relative z-10 " aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                  <div class="fixed inset-0 overflow-hidden ">*/}

            <div className="z-[100]">

              <div class=" pointer-events-none fixed inset-y-10 mt-12 right-0 flex max-w-full pl-10 mx-6" id='tiendaonline'>
                <div class="pointer-events-auto w-screen max-w-md">
                  <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div class="flex-1 overflow-y-auto py-12 px-4 sm:px-6">
                      <div class="flex items-start justify-between mt-6">
                        <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Tu Carrito</h2>
                        <div class="ml-3 flex h-7 items-center">
                          <button onClick={handleShopping1} type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                            <span class="sr-only">Cerrar</span>
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* comienzo - items que se van agregando*/}
                      <article className="box">
                        {/* <button onClick={clearCart} class="font-medium text-indigo-600 text-lg hover:text-indigo-500">Limpiar Carrito
                      </button> */}
                        {cart.map((item, index) => (
                          <CartItem key={index} data={item} delFromCart={delFromCart} />
                        ))}
                      </article>
                      {/* fin - items que se van agregando*/}
                    </div>
                    <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div class="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p><h5 class="font-semibold">$ {totalPrice}</h5></p>
                      </div>
                      <p class="mt-0.5 text-sm text-gray-500">Env??os Gratis!</p>
                      <div class="mt-6 ">
                        <a href="#" class="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium
                      text-white shadow-sm hover:bg-green-800">
                        <Modal/></a>
                      </div>
                      <div class="mt-6 flex justify-center text-center text-sm text-gray-500 ">
                        <p>
                          <button onClick={handleShopping1} type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
                            Seguir Comprando
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      )}
      <div className='flex flex-wrap justify-around z-0'>
        {products.map((product) => (
          <ProductItem key={product.id} data={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  )
}

export default ShoppingCartLogica
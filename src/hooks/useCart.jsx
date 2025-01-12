import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { handleToast } from '../utils/message';

// Create the context
const CartContext = createContext();

// Create a provider
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    //! Sync cart to localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // ! Add to cart
    const addToCart = useCallback((product) => {
        const existingProductIndex = cart.findIndex((item) => item.product_id === product.id);
        let updatedCart;

        if (existingProductIndex !== -1) {
            // Product exists, increment its amount
            updatedCart = cart.map((item, index) =>
                index === existingProductIndex
                    ? { ...item, amount: item.amount + 1 }
                    : item
            );
        } else {
            // Product doesn't exist, add it to the cart
            const newProduct = {
                name: product.name,
                product_id: product.id,
                category: product.categories.name,
                image: product.images[0].image_url,
                price: product.price,
                price_with_off: product.price_with_off,
                amount: 1,
                status: 'local',
            };
            updatedCart = [...cart, newProduct];
        }

        setCart(updatedCart);
        handleToast('success', 'محصول با موفقیت اضافه شد');
    }, [cart]);

    //! Remove product from cart by id
    const removeFromCart = useCallback((productId) => {
        const updatedCart = cart.filter((item) => item.product_id !== productId);
        setCart(updatedCart);
        handleToast('error', 'محصول با موفقیت حذف شد');
    }, [cart]);

    //! Change quantity of a product
    const changeQuantity = useCallback((productId, newAmount) => {
        const updatedCart = cart.map((item) =>
            item.product_id === productId
                ? { ...item, amount: Math.max(1, item.amount + newAmount) } // Ensure quantity is at least 1
                : item
        );
        setCart(updatedCart);
    }, [cart]);

    //! Calculate total price
    const totalPrice = useMemo(() => {
        return cart.reduce(
            (total, item) =>
                item.price_with_off
                    ? total + item.price_with_off * item.amount
                    : total + item.price * item.amount,
            0
        );
    }, [cart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                changeQuantity,
                totalPrice,
                setCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Create a custom hook to access the context
 const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
export default useCart
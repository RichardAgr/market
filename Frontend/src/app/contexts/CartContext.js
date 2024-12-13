import { createContext, useContext, useState, useEffect, useMemo} from 'react';

const CartContext = createContext({
    cartItems: [],
    shippingItems: [],
    addToCart: () => {},
    decreaseQuantity: () => {},
    removeFromCart: () => {},
    transferToShipping: () => {},
    clearShippingItems: () => {},
    clearCart: () => {},
    itemCount: 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [shippingItems, setShippingItems] = useState([]);
    useEffect(() => {
        const localData = localStorage.getItem('cartItems');
        const localShippingData = localStorage.getItem('shippingItems');
        if (localData) {
        setCartItems(JSON.parse(localData));
        }
        if (localShippingData) {
        setShippingItems(JSON.parse(localShippingData));
        }
    }, []);

    const itemCount = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingProduct = prevItems.find(item => item.id === product.id);
            let newItems;
            if (existingProduct) {
                newItems = prevItems.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                newItems = [...prevItems, { ...product, quantity: 1 }];
            }
            localStorage.setItem('cartItems', JSON.stringify(newItems));
            return newItems;
        });
    };

    const decreaseQuantity = (productId) => {
        setCartItems((prevItems) => {
            const existingProduct = prevItems.find(item => item.id === productId);
            let newItems;
            if (existingProduct && existingProduct.quantity > 1) {
                newItems = prevItems.map(item => 
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                );
            } else {
                newItems = prevItems.filter(item => item.id !== productId);
            }
            localStorage.setItem('cartItems', JSON.stringify(newItems));
            return newItems;
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => {
            const newItems = prevItems.filter(item => item.id !== productId);
            localStorage.setItem('cartItems', JSON.stringify(newItems));
            return newItems;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
        alert("BORRADO");
    };

    const transferToShipping = () => {
        try {
            setShippingItems(cartItems);
            localStorage.setItem('shippingItems', JSON.stringify(cartItems));
            setCartItems([]);
            localStorage.removeItem('cartItems');
        } catch (error) {
            console.error("Error al transferir productos al envío: ", error);
        }
    };

    const clearShippingItems = () => {
        setShippingItems([]);
        localStorage.removeItem('shippingItems');
    };
    
    return (
        <CartContext.Provider value={{ 
            cartItems, 
            shippingItems,
            addToCart, 
            decreaseQuantity, 
            removeFromCart, 
            transferToShipping,
            clearShippingItems,
            clearCart, 
            itemCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

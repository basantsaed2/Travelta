// redux/slices/cartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  try {
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    // Ensure all cart items are valid objects with the required fields
    return parsedCart.filter(item => item && item.id && typeof item.quantity === 'number' && item.quantity > 0);
  } catch (e) {
    console.error("Error parsing cart from localStorage:", e);
    return [];
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(), // Initialize from localStorage
  reducers: {
  addToCart: (state, action) => {
  const existingItem = state.find(
    item => item.id === action.payload.id && item.type === action.payload.type
  );

  if (!existingItem) {
    state.push({ ...action.payload, quantity: 1 });
  } 
  // else {
  //   existingItem.quantity += 1;
  // }

  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(state));
}
,
    // Remove item from cart
    removeFromCart: (state, action) => {
      const updatedCart = state.filter(
        item => !(item.id === action.payload.id && item.type === action.payload.type)
      );

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    },

    // Update item quantity
    updateQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);

      if (item && Number.isInteger(action.payload.quantity) && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      } else {
        console.warn("Invalid quantity value:", action.payload.quantity);
      }

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },

    // Clear the entire cart
    clearCart: () => {
      // Clear cart from Redux state and localStorage
      localStorage.removeItem('cart');
      localStorage.removeItem('selectedPlanId');
      return [];
    },

    updateCartItem: (state, action) => {
      const { id, type, updatedItem } = action.payload; // Destructure id, type, and updatedItem from payload
    
      // Find the index of the item matching the id and type
      const index = state.findIndex(item => item.id === id && item.type === type);
    
      if (index !== -1) {
        // Update the item with new properties
        state[index] = { ...state[index], ...updatedItem };
        
        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(state));
      } else {
        console.warn(`Cart item with id "${id}" and type "${type}" not found.`);
      }
    }
      
    
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;

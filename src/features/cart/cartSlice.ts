import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../api/services/product.service';

interface CartItem extends Product {
  quantity: number;
  selected?: boolean;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.selected = true; // Auto-select when adding/updating
      } else {
        state.items.push({ ...action.payload, quantity: 1, selected: true });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.selected = true;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.selected = true;
      }
    },
    toggleSelection: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.selected = !item.selected;
      }
    },
    clearCart: (state) => {
      // Only remove selected items (simulating checkout)
      state.items = state.items.filter(item => !item.selected);
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, toggleSelection, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../api/services/product.service';

interface WishlistState {
    items: Product[];
}

const initialState: WishlistState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<Product>) => {
            const exists = state.items.some((item) => item.id === action.payload.id);
            if (!exists) {
                state.items.unshift(action.payload);
            }
        },
        removeFromWishlist: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        toggleWishlist: (state, action: PayloadAction<Product>) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state.items.splice(index, 1);
            } else {
                state.items.unshift(action.payload);
            }
        },
    },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;

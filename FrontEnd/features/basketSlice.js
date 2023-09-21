import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    items: [],
  },
  reducers: {
    addToBasket: (state,action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state,action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      let newBasket =[...state.items];

      if(index>=0){
        newBasket.splice(index,1);
      }else{
        console.warn(
          `Cant Remove Product (id: ${action.payload.id}) as its not in the Basket!`
        );
      }

      state.items = newBasket;
    },
  }
})

// Action creators are generated for each case reducer function
export const { addToBasket,removeFromBasket} = basketSlice.actions

export const selectBasketItems = (state)=> state.basket.items;

export const selectBasketItemsWithID = (state,id) =>state.basket.items.filter((item) =>item.id ===id);

export const selectBastetTotal= (state) =>state.basket.items.reduce((total,item) =>total+=item.price,0);

export default basketSlice.reducer
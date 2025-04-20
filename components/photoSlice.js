import { createSlice } from '@reduxjs/toolkit'



const photoSlice = createSlice ({
    name: 'photos',
    initialState : [],
    reducers: {
        addPhoto:(state, action) => {
            state.push(action.payload)
        },
        deletePhoto: (state, action) => {
            return state.filter(uri => uri !== action.payload);

        },

    },
});


export const { addPhoto, deletePhoto } = photoSlice.actions;
export default photoSlice.reducer;
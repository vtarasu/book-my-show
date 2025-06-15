import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name : 'user',
    initialState : {
        user : null
    },
    reducers : {
        SetUser(state, action) {
            console.log('Setting user:', action.payload);
            state.user = action.payload;
        }
    }
});

export const { SetUser } = userSlice.actions;
export default userSlice.reducer;

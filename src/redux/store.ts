import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./features/dashboard/dashboardSlice";


const store = configureStore({
    reducer: {
        'dashboard': dashboardSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
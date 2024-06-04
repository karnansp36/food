import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./CounterSlice";

const Store = configureStore({
    reducer: {
        counter: CounterSlice
    }
})

export default Store
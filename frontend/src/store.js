import { createStore } from "redux";
import { productReducer } from "./Redux/reducer";

const store = createStore(productReducer);

export { store };

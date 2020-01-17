import {createStore} from "redux";

import storage from "../store/reducers";

export const store = createStore(storage);
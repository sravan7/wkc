import {createStore} from "redux";

import storage from "./reducers";

export const store = createStore(storage);
import {SHOW_ALL} from "../constants/filterType";
import {SET_VISIBILITY_FILTER} from "../constants/actionType";

export default (state=SHOW_ALL, action) => {
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}
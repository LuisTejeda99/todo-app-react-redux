import 
{
    ADD_TODO,
    EDIT_TODO,
    DELETE_TODO,
    COMPLETE_TODO,
    COMPLETE_ALL_TODOS,
    START_SUBMIT,
    ERROR_SUBMIT,
    START_EDIT,
    ERROR_EDIT,
    START_DELETE,
    ERROR_DELETE,
} from "../constants/actionType";

import {mac} from "./boilerplate";
//declarando el initialState
const initialState = [
    {id: 1, desc: "Primer todo", completed: false},
    {id: 2, desc: "Segundo todo", completed: false},
    {id: 3, desc: "Tercer todo", completed: false},
]

export const complete = mac(COMPLETE_TODO,"payload");
export const submit = mac(ADD_TODO,"payload");
export const edit = mac(EDIT_TODO,"payload");
export const delet = mac(DELETE_TODO, "payload");

//to add todo
const startSubmit = mac(START_SUBMIT);
const errorSubmit = mac(ERROR_SUBMIT,"error");

//to edit todo
const startEdit = mac(START_EDIT);
const errorEdit = mac(ERROR_EDIT,"error");

//to edit todo
const startDelete = mac(START_DELETE);
const errorDelete = mac(ERROR_DELETE,"error");

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TODO:
            return [action.payload].concat(state);
        case DELETE_TODO:
             return state.filter(x => x.id !== action.payload.id);;
        case EDIT_TODO:
            return state.map(x => x.id === action.payload.id ? ({...x, desc: action.payload.desc}) : x);
        case COMPLETE_TODO:
            return state.map(x => x.id === action.payload ? ({...x,completed: !x.completed}): x);
        case COMPLETE_ALL_TODOS:
            const areAllMarked = state.every(x => x.completed)
            return state.map(x => ({...x, completed: !areAllMarked}));
        default:
            return state;
    }
}

export const saveTodo = (text) =>
    async (dispatch,getState) => {
        dispatch(startSubmit());
        const state = getState()
        console.log("creating:", state)
        try {
            const todo = {
                desc: text,
                completed: false,
            }

            const response = await fetch("https://jsonplaceholder.typicode.com/todos",{
                method: "POST",
                body: JSON.stringify(todo)
            })

            const id = await response.json();
            
            dispatch(submit({...todo,...id}));
        } catch(e){
            dispatch(errorSubmit(e));
        } 
    }

export const editTodo = (id,desc,completed) => 
    async (dispatch,getState) => {
        dispatch(startEdit());
        try {
            const todo = {
                id: id,
                desc: desc,
                completed: completed,
            }
            dispatch(edit(todo));
            const state = getState();
            console.log("editing:", state);
        }catch(e){
            dispatch(errorEdit(e));
        }
    }

    export const deleteTodo = (id) => 
    async (dispatch,getState) => {
        dispatch(startDelete());
        try {
            dispatch(delet({id:id}));
            const state = getState();
            console.log("ESTE ES EL ESTADO:", state);
        }catch(e){
            dispatch(errorDelete(e));
        }
    }
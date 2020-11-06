export const mac = (type,...argNames) => (...args) => {
    const action = { type };
    argNames.forEach((arg,index) => {
        action[argNames[index]] = args[index];
    })
    return action;
}

export const createReducer = (IS, handlers) => (state = IS, action) => {
    if(handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state,action)
    } else {
        return state;
    }
}

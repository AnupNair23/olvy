const reducer = (state, action)=>  {
    switch (action.type) {
        case 'increment':
            return { ...state, review: state.review + 1 };
        default:
            throw new Error();
    }
}

export default reducer
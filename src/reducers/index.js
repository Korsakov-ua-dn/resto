const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'MENU_ERROR':
            return {
                ...state,
                loading: false,
                error: true
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const item = state.menu.find(item => item.id === id);
            const double = state.items.find(elem => elem.id === item.id); // true or false
            if (double) {
                const x = state.items.findIndex(elem => elem.id === id)

                const doubleItem = {...state.items[x], count: }
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, x),
                        ...state.items.slice(x + 1)
                    ]
                }
            }
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                count: 1
            }
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ]
            };
        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ]
            };
        default:
            return state;
    }
}

export default reducer;
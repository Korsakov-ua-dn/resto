const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [
        {
			"title": "Cesar salad",
			"price": 12,
			"url": "https://static.1000.menu/img/content/21458/-salat-cezar-s-kr-salat-cezar-s-krevetkami-s-maionezom_1501173720_1_max.jpg",
			"category": "salads",
			"id": 1
		},
		{
			"title": "Pizza Margherita",
			"price": 10,
			"url": "https://attuale.ru/wp-content/uploads/2018/04/6eaa1be0f1976c5f5a5f2d2b3ae42fc8.jpg",
			"category": "pizza",
			"id": 2
		}
    ]
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
        default:
            return state;
    }
}

export default reducer;
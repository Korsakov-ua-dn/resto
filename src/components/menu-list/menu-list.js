import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux'; // функция connect это HOC
import WithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuError, addedToCart} from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

import './menu-list.scss';

class MenuList extends Component {

    componentDidMount() {
        this.props.menuRequested();

        const {RestoService} = this.props;
        RestoService.getMenuItems()
        .then(res => this.props.menuLoaded(res))
        .catch(res => this.props.menuError(res));
    }

    render() {

        const {menuItems, loading, error, addedToCart} = this.props;

        const errorMessage = error ? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(error || loading) ? <View
                                                    addedToCart={addedToCart}
                                                    menuItems={menuItems}/> : null;

        return (
           <div>
                {errorMessage}
                {spinner}
                {content}
           </div>
        )
    }
};


const View = ({menuItems, addedToCart}) => {
    return (
        <ul className="menu__list">
            {
                menuItems.map(menuItem => {
                    return <MenuListItem onAddToCart={() => addedToCart(menuItem.id)}
                                         key={menuItem.id}
                                         menuItem={menuItem}/>
                })
            }
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         menuLoaded: (newMenu) => {
//             dispatch(menuLoaded(newMenu))
//         }
//     }
// } равносильно этому благодаря встренным особенностям connect

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList)); // connect функция позволяет связать компонент с Redux, композиция компонентов высшего порядка
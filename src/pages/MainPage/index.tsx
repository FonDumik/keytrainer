import React from 'react'
import { Header } from '../../widgets/Header';
import { InputText } from '../../widgets/InputText';
import { Keyboard } from '../../widgets/Keyboard';
import { Provider } from 'react-redux';
import { store } from '../../shared/store';
import styles from './styles.module.scss'

const MainPage = () => {
    return (
        <Provider store={store}>
            <div className={styles.MainPage}>
                <Header/>
                <InputText/>
                <Keyboard/>
            </div>
        </Provider>
    )
}

export default MainPage
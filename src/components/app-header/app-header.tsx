import React, { useState } from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavBarItem from './nav-bar-item/nav-bar-item';
import styles from './app-header.module.css';

type Tab = "Конструктор" | "Лента заказов" | "Личный кабинет";

const AppHeader: React.FC = () => {
    const [isActive, setIsActive] = useState<Tab>('Конструктор');

    return (
        <header className={`pt-4 pb-4 ${styles.header}`}>
            <div className={`${styles.container}`}>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <NavBarItem
                            icon={<BurgerIcon type={isActive === "Конструктор" ? "primary" : "secondary"} />}
                            text="Конструктор"
                            isActive={isActive === "Конструктор"}
                            setActive={() => setIsActive("Конструктор")}
                        />
                        <NavBarItem
                            icon={<ListIcon type={isActive === "Лента заказов" ? "primary" : "secondary"} />}
                            text="Лента заказов"
                            isActive={isActive === "Лента заказов"}
                            setActive={() => setIsActive("Лента заказов")}
                        />
                    </ul>
                </nav>
                <div className={`${styles.logo} pl-5 pr-5`}>
                    <Logo />
                </div>
                 <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <NavBarItem
                            icon={<ProfileIcon type={isActive === "Личный кабинет" ? "primary" : "secondary"} />}
                            text="Личный кабинет"
                            isActive={isActive === "Личный кабинет"}
                            setActive={() => setIsActive("Личный кабинет")}
                        />
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default AppHeader;

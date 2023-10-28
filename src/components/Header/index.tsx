import logo_ignite from '../../assets//ignite_logo.svg'
import { NavLink } from 'react-router-dom'
import { HeaderContainer } from "./styles";
import { Timer } from "phosphor-react";
import { Scroll } from "phosphor-react";

export function Header() {
    return (
        <HeaderContainer>
            <img src={logo_ignite} alt="" />
            <nav>
                <NavLink to="/" title='Timer'>
                    <Timer size={24} />
                </NavLink>
                <NavLink to="/history" title='Histórico'>
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}
import ReactDOMServer from 'react-dom/server'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GrClose } from 'react-icons/gr'
import { GrMenu } from 'react-icons/gr'
import './Header.css'


const Header: React.FC = () => {
    const [isOpen, setOpen] = useState<boolean>(false)

    const iconString1 = ReactDOMServer.renderToString(<GrMenu />)
    const encodedIcon1 = encodeURIComponent(iconString1)
    const iconString2 = ReactDOMServer.renderToString(<GrClose />)
    const encodedIcon2 = encodeURIComponent(iconString2)

    /*
    let backgroundImage
    if (isOpen) {
        return backgroundImage = `url("data:image/svg+xml;charset=UTF-8,${encodedIcon1}")`
    } else {
        return backgroundImage = `url("data:image/svg+xml;charset=UTF-8,${encodedIcon2}")`
    }
*/

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setOpen(!isOpen)
    }

    const styles = {
        Active: {
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,${encodedIcon2}")`
        },
        Inactive: {
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,${encodedIcon1}")`
        },
    }

    return (
        <div className="header__content container">
            <div className="logo__control">
                <div className="logo"></div>
                <div className="logo__heading">Datluj.cz</div>
            </div>

            <div className="navigation">


                <button
                    className="nav-btn"
                    onClick={handleClick}
                    style={isOpen ? styles.Active : styles.Inactive}
                >

                </button>


                <nav className={!isOpen ? 'nav-links nav-closed' : 'nav-links'} onClick={handleClick}>
                    <NavLink to="/">Domů</NavLink>
                    <NavLink to="/testing">Testuj</NavLink>
                    <NavLink to="/training">Trénuj</NavLink>
                    <NavLink to="/login">Přihlášení</NavLink>
                    <NavLink to="/registration">Registrace</NavLink>
                </nav>

            </div>
        </div >
    )
}

export default Header








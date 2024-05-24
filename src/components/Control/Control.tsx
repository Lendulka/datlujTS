import { NavLink } from 'react-router-dom'
import './Control.css'

const Control = () => {
    return (
        <nav className="control">
            <NavLink to="/training/stage">Hra</NavLink>
            <NavLink to="/training/result">Výsledky</NavLink>
        </nav>
    )
}

export default Control
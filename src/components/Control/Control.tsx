import { NavLink } from 'react-router-dom'
import './Control.css'

export const Control: React.FC = () => {
    return (
        <nav className="control">
            <NavLink to="/training/stage">Hra</NavLink>
            <NavLink to="/training/result">Výsledky</NavLink>
        </nav>
    )
}

export default Control
import { Outlet } from 'react-router-dom'
import Control from '../../components/Control/Control'
import './Training.css'

const Training = () => {
    return (
        <div className="training__content">
            <Control />
            <Outlet />
        </div>
    )
}

export default Training
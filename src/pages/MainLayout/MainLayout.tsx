import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './MainLayout.css'

const MainLayout: React.FC = () => {
    return (
        <div className="main-container">
            <header>
                <Header />
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default MainLayout
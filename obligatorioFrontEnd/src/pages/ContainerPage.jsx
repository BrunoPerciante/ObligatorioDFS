import { Outlet } from "react-router"


const ContainerPage = () => {
    return (
        <>
            <header className="main-header">
                <div className="header-content">
                    <a href="index.html" className="app-logo">
                        🌤️<span>Taller App</span>
                    </a>
                </div>
            </header>

            <Outlet />
        </>
    )
}

export default ContainerPage
import { Outlet } from "react-router"


/*const ContainerPage = () => {
    return (
        <>
            <header className="main-header">
                <div className="header-content">
                    <a href="index.html" className="app-logo">
                        <span>AUTO TRACK App</span>
                    </a>
                </div>
            </header>

            <Outlet />
        </>
    )
}*/

const ContainerPage = () => <Outlet />;

export default ContainerPage
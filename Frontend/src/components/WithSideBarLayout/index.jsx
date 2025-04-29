// WithSidebarLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import "./withSideBarLayout.css"
import NavBar from '../NavBar';

export default function WithSidebarLayout() {
    return (
        <div className="app-layout">
            <Sidebar />
            <div className='nav'>
                <NavBar/>
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

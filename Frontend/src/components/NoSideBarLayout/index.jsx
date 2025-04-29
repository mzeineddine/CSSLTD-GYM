import { Outlet } from 'react-router-dom';
const NoSidebarLayout = () => {
    return (
        <div className="main-content">
        <Outlet />
        </div>
    );
}
export default NoSidebarLayout
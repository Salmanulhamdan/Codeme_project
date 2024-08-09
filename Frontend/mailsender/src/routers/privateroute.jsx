import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = localStorage.getItem('JwtToken')
    return(
        auth? <Outlet/> : <Navigate to="/"/>
    )
}

export { PrivateRoutes}
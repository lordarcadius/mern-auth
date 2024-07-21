import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({setAuthenticationState}) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setAuthenticationState(true);
            if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup") {
                navigate('/home', { replace: false })
            }
        }
    }, [location, navigate, setAuthenticationState])

    return (
        null
    )
}

export default RefreshHandler
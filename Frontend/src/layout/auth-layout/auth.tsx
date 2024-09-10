import { Outlet, useNavigate } from 'react-router-dom'
import { SideBar } from '../sidebar'
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

const AuthLayout = () => {
  const navigate = useNavigate();
  const { accessToken, role } = useAuth();
  console.log(accessToken)

  useEffect(() => {
    if (!accessToken || accessToken === undefined) {
      navigate('/signin')
    }

  }, [accessToken, navigate])
  return (
    <div className="w-full flex">
      <SideBar role={role} />
      <div className='ml-60 w-full overview-hidden'>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
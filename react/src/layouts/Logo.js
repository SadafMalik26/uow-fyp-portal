import { useAuth } from '../hooks/authentication';
import logo from '../images/logo.png'

const Logo = () => {

  const {data:auth} = useAuth()

  return (
    <>
      <img src={logo} width={50} />
      <span className='fw-bold'>{auth?.type}</span>
    </>
  );
};

export default Logo;

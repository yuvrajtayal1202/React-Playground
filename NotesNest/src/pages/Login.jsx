import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    setUser({ username: 'Yuvraj' }); // mock login
    navigate('/');
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}

export default Login;

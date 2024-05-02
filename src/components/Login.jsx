import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

// 로그인 요청 함수
const loginUser = async (loginData) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 페이지 전환을 위한 navigate 함수

  // useMutation을 통해 로그인 처리
  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      // 로그인 성공 시 메인 페이지로 리디렉션
      navigate('/main');
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate({ username, password }); // 로그인 요청
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {mutation.isError && (
        <div>Error: {mutation.error.message}</div>
      )}
    </div>
  );
};

export default Login;

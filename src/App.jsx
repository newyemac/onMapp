import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main'; // 메인 페이지 추가

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> // 기본 경로는 로그인 페이지
        <Route path="/main" element={<Main />} /> // 메인 페이지
      </Routes>
    </Router>
  );
};

export default App;

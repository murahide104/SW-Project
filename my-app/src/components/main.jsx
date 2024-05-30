import React, { useState } from 'react';

const Main = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="wrap_login">
            <div className="header">
                <div className="logo">
                    <h4>로고가 들어감</h4>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <form>
                        <h2>로그인</h2>
                        <p>이메일 주소</p>
                        <input type="text" placeholder="이메일 주소를 입력하세요." />
                        <p>비밀번호</p>
                        <div className="password-container">
                            <input 
                                type={passwordVisible ? "text" : "password"} 
                                placeholder="비밀번호를 입력하세요." 
                            />
                            <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                                {passwordVisible ? 
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-eye' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='%232c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' /%3E%3Cpath d='M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6' /%3E%3C/svg%3E" alt="Show" /> : 
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-eye-closed' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='%232c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4' /%3E%3Cpath d='M3 15l2.5 -3.8' /%3E%3Cpath d='M21 14.976l-2.492 -3.776' /%3E%3Cpath d='M9 17l.5 -4' /%3E%3Cpath d='M15 17l-.5 -4' /%3E%3C/svg%3E" alt="Hide" />}
                            </span>
                        </div>
                        <div className="options">
                            <label>
                                <input type="checkbox" />
                                로그인 상태 유지
                            </label>
                            <a href="#">아이디/비밀번호 찾기</a>
                        </div>
                        <button type="submit">로그인</button>
                    </form>
                    <div className="additional-options">
                        <p>계정이 없다면? <a href="#">회원가입</a></p>
                        <div className="or-divider">
                            <hr />
                            <p>  OR  </p>
                            <hr />
                        </div>
                        <button className="kakao-login">카카오 로그인</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;

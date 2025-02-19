import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetLoginUser } from "../../modules/UserModule";

function Navbar() {
	const isAuthorized = !!localStorage.getItem("isLogin");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	/*
	로그아웃 호출
	localStorage 저장 값 삭제, userReducer 값 리셋, 루트로 이동.
	향후 SpringBoot 연동(JWT) 시 토큰 삭제 로직 필요.
	*/
	const logoutHandler = () => {
		localStorage.removeItem("isLogin"); 	// 먼저 로그인 기록 삭제하고
		dispatch(resetLoginUser());				// 리덕스 상태 초기화하고
		navigate("/");							// 루트(index) 페이지로 이동
	};

	return (
		<div>
			<ul>
				<li>
					<NavLink to="/">메인으로</NavLink>
				</li>
				<li>
					<NavLink to="/menu">메뉴보기</NavLink>
				</li>
				{/* localStorage 안의 값으로 로그인 여부 판단하여 조건부 랜더링 */}
				{!isAuthorized ? (
					<li>
						<NavLink to="/login">로그인</NavLink>
					</li>
				) : (
					<li onClick={logoutHandler}>
						<a href="">로그아웃</a>
					</li>
				)}
			</ul>
		</div>
	);
}

export default Navbar;

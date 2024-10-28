import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { callLoginAPI } from '../../apis/UserAPICalls';
import { resetLoginUser } from "../../modules/UserModule";


function LoginForm() {

	/* 
	localStorage:
		Def: 
			localStorage is a web storage API provided by the browser that allows you to sotre key-value pairs
			in a way that persists even after the browser is closed and reopened. This makes it ideal for saving small
			amounts of data that you want to retain between user sessions, such as user preferences, authetication tokes,
			or application settings.
		Using localStorage in React:
			1. Storing Data in localStorage
			2. Retrieving Data from localStorage
			3. Removing Data from localStorage
			4. Using localStorage in React Components
			5. localStorage and JSON: Remember that localStorage only accepts strings, so it's common to use JSON.stringify
			to store complex data like objects or arrays, and JSON.parse to retrieve them.
		Summary:
			It stores data in key-value pairs and persists even after closing the browser.
			It's synchronous, so avoid using it for storing large amounts of data.
			Use JSON methods for storing and retrieving complex data structures like objects or arrays.
	*/
	const navigate = useNavigate();
	const dispatch = useDispatch();
	/* 
	The useSelector hook is used to extract data from the Redux store data. In the code,
	useSelector(state => state.userReducer) is accessing the part of the Redux state managed by userReducer.
	What is the Return Value?
		The return value of useSelector(state => state.userReducer) is the current state managed by userReducer.
		Based on the userReducer code, the state can be:
			An object representing the user data if the login is successful.
			An object with a message property set to 'LOGIN_FAIL' if the login fails.
	Explanation:
		Successful Login: If the login is successful, res will be user object, and this will be the state returned by the reducer.
		Failed Login: If the login fails, res will be set to { message: 'LOGIN_FAIL' }, and this will be the state returned by the reducer.
	Thus, result in the code will reflect the current state of the user login process, which is used to determine the next steps in the useEffect hook.
	*/
	const result = useSelector(state => state.userReducer);
	const isAuthorized = !!localStorage.getItem('isLogin');

	/* input 태그 입력 값 state 관리 */
	const [loginInfo, setLoginInfo] = useState(
		{
			id: '',
			password: ''
		}
	);

	/* 입력 값 변경 시 이벤트 핸들러 */
	const onChangeHandler = (e) => {
		setLoginInfo(
			{
				...loginInfo,
				[e.target.name]: e.target.value
			}
		);
	}

	/* 로그인 버튼 클릭 시 동작 */
	const onClickHandler = () => {

		/* loginInfo에 대한 유효성 검사 후 호출 */
		// callLoginAPI(loginInfo) returns a dispatch function with result(login action) as the payload
		// dispatch(callLoginAPI(loginInfo)) dispatches the result(login action) to login reducer defined in UserModule.js
		dispatch(callLoginAPI(loginInfo));

	}

	/* 로그인 요청 후 성공 or 실패 동작 */
	useEffect(
		() => {
			if (result?.message) {
				alert('아이디와 비밀번호를 확인해주세요');
				setLoginInfo(
					{
						id: '',
						password: ''
					}
				);
				/* 
				dispatch(resetLoginUser()) will result in the state being set to an empty object.
				This is because the resetLoginUser action creator is defined to return an action
				with the payload set to the inital state, which is an empty object.
					Initial State: The initialState is defined as an empty object {}.
					Action Creator: The resetLoginUser action creator returns an action with the payload set to initialState.
					Reducer: The RESET_LOGIN_USER handler in the reducer simply returns the res from the action payload,
					which is the initialState, and empty object.
				*/
				dispatch(resetLoginUser());
			} else if (isAuthorized) {
				navigate('/');
			}
		}, // eslint-disable-next-line
		[result]
	);

	return (
		<>
			<div>
				<label>ID : </label>
				<input
					type="text"
					name="id"
					value={loginInfo.id}
					onChange={onChangeHandler}
				/>
				&nbsp;&nbsp;&nbsp;
				<label>PW : </label>
				<input
					type="password"
					name="password"
					value={loginInfo.password}
					onChange={onChangeHandler}
				/>
				<button onClick={onClickHandler}>로그인</button>
			</div>
		</>
	);
}

export default LoginForm;
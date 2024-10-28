
import LoginForm from '../components/form/LoginForm';
import { Navigate } from 'react-router-dom';

function Login(){

	/* 로그인 상태인데 호출할 경우 메인으로 */
	const loginStatus = !!localStorage.getItem('isLogin');

	if(loginStatus) {
		/* 
		What replace Does?
			When you use replace={true} with the Navigate componenet, it tells React Router to replace
			the current entry in the history stack with the new location, instead of adding a new entry.
			As a result, users won't be able to navigate back to the original page.
			Without replace: A new entry is added to the history stack. The user can go back to the
			previous route by hitting the browser's back button.
			With replace: The current entry is replaced by the new location. The previous route is effectively
			"overwritten," and hitting the back button won't take the user back to that page.
		Example Scenarios:
			1. Login Redirect: After a user logs in, you might want to redirect them to the homepage. By using
			replace={true}, they won't be able to click back to the login page.
			2. 404 Not Fount Page: If a user tries to access a page that doesn't exist, you could redirect them
			to a 404 page with replace={true}, so they aren't taken back to the non-existent page if they press
			the back button.
			3. Preventing Unnecessary Back Navigation: If a user finishes a checkout process, you might redirect
			them to a confirmation page with replace. This prevents them from accidentally going back to the checkout page.
		*/
		return <Navigate to="/" replace={ true }/>
	}

	return (
		<>
			<h1>로그인 페이지</h1>
			<LoginForm/>
		</>
	);
}

export default Login;
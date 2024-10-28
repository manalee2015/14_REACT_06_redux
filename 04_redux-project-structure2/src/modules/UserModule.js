import { createActions, handleActions } from "redux-actions";

/* 초기 state값 */
const initialState = {};

/* Action Types (User) */									// 타입 별 생성되는 액션 함수 이름(LARGE_SNAKE_CASE -> camelCase)
export const LOGIN = 'user/LOGIN';							// -> login()
export const RESET_LOGIN_USER = 'user/RESET_LOGIN_USER';	// -> resetLoginUser()

/* Action Functions (User) */
export const { user: { login, resetLoginUser } } = createActions({
	[LOGIN]: (res) => ({ res }),
	[RESET_LOGIN_USER]: (res = initialState) => ({ res }),
});

/* Reducer (User) */
/* 
Benefits of Using handleActions:
1. Conciseness: Reduces boilerplate code by eliminating the need for a switch statement.
2. Readability: Makes it easier to see which actions are handled by the reducer and how they affect the state.
3. Maintainability: Simplifies the process of adding or modifying action handlers.
*/
const userReducer = handleActions(
	{
		[LOGIN]: (state, { payload: { res } }) => {

			if (res) {
				/* localStorage에 로그인 상태 저장 */
				localStorage.setItem("isLogin", true);	// localStorage가 무엇인지는 검색해서 (가볍게)공부해보세요
			} else {
				res = { message: 'LOGIN_FAIL' };
			}

			return res;

		},
		[RESET_LOGIN_USER]: (state, { payload: { res } }) => {

			return res;

		}
	},
	initialState
);

export default userReducer;


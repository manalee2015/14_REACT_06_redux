import { createActions, handleActions } from "redux-actions";

/* 초기 state값 */
const initialState = {};

/* Action Types (Menu) */						// 타입 별 생성되는 액션 함수 이름(LARGE_SNAKE_CASE -> camelCase)
const GET_MENULIST = 'menu/GET_MENULIST';		// -> getMenulist()
const GET_MENU = 'menu/GET_MENU';				// -> getMenu()
const REGIST_MENU = 'menu/REGIST_MENU';			// -> registMenu()
const MODIFY_MENU = 'menu/MODIFY_MENU';			// -> modifyMenu()
const DELETE_MENU = 'menu/DELETE_MENU';			// -> deleteMenu()

/* Action Functions (Menu) */
export const { menu: { getMenulist, getMenu, registMenu, modifyMenu, deleteMenu } } = createActions({
	[GET_MENULIST]: (res) => ({ menulist: res }),
	[GET_MENU]: (res) => ({ menu: res }),
	[REGIST_MENU]: (res) => ({ regist: res }),
	[MODIFY_MENU]: (res) => ({ modify: res }),
	[DELETE_MENU]: (res) => ({ delete: res }),
});

/* Reducer (Menu) */
const menuReducer = handleActions(
	{
		[GET_MENULIST]: (state, { payload }) => {
			return payload;
		},
		[GET_MENU]: (state, { payload }) => {
			return payload;
		},
		[REGIST_MENU]: (state, { payload }) => {
			return payload;
		},
		[MODIFY_MENU]: (state, { payload }) => {
			return payload;
		},
		[DELETE_MENU]: (state, { payload }) => {
			return payload;
		}
	},
	initialState
);

export default menuReducer;


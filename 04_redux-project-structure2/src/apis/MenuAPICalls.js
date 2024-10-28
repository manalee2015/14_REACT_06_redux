import { request } from "./Api";
import { getMenulist, getMenu, registMenu, modifyMenu, deleteMenu } from "../modules/MenuModule";

/* 메뉴 목록 조회 API 호출 */
export function callGetMenuListAPI() {

	console.log('getMenuList api calls...');

	/* redux-thunk(미들 웨어)를 이용한 비동기 처리 */
	return async (dispatch, getState) => {

		/* Api.js의 axios 처리 참조 */
		const result = await request('GET', '/menu');
		console.log('getMenuList result : ', result);

		/* action 생성 함수에 결과 전달하며 dispatch 호출 */
		dispatch(getMenulist(result));
	}
}

/* 메뉴 상세 조회 API 호출 */
export function callGetMenuAPI(id) {

	console.log('getMenu api calls...');

	return async (dispatch, getState) => {

		const result = await request('GET', `/menu/${id}`);
		console.log('getMenu result : ', result);

		dispatch(getMenu(result));
	}
}

/* 메뉴 등록 API 호출 */
export function callRegistMenuAPI(menu) {

	console.log('registMenu api calls...');

	return async (dispatch, getState) => {

		const result = await request('POST', '/menu/', menu);
		console.log('registMenu result : ', result);

		dispatch(registMenu(result));
	}
}

/* 메뉴 수정 API 호출 */
export function callModifyMenuAPI(menu) {

	console.log('modifyMenu api calls...');

	return async (dispatch, getState) => {

		const result = await request('PUT', `/menu/${menu.id}`, menu);
		console.log('modifyMenu result : ', result);

		dispatch(modifyMenu(result));
	}
}

/* 메뉴 삭제 API 호출 */
export function callDeleteMenuAPI(id) {

	console.log('deleteMenu api calls...');

	return async (dispatch, getState) => {

		const result = await request('DELETE', `/menu/${id}`);
		console.log('deleteMenu result : ', result);

		dispatch(deleteMenu(result));
	}
}

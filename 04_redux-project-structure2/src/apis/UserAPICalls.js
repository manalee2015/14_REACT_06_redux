import { request } from "./Api";
import { login } from "../modules/UserModule";

/* 로그인 정보 전달 받는 함수 */
export function callLoginAPI(loginInfo) {

	console.log('login api calls...');

	/* redux-thunk(미들 웨어)를 이용한 비동기 처리 */
	return async (dispatch, getState) => {

		/* Api의 axios 처리 참조 */
		const userList = await request('GET', '/user');

		/* id와 password 일치 여부 확인 - 서버에서 이루어져야 하는 로직 */
		/* 배열의 find 메소드 : 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환 */
		/* 
		find() Method: a built-in JavaScript array method
			The find() method is used to search through an array and return the first element that satisfies a provided testing function.
			If no elements satisfy the testing function, it returns undefined.
		Syntax:
			array.find(callback(currentValue, index, arr), thisValue)
			callback: a function that tests each element of the array.
				currentValue: The current element being processed in the array.
				index(optional): The index of the current element being processed in the array.
				arr(optional): The array find was called upon.
			thisValue(optional): Value to use as this when executing callback.
		Return Value:
			The first element in the array that satisfies the provided testing function. Otherwise, undefined is returned.
		*/
		const result = await userList.find(user => ((user.id === loginInfo.id) && (user.password === loginInfo.password)));

		console.log('login result : ', result);		// 검색된 user 객체 반환

		/* action 생성 함수에 결과 전달하며 dispatch 호출 */
		dispatch(login(result));
	}
}

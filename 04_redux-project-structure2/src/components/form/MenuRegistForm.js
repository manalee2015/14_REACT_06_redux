
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callRegistMenuAPI } from '../../apis/MenuAPICalls';
import { callGetMenuListAPI } from '../../apis/MenuAPICalls';

function MenuRegistForm() {

	const result = useSelector(state => state.menuReducer);
	const menuList = result.menulist;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	/* 입력 값 state 저장 */
	const [registMenu, setRegistMenu] = useState(
		{
			id: '0',
			menuName: '',
			menuPrice: 0,
			categoryName: '한식',
			isOrderable: false,
			detail: {
				description: '',
				image: ''
			}
		}
	);

	/* 입력 값 변경 시 이벤트 핸들러 */
	const onChangeHandler = (e) => {

		let name = e.target.name;
		let value = e.target.value;

		/* json-server에 저장될 데이터 타입 맞추기 위한 코드 */
		switch (name) {
			case 'menuPrice':
				value = parseInt(value);
				break;
			case 'isOrderable':
				value = !!value;
				break;
			case 'description':
				name = 'detail';
				value = {
					description: value,
					image: registMenu.detail.image
				};
				break;
		}

		setRegistMenu(
			{
				...registMenu,
				[name]: value
			}
		);

		console.log(registMenu);

	}

	/* 파일 첨부 시 동작하는 이벤트 핸들러 */
	const fileChangeHandler = async (e) => {
		const file = e.target.files[0];
		console.log(file);
		const base64 = await convertBase64(file);
		console.log(base64);
		setRegistMenu(
			{
				...registMenu,
				detail: {
					description: registMenu.detail.description,
					image: base64
				}
			}
		);

		console.log(registMenu);
	}

	/* FileReader API를 통해 input type="file"에 첨부 된 파일을 base64 인코딩 형식으로 변환 */
	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			
			/* FileReader 객체 생성 */
			const fileReader = new FileReader();
			
			/* 파일의 내용을 읽어들여 데이터를 URL 형태의 문자열로 변환시킨다. */
			fileReader.readAsDataURL(file)	// 긴 문자열이 파일 그 자체다.

			/* 읽기 완료(성공) */
			fileReader.onload = () => {
				resolve(fileReader.result);
			}

			/* 읽는 도중 에러 발생(실패) */
			fileReader.onerror = (error) => {
				reject(error);
			}
		})
	}

	useEffect(
		() => {
			/* 해당 컴포넌트 최초 마운트 시, menuList API 호출 */
			dispatch(callGetMenuListAPI());
		},
		[]
	);
	
	useEffect(
		() => {
			/* menuList가 undefined가 아니고, 1개 이상의 응답이 도착했을 때 */
			if (menuList && menuList.length > 0) {

				/* Array.reduce() 함수를 사용해 최대 id값 도출 */
				let maxId = menuList.reduce((max, menu) => Math.max(max, menu.id), 0);

				/* 새로 추가될 메뉴의 id값 연산(MySQL의 auto_increment와 같은 효과) */
				let nextId = (maxId + 1).toString();

				console.log(`maxId: ${maxId}, nextId: ${nextId}`);

				setRegistMenu(
					{
						...registMenu,
						id: nextId
					}
				);
			}
		},
		/*
			menuList가 변경될 때만 side-effect 함수를 실행.
			즉, 해당 화면 랜더링 시점에 비동기 요청인 callGetMenuListAPI 콜에 대한 응답이 도착하지 않았다면
			menuList는 undefined일 것이고, undefined에 대해 reduce()함수를 동작시키지 못한다.
			그러나 API 콜에 대한 응답이 도착한다면 더이상 undefined가 아니고 메뉴 객체 배열이기 때문에
			이를 의존성 배열이 감지(메모리 주소 변화)하고 side-effect 함수를 실행해 nextId를 구할 수 있다.
		*/
		[menuList]
	);

	useEffect(
		() => {
			/* 메뉴 등록 완료 확인 후 /menu로 이동 */
			if (result.regist) {
				alert('메뉴 등록');
				navigate(`/menu`);
			}
		},
		[result]
	);

	const onClickHandler = () => {
		/* registMenu에 대한 유효성 검사 후 호출 */
		dispatch(callRegistMenuAPI(registMenu));
	}

	return (
		<>
			<label>메뉴 이름 : </label>
			<input type="text" name="menuName" value={registMenu.menuName} onChange={onChangeHandler} />
			<br />
			<label>메뉴 가격 : </label>
			<input type="number" name="menuPrice" value={registMenu.menuPrice} onChange={onChangeHandler} />
			<br />
			<label>카테고리 : </label>
			<select name="categoryName" value={registMenu.categoryName} onChange={onChangeHandler}>
				<option>한식</option>
				<option>일식</option>
				<option>서양</option>
				<option>동양</option>
				<option>커피</option>
				<option>쥬스</option>
				<option>기타</option>
			</select>
			<br />
			<label>판매 여부 : </label>
			<select name="isOrderable" value={registMenu.isOrderable} onChange={onChangeHandler}>
				<option value="true">판매 가능</option>
				<option value="false">판매 불가</option>
			</select>
			<br />
			<label>설명 : </label>
			<textarea name="description" value={registMenu.detail.description} onChange={onChangeHandler}></textarea>
			<br />
			<label>사진 : </label>
			<input
				type="file"
				name="image"
				accept='image/*'
				onChange={fileChangeHandler} />
			<br />
			<button onClick={onClickHandler}>메뉴 등록</button>
		</>
	);
}

export default MenuRegistForm;
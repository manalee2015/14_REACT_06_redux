import axios from 'axios';

/* json-server 연동을 위한 도메인 설정 */
const DOMAIN = 'http://localhost:4000';

export const request = async (method, url, data) => {
	return await axios({
		method,
		url: `${DOMAIN}${url}`,
		data
	})
	.then(res => {
		console.log(" RESTFUL API data", res);
		return res.data})
	.catch(error => console.log(error));
};

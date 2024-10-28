import { Outlet } from 'react-router-dom';
import Header from '../components/commons/Header';
import Navbar from '../components/commons/Navbar';
import Footer from '../components/commons/Footer'; // Footer 컴포넌트 임포트

function Layout() {
	return (
		<div>
			<Header />
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
}

export default Layout;

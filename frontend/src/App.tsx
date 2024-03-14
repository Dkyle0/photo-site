import React from 'react';
import './App.css';
import { Main } from './components/pages/main';
import { Footer } from './components/footer';
import { Route, Routes } from 'react-router-dom';
import { Personal } from './components/pages/personal';
import {
	Authorization,
	Registration,
} from './components/pages/authorization-registration';
import { Menu } from './components/menu';
import { Portfolio } from './components/pages/portfolio';
import { PortfolioPage } from './components/pages/portfolio/portfolio-page';
import { Modal } from './components/modal';

export function App() {
	return (
		<>
			<Menu />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/personal" element={<Personal />} />
				<Route path="/login" element={<Authorization />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/portfolio" element={<Portfolio />} />
				<Route path="/portfolio/portrait" element={<PortfolioPage />} />
				<Route path="/portfolio/street" element={<PortfolioPage />} />
				<Route path="/portfolio/landscape" element={<PortfolioPage />} />
				<Route path="/*" element={<div> Ошибка </div>} />
			</Routes>
			<Modal />
		</>
	);
}
{
	/* <Routes>
				<Route path="/" element={<Main />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/users" element={<Users />} />
				<Route path="/portfolio" element={<Users />} />
				<Route path="/about" element={<Users />} />
				<Route path="/post/" element={<Post />} />
				<Route path="/post/:id" element={<Post />} />
				<Route path="/post/:id/edit" element={<Post />} />
				<Route path="/*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				<Route path="/*" element={<div> Ошибка </div>} />
			</Routes> */
}
{
	/* <div>
				<h1>Портфолио</h1>
				<div>Портрет</div>
				<div>Городская фотография</div>
				<div>Пейзаж</div>
			</div>
			{/* <Footer /> */
}

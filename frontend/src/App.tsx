import React from 'react';
import './App.css';
import { Main } from './components/pages/main';
import { Footer } from './components/footer';
import { Route, Routes } from 'react-router-dom';
import { Personal } from './components/pages/personal';

export function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/personal" element={<Personal />} />
				<Route path="/*" element={<div> Ошибка </div>} />
			</Routes>
			{/* <Routes>
				<Route path="/" element={<Main />} />
				<Route path="/login" element={<Authorization />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/users" element={<Users />} />
				<Route path="/portfolio" element={<Users />} />
				<Route path="/about" element={<Users />} />
				<Route path="/post/" element={<Post />} />
				<Route path="/post/:id" element={<Post />} />
				<Route path="/post/:id/edit" element={<Post />} />
				<Route path="/*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				<Route path="/*" element={<div> Ошибка </div>} />
			</Routes> */}
			{/* <div>
				<h1>Портфолио</h1>
				<div>Портрет</div>
				<div>Городская фотография</div>
				<div>Пейзаж</div>
			</div>
			{/* <Footer /> */}
		</>
	);
}

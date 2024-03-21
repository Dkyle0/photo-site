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
import { AboutMe } from './components/pages/about-me';
import { Post } from './components/pages/posts/post';
import { Posts } from './components/pages/posts/posts';
import { Error } from './components/pages/error';

export function App() {
	return (
		<>
			<Menu />
			<div>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/personal" element={<Personal />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/portfolio" element={<Portfolio />} />
					<Route path="/portfolio/portrait" element={<PortfolioPage />} />
					<Route path="/portfolio/street" element={<PortfolioPage />} />
					<Route path="/portfolio/landscape" element={<PortfolioPage />} />
					<Route path="/posts/" element={<Posts />} />
					<Route path="/post/" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="/about" element={<AboutMe />} />
					<Route
						path="/*"
						element={<Error title="Такая страница не найдена." />}
					/>
				</Routes>
			</div>
			<Footer />
			<Modal />
		</>
	);
}

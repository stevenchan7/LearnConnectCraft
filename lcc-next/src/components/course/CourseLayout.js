import Navbar from '../layout/Navbar';

export default function CourseLayout({ children }) {
	return (
		<div>
			<div className='bg-black'>
				<Navbar />
			</div>
			{children}
		</div>
	);
}

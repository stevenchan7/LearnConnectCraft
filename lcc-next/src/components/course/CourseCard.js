import { Rating, ThinStar } from '@smastrom/react-rating';

// Declare it outside your component so it doesn't get re-created
const myStyles = {
	itemShapes: ThinStar,
	activeFillColor: '#F1C644',
	inactiveFillColor: '#D4D4D4',
};

export default function CourseCard({ rating }) {
	return (
		<div className='p-4 mx-auto w-[320px] h-[320px] space-y-1 text-primary_black'>
			<img src='/course1.png' alt='gambar course' />
			{/* Title */}
			<p className='font-medium'>Building Modern Web Application with Go (Golang)</p>
			<p className='text-xs text-primary_black/70'>Steven Belva</p>
			<div className='flex justify-start items-center'>
				<p className='text-xs text-primary_black/70'>4.0</p>
				<Rating style={{ maxWidth: 100 }} value={rating} itemStyles={myStyles} readOnly />
			</div>
			<p className='font-semibold'>Rp 22.000</p>
		</div>
	);
}

import { Rating, ThinStar } from '@smastrom/react-rating';
import Link from 'next/link';

// Declare it outside your component so it doesn't get re-created
const myStyles = {
	itemShapes: ThinStar,
	activeFillColor: '#F1C644',
	inactiveFillColor: '#D4D4D4',
};

export default function CourseCard({ course, rating }) {
	if (course) {
		let coursePriceArr = [...course.price.toString()];
		let n = coursePriceArr.length;
		while (n > 3) {
			n = n - 3;
			coursePriceArr.splice(n, 0, '.');
		}
		return (
			<div className='p-4 mx-auto max-w-[320px] min-h-[320px] space-y-1 text-primary_black'>
				<div className='overflow-hidden'>
					<img src={`http://localhost:5000/${course.thumbnail}`} alt='course thumbnail' className='aspect-video h-[10rem] hover:scale-110' />
				</div>
				{/* Title */}
				<Link href={`/course/${course.id}`} className='font-medium hover:text-[#6042C6]'>
					{course.title}
				</Link>
				<p className='text-xs text-primary_black/70'>{course.instructor}</p>
				<div className='flex justify-start items-center'>
					<p className='text-xs text-primary_black/70'>4.0</p>
					<Rating style={{ maxWidth: 100 }} value={rating} itemStyles={myStyles} readOnly />
				</div>
				<p className='font-semibold'>Rp {coursePriceArr.join('')}</p>
			</div>
		);
	}
}

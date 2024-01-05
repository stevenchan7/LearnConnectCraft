'use client';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import CourseReviewCard from './CourseReviewCard';
import { useEffect, useState } from 'react';

export default function CourseReview() {
	const [isNavigation, setIsNavigation] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsNavigation(window.innerWidth <= 1024);
		};

		handleResize(); // Set initial value
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className='!my-24 mx-auto w-full overflow-hidden space-y-4'>
			<h2 className='text-4xl text-center'>From the community</h2>
			<Swiper modules={[Navigation, EffectCards]} effect={isNavigation ? '' : 'cards'} cardsEffect={{ slideShadows: false, perSlideOffset: 8 }} navigation={isNavigation}>
				<SwiperSlide>
					<CourseReviewCard />
				</SwiperSlide>
				<SwiperSlide>
					<CourseReviewCard />
				</SwiperSlide>
				<SwiperSlide>
					<CourseReviewCard />
				</SwiperSlide>
				<SwiperSlide>
					<CourseReviewCard />
				</SwiperSlide>
			</Swiper>
		</div>
	);
}

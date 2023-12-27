'use client';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import CourseCard from '../course/CourseCard';

export default function RecommendedCourse() {
	return (
		<div>
			<h2 className='font-bold text-lg'>Recommeded for you</h2>
			<Swiper
				// install Swiper modules
				effect='coverflow'
				modules={[Navigation, EffectCoverflow]}
				slidesPerView={1}
				coverflowEffect={{
					rotate: 25,
					slideShadows: false,
				}}
				breakpoints={{
					1536: {
						slidesPerView: 3,
					},
					1280: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 3,
					},
				}}
				navigation
			>
				<SwiperSlide>
					<CourseCard rating={4} />
				</SwiperSlide>
				<SwiperSlide>
					<CourseCard rating={4} />
				</SwiperSlide>
				<SwiperSlide>
					<CourseCard rating={4} />
				</SwiperSlide>
				<SwiperSlide>
					<CourseCard rating={4} />
				</SwiperSlide>
				<SwiperSlide>
					<CourseCard rating={4} />
				</SwiperSlide>
				<SwiperSlide>
					<CourseCard rating={4} />
				</SwiperSlide>
				<SwiperSlide>
					<CourseCard rating={4} />
				</SwiperSlide>
			</Swiper>
		</div>
	);
}

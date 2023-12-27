'use client';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import CourseCard from '../course/CourseCard';

export default function TopCourse() {
	return (
		<div>
			<h2 className='font-bold text-lg'>Top courses</h2>
			<Swiper
				// install Swiper modules
				modules={[Navigation]}
				slidesPerView={1}
				spaceBetween={50}
				navigation
				breakpoints={{
					1536: {
						slidesPerView: 6,
					},
					1280: {
						slidesPerView: 5,
					},
					1024: {
						slidesPerView: 4,
					},
					768: {
						slidesPerView: 2,
					},
				}}
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

'use client';

import { fetchData } from '@/utils/api-utils';
import { useEffect, useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CategoryCard } from '../homepage/Category/category-card';

import 'swiper/css';
import 'swiper/css/pagination';

function CategorySlide({
  children,
  endpoint,
}: {
  children: React.ReactNode;
  endpoint: string;
}) {
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategoryData = async () => {
    const res = await fetchData(endpoint);
    setCategories(res);
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <div className="pt-5 bg-whiteColor px-4 sm:px-6 md:pt-10 xl:px-0 container mx-auto">
      <div className="">{children}</div>
      <div className="py-10 ">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          speed={800} // 👈 smooth animation
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 6 },
            1440: { slidesPerView: 7 },
          }}
          modules={[Autoplay, Pagination]}
          className="w-full category-swiper"
        >
          {categories.map((category: any) => (
            <SwiperSlide key={category?.id}>
              <CategoryCard category={category} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default CategorySlide;

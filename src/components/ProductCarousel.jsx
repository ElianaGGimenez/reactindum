import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Item from './Item';

export default function ProductCarousel({ productos }) {
  return (
    <div className="carousel-container">
      <h2 className="text-xl font-semibold mb-4">Productos destacados</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        loop
      >
        {productos.map((producto) => (
          <SwiperSlide key={producto.id}>
            <Item producto={producto} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

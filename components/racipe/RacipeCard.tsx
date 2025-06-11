import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function RacipeCard({ racipe }: any) {
  return (
    <div>
      <Link
        href={`/racipe/${racipe?.id}`}
        className="w-full h-full block group"
      >
        {/* Image Wrapper */}
        <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
          <Image
            src={racipe?.attachment?.url}
            alt={racipe?.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%] py-3 lg:py-4 px-5 bg-secondaryColor rounded-lg z-10">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-whiteColor">
                  {racipe?.title}
                </h3>
                <p className="text-base md:text-base text-whiteColor mt-1">
                  YouTube
                </p>
              </div>
              <div>
                <button className="w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px] text-white rounded-full border border-whiteColor cursor-pointer flex items-center justify-center">
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RacipeCard;

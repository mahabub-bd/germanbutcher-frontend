"use client";

import { HeadingPrimary } from "@/components/common/heading-primary";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { TestimonialCard } from "./testimonial-card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Loyal Customer",
    image: "/images/avatar/av-1.jpg",
    rating: 5,
    text: "I've been shopping here for years and the quality never disappoints. The customer service is exceptional and delivery is always on time!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "First-time Buyer",
    image: "/images/avatar/av-2.jpg",
    rating: 5,
    text: "As a first-time customer, I was impressed by the easy shopping experience and the quality of products. Will definitely be ordering again!",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Regular Shopper",
    image: "/images/avatar/av-3.jpg",
    rating: 4,
    text: "The product selection is amazing and the website makes it so easy to find exactly what I'm looking for. Highly recommend!",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Tech Enthusiast",
    image: "/images/avatar/av-4.jpg",
    rating: 5,
    text: "The products are top-notch and shipping is lightning fast. This has become my go-to store for all my shopping needs.",
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "Fashion Blogger",
    image: "/images/avatar/av-5.jpg",
    rating: 5,
    text: "I love the curated selection and attention to detail. Every purchase feels special and the quality exceeds expectations every time.",
  },
];

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (testimonials.length - visibleCount + 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - visibleCount : prevIndex - 1
    );
  };

  return (
    <section className="md:py-20 py-12 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-500 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-500 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-red-400 rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-yellow-400 rounded-full"></div>
      </div>

      <div className="mx-auto container px-4 relative z-10">
        <HeadingPrimary
          title="What Our Customers Say"
          subtitle="Join thousands of satisfied customers who trust us"
          className="mb-16"
        />

        <div className="relative mx-auto">
          {/* Testimonial cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleCount)
                }%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation controls below cards */}
          <div className="flex items-center justify-center mt-12 space-x-8">
            {/* Previous button */}
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-200 ${
                currentIndex === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-yellow-500 text-white hover:shadow-2xl hover:scale-110"
              }`}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Enhanced dots indicator */}
            <div className="flex justify-center space-x-3">
              {Array.from({
                length: testimonials.length - visibleCount + 1,
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300
                    ${
                      currentIndex === index
                        ? "w-12 bg-gradient-to-r from-red-500 to-yellow-500 shadow-lg"
                        : "w-3 bg-gray-300 hover:bg-gray-400"
                    }`}
                  aria-label={`Go to testimonial group ${index + 1}`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={nextSlide}
              disabled={currentIndex >= testimonials.length - visibleCount}
              className={`p-3 rounded-full shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-200 ${
                currentIndex >= testimonials.length - visibleCount
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-yellow-500 text-white hover:shadow-2xl hover:scale-110"
              }`}
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

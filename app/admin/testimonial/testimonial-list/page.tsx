import { TestimonialList } from "@/components/admin/testimonial/testimonial-list";

export default async function TestimonialsPage() {
  return (
    <div className="p-6 space-y-6 border rounded-sm">
      <TestimonialList />
    </div>
  );
}

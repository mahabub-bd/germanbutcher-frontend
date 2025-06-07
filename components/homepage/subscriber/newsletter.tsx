import { Mail } from "lucide-react";
import { Subscription } from "./subscriber";

export function NewsletterSection() {
  return (
    <section className="md:py-10 py-5">
      <div className="">
        <div className="container mx-auto md:grid md:grid-cols-12 md:gap-10 py-10 px-2.5 lg:px-0">
          <div className="md:col-span-5 flex items-start md:items-center">
            <div className="mr-4 md:mr-6">
              <div className="bg-gradient-to-br from-[#8a0000] to-[#c70909] p-4 rounded-2xl shadow-lg">
                <Mail size={60} className="text-white" />
              </div>
            </div>

            <div className="ml-2 md:ml-6 mb-2">
              <h4 className="font-semibold text-xl md:text-[25px] lg:text-4xl mb-2">
                Subscribe Newsletter
              </h4>
              <p className="md:text-base lg:text-lg font-medium text-sm">
                We let you receive the latest information on as well as offers,
                tips, and updates.
              </p>
            </div>
          </div>
          <div className="md:col-span-1"></div>
          <div className="md:col-span-6 mt-2 md:mt-0 flex md:justify-end items-center">
            <Subscription />
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "@/components/ui/Container";
import bookingHistoryData from "../../../../data/bookingHistoryData";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { formatPrice } from "@/utils/offerUtils";

const BookingHistory = () => {
  return (
    <section className="py-20">
      <Container>
        <div className="c-xxl:rounded-2xl c-xxl:border c-xxl:border-solid c-xxl:border-[#D9D9D9] c-xxl:p-8">
          <div className="mb-5 hidden grid-cols-5 gap-5 border-b border-solid border-[#D9D9D9] px-5 py-2 c-xxl:grid">
            <span className="font-semibold uppercase text-[#B8B8BC]">Date</span>
            <span className="font-semibold uppercase text-[#B8B8BC]">
              Package Name
            </span>
            <span className="font-semibold uppercase text-[#B8B8BC]">
              Duration
            </span>
            <span className="font-semibold uppercase text-[#B8B8BC]">Cost</span>
            <span className="font-semibold uppercase text-[#B8B8BC]">
              Invoice
            </span>
          </div>
          <ul className="grid gap-5 c-md:grid-cols-2 c-xxl:grid-cols-1">
            {bookingHistoryData.map((booking) => (
              <li
                key={uuidv4()}
                className="rounded-xl bg-[#F4F4F4] p-5 c-xxl:py-3"
              >
                <article className="flex flex-col gap-4 c-xxl:grid c-xxl:grid-cols-5">
                  <div className="flex flex-col gap-1 border-solid border-[#DADADA] last:border-r-0 c-xxl:border-r-2">
                    <span className="text-xs font-bold uppercase text-[#B8B8BC] c-xxl:hidden">
                      Date
                    </span>
                    <span className="c-xxl:flex c-xxl:h-full c-xxl:items-center">
                      {booking.date}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 border-solid border-[#DADADA] last:border-r-0 c-xxl:border-r-2">
                    <span className="text-xs font-bold uppercase text-[#B8B8BC] c-xxl:hidden">
                      Package Name
                    </span>
                    <span className="c-xxl:flex c-xxl:h-full c-xxl:items-center">
                      {booking.packageName}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 border-solid border-[#DADADA] last:border-r-0 c-xxl:border-r-2">
                    <span className="text-xs font-bold uppercase text-[#B8B8BC] c-xxl:hidden">
                      Duration
                    </span>
                    <span className="c-xxl:flex c-xxl:h-full c-xxl:items-center">
                      {booking.days} Days & {booking.nights} Nights
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 border-solid border-[#DADADA] last:border-r-0 c-xxl:border-r-2">
                    <span className="text-xs font-bold uppercase text-[#B8B8BC] c-xxl:hidden">
                      Cost
                    </span>
                    <span className="c-xxl:flex c-xxl:h-full c-xxl:items-center">
                      {formatPrice(booking.cost)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 border-solid border-[#DADADA] last:border-r-0 c-xxl:border-r-2">
                    <span className="text-xs font-bold uppercase text-[#B8B8BC] c-xxl:hidden">
                      Invoice
                    </span>
                    <span className="c-xxl:flex c-xxl:h-full c-xxl:items-center">
                      <Button className="rounded-none  bg-transparent !p-0 text-brand-blue shadow-none">
                        <span className="border-b-2 border-solid border-brand-blue">
                          Download
                        </span>
                        <Download />
                      </Button>
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default BookingHistory;

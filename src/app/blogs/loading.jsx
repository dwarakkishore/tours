import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Skeleton */}
      <div className="relative h-[50vh] min-h-[400px] w-full bg-slate-100 animate-pulse">
        <Container className="h-full flex flex-col justify-center gap-6">
          <div className="h-12 w-2/3 md:w-1/2 bg-slate-200 rounded-xl" />
          <div className="h-4 w-full md:w-1/3 bg-slate-200 rounded" />
        </Container>
      </div>

      {/* Content Skeleton */}
      <div className="py-12 md:py-20">
        <Container>
           {/* Filters/Header Placeholder */}
           <div className="flex justify-between items-center mb-10">
              <div className="h-10 w-40 bg-slate-100 rounded-lg animate-pulse" />
              <div className="h-10 w-40 bg-slate-100 rounded-lg animate-pulse hidden md:block" />
           </div>

           {/* Grid Skeleton */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                 <div key={i} className="flex flex-col gap-4">
                    <div className="aspect-[4/3] w-full bg-slate-100 rounded-xl animate-pulse" />
                    <div className="space-y-2">
                       <div className="h-6 w-3/4 bg-slate-100 rounded animate-pulse" />
                       <div className="h-4 w-full bg-slate-50 rounded animate-pulse" />
                       <div className="h-4 w-2/3 bg-slate-50 rounded animate-pulse" />
                    </div>
                 </div>
              ))}
           </div>
        </Container>
      </div>
    </div>
  );
}

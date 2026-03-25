import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Skeleton - Matches PackageHero */}
      <div className="relative h-[70vh] min-h-[500px] w-full bg-slate-200 animate-pulse">
        <Container className="h-full flex flex-col justify-end pb-12 relative z-10">
          {/* Breadcrumbs */}
          <div className="h-4 w-48 bg-slate-300 rounded mb-6" />
          
          {/* Title */}
          <div className="h-12 md:h-16 w-full max-w-2xl bg-slate-300 rounded-xl mb-4" />
          
          {/* Meta info */}
          <div className="flex gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-24 bg-slate-300 rounded" />
            ))}
          </div>
        </Container>
      </div>

      {/* Content Area */}
      <Container className="relative flex flex-col lg:flex-row gap-8 pt-8">
        {/* Main Content (75%) */}
        <div className="w-full lg:w-[75%] space-y-8">
          {/* Highlights Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="h-6 w-40 bg-slate-200 rounded mb-4 animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-slate-200 rounded-lg animate-pulse" />
                  <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-10 w-28 bg-slate-200 rounded-lg animate-pulse flex-shrink-0" />
            ))}
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {[1, 2].map((section) => (
              <div key={section} className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="h-8 w-48 bg-slate-200 rounded-lg mb-4 animate-pulse" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse" />
                  <div className="h-4 w-4/6 bg-slate-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar (25%) */}
        <div className="w-full lg:w-[25%]">
          <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6">
            {/* Price */}
            <div className="mb-6">
              <div className="h-4 w-20 bg-slate-200 rounded mb-2 animate-pulse" />
              <div className="h-10 w-32 bg-slate-200 rounded-lg animate-pulse" />
            </div>

            {/* Hotel Selector */}
            <div className="mb-6">
              <div className="h-4 w-32 bg-slate-200 rounded mb-2 animate-pulse" />
              <div className="h-12 w-full bg-slate-200 rounded-lg animate-pulse" />
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <div className="h-12 w-full bg-slate-200 rounded-lg animate-pulse" />
              <div className="h-12 w-full bg-slate-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

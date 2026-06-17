import { Skeleton } from '@/components/ui/skeleton'

export function IndexSkeleton() {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Skeleton */}
      <section className="relative min-h-[calc(100svh-72px)] flex flex-col justify-center px-6 md:px-12 py-20 w-full overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 blur-[120px] rounded-full z-0 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 flex flex-col items-start text-left w-full">
            <Skeleton className="w-[260px] h-[34px] rounded-full mb-8 bg-white/10" />

            <div className="w-full mb-8 flex flex-col gap-3">
              <Skeleton className="w-[90%] md:w-[80%] h-14 md:h-16 lg:h-24 bg-white/10" />
              <Skeleton className="w-[70%] md:w-[60%] h-14 md:h-16 lg:h-24 bg-white/10" />
            </div>

            <Skeleton className="w-full max-w-2xl h-20 md:h-24 mb-10 bg-white/10" />

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Skeleton className="w-full sm:w-[220px] h-[56px] bg-white/20 rounded-none" />
              <Skeleton className="w-full sm:w-[200px] h-[56px] bg-white/5 rounded-none border border-white/10" />
            </div>
          </div>

          <div className="w-full lg:w-[400px] flex flex-col gap-4">
            <Skeleton className="w-full h-[134px] bg-black/40 border border-white/10 rounded-none" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="w-full h-[118px] bg-black/40 border border-white/10 rounded-none" />
              <Skeleton className="w-full h-[118px] bg-black/40 border border-white/10 rounded-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Skeleton */}
      <section className="py-24 md:py-32 px-6 md:px-12 w-full bg-white/5">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16">
            <Skeleton className="w-32 h-4 mb-4 bg-accent/40 rounded-none" />
            <Skeleton className="w-64 md:w-96 h-10 md:h-12 bg-white/10 rounded-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col h-[280px] bg-black/40 border border-white/10 p-8"
              >
                <Skeleton className="w-12 h-6 mb-6 bg-white/10 rounded-none" />
                <Skeleton className="w-48 h-8 mb-4 bg-white/20 rounded-none" />
                <Skeleton className="w-full h-16 mb-8 bg-white/10 rounded-none" />
                <Skeleton className="w-32 h-4 mt-auto bg-white/10 rounded-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Skeleton */}
      <section className="py-24 md:py-32 px-6 md:px-12 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col gap-4 p-8 bg-white/5 border border-white/10 h-[178px]"
              >
                <Skeleton className="w-24 h-12 bg-white/20 rounded-none" />
                <Skeleton className="w-full h-8 mt-auto bg-white/10 rounded-none" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

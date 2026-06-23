
const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CompanySkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 border border-gray-300 p-2 shadow-sm`}
    >
      <a className="border p-2 border-gray-300 hover:border-gray-700">
        <h1>
          <div aria-live="polite" aria-busy="true" className="w-[32px] max-w-full">
            <span className="inline-flex w-full animate-pulse select-none rounded-md bg-gray-300 leading-none">
            </span>
            <br />
          </div>
        </h1>
        <p className="wrap-anywhere tracking-tighter">
          <div aria-live="polite" aria-busy="true" className="w-[264px] max-w-full">
            <span className="inline-flex w-full animate-pulse select-none rounded-md bg-gray-300 leading-none">
            </span>
            <br />
          </div>
        </p>
      </a>
    </div>
  );
}

export function PlatformsSkeleton() {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-1.5">
      {"qwertyuiopasdfghjklzxcvbnm".split('').map( i => <CompanySkeleton key={i} />)}
    </div>
  )
}
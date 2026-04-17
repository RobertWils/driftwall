export default function Loading() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-8">
        <div className="h-4 w-40 rounded skeleton" />
        <div className="mt-5 h-12 w-96 max-w-full rounded skeleton" />
        <div className="mt-4 h-4 w-full max-w-2xl rounded skeleton" />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl skeleton" />
          ))}
        </div>

        <div className="mt-10 h-56 rounded-2xl skeleton" />
        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <div className="h-80 rounded-2xl skeleton lg:col-span-3" />
          <div className="h-80 rounded-2xl skeleton lg:col-span-2" />
        </div>
      </div>
    </section>
  );
}

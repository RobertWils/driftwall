export default function Loading() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-16 sm:px-8">
        <div className="h-4 w-40 rounded skeleton" />
        <div className="mt-5 h-12 w-80 rounded skeleton" />
        <div className="mt-4 h-4 w-96 max-w-full rounded skeleton" />
        <div className="mt-10 h-72 rounded-2xl skeleton" />
      </div>
    </section>
  );
}

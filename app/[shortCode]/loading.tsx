// TODO: Implement a custom gif or loading animation

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center">
        <div className="border-slate-6 border-t-indigo-9 h-12 w-12 animate-spin rounded-full border-4"></div>
        <p className="text-slate-11 mt-4">
          Redirecting you to your destination...
        </p>
      </div>
    </main>
  );
}

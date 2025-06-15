export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-800">
      <div
        className="inline-block h-6 w-6 animate-spin rounded-full border-3 border-solid border-primaryColor border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}

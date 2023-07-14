export const SkeletonLoader = () => {
  return (
    <div className="max-w-5xl w-full mx-auto px-3 mb-3 pt-3">
      <div className="animate-pulse border p-3 rounded-md">
        <div className="bg-slate-200 dark:bg-slate-500 rounded-md h-9 w-1/2"></div>
        <div className="flex items-center gap-2 max-w-60">
          <div className="bg-slate-200 dark:bg-slate-500 rounded-md h-7 w-7 mt-2"></div>
          <div className="bg-slate-200 dark:bg-slate-500 rounded-md h-5 w-44 mt-2"></div>
        </div>
        <div className="mt-2 flex flex-col flex-shrink-0 gap-2 w-full">
          <div className="bg-slate-200 dark:bg-slate-500 w-full h-16 rounded-md"></div>
          <div className="bg-slate-200 dark:bg-slate-500 w-full h-16 rounded-md"></div>
          <div className="bg-slate-200 dark:bg-slate-500 w-full h-16 rounded-md"></div>
          <div className="bg-slate-200 dark:bg-slate-500 w-full h-16 rounded-md"></div>
          <div className="bg-slate-200 dark:bg-slate-500 w-full h-16 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

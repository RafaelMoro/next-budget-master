export const AccountSkeleton = () => {
  return (
    <button className="p-2 rounded-3xl card-gradient-bg flex flex-col justify-between max-w-64 min-w-3xs min-h-40 text-start cursor-pointer">
      <span className="text-lg text-gray-200 bg-slate-500 rounded w-full h-7 animate-pulse"></span>
      <div className="flex flex-col gap-2">
        <h5 className="text-2xl text-gray-200 font-semibold h-8 bg-slate-500 rounded animate-pulse"></h5>
        <div className="flex justify-between mx-2 mb-1 h-8 bg-slate-500 rounded animate-pulse">
          <p className="text-sm text-gray-300 dark:text-gray-400"></p>
          <div className="w-10 h-10"></div>
        </div>
      </div>
    </button>
  )
}
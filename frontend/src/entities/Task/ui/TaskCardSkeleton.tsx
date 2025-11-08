import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function TaskCardSkeleton() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <article className="w-[250px] border text-white bg-[#111318] rounded-[6px] shadow hover:shadow-lg transition duration-300 cursor-pointer hover:scale-[1.05] transition duration-300 border-[#E5E7EB] flex flex-col ">
        <header className="text-xl px-4 py-2 font-bold bg-[#0B0D11] w-full text-center rounded-t-[6px]">
          <Skeleton width={200} />
        </header>
        <section className="flex flex-col p-4 gap-1">
          <p className="truncate"></p><Skeleton width={200} />
          <p className="">
            <span className="text-gray-400">Due:</span> <Skeleton width={100} />
          </p>
          <p className="">
            <span className="text-gray-400">Status:</span>
            <Skeleton width={100} />
          </p>
          <p className="">
            <span className="text-gray-400">Priority:</span>
            <Skeleton width={100} />
          </p>
          <button className="w-full rounded-[6px] border-[1px] cursor-pointer px-[10px] py-[5px] bg-[#E11D48]">
            Start Tracking Pomodoro
          </button>
        </section>
      </article>
    </SkeletonTheme>
  );
}

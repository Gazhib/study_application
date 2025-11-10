export default function TimerDisplay({
  time,
  formatTime,
}: {
  time: number;
  formatTime: (time: number) => string;
}) {
  return (
    <section className="text-white text-[160px] flex justify-center items-center">
      {formatTime(time)}
    </section>
  );
}

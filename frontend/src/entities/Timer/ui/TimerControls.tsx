import ControlButton from "./ControlButton";

export default function TimerControls({
  isActive,
  startTimer,
  stopTimer,
  pauseTimer,
}: {
  isActive?: boolean;
  startTimer?: () => void;
  stopTimer?: () => void;
  pauseTimer?: () => void;
}) {
  return (
    <section className="flex flex-row gap-16 text-white items-center justify-center">
      {!isActive ? (
        <ControlButton onClick={startTimer}>Start</ControlButton>
      ) : (
        <ControlButton onClick={stopTimer}>Stop</ControlButton>
      )}
      <ControlButton onClick={pauseTimer}>Pause</ControlButton>
    </section>
  );
}

export default function Filter({
  options,
  selectedOption,
  onSelect,
}: {
  options?: string[];
  selectedOption?: string;
  onSelect: (option: string) => void;
}) {
  return (
    <article>
      <select
        className="bg-[#151922] text-white border-[1px] border-[#1F2430] rounded-[6px] px-3 py-2"
        value={selectedOption}
        onChange={(e) => onSelect(e.target.value)}
      >
        {options?.map((option, index) => (
          <option key={`${option}-${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </article>
  );
}

export default function AuthInput({
  name,
  type = "text",
  placeholder,
  label,
}: {
  name: string;
  type?: string;
  placeholder?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full">
      <label className="text-[14px]">{label}</label>
      <input
        className="px-[20px] py-[10px] w-[70%] border-[1px] border-gray-300"
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

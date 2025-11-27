interface ElixirProps {
  cost?: number;
}

export default function Elixir({ cost }: Readonly<ElixirProps>) {
  return (
    <div className="flex items-center justify-center w-full h-full bg-purple-500 rounded-[50%_50%_50%_0] transform rotate-[135deg]">
      <p className="rotate-[-135deg] text-white">{cost}</p>
    </div>
  );
}

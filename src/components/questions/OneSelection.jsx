const OneSelection = ({ title, options }) => {
  return (
    <div className="">
      <h1 className="mb-5">{title}</h1>
      <div className="flex flex-col gap-2">
        {options.map((o) => {
          return (
            <p
              className="p-3 bg-sky-800 hover:bg-sky-900 cursor-pointer rounded-2xl transition-all"
              key={o.id}
            >
              {o.text}
            </p>
          );
        })}
      </div>
    </div>
  );
};
export default OneSelection;

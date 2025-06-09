const FloatingButton = ({ action, position, margin, padding, bg, content }) => {
  const locater = position
    .split("-")
    .map((part) => `${part}-${margin}`)
    .join(" ");
  const pad = padding || "p-2";
  const background = bg ? "bg-" + bg + "-500" : "bg-amber-500";
  return (
    <div
      onClick={action}
      className={`fixed ${locater} ${pad} ${background} text-3xl rounded-xl opacity-70 hover:opacity-100 cursor-pointer z-50 transition-all duration-200`}
    >
      {content}
    </div>
  );
};
export default FloatingButton;

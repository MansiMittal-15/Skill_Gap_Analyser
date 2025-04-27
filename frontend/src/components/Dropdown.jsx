import React from "react";

const Dropdown = React.forwardRef(({ items, position }, ref) => {
  return (
    <div
      className="w-56 h-auto m-3 border solid fixed bg-white z-30 border-black rounded-lg "
      style={{ left:position.left, top: position.top}}
      ref={ref}
    >
      {items.map((item) => {
        return (
          <a href="/" key={item}>
            {" "}
            <div className="hover:bg-blue-800 hover:text-white py-3 text-lg px-2">{item}</div>
          </a>
        );
      })}
    </div>
  );
})

export default Dropdown;

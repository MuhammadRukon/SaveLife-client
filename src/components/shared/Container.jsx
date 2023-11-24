const Container = ({ children }) => {
  return (
    <div className="max-w-[1200px] mx-auto xl:px-0 sm:px-4 px-2">
      {children}
    </div>
  );
};

export default Container;

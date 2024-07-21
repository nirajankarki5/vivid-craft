const Loading: React.FC = () => {
  return (
    <div className="flex h-[35px] w-9 items-center justify-between">
      <div className="h-full w-[3px] animate-grow1 bg-[#555]"></div>
      <div className="h-full w-[3px] animate-grow2 bg-[#555]"></div>
      <div className="h-full w-[3px] animate-grow3 bg-[#555]"></div>
      <div className="h-full w-[3px] animate-grow4 bg-[#555]"></div>
    </div>
  );
};

export default Loading;

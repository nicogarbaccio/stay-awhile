import Image from "next/image";

const Categories = () => {
  return (
    <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
      <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
        <Image
          src={"/amazing_views_icon.jpeg"}
          alt="Amazing Views"
          width={20}
          height={20}
        />
        <span className="text-xs">Amazing Views</span>
      </div>
      <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
        <Image
          src={"/beachfront_icon.jpeg"}
          alt="Beachfront"
          width={20}
          height={20}
        />
        <span className="text-xs">Beach</span>
      </div>
      <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
        <Image
          src={"/lakeside_icon.jpeg"}
          alt="Lakeside"
          width={20}
          height={20}
        />
        <span className="text-xs">Lakeside</span>
      </div>
      <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
        <Image src={"/omg_icon.jpeg"} alt="OMG" width={20} height={20} />
        <span className="text-xs">OMG!</span>
      </div>
    </div>
  );
};

export default Categories;

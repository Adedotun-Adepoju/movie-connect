import { ArrowLeft } from "@/components/icons";
import Communities from "@/components/communities";



const page = () => {
  return (
    <main className="font-inter w-full">
      <div className="flex px-4 py-4">
        <ArrowLeft />
        <h1 className="ml-2 font-semibold">Communities</h1>
      </div>
      <Communities />
    </main>
  );
};

export default page;

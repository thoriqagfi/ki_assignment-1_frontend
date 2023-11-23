import withAuth from "@/hoc/withAuth"
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";


export default withAuth(OtherData, 'auth');

function OtherData() {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <div className="mx-auto my-auto w-full min-h-screen flex flex-col border-2 p-4 border-slate-950 gap-4 rounded-lg shadow-2xl">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Hello, {user?.name}</h1>
        <div className="flex gap-5">
          <Link className="bg-green-500 hover:bg-green-600 p-2 rounded-md text-white" href={'/user/other-data'}>
            Files
          </Link>
          <button className="bg-red-500 hover:bg-red-600 p-2 rounded-md text-white">Logout</button>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold py-2">Get Other User Data</h1>
        <div>
          <p>1. Get The Symmetric Key First</p>
        </div>
        <div className="py-3">
          <label htmlFor="label-text" className="text-sm">Input Username to get symmetric key</label>
          <input type="text" id="username" placeholder="type your friend username here..." className="w-full border-2 p-2 rounded-md"/>
        </div>
        <div className="pt-5">
          <p>2. Find Your friend data by input the Encrypted Symmetric Key</p>
        </div>
        <div className="py-3">
          <label htmlFor="label-text" className="text-sm">Input Username to get symmetric key</label>
          <input type="text" id="username" placeholder="type your friend symmetric key here..." className="w-full border-2 p-2 rounded-md"/>
        </div>

        <div className="pt-5">
          <h1 className="text-xl font-semibold">Your Friend Private Data</h1>
        </div>
      </div>
    </div>
    )
  }
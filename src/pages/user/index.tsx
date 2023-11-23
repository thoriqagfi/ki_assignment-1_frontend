import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import withAuth from "@/hoc/withAuth";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";

export type User = {
  id: string,
  username: string,
  password: string,
  username_aes: string,
  password_aes: string,
  files: File[]
}

export default withAuth(User, 'auth');
function User() {
  // Check if user is logeed in or not
  // If not, redirect to login page
  // If yes, display user page
  const [userFiles, setUserFiles] = useState<any>(null); // File[]
  const router = useRouter();
  const { user_id } = router.query;

  const { user, isLoading, logout } = useAuthStore();

  // Upload file function
  const uploadFile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById('file') as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      formData.append('file', fileInput.files[0]);
      formData.append('name', (document.getElementById('name') as HTMLInputElement).value);
      formData.append('user_id', (document.getElementById('user_id') as HTMLInputElement).value);

      axios.post("http://localhost:8080/file/upload", formData)
        .then((res) => {
          // Refresh
          router.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <main className="">
      <div className="mx-auto my-auto w-full min-h-screen flex flex-col border-2 p-4 border-slate-950 gap-4 rounded-lg shadow-2xl">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Hello, {user?.name}</h1>
          <div className="flex gap-5">
            <Link className="bg-green-500 hover:bg-green-600 p-2 rounded-md text-white" href={'/user/other-data'}>
              Get Other User Data
            </Link>
            <button className="bg-red-500 hover:bg-red-600 p-2 rounded-md text-white">Logout</button>
          </div>
        </div>
        <div>
          <form encType="multipart/form-data" onSubmit={uploadFile} className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="text" className="text-sm">Nama File</label>
              <input type="text" name="name" id="name" className="border rounded-md py-2 px-4" />
            </div>
            <input type="text" hidden name="user_id" id="user_id" value={user_id}/>
            <input type="file" name="file" id="file" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white">Submit</button>
          </form>
        </div>

        {/* Table files */}
        <table className="px-5 py-5">
          <thead className="border rounded-md bg-sky-900 text-white">
            <tr className="">
              <th>ID</th>
              <th>Nama File</th>
              <th>Tanggal Upload</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="border">
            {userFiles?.map((file: any) => {
              return (
                <tr key={file?.id} className="border">
                  <td className="px-5">{file?.id}</td>
                  <td>{file?.name}</td>
                  <td className="text-center">{file?.created_at}</td>
                  <td className="flex gap-x-3 justify-center">
                    <button className="bg-green-500 hover:bg-green-600 p-2 rounded-md text-white">Detail</button>
                    <button className="bg-red-500 hover:bg-red-600 p-2 rounded-md text-white">Hapus</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main >
  )
}

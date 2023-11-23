import { Open_Sans } from 'next/font/google'
import axios from 'axios'
import { useState } from 'react';
import { useRouter } from 'next/router';
import apiMock from '@/lib/axios-mock';
import useAuthStore from '@/store/useAuthStore';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

const open_sans = Open_Sans({ subsets: ['latin'] })

export default function Home() {
  interface user {
    name: string,
    username: string,
    password: string,
    number: string,
    id_card: File | null,
    cv: File | null,
  };

  let initialState: user = {
    name: "",
    username: "",
    password: "",
    number: "",
    id_card: null,
    cv: null,
  };

  const router = useRouter();

  const [userForm, setUser] = useState<user>(initialState);
  const { user, login } = useAuthStore();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("http://localhost:8080/user/register", user)
      .then((res) => {
        console.log(res.data)
        res.data.success = true;
        const userID = res.data.id;

        router.push(`/user?user_id=${userID}`)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // Upload file function
  const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    // File id_card
    const fileInput = document.getElementById('id_card') as HTMLInputElement;
    // File cv
    const fileInput2 = document.getElementById('cv') as HTMLInputElement;


    if (fileInput.files && fileInput.files[0] && fileInput2.files && fileInput2.files[0]) {
      console.log(fileInput.files[0])
      console.log(fileInput2.files[0])
      formData.append('ID_Card', fileInput.files[0]);
      formData.append('CV', fileInput2.files[0]);
      formData.append('Username', (document.getElementById('username') as HTMLInputElement).value);
      formData.append('Name', (document.getElementById('name') as HTMLInputElement).value);
      formData.append('Number', (document.getElementById('number') as HTMLInputElement).value);
      formData.append('Password', (document.getElementById('password') as HTMLInputElement).value);

      apiMock.post("http://localhost:8080/user/register", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          console.log(res.data)
          res.data.success = true;
          const userID = res.data.id;
          router.push(`/login`)
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  }

  return (
    <main className={`flex w-screen h-screen justify-center ${open_sans.className}`}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="mx-auto my-auto w-fit h-fit flex flex-col border-2 p-4 border-slate-950 gap-4 rounded-lg shadow-2xl">
        <h1 className="font-bold text-2xl">Register Page</h1>
        <form name="login-form" method="POST" className="flex flex-col gap-2" onSubmit={uploadFile} encType='multipart/form-data'>
        <div>
            <label id="label-text">Name</label>
            <input id="name" type="text" name="name" placeholder="type name here..." onChange={onChangeHandler} value={userForm.name} className="w-full border-2 p-2 rounded-md"></input>
          </div>
          <div>
            <label id="label-text">Username</label>
            <input id="username" type="text" name="username" placeholder="type username here..." onChange={onChangeHandler} value={userForm.username} className="w-full border-2 p-2 rounded-md"></input>
          </div>
          <div>
            <label id="label-text">Password</label>
            <input id="password" type="text" name="password" placeholder="type password here..." onChange={onChangeHandler} value={userForm.password} className="w-full border-2 p-2 rounded-md"></input>
          </div>
          <div>
            <label id="label-text">Phone Number</label>
            <input id="number" type="text" name="number" placeholder="type phone number here..." onChange={onChangeHandler} value={userForm.number} className="w-full border-2 p-2 rounded-md"></input>
          </div>
          <div className='flex flex-col'>
            <label id="label-text">CV</label>
            <input type="file" name="cv" id="cv" required/>
          </div>
          <div className='flex flex-col'>
            <label id="label-text">ID Card</label>
            <input type="file" name="id_card" id="id_card" required />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white">Submit</button>
        </form>
        <p>Already have account? <Link href={'/login'}>Login here!</Link></p>
      </div>
    </main >
  )
}

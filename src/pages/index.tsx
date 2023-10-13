import { Open_Sans } from 'next/font/google'
import axios from 'axios'
import { useState } from 'react';

const open_sans = Open_Sans({ subsets: ['latin'] })

export default function Home() {
  interface user {
    username: string,
    password: string
  };

  let initialState: user = {
    username: "",
    password: ""
  };

  const [user, setUser] = useState<user>(initialState);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("http://localhost:8080/user/register", user)
      .then((res) => {
        console.log(res.data);
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

  return (
    <main className={`flex w-screen h-screen justify-center ${open_sans.className}`}>
      <div className="mx-auto my-auto w-fit h-fit flex flex-col border-2 p-4 border-slate-950 gap-4 rounded-lg shadow-2xl">
        <h1 className="font-bold text-2xl">Login</h1>
        <form name="login-form" method="POST" className="flex flex-col gap-2" onSubmit={submitForm}>
          <div>
            <label id="label-text">Username</label>
            <input id="name" type="text" name="username" placeholder="type username here..." onChange={onChangeHandler} value={user.username} className="w-full border-2 p-2 rounded-md"></input>
          </div>
          <div>
            <label id="label-text">Password</label>
            <input id="pass" type="text" name="password" placeholder="type password here..." onChange={onChangeHandler} value={user.password} className="w-full border-2 p-2 rounded-md"></input>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white">Submit</button>
        </form>
      </div>
    </main >
  )
}

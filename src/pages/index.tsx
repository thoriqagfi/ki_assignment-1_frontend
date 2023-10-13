import { Open_Sans } from 'next/font/google'

const open_sans = Open_Sans({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`flex w-screen h-screen justify-center ${open_sans.className}`}>
      <div className="mx-auto my-auto w-fit h-fit flex flex-col border-2 p-4 border-slate-950 gap-4 rounded-lg shadow-2xl">
        <h1 className="font-bold text-2xl">Login</h1>
        <form name="login-form" method="POST" className="flex flex-col gap-2">
          <div>
            <label id="label-text">Username</label>
            <input id="name" type="text" name="nama" placeholder="type username here..." className="w-full border-2 p-2 rounded-md"></input>
          </div>
          <div>
            <label id="label-text">Password</label>
            <input id="pass" type="text" name="password" placeholder="type password here..." className="w-full border-2 p-2 rounded-md"></input>
          </div>
        </form>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white">Submit</button>
      </div>
    </main >
  )
}

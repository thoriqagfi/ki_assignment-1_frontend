import apiMock from "@/lib/axios-mock";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    formData.append('username', username.value);
    formData.append('password', password.value);

    apiMock.post("http://localhost:8080/user/login", formData)
      .then(async (res) => {
        console.log(res.data)
        res.data.success = true;
        const userID = res.data.id;
        await login(res.data);

        apiMock.get(`http://localhost:8080/user/me}`, {
          headers: {
            'Authorization': `Bearer ${res.data.token}`
          }
        })
          .then(async (res) => {
            console.log(res.data)
            await login(res.data);

            router.push(`/user?user_id=${userID}`)
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          })
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
  }
  return (
    <main className={`flex w-screen h-screen justify-center`}>
      <div className="mx-auto my-auto w-fit h-fit flex flex-col border-2 p-4 border-slate-950 gap-4 rounded-lg shadow-2xl">
        <h1>Login Page</h1>
        <form name="login-form" method="POST" className="flex flex-col gap-2" onSubmit={onSubmit}>
        <div>
            <label id="label-text">Username</label>
            <input id="username" type="text" name="username" placeholder="type username here..." className="w-full border-2 p-2 rounded-md"></input>
          </div>
          <div>
            <label id="label-text">Name</label>
            <input id="password" type="password" name="password" placeholder="type password here..." className="w-full border-2 p-2 rounded-md"></input>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white">Login</button>
        </form>
      </div>
    </main>
  )
}
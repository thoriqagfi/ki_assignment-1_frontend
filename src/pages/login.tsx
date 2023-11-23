import apiMock from "@/lib/axios-mock";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { ToastBar, Toaster } from "react-hot-toast";


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

    apiMock.post("/user/login", formData)
      .then(async (res) => {
        console.log(res.data.token)
        res.data.success = true;
        localStorage.setItem('token', res.data.token);
        const token = res.data.token;
        toast.loading("Loading...");
        await apiMock.get(`/user/decrypted/me`, {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          }
        })
        .then(async (res) => {
          console.log(res.data)
          await login({
            "id": res.data.id,
            "username": res.data.username_aes,
            "name": res.data.name_aes,
            "email": res.data.email_aes,
            "number": res.data.number_aes,
            "password": res.data.password_aes,
            "secret": res.data.secret,
            "secret8byte": res.data.secret_key_8_byte,
            "iv": res.data.iv,
            "iv8byte": res.data.iv_8_byte,
            "cv": res.data.cv_aes,
            "id_card": res.data.id_card_aes,
            "token": token,
          });
          toast.success("Login success!");
          router.push(`/user`)
          })
          .catch((error) => {
            toast.error("Cannot get data user!");
            console.log(error)
          })
      })
      .catch((error) => {
        toast.error("Username or password is incorrect!");
      })
  }
  return (
    <main className={`flex w-screen h-screen justify-center`}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="mx-auto my-auto w-fit h-fit flex flex-col border-2 p-4 border-slate-950 gap-4 rounded-lg shadow-2xl">
        <h1>Login Page</h1>
        <form name="login-form" method="POST" className="flex flex-col gap-2" onSubmit={onSubmit}>
        <div>
            <label id="label-text">Username</label>
            <input id="username" type="text" name="username" placeholder="type username here..." className="w-full border-2 p-2 rounded-md"></input>
          </div>
          <div>
            <label id="label-text">Password</label>
            <input id="password" type="password" name="password" placeholder="type password here..." className="w-full border-2 p-2 rounded-md"></input>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white">Login</button>
          <p>Do not have an account? <Link href={'/'}>Sign up here!</Link></p>
        </form>
      </div>
    </main>
  )
}
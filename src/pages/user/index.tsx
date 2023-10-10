export default function User() {
  return (
    <main className="flex w-screen h-screen justify-center">
      <div className="mx-auto my-auto w-fit h-fit flex flex-col border-2 p-4 border-slate-950 gap-4 rounded-lg shadow-2xl">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Hello, user!</h1>
          <p className="my-auto">This should be on the right</p>
        </div>
      </div>
    </main >
  )
}


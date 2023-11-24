import withAuth from "@/hoc/withAuth"
import apiMock from "@/lib/axios-mock";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import React from "react";


export default withAuth(OtherData, 'auth');

function OtherData() {
  const { user } = useAuthStore();
  const [symmetricKey, setSymmetricKey] = React.useState();
  const [IV, setIV] = React.useState();

  const otherData: any[] = []

  const onSubmitSymmetricKey = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const username = document.getElementById('username') as HTMLInputElement;

    formData.append('username', username.value);

    apiMock.get(`/user/symmetric?username=${username.value}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      }
    })
    .then((res) => {
      console.log(res.data)
      setSymmetricKey(res.data.encrypted_secret_key)
      setIV(res.data.encrypted_iv)
    })
  }

  const onSubmitGetPrivateData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const username = document.getElementById('username') as HTMLInputElement;
    const encrypted_secret_key = document.getElementById('encrypted_secret_key') as HTMLInputElement;
    const encrypted_iv_key = document.getElementById('encrypted_iv_key') as HTMLInputElement;

    formData.append('username', username.value);
    formData.append('encrypted_secret_key', encrypted_secret_key.value);
    formData.append('encrypted_iv_key', encrypted_iv_key.value);

    apiMock.get(`/user/get-private-data`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      data: formData,
    })
    .then((res) => {
      console.log(res.data)
      otherData.push(res.data)
    })
  }
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
          <form action="" method="get" onSubmit={onSubmitSymmetricKey}>
            <label htmlFor="label-text" className="text-sm">Input Username to get symmetric key</label>
            <input type="text" id="username" placeholder="type your friend username here..." className="w-full border-2 p-2 rounded-md"/>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white">Find</button>
          </form>
        </div>
        <div className="py-2">
          {
            symmetricKey && IV ? (
              <div className="flex flex-col gap-2">
                <p className="break-all">Symmetric Key: {symmetricKey}</p>
                <p className="break-all">IV: {IV}</p>
              </div>
            ) : (
              <p className="text-red-500">Input username first to get symmetric key</p>
            )
          }
        </div>
        <div className="pt-5">
          <p>2. Find Your friend data by input the Encrypted Symmetric Key</p>
        </div>
        <div className="py-3">
          <form action="" method="get" onSubmit={onSubmitGetPrivateData}>
            <label htmlFor="label-text" className="text-sm">Input Username</label>
            <input type="text" id="username" placeholder="type your friend Username key here..." className="w-full border-2 p-2 rounded-md"/>
            <label htmlFor="label-text" className="text-sm">Input Encrypted Secret Key</label>
            <input type="text" id="encrypted_secret_key" placeholder="type your friend SECRET KEY key here..." className="w-full border-2 p-2 rounded-md"/>
            <label htmlFor="label-text" className="text-sm">Input Encrypted IV</label>
            <input type="text" id="encrypted_iv_key" placeholder="type your friend IV key here..." className="w-full border-2 p-2 rounded-md"/>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white">Find</button>
          </form>
        </div>

        <div className="pt-5">
          <h1 className="text-xl font-semibold">Your Friend Private Data :</h1>
        </div>
        <div className="pt-2">
          {
            otherData.length > 0 ? (
              <div className="flex flex-col gap-2">
                <p>Username: {otherData[0].username_aes}</p>
                <p>Name: {otherData[0].name_aes}</p>
                <p>Email: {otherData[0].email_aes}</p>
                <p>Number: {otherData[0].number_aes}</p>
                <p>Password: {otherData[0].password_aes}</p>
                <p>Secret: {otherData[0].secret}</p>
                <p>Secret Key 8 Byte: {otherData[0].secret_key_8_byte}</p>
                <p>IV: {otherData[0].iv}</p>
                <p>IV 8 Byte: {otherData[0].iv_8_byte}</p>
                <p>CV: {otherData[0].cv_aes}</p>
                <p>ID Card: {otherData[0].id_card_aes}</p>
              </div>
            ) : (
              <p className="text-red-500">Input username first to get symmetric key</p>
            )
          }
        </div>
      </div>
    </div>
    )
  }
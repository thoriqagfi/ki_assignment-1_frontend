import withAuth from "@/hoc/withAuth";
import axios from "axios";
import { useRouter } from "next/router"
import { useState } from "react";

function FileContent() {
  const [userFiles, setUserFiles] = useState<any>(null); // File

  const router = useRouter();
  const { file_id } = router.query;
  const { user_id } = router.query;

  // Get the file by user id
  axios.get(`http://localhost:8080/file/user?user_id=${user_id}`).then((res) => {
    setUserFiles(res.data);
  }).catch((error) => {
    console.log(error);
  });

  return (
    <>
      <div className=""></div>
    </>
  )
}

export default withAuth(FileContent, 'auth');
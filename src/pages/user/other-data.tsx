import withAuth from "@/hoc/withAuth"


export default withAuth(OtherData, 'auth');

function OtherData() {
    return (
        <div>
            <h1>Other Data</h1>
        </div>
    )
}
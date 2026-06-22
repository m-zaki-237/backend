import axios from "axios"
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)
        axios.post("http://localhost:3000/create-post",formData)
        .then(()=>{
            navigate('/')
            
        })
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <section className="flex flex-col items-center justify-center gap-6 bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-neutral-900">Create Post</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4 w-full">
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full text-sm text-neutral-600 border border-neutral-300 rounded-lg p-2 cursor-pointer file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-neutral-900 file:text-white file:text-sm"
          />
          <input
            type="text"
            name="Caption"
            placeholder="Write a caption..."
            required
            className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-neutral-900 text-white text-sm font-medium py-2.5 hover:bg-neutral-800"
          >
            Share post
          </button>
        </form>
      </section>
    </div>
  )
}

export default CreatePost
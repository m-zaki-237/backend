import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
const Feed = () => {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:3000/posts")
    .then((res)=>{
        setPosts(res.data.posts)
        
    })
  },[])
  return (
    <div>
      <Link
        to="/create-post"
        className="fixed bottom-6 right-6 px-4 py-2  rounded bg-neutral-900 text-white text-2xl flex items-center justify-center shadow-lg hover:bg-neutral-800"
      >
        Add+
      </Link>

      <section className="max-w-md mx-auto flex flex-col gap-6 py-8 px-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden"
            >
              <img
                src={post.image}
                className="w-full h-64 object-contain"
              />
              <p className="px-4 py-3 text-sm text-neutral-800">
                {post.caption}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-neutral-500">
            No posts yet.
          </p>
        )}
      </section>
    </div>
  )
}

export default Feed
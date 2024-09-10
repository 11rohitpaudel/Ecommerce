import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Ipost {
    userId: number,
    id: number,
    title: string,
    body: string,
}

const Post = () => {
    const [Post, setPost] = useState<Ipost[]>([])

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/posts');
                const Post = await res.json();
                setPost(Post)
            } catch (error: any) {
                console.log(error)
            }
        }
        getPost();
    }, [])

    console.log(Post)
    return (
        <div className="grid grid-cols-4 gap-10 p-10">
          {
        Post.map((Post) => (
          <div key={Post.id} className="border p-5 rounded-lg space-y-5">
            <div className="flex items-center justify-center">
              
            </div>
            <div className="border-t mt-2">
              <p className="font-bold capitalize">{Post.userId}</p>
              <p className="line-clamp-1">{Post.title}</p>
             
              <p className="line-clamp-2">{Post.body}</p>
            </div>
            <div>
              <Link className="bg-red-500 text-white px-4 py-2 rounded-lg " to={`/Post/${Post.id}`}>
                View Details
              </Link>
            </div>
          </div>
        ))
      }
        </div>
    )
}

export default Post

import { useEffect, useState } from "react"
import { API_URL } from "../../constants"

interface PostItem {
  id: number,
  title: string,
  body: string
}

function PostsList() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [, setLoading] = useState<boolean>(true);
  const [, setError] = useState<null | string>(null);
  
  // Fetch posts from api
  useEffect(() => {
    async function loadPosts() {
        fetch(`${API_URL}/posts`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json()
        })
        .then(json => {
          setPosts(json)   
        })
        .catch(e => {
          setError("An error occured. Awkward...");
          console.log("An error occured:", e);  
        })
        .finally(() => {
          setLoading(false); 
        })
    }

    loadPosts();
  }, [])
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="post-container">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default PostsList
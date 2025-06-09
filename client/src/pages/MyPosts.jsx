import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/posts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, [token]);

  const handlePostClick = (id) => {
    navigate(`/posts/${id}`);
  };

  const handleCreateNew = () => {
    navigate('/createpost');  
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-[120px] pb-10">

      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 text-white">📝 Welcome to Daily Blogs</h1>
        <p className="text-gray-300 text-lg">Catch up on your newest posts, thoughts, and stories!</p>
      </div>

      
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-white">📌 My Blogs</h2>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          
          <div
            onClick={handleCreateNew}
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl cursor-pointer text-gray-400 hover:border-violet-500 hover:text-violet-500 transition select-none"
            style={{ minHeight: '300px' }}  
          >
            <span className="text-6xl font-bold mb-2">+</span>
            <p className="text-xl font-semibold">Create New Blogs</p>
          </div>

          
          {posts.map((post) => (
            <div
              key={post._id}
              onClick={() => handlePostClick(post._id)}
              className="bg-[#1e1e1e] rounded-xl shadow-md overflow-hidden border border-gray-800 cursor-pointer hover:shadow-lg transition-shadow"
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.content}</p>
                <p className="text-gray-500 text-sm">
                  Created: {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;

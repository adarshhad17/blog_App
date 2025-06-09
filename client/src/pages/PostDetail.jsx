import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message || 'Error fetching post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, token]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.msg || 'Delete failed');
        return;
      }
      setDeleteMessage('Post deleted successfully');
      setTimeout(() => navigate('/myposts'), 1000);
    } catch (err) {
      alert('Server error');
    }
  };

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!post) return <p className="text-gray-400 text-center mt-10">Post not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#1e1e1e] rounded-lg mt-40 mb-20 text-white">
      <button
        onClick={() => navigate('/myposts')}
        className="mb-6 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded text-sm font-medium transition"
      >
        ← Back to Blogs
      </button>

      {deleteMessage && (
        <p className="text-green-500 text-center mt-4">{deleteMessage}</p>
      )}

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full max-h-[400px] object-contain rounded-md mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-400 mb-6 whitespace-pre-line">{post.content}</p>
      <p className="text-gray-500 text-sm mb-8">
        Created on: {new Date(post.createdAt).toLocaleString()}
      </p>

      <div className="flex justify-center gap-4 mt-6">
        <Link
          to={`/edit/${post._id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium transition w-24 text-center"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-sm font-medium transition w-24"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostDetail;

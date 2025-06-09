import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); 
  const [existingImageUrl, setExistingImageUrl] = useState(''); 
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setTitle(data.title);
          setContent(data.content);
          setExistingImageUrl(data.imageUrl || '');
        } else {
          setMessage(data.msg || 'Failed to load post data');
        }
      } catch (err) {
        setMessage('Server error. Please try again later.');
      }
    };

    fetchPost();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (!token) {
      setMessage(' You must be logged in to edit a post.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Post updated successfully!');
        navigate('/myposts');  
      } else {
        setMessage(data.msg || ' Failed to update post');
      }
    } catch (error) {
      setMessage(' Server error, please try again later.');
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 900,          
        marginTop: 120,         
        marginBottom: 80, 
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'white',
        backgroundColor: '#111',
        padding: 30,           
        borderRadius: 8,
      }}
    >
      <h2 className="text-3xl font-bold mb-6">Edit Post</h2>  

      {message && (
        <p
          style={{
            color: message.startsWith('') ? 'red' : 'lightgreen',
            marginBottom: 20,
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 'bold' }}>Title:</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '1px solid #444',
              backgroundColor: '#222',
              color: 'white',
              fontSize: 16,
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 'bold' }}>Content:</label>
          <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={loading}
            rows={6}
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '1px solid #444',
              backgroundColor: '#222',
              color: 'white',
              fontSize: 16,
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 'bold' }}>Image:</label>
          <br />
          {existingImageUrl ? (
            <img
              src={existingImageUrl}
              alt="Current Post"
              style={{
                maxWidth: '100%',
                maxHeight: 300,       
                marginBottom: 12,
                borderRadius: 8,
              }}
            />
          ) : (
            <p style={{ marginTop: 8 }}>No image uploaded</p>
          )}
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 'bold' }}>Change Image (optional):</label>
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: 16,
            borderRadius: 10,
            backgroundColor: '#4f46e5',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
};

export default EditPost;

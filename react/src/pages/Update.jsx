import React, { useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const Update = () => {

    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: "",
    });
    const [cover, setCover] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const id = location.pathname.split("/")[2];

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8000/books/" + id, book);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <div className="form">
        <h1>Update New Book</h1>
        <input type="text" placeholder='title' onChange={handleChange} name='title' />
        <input type="text" placeholder='desc' onChange={handleChange} name='desc' />
        <input type="text" placeholder='price' onChange={handleChange} name='price' />
        <input type="file" placeholder='cover' onChange={(e) => setCover(e.target.files[0])} name='cover' />
        <button className='formButton' onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update

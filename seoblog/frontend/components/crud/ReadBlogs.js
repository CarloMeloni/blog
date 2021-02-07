import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';

const ReadBlogs = () => {
    return (
        <>
            <p>Aggiorna o rimuovi un articolo</p>
        </>
    )
};

export default ReadBlogs;
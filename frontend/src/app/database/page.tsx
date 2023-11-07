'use client'

import React, { useEffect, useState } from 'react';

export default function databaseCRUD() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:3333/users')
             .then(response => response.json())
            .then(data => {
                 setUsers(data);
             })
    }, []);

    return (
        <div className='block text-center font-bold text-white'>
            <h1>Database CRUD Operations</h1>
            <div className='grid grid-cols-1 mt-[10vh]'>
                <div className='col-span-1'>
                    <h2>CREATE</h2>
                    <p>Insert data into database</p>
                </div>
                <div className='col-span-1 mt-10'>
                    <h2>READ</h2>
                    <p>Read data from database</p>
                </div>
                <div className='col-span-1 mt-10'>
                    <h2>UPDATE</h2>
                    <p>Update data from database</p>
                </div>
                <div className='col-span-1 mt-10'>
                    <h2>DELETE</h2>
                    <p>Delete data from database</p>
                </div>
            </div>
            <div className='mt-10'>
                <h3 className='text-xl font-bold mb-4'>Todos os emails já cadastrados</h3>
                <ul className=''>
                    {users.map((user, index) => (
                    <li key={index} className='mb-2'>{user.email}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
'use client'

import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';

export default function databaseCRUD() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:3334/users')
             .then(response => response.json())
            .then(data => {
                 setUsers(data);
             })
    }, []);

    return (
        <>
            <Header />
            <div className='block text-center font-bold text-white'>
                <div className='mt-10'>
                    <h3 className='text-xl font-bold mb-4'>Todos os emails já cadastrados</h3>
                    <ul className='list-none py-8 px-[20vh]'>
                        {Array.isArray(users) && users.map((user, index) => (
                            <li key={index} className='mb-2 p-2 border rounded-md hover:bg-gray-100 transition-colors'>
                            <span className='text-blue-500 font-bold'>{user.email}</span>
                            </li>
                        ))}
                    </ul>
                    <span>Quantidade de e-mails cadastrados: {users.length}</span>
                </div>
            </div>
        </>
    )
}
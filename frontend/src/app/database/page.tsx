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
                    <ul className=''>
                        {Array.isArray(users) && users.map((user, index) => (
                            <li key={index} className='mb-2'>{user.email}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
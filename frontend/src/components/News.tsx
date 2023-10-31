import { useState } from 'react';
import Image from 'next/image';
import { api } from '@/lib/api';
import { randomUUID } from 'crypto';

export default function News() {
    const [email, setEmail] = useState('');

    const handleRegister = async () => {
        try {
            await api.post('/user', {
                uuid: randomUUID,
                email,
            });
            alert('Usuário cadastrado com sucesso.');
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar usuário.');
        }
    };

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    return (
        <div className='text-center'>
            <div className='mt-[15vh]'>
                <div className='mx-auto mb-12'>
                    <Image
                        height={100}
                        width={100}
                        src='/6062646.png'
                        alt='foto'
                        className='m-auto'
                        objectFit="contain"
                    />
                </div>
                <div className='mx-auto text-white text-2xl md:text-4xl mb-8'>
                    Notícias de tecnologia para todos os dias no seu e-mail.
                </div>
                <input
                    type="text"
                    className='mb-8 py-2 px-4 w-1/2 rounded focus:outline-none focus:ring focus:ring-blue-300'
                    placeholder='Digite seu melhor e-mail'
                    value={email}
                    onChange={handleEmailChange}
                />
                <br />
                <button
                    className="bg-blue-500 p-4 rounded text-white font-bold text-lg md:text-2xl hover:bg-blue-600 hover:underline"
                    type="button"
                    onClick={handleRegister}
                >
                    Inscreva-se (Grátis)
                </button>
            </div>
        </div>
    );
}

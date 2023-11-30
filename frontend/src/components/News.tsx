'use client'

import { useState } from 'react';
import Image from 'next/image';
import { TypeAnimation  } from 'react-type-animation';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function News() {
    const [email, setEmail] = useState('');

    const router = useRouter();

    async function handleRegister() {
        try {
            await api.post('/users-post', {
                uuid: crypto.randomUUID(),
                email,
            });
            router.push('/thanks')
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar seu e-mail.');
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
                <div className='text-white text-center'>
                <TypeAnimation
                    sequence={[
                        '',
                        500,
                        'Noticias de tecnologia',
                        1000,
                        'Para quem não tem tempo de ler notícias',
                        1000, 
                        'Todos os dias no seu e-mail',
                        1000,
                    ]}
                    wrapper="span"
                    speed={10}
                    repeat={Infinity}
                    className='xl:text-5xl md:text-4xl sm:text-3xl text-2xl'
                        />
                </div>
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

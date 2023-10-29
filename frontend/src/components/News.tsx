import Image from 'next/image'
import Link from 'next/link'

export default function News() {
    return (
        <div className='text-center'>
            <div className='mt-[15vh]'>
                <div className='mx-auto mb-12'>
                    <Image
                        height={100}
                        width={100}
                        src='/6062646.png'
                        alt='foto'
                        className='m-auto' // Adicionado layout responsivo
                        objectFit="contain" // Ajusta a imagem ao espaço disponível
                    />
                </div>
                <div className='mx-auto text-white text-2xl md:text-4xl mb-8'>
                    Notícias de tecnologia para todos os dias no seu e-mail.
                </div>
                <input
                    type="text"
                    className='mb-8 py-2 px-4 w-1/2 rounded focus:outline-none focus:ring focus:ring-blue-300'
                    placeholder='Digite seu melhor e-mail'
                />
                <br />
                <button
                    className="bg-blue-500 p-4 rounded text-white font-bold text-lg md:text-2xl hover:bg-blue-600 hover:underline"
                    type="submit">
                    <Link href={'/thanks'}>
                        Inscreva-se (Grátis)
                    </Link>
                </button>
            </div>
        </div>
    )
}

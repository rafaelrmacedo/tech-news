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
                        className='m-auto'
                    />
                </div>
                <div className='mx-auto text-white text-4xl mb-12'>
                    Notícias de Tecnologia para quem não tem tempo de ler notícias.
                </div>
                <input type="text"
                    className='mb-12 py-2 px-4 w-1/3 rounded focus:outline-none focus:ring focus:ring-violet-300'
                    placeholder='Digite seu melhor e-mail'
                />
                <br />
                <button
                    className="bg-purple-500 p-4 rounded text-white font-bold text-2xl hover:bg-purple-600 hover:underline"
                    type="submit">
                    <Link href={'/thanks'}>
                        Inscreva-se (Grátis)
                    </Link>
                </button>
            </div>
        </div>
    )
}

import Image from 'next/image'
import Header from './Header'
import Footer from './Footer'

export default function Thanks() {
    return (    
        <>
            <Header />
            <div className='mt-[20vh] text-center'>
                <Image
                    alt='logo'
                    className='m-auto mb-12'
                    width={200}
                    height={200}
                    src='/verified.png'
                />
                <span className='m-auto text-6xl text-white'>
                    Obrigado por se inscrever.
                </span>
            </div>
            <Footer />
        </>
    )
};
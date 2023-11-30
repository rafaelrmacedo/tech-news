'use client'

import React from 'react';
import { api } from '@/lib/api';
import MDEditor from '@uiw/react-md-editor';
import Header from '@/components/Header';

export default function SendPage() {
    const [value, setValue] = React.useState("");

    async function handleSendEmails() {
        try {
            await api.post('/send-emails', {
                content: value
            });
            alert('Emails sent successfully!');
        } catch (error) {   
            console.error('Error sending emails:', error);
            alert('Error sending emails.');
        }
    };

    return (
        <>
            <Header />
            <div className='text-center'>
                <div className='mt-[15vh] mx-[10vh]'>
                    <MDEditor
                        value={value}
                        onChange={setValue}
                    />
                    <button
                        className="bg-blue-500 mt-10 p-4 rounded text-white font-bold text-lg md:text-2xl hover:bg-blue-600 hover:underline"
                        type="button"
                        onClick={handleSendEmails}
                    >
                        Send Emails
                    </button>
                </div>
            </div>
        </>
    );
}

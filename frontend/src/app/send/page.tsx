'use client'

import { useState } from 'react';
import React from 'react';
import { api } from '@/lib/api';
import MDEditor from '@uiw/react-md-editor';

export default function SendPage() {
    const [value, setValue] = React.useState("");

    return (
        <div className='text-center'>
            <div className='mt-[15vh]'>
                <MDEditor
                    value={value}
                    onChange={setValue}

                />
            </div>
        </div>
    );
}

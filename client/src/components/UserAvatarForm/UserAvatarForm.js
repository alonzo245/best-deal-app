import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/state/AuthState'
import { client } from '../../Utils/Client'
import './UserAvatarForm.scss'
import { GlobalContext } from '../../context/state/GlobalState'

export const UserAvatarForm = () => {
    const { activeCustomer, updateCustomer, errorHandler } = useContext(AuthContext)
    const [file, setFile] = useState('');
    // const [filename, setFilename] = useState('Choose File');
    // const [uploadedFile, setUploadedFile] = useState({});
    // const [message, setMessage] = useState('');
    // const [uploadPercentage, setUploadPercentage] = useState(0)
    const { activateAlertTop } = useContext(GlobalContext)

    if (!activeCustomer) return <Redirect to="/" />

    const onChange = e => {
        setFile(e.target.files[0]);
        // setFilename(e.target.files[0].name);
    };

    const onSubmit = async e => {
        e.preventDefault()
        const lsCustomer = JSON.parse(localStorage.getItem('customer'))
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await client.post('/customer/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: "Bearer " + lsCustomer.accessToken
                }
            });

            localStorage.setItem('customer', JSON.stringify({ ...lsCustomer, avatar: res.data.avatar }))
            activateAlertTop({ title: 'Image Uploaded', color: 'green' })
            updateCustomer({ ...activeCustomer, avatar: res.data.avatar })
        } catch (error) {
            activateAlertTop(errorHandler(error))
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="upload-btn-wrapper">

                <div className="upload-file-btn-wrapper">
                    <div>Select Image</div>
                    <input
                        type='file'
                        className=''
                        id='customFile'
                        onChange={onChange}
                    />
                </div>

                <input
                    type='submit'
                    value='Upload'
                    className='btn btn-primary btn-block mt-4'
                />
            </div>
        </form>
    )
}

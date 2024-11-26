import { useEffect } from 'react';
import Swal from 'sweetalert2';
import error from '../assets/error.png';

export default function Error({message}) {
    useEffect(() => {
        Swal.fire({
        html: `
            <div style="text-align: center; height: 350px;">
            <img src="${error}" alt="Error Icon" style="width: 350px; margin-bottom: 10px; padding-left: 90px;" />
            <h2 style="margin-bottom: 10px; color: #333;">Error</h2>
            <p style="color: #555;">${message}</p>
            </div>
        `,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Ok',
        cancelButtonColor: '#F32D4A',
        width: '400px',
        position: 'center',
        heightAuto: false,
        customClass: {
            cancelButton: 'custom-cancel-button-error',
            popup: 'custom-popup-error',
        },
        });
    }, [message]);
    return null;
}

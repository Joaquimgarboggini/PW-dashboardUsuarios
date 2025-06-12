import { useState } from 'react';
import './UserCard.css';

function UserCard({ user }) {
    const [ModalOpen, setModalOpen] = useState(false);
    const [modalClose, setModalClose] = useState(false);

    const openModal = () => {
        setModalOpen(true);
        setModalClose(false);
    };

    const closeModal = () => {
        setModalClose(true);
        setTimeout(() => setModalOpen(false), 300);
    };

    return (
        <div>
            <div className='user-card' onClick={openModal}>
                <img src={user.avatar} alt={`${user.firstName} avatar`} />
                <h3>{user.firstName} {user.lastName}</h3>
                <p>{user.email}</p>
                <small>{user.address}</small>
            </div>

            {ModalOpen && (
                <div className={`modal ${modalClose ? 'fade-out' : ''}`} onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>  
                        <img
                            src={user.avatar}
                            alt={`${user.firstName} avatar`}
                            style={{
                                borderRadius: '50%',
                                width: '125px',
                                height: '125px',
                                objectFit: 'cover',
                                display: 'block',
                                margin: '0 auto'
                            }}
                        />
                        <h2>{user.firstName} {user.lastName}</h2>
                        <p>Email: {user.email}</p>
                        <p>Endereço: {user.address}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserCard;;
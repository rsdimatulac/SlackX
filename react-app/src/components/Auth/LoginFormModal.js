import React from 'react';
import useConsumeContext from "../../context/FormModalContext";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";


const LoginFormModal = () => {
    const { handleLoginModal, showLogin } = useConsumeContext();

    return (
        <>
            {showLogin && (
            <Modal onClose={() => handleLoginModal()}>
                <LoginForm />
            </Modal>
            )}
        </>
    )
};

export default LoginFormModal;

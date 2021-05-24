import React from 'react';
import useConsumeContext from "../../context/FormModalContext";
import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";


const SignUpFormModal = () => {
    const { handleSignUpModal, showSignUp } = useConsumeContext();

    return (
        <>
            {showSignUp && (
                <Modal onClose={() => handleSignUpModal()}>
                    <SignUpForm />
                </Modal>
            )}
        </>
    )
};

export default SignUpFormModal;

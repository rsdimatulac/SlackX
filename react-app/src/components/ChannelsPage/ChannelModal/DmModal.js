import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createDM } from "../../../store/channel";
import useConsumeContext from "../../../context/FormModalContext";
import { Modal } from "../../../context/Modal";
import "./DmModal.css";


const DmModal = ({ dm }) => {
    const { handleDMFormModal } = useConsumeContext();
    const [dmSearchInput, setDMSearchInput] = useState("");
    const [dmSearchResult, setDMSearchResult] = useState([]);
    const [usersToDM, setUsersToDM] = useState([]);
    const dispatch = useDispatch();
    const { userId } = useParams();
    const history = useHistory();
    const users = useSelector(state => Object.values(state.users));

    const handleDMSearch = (e) => {
        if (e.target.value === "") {
            setDMSearchInput("");
            setDMSearchResult([]);
        }

        if (e.target.value.length > 0) {
            let filteredResults = users.filter(user => 
                user['firstname']?.toLowerCase().includes(e.target.value.toLowerCase()) 
                || user['lastname']?.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setDMSearchInput(e.target.value);
            setDMSearchResult(filteredResults);
        }
    }

    const handleAddDM = (e) => {
        const userId = Number(e.target.classList[0]);
       
        if (usersToDM.some((user) => user['id'] === userId)) {
            return; // the userId already exist
        }

        const user = users.find(user => user['id'] === userId);
        const usersToDMDup = usersToDM.map(user => user);
        usersToDMDup.push(user);
        setUsersToDM(usersToDMDup);
        setDMSearchInput("");
    }

    const removeUserToDM = (e) => {
        const userId = Number(e.target.className);
        // only return the users that does not match the userID clicked, that userId must be removed
        const usersToDMDup = usersToDM.filter(user => user.id !== userId);
        setUsersToDM(usersToDMDup);
    }

    const handleSubmit = async(e) => { // [{},{}]
        e.preventDefault();

        const dmUserIDs = dm.map(subDM => [Object.keys(subDM.users).sort((a, b) => a - b).join(""), subDM.id]); // [["1", "2"], ["6"]]
        const userIDS = usersToDM.map(user => user.id); // [1, 2, 3 ...]
        const userIDSDup = userIDS.slice();
        userIDSDup.push(userId)
        const userIDStr = userIDSDup.sort((a, b) => a - b).join("");

        let existingDM;
        if (dmUserIDs.some(eachDM => {
            if (eachDM[0] === userIDStr) {
                existingDM = eachDM[1]
                return true;
            }
            return false;
        })) {
            history.push(`/users/${userId}/${existingDM}`);
            handleDMFormModal();
        } else {
            const data = await dispatch(createDM(userIDS));
            handleDMFormModal();
            history.push(`/users/${userId}/${data?.id}`)
        }
        
    }

    return (
        <>
            <Modal onClose={handleDMFormModal}>
                <div className="dm__form">
                    <form onSubmit={handleSubmit}>
                        <div className="dm__form__header">
                            <h1>Direct messages</h1>
                        </div>
                        {/* DM SEARCH INPUT */}
                        <div className="new__dm__input">
                            <div className="users__dm__container">
                                {/* ADDED USERS  */}
                                <div className="added__users__wrap">
                                    {usersToDM.length > 0 && usersToDM.map(user => 
                                        (<div key={user['id']} className={`${user['id']} dm__added__users`}>
                                            <div className={`dm__added__avatar`}>
                                                <img src={user['avatar']} alt="" />
                                            </div>
                                        <div className={`dm__added__name`}>
                                                <p>{user['firstname']} {user['lastname']}</p>
                                            <span id="remove__icon" ><div className={`${user['id']}`} onClick={removeUserToDM}>X</div></span>
                                            </div>
                                        </div>)    
                                    )}
                                </div>
                                <input
                                    type="text"
                                    name="dm_name"
                                    autoComplete="off"
                                    placeholder="Start a conversation"
                                    onChange={handleDMSearch}
                                    value={dmSearchInput}
                                ></input>

                            </div>
                            <div className="dm__form__button">
                                <button style={{ cursor: 'pointer' }} type="submit">Create Direct Message</button>
                            </div>
                        </div>
                        {/* SEARCH RESULTS */}
                        <div className="dm__search">
                            {dmSearchResult.length === 0 ? <p>No results</p> : null}
                            {dmSearchResult.map(user =>
                            (<div className={`${user['id']} dm__search__results`} key={user['id']} onClick={handleAddDM}>
                                <div className={`${user['id']} dm__search__avatar `}>
                                    <img src={user['avatar']} className={`${user['id']}`} alt="" />
                                </div>
                                <div className={`${user['id']} dm__search__name `}>
                                    <h3 className={`${user['id']}`}>{user['firstname']} {user['lastname']}</h3>
                                </div>
                            </div>)
                            )}
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default DmModal;

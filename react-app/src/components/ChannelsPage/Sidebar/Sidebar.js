import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { BsPencilSquare as CreateIcon } from "react-icons/bs";
import { BiMessageRoundedDetail as ThreadIcon } from "react-icons/bi";
import { AiOutlineComment as DMIcon } from "react-icons/ai";
import { GoMention as MentionIcon } from "react-icons/go";
import { BsBookmark as SavedIcon } from "react-icons/bs";
import { MdKeyboardArrowRight as ShowMoreIcon } from "react-icons/md";
import { MdKeyboardArrowDown as ShowLessIcon } from "react-icons/md";
import { RiAddFill as AddIcon } from "react-icons/ri";
import { FiLock as Private } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { getChannels } from '../../../store/channel';
import ChannelModal from "../ChannelModal/ChannelModal";
import DmModal from "../ChannelModal/DmModal";
import useConsumeContext from "../../../context/FormModalContext";
import SidebarOptions from "./SidebarOptions";
import "./Sidebar.css";



const Sidebar = ({ user }) => {
    const channels = useSelector(state => state.channels);
    const [showChannel, setShowChannel] = useState(false);
    const { showChannelForm, showDMForm, handleChannelFormModal, handleDMFormModal } = useConsumeContext();
    const [showDM, setShowDM] = useState(false);
    const [dm, setDM] = useState([])
    const [pp, setPP] = useState([])
    const dispatch = useDispatch()

    const handleClickChannel = () => setShowChannel(prevState => !prevState);
    const handleClickDM = () => setShowDM(prevState => !prevState);

    //grab channels
    useEffect(() => {
        async function fetchData() {
            await dispatch(getChannels())
        }
        fetchData();
    }, [dispatch])

    useEffect(() => {
        let dmArr = []
        let ppArr = []
        for (let channel in channels) {

            if (channels[channel].channel_type === "dm") {
                dmArr.push(channels[channel])
            } else {
                ppArr.push(channels[channel])
            }
        }
        if (dmArr.length !== dm.length) {
            setDM(dmArr)
        }
        if (ppArr.length !== pp.length) {
            setPP(ppArr)
        }

    }, [channels, dm, pp])


    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <div className="sidebar__name">
                        <h2>SlackX</h2>
                        <h3>
                            <p>{`Welcome, ${user?.firstname} ${user?.lastname}!`}</p>
                        </h3>
                    </div>
                    {/* TODO: Add an onClick for /search modal to create a message and search users */}
                    <div className="sidebar__create">
                        <CreateIcon id="create__icon" />
                    </div>
                </div>
            </div>
            <div className="sidebar__content__wrap">
                <div className="sidebar__content">
                    <div className="sidebar__options">
                        <SidebarOptions Icon={ThreadIcon} title={"Threads"} id={""} />
                        <SidebarOptions Icon={DMIcon} title={"All DMs"} id={""} />
                        <SidebarOptions Icon={MentionIcon} title={"Mentions & reactions"} id={""} />
                        <SidebarOptions Icon={SavedIcon} title={"Saved items"} id={""} />
                    </div>
                    <div className="sidebar__channels">
                        <div className="channels__header">
                            <div onClick={handleClickChannel}>
                                <SidebarOptions Icon={showChannel ? ShowLessIcon : ShowMoreIcon} title={"Channels"} id={""} />
                            </div>
                            <div className="add__icon" onClick={handleChannelFormModal}><AddIcon id="add__icon1" /></div>
                        </div>
                        {showChannel &&
                            // TODO: channels.map here. ADD route for each DM by id
                            <div> {pp?.map(channel =>
                            (<NavLink key={channel.name} to={`/users/${user.id}/${channel.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <div className="channels__div"><span className="private__icon">{channel.channel_type == 'public' ? '#' : <Private />}</span>{channel.name}</div>
                            </NavLink>
                            ))}
                            </div>
                        }
                    </div>
                    {showChannelForm && <ChannelModal />}
                    <div className="sidebar__dms">
                        <div className="channels__header">
                            <div onClick={handleClickDM}>
                                <SidebarOptions Icon={showDM ? ShowLessIcon : ShowMoreIcon} title={"Direct Messages"} id={""} />
                            </div>
                            <div className="add__icon" onClick={handleDMFormModal}><AddIcon id="add__icon2" /></div>
                        </div>
                        {showDM &&
                            // TODO: dms.map here. ADD route for each DM by id
                            (<div>{dm?.map(channel => (
                                <NavLink key={channel.name} to={`/users/${user.id}/${channel.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                    <div className="channels__div">{channel.name}</div>
                                </NavLink>
                            ))}
                            </div>)}
                    </div>
                    {showDMForm && <DmModal />}
                </div>
            </div>
        </div>
    )
};

export default Sidebar;

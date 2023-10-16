
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Inboxitem } from '../Masg/inbox item/Inboxitem'
import {format} from "timeago.js"
import { publicRequest } from '../../requestMethods';

export const Inbox = (conversation,active) => {

    // console.log(conversation.conversation._id);

    // console.log(conversation.conversation.members);

   
    const cuser = useSelector(state => state.user.currentUser._id);

    const type  = useSelector(state=>state.user.type);

    // const auser = conversation.conversation.members.find((m)=>m!==cuser);
    // console.log(cuser);

    const [user, setUser] = useState({});
    const [last, setLast] = useState({});

    useEffect(()=>{
        const auser = conversation.conversation.members.find((m)=>m!==cuser);
            const getuser = async()=>{
                try{
                        if(type=="in"){
                                const res = await publicRequest.get("/company/"+auser);
                                // console.log(res.data.username);
                                setUser(res.data);
                        }else{
                            const res = await publicRequest.get("/investor/"+auser);
                            // console.log(res);
                            setUser(res.data);

                        }
                }catch(err){
                    console.log(err);
                }
            };
            getuser();

    },[cuser,conversation]);

    useEffect(()=>{
        const id = conversation.conversation._id;
            const getuser = async()=>{
                try{
                       const res = await publicRequest.get("/message/"+id);
                        setLast(res.data[res.data.length-1]);
                       
                }catch(err){
                    console.log(err);
                }
            };
            getuser();

    },[conversation]);






    return (
        <div>
            <div class={conversation.active?"chat_list active_chat" :"chat_list"}>
                <div class="chat_people">
                    <div class="chat_img"> <img src= {user?.profileImg} alt="logo" /> </div>
                    <div class="chat_ib">
                        <h5>{user?.username} <span class="chat_date">{format(last?.createdAt)}</span></h5>
                        <p>{last?.text}</p>
                    </div>
                </div>
            </div>
            

        </div>

    )
}

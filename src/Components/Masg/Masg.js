import React from 'react'
import {format} from "timeago.js"

export const Masg = (message,own) => {

// console.log(message);


    return (
        <>
            { message.own ?
            <div class="outgoing_msg">
                    <div class="sent_msg">
                        <p>{message.message.text}</p>
                        <span class="time_date">{format(message.message.createdAt)}</span> </div>
                </div>:<div class="incoming_msg">
                    <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                    <div class="received_msg">
                        <div class="received_withd_msg">
                            <p>{message.message.text}</p>
                            <span class="time_date">{format(message.message.createdAt)}</span></div>
                    </div>
                </div>

            }

        </>
    )
}

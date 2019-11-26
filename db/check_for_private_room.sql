select room_id from private_chat
where user_id1  = $1 and user_id2 = $2
or user_id1 = $2 and user_id2 = $1;
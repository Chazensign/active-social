insert into chat_rooms(activ_id, user_id1, user_id2)
values(null, $1, $2);

select room_id from chat_rooms
where user_id1 = $1 and user_id2 = $2;
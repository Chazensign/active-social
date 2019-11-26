insert into chat_rooms(activ_id, user_id1, user_id2)
values($1, null, null);

select room_id from chat_rooms
where activ_id = $1;
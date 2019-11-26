select room_id from chat_rooms
where user_id1 = $1 and user_id2 is null;
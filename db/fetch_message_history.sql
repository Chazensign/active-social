select profile_img, room_name, user_id, message_id, message from socket_messages as sm
join socket_rooms as sr on sr.room_id = sm.room_id
join users on sm.user_id = users.id
where sr.room_name = ${room};
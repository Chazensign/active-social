select user_id, message, message_id, profile_img, first_Name from socket_messages as sm
join users on sm.user_id = users.id
where sm.room_id = $1;
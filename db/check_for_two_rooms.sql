select * from socket_rooms
where room_name in ($1, $2);
insert into socket_rooms (room_name)
values (${room});

select room_name from socket_rooms
where room_name = ${room}
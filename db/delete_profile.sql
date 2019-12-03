
delete from socket_messages
where user_id = 16;

delete from about
where user_id = 16;


delete from users_events 
where user_id = 16;

delete from events 
where user_id = 16;

delete from user_interests
where user_id =16;

delete from friends 
where first_id = 16 or second_id = 16;

-- Something with socket messages prevents deleting chat_rooms
delete from socket_messages
where user_id = 16;

delete from chat_rooms 
where user_id1 = 16 or user_id2 = 16;

delete from hash 
where user_id = 16;

delete from user_address
where user_id = 16;

delete from users
where id = 16;

select * from users;

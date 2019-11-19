select * from users
join user_address on user_id = id
where email = $1;
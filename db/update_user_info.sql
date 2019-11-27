UPDATE users
set first_name = $1, last_name = $2, email = $3 
where id = $7;

update user_address
set city = $4, state = $5, zip = $6
where user_id = $7;

select first_name, last_name, profile_img, user_id, city, state, zip from users
join user_address on user_id = id
where id = $7;
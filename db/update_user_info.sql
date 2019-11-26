UPDATE users
set first_name = $1, last_name = $2, email = $3 
where id = 18;

update user_address
set city = $4, state = $5, zip = $6
where user_id = 18;
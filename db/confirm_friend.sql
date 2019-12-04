UPDATE friends
set confirmed = true
where first_id = $1 and second_id = $2;

UPDATE friends
set confirmed = true
where first_id = $2 and second_id = $1;

select first_name, last_name, id from users
join friends on second_id = users.id
where request_to = $2 and confirmed = false;
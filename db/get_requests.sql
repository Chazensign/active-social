select first_name, last_name, id from users
join friends on second_id = users.id
where request_to = $1 and confirmed = false;
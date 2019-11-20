select id, first_name, last_name from users
where id IN
(select second_id from friends
where first_id = $1);
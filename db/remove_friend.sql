delete from friends
where first_id = $1 and second_id = $2;

delete from friends
where first_id = $2 and second_id = $1;

select id, first_name, last_name from users
where id IN
(select second_id from friends
where first_id = $2 and confirmed = true);
select first_name, last_name, u.id from users as u
join user_interests on u.id = user_id
where activ_id = $1;
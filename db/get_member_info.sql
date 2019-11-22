select * from users as u
join user_address as ua on ua.user_id = u.id
join about as a on a.user_id = u.id
where u.id = $1;
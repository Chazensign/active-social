-- select * from users
-- join user_address as ua on ua.user_id = users.id
-- where ua.zip in ($1);

select * from users
join user_address as ua on ua.user_id = users.id;
insert into users_events(event_id, user_id)
values($1, $2);

select event_id from users_events
where user_id = $2;
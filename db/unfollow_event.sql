delete from users_events
where event_id = $1 and user_id = $2;

select event_id from users_events 
where user_id = $2;
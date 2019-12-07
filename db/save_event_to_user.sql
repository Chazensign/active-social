insert into users_events(event_id, user_id)
values($1, $2);

select * from users_events as ue
join events as e on ue.event_id = e.event_id
where ue.user_id = $1;
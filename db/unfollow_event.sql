delete from users_events
where event_id = $1 and user_id = $2;

select * from users_events as ue
join events as e on ue.event_id = e.event_id
where ue.user_id = $2;
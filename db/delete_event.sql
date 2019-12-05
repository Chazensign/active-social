delete from users_events
where event_id = $1;

delete from events
where event_id = $1;

select ue.event_id, ev_title, img, content, e.user_id, date from users_events as ue
join events as e on ue.event_id = e.event_id
where ue.user_id = $2;
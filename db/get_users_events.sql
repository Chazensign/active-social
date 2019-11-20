select ue.event_id, ev_title, img, content, date from users_events as ue
join events as e on ue.event_id = e.event_id
where ue.user_id = $1;
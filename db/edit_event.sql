update events
set ev_title = $2, 
img = $3, 
content = $4, 
date = $5, 
street = $6, 
city = $7, 
state = $8,  
event_zip = $9
where event_id = $1;

select * from users_events as ue
join events as e on ue.event_id = e.event_id
where ue.user_id = $10;
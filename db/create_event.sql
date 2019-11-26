insert into events(ev_title, img, content, date, user_id, street, city, state,  event_zip, activ_id)
values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);

select * from events
where activ_id = $10;

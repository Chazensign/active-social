insert into user_interests(activ_id, user_id, content, skill_level, lessons, price_range)
values($1, $2, $3, $4, $5, null);


select * from user_interests as ui
join activities as a on a.activ_id = ui.activ_id
where user_id = $1;
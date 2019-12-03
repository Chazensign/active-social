select user_id, ui.activ_id, lessons from user_interests as ui
join activities as a on a.activ_id = ui.activ_id
where user_id = $1;
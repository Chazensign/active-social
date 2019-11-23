select * from users as u
join user_interests as ui on u.id = user_id
where activ_id = $1 and lessons = 't';
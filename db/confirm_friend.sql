UPDATE friends
set confirmed = true
where first_id = $1 and second_id = $2;

UPDATE friends
set confirmed = true
where first_id = $2 and second_id = $1;
insert into friends(first_id, second_id, confirmed, request_to)
values($1, $2, $3, $1),
($2, $1, $3, null)
returning *;
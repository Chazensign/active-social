insert into users(first_name, last_name, email, profile_img)
values(
$1,
$2,
$3,
$4
);

select * from users
where email = $3;
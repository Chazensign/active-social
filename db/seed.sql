drop table users;

--User table
create table users (
id serial PRIMARY KEY,
first_name varchar(20),
last_name varchar(20),
email varchar(50),
profile_img text
);

--Dummy Data
insert into users(first_name, last_name, email, profile_img)
values(
'Chaz',
'Guyton',
'ch@z.com',
'https://i.kym-cdn.com/photos/images/newsfeed/000/097/324/enhanced-buzz-15345-1296838997-6.jpg?1318992465'
);

--Address Table
create table user_address (
add_id serial PRIMARY KEY,
city varchar(30),
state varchar(20),
zip INTEGER,
user_id INTEGER REFERENCES users(id)
);
--Address dummy data
insert into user_address(city, state, zip, user_id)
values('Provo', 'Utah', 84601, 1);
--Remove user_address table
drop table user_address;

--About table
create table about(
about_id serial PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
about_content text
);
--added birth date into about table
alter table about
add COLUMN birth_date TIMESTAMP;

--Password hash table
create table hash(
hash_id serial primary key,
user_id INTEGER REFERENCES users(id),
hash varchar
);
--hash dummy data
insert into hash(user_id, hash)
values (1, 'password');

create table activities(
activ_id serial primary key,
activ_title varchar(30),
img text
);

create table events(
event_id serial PRIMARY key,
ev_title varchar(30),
img text,
content text,
date TIMESTAMP,
user_id INTEGER REFERENCES users(id),
event_zip INTEGER,
activ_id INTEGER REFERENCES activities(activ_id)
);

create table user_interests(
activ_id INTEGER REFERENCES activities(activ_id),
user_id INTEGER REFERENCES users(id),
content text,
skill_level INTEGER,
lessons BOOLEAN,
price_range INTEGER 
);

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

--users Acitivities table
create table activities(
activ_id serial primary key,
activ_title varchar(30),
img text
);
--Activities dummy data
insert into activities(activ_title, img)
values('Soccer',
'https://www.washingtonpost.com/resizer/A6_CgkXxYbo37f_9ms4sOTKZ0gk=/767x0/smart/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/ZE5LRVG4K4I6RC5MX7QB7TODUY.jpg'),
('Snowboarding',
'https://www.liveabout.com/thmb/m6dx1XTib-EtNk_NkZXHZPunqn4=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/female-snowboarder-jumping-through-air-88888350-599727b9845b340011d830a5.jpg'),
('Ultimate Frisbee',
'https://a.espncdn.com/photo/2010/1102/pg2_frisbee_576.jpg'),
('Bodybuilding',
'http://destinyfitness.com/wp-content/uploads/2016/06/Freeweights.jpg');

--Events table
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
--Events dummy data
insert into events(ev_title, img, content, date, user_id, event_zip, activ_id)
values(
'Meet up at the Bird', 
'https://www.snowbird.com/uploaded/MOUNTAIN%20SCHOOL/MS_WomensCamp1_5055_MattCrawley_3900x2600.jpg',
'This is going to be a sweet event, we are going to go tear up all the fresh new pow that just dropped.',
'2004-10-19 10:23:54+02',
11,
84092,
2
);

--user intrests/activities table
create table user_interests(
interest_id serial primary key,
activ_id INTEGER REFERENCES activities(activ_id),
user_id INTEGER REFERENCES users(id),
content text,
skill_level INTEGER,
lessons BOOLEAN,
price_range INTEGER 
);
--User interests dummy data
insert into user_interests(activ_id, user_id, content, skill_level, lessons, price_range)
values(1, 11, 'I love this sport it is all I ever think about.', 7, true, 30-100),
(2, 11, 'I love this sport it is all I ever think about.', 6, false, null),
(3, 11, 'I love this sport it is all I ever think about.', 5, false, null),
(4, 11, 'I love this sport it is all I ever think about.', 7, true, 40-50);

--Friend connections table
create table friends(
first_id INTEGER REFERENCES users(id),
second_id INTEGER REFERENCES users(id)
);
--Friends dummy data
insert into friends(first_id, second_id)
values(11, 12),
(11, 13),
(11, 14),
(11, 15),
(12, 13),
(12, 13),
(12, 15),
(13, 14),
(13, 15);

--Users Saved Events table
create table users_events(
events_id serial primary key,
event_id integer REFERENCES events(event_id),
user_id integer REFERENCES users(id)
);
--Users event dummy data
insert into users_events(event_id, user_id)
values(1, 11);

--Socket Rooms table
create table socket_rooms(
  room_id serial primary key, 
  room_name varchar(40));

--Socket messages table
create table socket_messages(
message_id serial primary key,
room_id integer references socket_rooms(room_id),
user_id integer references users(id),
message varchar(100)
)
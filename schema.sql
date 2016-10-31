DROP TABLE participant;
CREATE TABLE participant(
   id       serial primary key,
   name     varchar(80),
   weight   real,
   created  date
);

-- mock data
INSERT INTO participant(name,weight,created) VALUES ('Nathan', 140, NOW());
INSERT INTO participant(name,weight,created) VALUES ('Claire', 35, NOW());
INSERT INTO participant(name,weight,created) VALUES ('Everest', 29, NOW());
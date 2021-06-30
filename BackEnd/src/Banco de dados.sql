use `cruz-2114519-gabriel-silva`;

CREATE TABLE IF NOT EXISTS USUARIO_ECOMMERCE (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  nickname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS USUARIO_IMAGE(
	 id VARCHAR(255) PRIMARY KEY,
	 subtitle VARCHAR(255) NOT NULL,
	 author VARCHAR(255) NOT NULL,
	 data_criacao date not null,
	 file_photo VARCHAR(255) NOT NULL,
     tags_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS TAGS(
	 id VARCHAR(255) PRIMARY KEY,
	 tag_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS FOLLOW(
	person_follow_id varchar(255) not null,
    person_followed_id varchar(255) not null,
    primary key(person_follow_id,person_followed_id),
    foreign key (person_follow_id) references USUARIO_ECOMMERCE(id),
    foreign key (person_followed_id) references USUARIO_ECOMMERCE(id)
);





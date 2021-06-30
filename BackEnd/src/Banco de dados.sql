use `cruz-2114519-gabriel-silva`;
select * from USUARIO_ECOMMERCE;
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
	 file_photo VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS TAGS(
	 id VARCHAR(255) PRIMARY KEY,
	 tag_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS TAGS_USUARIO_IMAGE(
	tag_id VARCHAR(255)  not null,
    usuario_image_id VARCHAR(255)  not null,
    primary key (tag_id,usuario_image_id) ,
    foreign key(tag_id) references TAGS(id),
    foreign key(usuario_image_id) references USUARIO_IMAGE(id)
)


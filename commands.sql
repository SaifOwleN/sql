CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes INT DEFAULT 0
);

INSERT INTO blogs (author,url,title) VALUES ('saif','www.xddMORS.com','how to kys')

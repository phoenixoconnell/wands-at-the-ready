INSERT INTO users
(username, hash, isAdmin)
VALUES
($1, $2, $3)
RETURNING *;
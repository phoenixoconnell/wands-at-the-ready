DELETE FROM cart
WHERE user_id = $1
AND product_id = $2;

-- SELECT * FROM cart
-- WHERE user_id = $1;

SELECT c.cart_id,
    p.product_id,
    p.product_name,
    p.product_img,
    p.product_price
FROM cart c
INNER JOIN products p
ON p.product_id = c.product_id
WHERE c.user_id = $1;
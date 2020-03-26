BEGIN;

TRUNCATE
  pizza_menu,
  pizza_users,
  pizza_times,
  pizza_location,
  pizza_messages
  RESTART IDENTITY CASCADE;

INSERT INTO pizza_users (user_name, password)
VALUES
  ('chef', '$2y$12$RBvtFUtw9mf76tGnyF141Or/VVvmrtjrUtU.vbmDILcr3E2XkvyHu'),
  ('dev', '$2y$12$RBvtFUtw9mf76tGnyF141Or/VVvmrtjrUtU.vbmDILcr3E2XkvyHu');
  
  -- IamPizzaM@n

INSERT INTO pizza_menu (pizzaname, price, rank, blurb)
VALUES
  ('Supreme', '10,000', '1', 'Recreate the 1990s at Pizzahut'),
  ('Calzone', '15,000', '2', 'A foldy little chap - popular with Tony Soprano and his crew');

INSERT INTO pizza_times (date, open, close)
VALUES
  ('9th March 2020', '11:30', '19:00'),
  ('May Probably', '12:30', '21:45');

INSERT INTO pizza_location (lat, long, name, description)
VALUES
  ('37.555869', '126.973244', 'Seoul Station', 'near exit 109');

INSERT INTO pizza_messages (message)
VALUES
  ('You are now in the fish_law Pizza Van App - Welcome');
  


COMMIT;

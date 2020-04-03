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

INSERT INTO pizza_menu (id, pizzaname, price, rank, blurb)
VALUES
  ('1', 'Supreme', '10,000', '1', 'Recreate the 1990s at Pizzahut');
  

INSERT INTO pizza_times (id, date, open, close)
VALUES
  ('1', '9th March 2020', '11:30', '19:00');
  

INSERT INTO pizza_location (id, lat, long, name, description)
VALUES
  ('1', '37.555869', '126.973244', 'Seoul Station', 'near exit 109');

INSERT INTO pizza_messages (id, message)
VALUES
  ('1', 'You are now in the fish_law Pizza Van App - Welcome');
  

INSERT INTO pizza_contacts (id, contact_type, contact_details)
VALUES 
('1', 'Mobile', '010-0101-0101');


COMMIT;

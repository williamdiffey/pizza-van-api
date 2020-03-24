BEGIN;

TRUNCATE
  pizza_menu,
  pizza_users,
  RESTART IDENTITY CASCADE;

INSERT INTO pizza_users (user_name, password)
VALUES
  ('chef', '$2y$12$RBvtFUtw9mf76tGnyF141Or/VVvmrtjrUtU.vbmDILcr3E2XkvyHu'),
  ('dev', '$2y$12$RBvtFUtw9mf76tGnyF141Or/VVvmrtjrUtU.vbmDILcr3E2XkvyHu');
  
  -- IamPizzaM@n

INSERT INTO pizza_menu (pizzaname, img, blurb)
VALUES
  ('Supreme', 'https://images.app.goo.gl/W5EMVftSGQZLCFk48',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui'),
  ('Calzone', 'https://images.app.goo.gl/Up2LKVP9GixHG9gB6',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui');

INSERT INTO pizza_times (date, open, close)
VALUES
  ('2020/7/7', '11:30', '19:00'),
  ('2020/7/10', '12:30', '21:45');

INSERT INTO pizza_location (geolocation, name)
VALUES
  ('37.555869, 126.973244', 'Seoul Station'),
  ('37.544352, 127.037418', '서울숲');

COMMIT;

-- =========================
-- SAMPLE EVENTS — made up to demo smart search. Not real events.
-- Every title starts with "Sample:" and every place is made up.
--
-- To remove them all (their embeddings go too):
--   delete from organizers where id = 'aaaaaaaa-0000-0000-0000-000000000002';
-- =========================

insert into organizers (id, name, email, website, is_verified) values
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Kiddo Sample Events', 'samples@kiddo-app.internal', null, false)
on conflict (id) do nothing;

insert into events (
  id, slug, title, description, location_name, address,
  lat, lng, starts_at, ends_at,
  price_cents, age_min, age_max,
  category, is_featured, is_approved, organizer_id
) values
('5a000000-0000-0000-0000-000000000001', 'sample-pumpkin-patch-story-walk', 'Sample: Pumpkin Patch Story Walk',
 'Follow a trail of picture-book pages through a pumpkin patch, then pick a mini pumpkin to take home. This is a sample event to show how search works.',
 'Maple Hollow Farm (sample)', '100 Sample Ln, Meridian, ID 83642', 43.6121, -116.3915,
 '2026-10-24T10:00:00-06:00', '2026-10-24T11:30:00-06:00', 0, 2, 6, 'outdoors', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000002', 'sample-toddler-paint-and-splash', 'Sample: Toddler Paint & Splash Morning',
 'Smocks on! Little ones finger-paint on giant paper, stamp with sponges, and rinse off at the splash table. Messy play encouraged. This is a sample event to show how search works.',
 'Sunny Days Studio (sample)', '200 Sample Ave, Boise, ID 83702', 43.6150, -116.2023,
 '2026-10-24T09:30:00-06:00', '2026-10-24T10:30:00-06:00', 0, 1, 4, 'arts', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000003', 'sample-junior-robot-builders', 'Sample: Junior Robot Builders',
 'Kids snap together simple robots with motors and sensors, then race them on an obstacle course. All parts provided. This is a sample event to show how search works.',
 'Gearbox Learning Lab (sample)', '300 Sample Blvd, Nampa, ID 83651', 43.5407, -116.5635,
 '2026-10-25T13:00:00-06:00', '2026-10-25T15:00:00-06:00', 1500, 8, 12, 'stem', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000004', 'sample-family-halloween-costume-parade', 'Sample: Family Halloween Costume Parade',
 'Wear your costume and march with neighbors down the main street, with treat stations along the way and a group photo at the end. This is a sample event to show how search works.',
 'Old Town Square (sample)', '400 Sample St, Eagle, ID 83616', 43.6955, -116.3540,
 '2026-10-31T16:00:00-06:00', '2026-10-31T17:30:00-06:00', 0, null, null, 'other', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000005', 'sample-not-so-spooky-trick-or-treat-trail', 'Sample: Not-So-Spooky Trick-or-Treat Trail',
 'A well-lit trail with friendly decorations and candy stops, made for kids who don''t like big scares. Strollers welcome. This is a sample event to show how search works.',
 'Willow Creek Park (sample)', '500 Sample Way, Meridian, ID 83646', 43.6200, -116.4000,
 '2026-10-31T17:00:00-06:00', '2026-10-31T19:00:00-06:00', 0, 2, 8, 'outdoors', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000006', 'sample-haunted-science-night', 'Sample: Haunted Science Night',
 'Glowing slime, bubbling potions, and fog made with dry ice. Kids do spooky science experiments alongside real scientists. This is a sample event to show how search works.',
 'Riverbend Science Hall (sample)', '600 Sample Dr, Boise, ID 83706', 43.6000, -116.2000,
 '2026-10-30T18:00:00-06:00', '2026-10-30T20:00:00-06:00', 800, 6, 12, 'stem', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000007', 'sample-baby-sign-language-class', 'Sample: Baby Sign Language Class',
 'Parents and babies learn simple signs like milk, more, and all done through songs and play. Great for pre-talkers. This is a sample event to show how search works.',
 'Cozy Corner Community Room (sample)', '700 Sample Rd, Garden City, ID 83714', 43.6566, -116.2785,
 '2026-10-27T10:00:00-06:00', '2026-10-27T10:45:00-06:00', 0, 0, 2, 'learning', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000008', 'sample-youth-soccer-skills-clinic', 'Sample: Youth Soccer Skills Clinic',
 'Coaches teach dribbling, passing, and shooting through games. Bring shin guards and a water bottle; balls provided. This is a sample event to show how search works.',
 'Fieldstone Sports Park (sample)', '800 Sample Pkwy, Meridian, ID 83642', 43.6050, -116.3800,
 '2026-11-01T10:00:00-07:00', '2026-11-01T11:30:00-07:00', 1000, 5, 9, 'sports', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000009', 'sample-kids-yoga-in-the-park', 'Sample: Kids Yoga in the Park',
 'Stretch like a cat, balance like a flamingo, and finish with a calm-down breathing game on the grass. Bring a towel or mat. This is a sample event to show how search works.',
 'Heron Pond Green (sample)', '900 Sample Ct, Eagle, ID 83616', 43.7000, -116.3500,
 '2026-10-24T11:00:00-06:00', '2026-10-24T12:00:00-06:00', 0, 3, 10, 'sports', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000010', 'sample-puppet-theater-brave-little-fox', 'Sample: Puppet Theater — The Brave Little Fox',
 'A 40-minute puppet show about a small fox who finds her way home through the forest. Kids can meet the puppets afterward. This is a sample event to show how search works.',
 'Lantern Playhouse (sample)', '1000 Sample Pl, Boise, ID 83702', 43.6180, -116.2100,
 '2026-10-25T14:00:00-06:00', '2026-10-25T15:00:00-06:00', 600, 2, 8, 'performance', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000011', 'sample-teen-comic-drawing-workshop', 'Sample: Teen Comic Drawing Workshop',
 'Teens learn to sketch characters, plan panels, and ink a one-page comic with a local illustrator. Supplies included. This is a sample event to show how search works.',
 'Inkwell Art Loft (sample)', '1100 Sample St, Nampa, ID 83651', 43.5450, -116.5600,
 '2026-10-29T16:00:00-06:00', '2026-10-29T17:30:00-06:00', 0, 11, 16, 'arts', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000012', 'sample-family-ice-skating-lesson', 'Sample: Family Ice Skating Lesson',
 'A beginner lesson on the ice for kids and grown-ups together. Skate rental and helmets included. This is a sample event to show how search works.',
 'Frostline Rink (sample)', '1200 Sample Ave, Boise, ID 83709', 43.5900, -116.2600,
 '2026-11-07T09:00:00-07:00', '2026-11-07T10:00:00-07:00', 1200, 4, 12, 'sports', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000013', 'sample-kids-cooking-mini-pizzas', 'Sample: Kids Cooking — Mini Pizzas',
 'Kids roll out dough, pick their toppings, and bake their own mini pizzas, then eat them together. This is a sample event to show how search works.',
 'Little Chefs Kitchen (sample)', '1300 Sample Rd, Meridian, ID 83646', 43.6150, -116.3950,
 '2026-11-07T13:00:00-07:00', '2026-11-07T14:30:00-07:00', 1800, 6, 12, 'food', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000014', 'sample-bird-feeder-building-day', 'Sample: Bird Feeder Building Day',
 'Build a pinecone or wooden bird feeder to hang at home, and learn which birds stick around in the fall and winter. This is a sample event to show how search works.',
 'Cottonwood Nature Center (sample)', '1400 Sample Trl, Eagle, ID 83616', 43.6900, -116.3600,
 '2026-11-08T10:00:00-07:00', '2026-11-08T12:00:00-07:00', 0, 4, 12, 'outdoors', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000015', 'sample-sensory-friendly-movie-morning', 'Sample: Sensory-Friendly Movie Morning',
 'A family movie with the lights up and the sound down. Kids can move, talk, and take breaks. Made for kids with autism or sensory needs. This is a sample event to show how search works.',
 'Starlight Cinema (sample)', '1500 Sample Blvd, Nampa, ID 83686', 43.5350, -116.5700,
 '2026-11-07T10:00:00-07:00', '2026-11-07T11:45:00-07:00', 300, null, null, 'performance', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000016', 'sample-dino-dig-discovery-hour', 'Sample: Dino Dig Discovery Hour',
 'Little paleontologists dig for pretend fossils in a sand pit, then match their bones to the right dinosaur. This is a sample event to show how search works.',
 'Pebble Path Museum (sample)', '1600 Sample Dr, Boise, ID 83702', 43.6120, -116.1950,
 '2026-10-28T10:00:00-06:00', '2026-10-28T11:00:00-06:00', 500, 3, 7, 'learning', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000017', 'sample-family-board-game-night', 'Sample: Family Board Game Night',
 'Tables full of board games and card games for every age, plus snacks. Bring a favorite game to share. This is a sample event to show how search works.',
 'Garden Commons Hall (sample)', '1700 Sample St, Garden City, ID 83714', 43.6600, -116.2750,
 '2026-11-06T18:00:00-07:00', '2026-11-06T20:00:00-07:00', 0, null, null, 'other', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000018', 'sample-fall-leaf-art-for-little-hands', 'Sample: Fall Leaf Art for Little Hands',
 'Preschoolers make leaf rubbings, leaf prints, and a crunchy leaf collage with real fall leaves. This is a sample event to show how search works.',
 'Acorn Arts Room (sample)', '1800 Sample Ave, Boise, ID 83705', 43.5950, -116.2150,
 '2026-11-01T10:30:00-07:00', '2026-11-01T11:30:00-07:00', 0, 2, 5, 'arts', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000019', 'sample-kids-fun-run-1k', 'Sample: Kids Fun Run 1K',
 'A short, flat 1K race for kids, with a medal for every finisher and a cheering tunnel at the end. This is a sample event to show how search works.',
 'Lakeview Loop (sample)', '1900 Sample Pkwy, Meridian, ID 83642', 43.6000, -116.3700,
 '2026-11-07T09:00:00-07:00', '2026-11-07T10:00:00-07:00', 500, 4, 12, 'sports', false, true, 'aaaaaaaa-0000-0000-0000-000000000002'),

('5a000000-0000-0000-0000-000000000020', 'sample-read-to-a-therapy-dog', 'Sample: Read to a Therapy Dog',
 'Kids practice reading aloud to calm, friendly therapy dogs who are great listeners. Bring a book or borrow one there. This is a sample event to show how search works.',
 'Bookmark Reading Room (sample)', '2000 Sample Rd, Boise, ID 83704', 43.6250, -116.2700,
 '2026-10-26T16:00:00-06:00', '2026-10-26T17:00:00-06:00', 0, 4, 9, 'learning', false, true, 'aaaaaaaa-0000-0000-0000-000000000002')
on conflict (id) do nothing;

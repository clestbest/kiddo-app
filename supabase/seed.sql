-- =========================
-- SEED DATA — Kiddo App
-- Boise / Treasure Valley
-- =========================

-- Organizers
insert into organizers (id, name, email, website, is_verified) values
  ('a1000000-0000-0000-0000-000000000001', 'Boise Farmers Market',        'hello@boisefarmersmarket.org',     'https://boisefarmersmarket.org',      true),
  ('a1000000-0000-0000-0000-000000000002', 'Idaho Department of Fish & Game', 'events@idfg.idaho.gov',          'https://idfg.idaho.gov',             true),
  ('a1000000-0000-0000-0000-000000000003', 'Clay Studio Boise',           'info@claystudioboise.com',         'https://claystudioboise.com',         true),
  ('a1000000-0000-0000-0000-000000000004', 'Treefort Music Fest',         'hello@treefortmusicfest.com',      'https://treefortmusicfest.com',       true),
  ('a1000000-0000-0000-0000-000000000005', 'Boise YMCA',                  'family@boiseymca.org',             'https://ymcatvidaho.org',             true),
  ('a1000000-0000-0000-0000-000000000006', 'Boise Public Library',        'events@cityofboise.org',           'https://library.cityofboise.org',     true),
  ('a1000000-0000-0000-0000-000000000007', 'Boise Makerspace',            'hello@boisemakerspace.com',        'https://boisemakerspace.com',         true),
  ('a1000000-0000-0000-0000-000000000008', 'Roaring Springs Water Park',  'fun@roaringsprings.com',           'https://roaringsprings.com',          true),
  ('a1000000-0000-0000-0000-000000000009', 'Idaho Steelheads Hockey',     'tickets@idahosteelheads.com',      'https://idahosteelheads.com',         true),
  ('a1000000-0000-0000-0000-000000000010', 'Treasure Valley Children''s Theater', 'info@tvct.org',           'https://tvct.org',                    true),
  ('a1000000-0000-0000-0000-000000000011', 'Boise Rock School',           'info@boiserockschool.com',         'https://boiserockschool.com',         true),
  ('a1000000-0000-0000-0000-000000000012', 'Discovery Center of Idaho',   'hello@discoverycenterofidaho.org', 'https://discoverycenterofidaho.org',  true),
  ('a1000000-0000-0000-0000-000000000013', 'Meridian Parks & Rec',        'parks@meridiancity.org',           'https://meridiancity.org/parksrec',   true),
  ('a1000000-0000-0000-0000-000000000014', 'Boise Co-op',                 'events@boisecoop.com',             'https://boisecoop.com',               true);

-- Events
-- Note: dates are set relative to a spring 2026 weekend (2026-04-04 Sat / 2026-04-05 Sun)
insert into events (
  id, slug, title, description, location_name, address,
  lat, lng, starts_at, ends_at,
  price_cents, age_min, age_max,
  category, is_featured, is_approved, organizer_id
) values

-- FEATURED
(
  'e1000000-0000-0000-0000-000000000001',
  'boise-farmers-market-spring-kickoff',
  'Boise Farmers Market Spring Kickoff',
  'The beloved Boise Farmers Market returns for spring! Local produce, artisan goods, live music, and kid-friendly activities throughout the market. Free face painting and a scavenger hunt for kids.',
  'Capitol Blvd', '400 S Capitol Blvd, Boise, ID 83702',
  43.6024, -116.2022,
  '2026-04-04T09:00:00-07:00', '2026-04-04T13:00:00-07:00',
  0, null, null,
  'outdoors', true, true, 'a1000000-0000-0000-0000-000000000001'
),

-- OUTDOORS
(
  'e1000000-0000-0000-0000-000000000002',
  'junior-naturalists-spring-birds',
  'Junior Naturalists: Spring Birds',
  'Join a guided walk to spot and identify early spring migratory birds along the Boise River Greenbelt. Binoculars provided. Kids take home a field journal.',
  'Boise WMA', 'Warm Springs Ave, Boise, ID 83712',
  43.6057, -116.1742,
  '2026-04-04T10:00:00-07:00', '2026-04-04T11:30:00-07:00',
  0, 4, 10,
  'outdoors', false, true, 'a1000000-0000-0000-0000-000000000002'
),
(
  'e1000000-0000-0000-0000-000000000003',
  'family-bike-ride-greenbelt-to-ann-morrison-park',
  'Family Bike Ride: Greenbelt to Ann Morrison Park',
  'A leisurely guided family bike ride along the Boise River Greenbelt. Helmets required, training wheels welcome. Ends with a picnic area for families to enjoy lunch.',
  'Esther Simplot Park', '4649 Crescent Rim Dr, Boise, ID 83706',
  43.5983, -116.2311,
  '2026-04-05T09:30:00-07:00', '2026-04-05T11:30:00-07:00',
  0, null, null,
  'outdoors', false, true, 'a1000000-0000-0000-0000-000000000013'
),
(
  'e1000000-0000-0000-0000-000000000004',
  'spring-kite-festival',
  'Spring Kite Festival',
  'Bring your own kite or build one at our free workshop booth. Prizes for highest flyer, most creative design, and best family team. Food trucks on site.',
  'Ann Morrison Park', 'Americana Blvd, Boise, ID 83702',
  43.6006, -116.2165,
  '2026-04-05T11:00:00-07:00', '2026-04-05T15:00:00-07:00',
  0, null, null,
  'outdoors', false, true, 'a1000000-0000-0000-0000-000000000013'
),

-- ARTS
(
  'e1000000-0000-0000-0000-000000000005',
  'kids-pottery-drop-in-morning',
  'Kids Pottery Drop-In Morning',
  'Drop in for a hands-on pottery session. Kids will work with real clay guided by our studio instructors and take home their creation after it fires (ready in 2 weeks).',
  'Clay Studio Boise', '123 N Milwaukee St, Boise, ID 83704',
  43.6281, -116.2451,
  '2026-04-05T11:00:00-07:00', '2026-04-05T13:00:00-07:00',
  1200, 5, 12,
  'arts', false, true, 'a1000000-0000-0000-0000-000000000003'
),
(
  'e1000000-0000-0000-0000-000000000006',
  'watercolor-workshop-for-little-artists',
  'Watercolor Workshop for Little Artists',
  'Kids explore color mixing, wet-on-wet techniques, and painting nature scenes in this relaxed drop-in workshop. All supplies included. No experience needed.',
  'Boise Contemporary Theater', '854 Fulton St, Boise, ID 83702',
  43.6142, -116.1988,
  '2026-04-04T13:00:00-07:00', '2026-04-04T15:00:00-07:00',
  1000, 4, 10,
  'arts', false, true, 'a1000000-0000-0000-0000-000000000010'
),
(
  'e1000000-0000-0000-0000-000000000007',
  'family-mural-day-at-the-co-op',
  'Family Mural Day at the Co-op',
  'Help paint a community mural celebrating Treasure Valley farms and families. All ages welcome — even toddlers can add a handprint. Smocks provided.',
  'Boise Co-op', '888 W Fort St, Boise, ID 83702',
  43.6207, -116.2089,
  '2026-04-04T10:00:00-07:00', '2026-04-04T14:00:00-07:00',
  0, null, null,
  'arts', false, true, 'a1000000-0000-0000-0000-000000000014'
),

-- PERFORMANCE
(
  'e1000000-0000-0000-0000-000000000008',
  'the-very-hungry-caterpillar-live',
  'The Very Hungry Caterpillar — Live!',
  'A beloved picture book comes to life in this colorful 45-minute theatrical production, complete with oversized puppets and audience participation. Perfect for little ones.',
  'Treefort Stage', '180 W Idaho St, Boise, ID 83702',
  43.6163, -116.2028,
  '2026-04-04T14:00:00-07:00', '2026-04-04T15:00:00-07:00',
  800, 2, 7,
  'performance', false, true, 'a1000000-0000-0000-0000-000000000004'
),
(
  'e1000000-0000-0000-0000-000000000009',
  'kids-rock-showcase',
  'Kids Rock Showcase',
  'Students from Boise Rock School take the stage for their spring showcase. Expect covers of classic rock, pop, and original songs — all performed by kids ages 7–17.',
  'Neurolux Lounge', '111 N 11th St, Boise, ID 83702',
  43.6172, -116.2031,
  '2026-04-05T14:00:00-07:00', '2026-04-05T16:00:00-07:00',
  500, null, null,
  'performance', false, true, 'a1000000-0000-0000-0000-000000000011'
),
(
  'e1000000-0000-0000-0000-000000000010',
  'cinderella-youth-production',
  'Cinderella — Youth Production',
  'Treasure Valley Children''s Theater presents a full-length musical production of Cinderella, performed entirely by youth actors ages 8–18. Costumes and sets designed by the students.',
  'TVCT Playhouse', '3101 W State St, Boise, ID 83703',
  43.6231, -116.2302,
  '2026-04-04T18:00:00-07:00', '2026-04-04T20:00:00-07:00',
  1200, null, null,
  'performance', false, true, 'a1000000-0000-0000-0000-000000000010'
),

-- SPORTS
(
  'e1000000-0000-0000-0000-000000000011',
  'open-swim-family-play-hour',
  'Open Swim & Family Play Hour',
  'Join us every Saturday morning for open family swim at the Boise YMCA. Lane pool and leisure pool both open. Lifeguards on duty.',
  'Boise YMCA', '1050 W State St, Boise, ID 83702',
  43.6178, -116.2143,
  '2026-04-04T09:00:00-07:00', '2026-04-04T10:00:00-07:00',
  0, null, null,
  'sports', false, true, 'a1000000-0000-0000-0000-000000000005'
),
(
  'e1000000-0000-0000-0000-000000000012',
  'idaho-steelheads-family-pack-night',
  'Idaho Steelheads Family Pack Night',
  'Catch the Steelheads in action with a discounted family 4-pack. Includes four tickets, four hot dogs, and four sodas. Kids skate with players after the game.',
  'Idaho Central Arena', '233 S Capitol Blvd, Boise, ID 83702',
  43.6136, -116.2014,
  '2026-04-04T19:05:00-07:00', '2026-04-04T21:30:00-07:00',
  6000, null, null,
  'sports', false, true, 'a1000000-0000-0000-0000-000000000009'
),
(
  'e1000000-0000-0000-0000-000000000013',
  'spring-soccer-kickoff-clinic',
  'Spring Soccer Kickoff Clinic',
  'A free 90-minute introductory soccer clinic for kids who''ve never played before. Coaches from BSC FC lead drills, scrimmages, and a fun relay race to finish.',
  'Meridian Soccer Complex', '1900 N Meridian Rd, Meridian, ID 83642',
  43.6485, -116.3914,
  '2026-04-05T09:00:00-07:00', '2026-04-05T10:30:00-07:00',
  0, 4, 10,
  'sports', false, true, 'a1000000-0000-0000-0000-000000000013'
),

-- STEM
(
  'e1000000-0000-0000-0000-000000000014',
  'intro-to-coding-for-kids',
  'Intro to Coding for Kids (Ages 7–11)',
  'A beginner-friendly two-hour workshop where kids learn basic programming concepts through games and Scratch projects. No experience needed. Laptops provided.',
  'Boise Makerspace', '700 W Orchard St, Boise, ID 83706',
  43.6098, -116.2198,
  '2026-04-04T13:00:00-07:00', '2026-04-04T15:00:00-07:00',
  1500, 7, 11,
  'stem', false, true, 'a1000000-0000-0000-0000-000000000007'
),
(
  'e1000000-0000-0000-0000-000000000015',
  'robotics-demo-day',
  'Robotics Demo Day',
  'Watch middle schoolers from local FIRST Lego League teams demonstrate their robots and explain their science projects. Hands-on robot driving stations for younger kids.',
  'Discovery Center of Idaho', '131 Myrtle St, Boise, ID 83702',
  43.6118, -116.1993,
  '2026-04-05T12:00:00-07:00', '2026-04-05T15:00:00-07:00',
  800, null, null,
  'stem', false, true, 'a1000000-0000-0000-0000-000000000012'
),
(
  'e1000000-0000-0000-0000-000000000016',
  'mad-science-slime-chemistry-lab',
  'Mad Science: Slime & Chemistry Lab',
  'Kids put on lab coats and make their own slime while learning about polymers, reactions, and states of matter. Take home your creation plus a mini experiment kit.',
  'Discovery Center of Idaho', '131 Myrtle St, Boise, ID 83702',
  43.6118, -116.1993,
  '2026-04-04T11:00:00-07:00', '2026-04-04T12:30:00-07:00',
  1000, 5, 12,
  'stem', false, true, 'a1000000-0000-0000-0000-000000000012'
),

-- LEARNING
(
  'e1000000-0000-0000-0000-000000000017',
  'story-time-craft-earth-day',
  'Story Time + Craft: Earth Day Edition',
  'Join us for stories about nature and the environment, followed by a recycled-material craft project kids can take home. Perfect for preschool and early elementary ages.',
  'Boise Public Library', '715 S Capitol Blvd, Boise, ID 83702',
  43.5988, -116.2018,
  '2026-04-05T10:30:00-07:00', '2026-04-05T11:30:00-07:00',
  0, 2, 6,
  'learning', false, true, 'a1000000-0000-0000-0000-000000000006'
),
(
  'e1000000-0000-0000-0000-000000000018',
  'baby-toddler-sensory-play-morning',
  'Baby & Toddler Sensory Play Morning',
  'A gentle, unstructured sensory play session for babies and toddlers. Stations include water beads, kinetic sand, light tables, and musical instruments. Caregivers encouraged to participate.',
  'Boise Public Library — Collister Branch', '4057 W State St, Boise, ID 83703',
  43.6231, -116.2688,
  '2026-04-04T10:00:00-07:00', '2026-04-04T11:30:00-07:00',
  0, 0, 3,
  'learning', false, true, 'a1000000-0000-0000-0000-000000000006'
),
(
  'e1000000-0000-0000-0000-000000000019',
  'nature-journaling-for-families',
  'Nature Journaling for Families',
  'Learn to observe and sketch plants, insects, and birds you find outdoors. Guided by a local naturalist. Journals and colored pencils provided for each child.',
  'Kathryn Albertson Park', '1000 American Blvd W, Boise, ID 83702',
  43.6049, -116.2301,
  '2026-04-05T09:00:00-07:00', '2026-04-05T10:30:00-07:00',
  0, 5, 14,
  'learning', false, true, 'a1000000-0000-0000-0000-000000000002'
),

-- FOOD
(
  'e1000000-0000-0000-0000-000000000020',
  'kids-cooking-class-spring-tacos',
  'Kids Cooking Class: Spring Tacos',
  'Kids ages 6–12 learn knife safety, sautéing, and taco assembly in this hands-on cooking class. Everyone eats what they make. Adults welcome to observe.',
  'Boise Co-op Kitchen', '888 W Fort St, Boise, ID 83702',
  43.6207, -116.2089,
  '2026-04-05T10:00:00-07:00', '2026-04-05T11:30:00-07:00',
  2000, 6, 12,
  'food', false, true, 'a1000000-0000-0000-0000-000000000014'
),
(
  'e1000000-0000-0000-0000-000000000021',
  'family-smoothie-bar-pop-up',
  'Family Smoothie Bar Pop-Up',
  'Kids pick their fruits and blend their own smoothies at this free pop-up inside the Boise Farmers Market. Learn about seasonal Idaho produce while you blend.',
  'Capitol Blvd', '400 S Capitol Blvd, Boise, ID 83702',
  43.6024, -116.2022,
  '2026-04-04T09:30:00-07:00', '2026-04-04T12:00:00-07:00',
  0, null, null,
  'food', false, true, 'a1000000-0000-0000-0000-000000000014'
);

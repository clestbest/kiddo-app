-- The scraped events (Automated Scraper organizer) were set to unapproved on
-- 2026-10-20 while permission to use the boisewithkids.com listings is pending.
-- These are the 32 that were approved before. Run this to approve them again:
update events set is_approved = true
where organizer_id = 'aaaaaaaa-0000-0000-0000-000000000001'
  and id in (
  '000959c2-f9b9-4ffc-8e7b-969fcff70953',
  '0a7c9f0e-8ee6-4d26-b1d4-87927d96beeb',
  '105a7af3-7d10-4ae3-9d5d-1ea38681daf0',
  '181581be-36d1-4d28-bdc3-fabad183ca40',
  '1f0c5933-c7af-4151-b6e2-40bf36bc1d24',
  '331d2de2-74fb-4fdb-8f97-61905c299313',
  '39d349dd-0564-455c-b23b-dc9dfd2ba72f',
  '4766bbc4-22cd-4995-ad3a-b6021c60a06b',
  '5e10bbaf-de68-45b5-94b6-2410a6e0b8b6',
  '6e76c398-a617-483f-9484-c0d35c9e0ddb',
  '6f160a09-d3de-4331-8719-72b2c074e53b',
  '780096ea-f8ae-45aa-ade1-02549500a539',
  '87132135-618e-4ad8-a913-165e1263591e',
  '87ffca0d-5d9d-4f63-afcd-29c79879e1ce',
  '8abba119-776c-41d9-b895-4cfd0a726626',
  '8d9f6bca-f3df-4590-8b91-fcaa3b639418',
  '90018d2b-3a62-4823-aab9-822680ab7058',
  '90cda083-6ac3-456a-a835-ded868ed9276',
  '949bb954-c247-419c-bd9d-5f40d4cb3801',
  '96fdadba-06d3-4043-8128-d1d875ac9aa4',
  '9a169f18-d7c2-49c9-9714-593120edd5d1',
  'b30daa17-1949-4dfc-8121-1bfb3bda3d9c',
  'c771310d-6ac2-4a39-b8a5-e490124474a6',
  'cb5b9dfb-d454-4925-aacd-a79a394c48a4',
  'd31c352a-2926-4b7f-a42e-61b907c3ade7',
  'd71466bf-9a69-4328-9630-9ceba9d8ecd4',
  'dc05977e-e711-4ec6-993f-541364293b14',
  'dec78f1e-7cc5-43d2-addf-51e43a2d097d',
  'e0ae2efd-746e-4add-90d2-dc5a9e5156e8',
  'ec329d3e-d804-4403-abf8-3caf5ec05fa8',
  'f86c9233-8978-4cc0-b43e-a28a0b3266e9',
  'f9ec3b2a-deef-492a-b847-9f27c7fa1e77'
  );

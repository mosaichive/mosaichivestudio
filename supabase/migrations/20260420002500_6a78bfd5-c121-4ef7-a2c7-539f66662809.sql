-- Replace placeholder testimonials with the studio's real client testimonials
DELETE FROM public.testimonials;

INSERT INTO public.testimonials (quote, author, role, company, rating, position, published) VALUES
('Working with Mosaic06 was a game-changer for our foundation. We had the ideas, but they gave us a professional identity that people actually trust. They didn''t just give us a logo; they built a consistent, powerful story across our entire brand. Since the launch, we''ve seen a massive shift in how partners and the public perceive us — we finally look as high-end as the work we do.',
 'Dr. Steve Ackah', 'Founder', 'Ghana Gold Expo Foundation', 5, 1, true),

('What I love about Mosaic06 is that they are a true one-stop shop. They handle our brand strategy, our web presence, and our video production with total consistency. It''s rare to find a studio that balances beautiful design with real growth strategy so well. They''ve made our brand instantly recognizable in a crowded space.',
 'Emmanuel Adinkrah', 'CEO', 'Ghana Internet Safety Foundation', 5, 2, true),

('Our social campaigns were getting lost in the noise until we brought in Mosaic06. Their motion graphics and video editing are next-level. The animations are punchy and explain our message in seconds. We''ve seen a significant jump in engagement because their content literally stops people from scrolling.',
 'Vincent', 'CEO', 'Greenfield Ambassadors', 5, 3, true),

('Mosaic06 gets it. They handled our brand strategy, web presence and content production with total consistency. They balance pretty design with actual business strategy — and they''ve made us instantly recognizable in our market. Growth has accelerated because of it.',
 'Benjamin', 'Founder', 'Montrad Solution', 5, 4, true);

-- Replace placeholder client logos with the studio's actual partner brands
DELETE FROM public.client_logos;

INSERT INTO public.client_logos (name, logo_url, position, published, featured) VALUES
('Ghana Gold Expo Foundation',     '/lovable-uploads/36a725bd-44a7-42d5-9985-7fd4b7f3b2fe.png',  1, true, true),
('Greenfield Ambassadors',         '/lovable-uploads/bbc570e0-b871-47de-b0b3-b24a253eea99.png',  2, true, true),
('Ambassadors Premium Group',      '/lovable-uploads/cca4c660-157c-4cd7-b8fe-fc8f7d2ed1a5.png',  3, true, true),
('Ghana Internet Safety Foundation','/lovable-uploads/92b7cec4-5d4c-46a3-a628-5a7e78059684.png', 4, true, true),
('Lusso Casona',                   '/lovable-uploads/58c4e060-7544-42ab-bc74-148d7118067a.png',  5, true, false),
('Maggstrove',                     '/lovable-uploads/3132ec33-a579-4ec5-84b2-e150e499e15b.png',  6, true, false),
('Carter Oriental',                '/lovable-uploads/99080b13-f7c8-4adb-b990-b2a85c1a5433.png',  7, true, false),
('Northern Development Summit',    '/lovable-uploads/1ede1cb3-ab08-48f3-a32d-58df9d901f3f.png',  8, true, false),
('The Trans International Ltd.',   '/lovable-uploads/dc782732-2e83-4ad0-83a5-a886980daf27.png',  9, true, false),
('Construction Ambassadors Limited','/lovable-uploads/0cbaaed8-c7d7-4662-9086-8173dbdbe951.png', 10, true, false),
('Monaco Ghana Business Council',  '/lovable-uploads/8f118d2d-2b36-4707-9c56-6177e714187d.png', 11, true, false),
('Gold Emotion',                   '/lovable-uploads/f0f2e6cd-aea4-4e95-9252-f11ec63f7ebf.png', 12, true, false),
('Aurum Monaco',                   '/lovable-uploads/a552427d-e52d-48c4-a2a7-39b3e9fff9cb.png', 13, true, false);
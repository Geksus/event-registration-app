# event-registration-app
Web-based application for events registration.

Finished all of middle level tasks but fell short on time to host application.

# Create DB
```-- Create the database
CREATE DATABASE IF NOT EXISTS events_app;

-- Use the new database
USE events_app;

-- Create the events table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    organizer VARCHAR(255) NOT NULL
);

-- Create the participants table
CREATE TABLE IF NOT EXISTS participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    referral_source VARCHAR(255),
    event_id INT,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Create the organizers table
CREATE TABLE IF NOT EXISTS organizers (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL
);
```

# Populate tables

```
INSERT INTO organizers (name) VALUES
('TechCorp'),
('MarketHub'),
('AI Global'),
('Blockchain Inc.'),
('CodeCamp'),
('DesignHub'),
('DataInsights'),
('BizAnalytics Inc.'),
('SecureNow'),
('StartupSpace');
```

```INSERT INTO events (title, description, event_date, organizer_id) VALUES
('Cloud Computing 2024', 'Learn about the latest cloud computing trends.', '2024-10-12', (SELECT id FROM organizers WHERE name = 'CloudTech')),
('Mobile App Development Workshop', 'Learn to build mobile apps in this hands-on workshop.', '2024-10-13', (SELECT id FROM organizers WHERE name = 'AppDevPros')),
('Virtual Reality Expo', 'Explore the latest in virtual and augmented reality.', '2024-10-14', (SELECT id FROM organizers WHERE name = 'VR World')),
('Green Energy Symposium', 'Conference on renewable energy solutions.', '2024-10-15', (SELECT id FROM organizers WHERE name = 'EcoEnergy')),
('Digital Marketing Strategies', 'Advanced digital marketing strategies for 2024.', '2024-10-16', (SELECT id FROM organizers WHERE name = 'AdMarket')),
('Finance and Investment Forum', 'Discuss finance trends and investment opportunities.', '2024-10-17', (SELECT id FROM organizers WHERE name = 'WealthAdvisors')),
('Leadership Skills Workshop', 'Hands-on leadership development workshop.', '2024-10-18', (SELECT id FROM organizers WHERE name = 'LeadNow')),
('SEO Best Practices', 'Learn the best practices for search engine optimization.', '2024-10-19', (SELECT id FROM organizers WHERE name = 'SEOExperts')),
('E-Commerce Growth Strategies', 'Explore strategies to grow your e-commerce business.', '2024-10-20', (SELECT id FROM organizers WHERE name = 'EcomGrow')),
('Machine Learning for Beginners', 'Introductory course on machine learning.', '2024-10-21', (SELECT id FROM organizers WHERE name = 'MLAcademy')),
('Digital Transformation Summit', 'How digital transformation is changing industries.', '2024-10-22', (SELECT id FROM organizers WHERE name = 'DigitalNow')),
('AI Ethics Seminar', 'Discuss the ethical challenges in AI development.', '2024-10-23', (SELECT id FROM organizers WHERE name = 'AI Ethics Council')),
('Quantum Computing Expo', 'Learn about the future of quantum computing.', '2024-10-24', (SELECT id FROM organizers WHERE name = 'QuantumNet')),
('Healthcare Technology Forum', 'Explore how technology is transforming healthcare.', '2024-10-25', (SELECT id FROM organizers WHERE name = 'HealthTech')),
('Public Speaking Workshop', 'Master the art of public speaking.', '2024-10-26', (SELECT id FROM organizers WHERE name = 'SpeakUp')),
('Social Media Marketing 2024', 'Latest trends in social media marketing.', '2024-10-27', (SELECT id FROM organizers WHERE name = 'SocialBuzz')),
('Freelancing for Success', 'Tips for building a successful freelancing career.', '2024-10-28', (SELECT id FROM organizers WHERE name = 'FreelancePros')),
('Video Marketing Workshop', 'Learn how to create effective video marketing campaigns.', '2024-10-29', (SELECT id FROM organizers WHERE name = 'VideoExperts')),
('UX/UI Design Trends', 'Explore the latest trends in UX/UI design.', '2024-10-30', (SELECT id FROM organizers WHERE name = 'DesignersHub')),
('Startup Financing Workshop', 'How to secure financing for your startup.', '2024-11-01', (SELECT id FROM organizers WHERE name = 'StartFinance')),
('Content Marketing Strategies', 'Create content that drives engagement.', '2024-11-02', (SELECT id FROM organizers WHERE name = 'ContentMasters')),
('Creative Writing for Beginners', 'Introduction to creative writing techniques.', '2024-11-03', (SELECT id FROM organizers WHERE name = 'WritersBlock')),
('Photography Masterclass', 'Masterclass on professional photography techniques.', '2024-11-04', (SELECT id FROM organizers WHERE name = 'PhotoPros')),
('Digital Illustration Workshop', 'Hands-on digital illustration workshop.', '2024-11-05', (SELECT id FROM organizers WHERE name = 'CreativeDraw')),
('Mobile Game Development Workshop', 'Learn how to develop mobile games.', '2024-11-06', (SELECT id FROM organizers WHERE name = 'GameDev Inc.')),
('User Experience Research Seminar', 'Advanced seminar on UX research techniques.', '2024-11-07', (SELECT id FROM organizers WHERE name = 'UXExperts')),
('SaaS Product Development', 'Learn how to develop and launch SaaS products.', '2024-11-08', (SELECT id FROM organizers WHERE name = 'SaaS Innovators')),
('Blockchain for Business', 'Explore how blockchain is used in business.', '2024-11-09', (SELECT id FROM organizers WHERE name = 'Blockchain Biz')),
('Agile Project Management', 'Master agile project management techniques.', '2024-11-10', (SELECT id FROM organizers WHERE name = 'AgilePros')),
('Tech Career Fair', 'Networking and opportunities for tech professionals.', '2024-11-11', (SELECT id FROM organizers WHERE name = 'CareerJump')),
('Artificial Intelligence in Healthcare', 'AI applications in the healthcare industry.', '2024-11-12', (SELECT id FROM organizers WHERE name = 'HealthAI')),
('Game Design Workshop', 'Workshop on the basics of game design.', '2024-11-13', (SELECT id FROM organizers WHERE name = 'GameMakers')),
('Automation Tools for Developers', 'Learn how to automate workflows for developers.', '2024-11-14', (SELECT id FROM organizers WHERE name = 'DevOpsTools')),
('Future of Work Seminar', 'Explore the future trends of the workplace.', '2024-11-15', (SELECT id FROM organizers WHERE name = 'WorkNow')),
('Robotics and AI Conference', 'Conference about AI and robotics integration.', '2024-11-16', (SELECT id FROM organizers WHERE name = 'RoboAI')),
('Cryptocurrency Trading Workshop', 'Learn how to trade cryptocurrencies.', '2024-11-17', (SELECT id FROM organizers WHERE name = 'CryptoTrade')),
('Design Thinking for Innovation', 'Learn how to use design thinking to innovate.', '2024-11-18', (SELECT id FROM organizers WHERE name = 'InnovateX')),
('Cloud Security Seminar', 'Learn best practices for cloud security.', '2024-11-19', (SELECT id FROM organizers WHERE name = 'CloudSecure')),
('Tech Innovations Summit', 'Explore cutting-edge technology innovations.', '2024-11-20', (SELECT id FROM organizers WHERE name = 'TechCorp'));
```

```
INSERT INTO participants (id, full_name, email, date_of_birth, referral_source, event_id)
VALUES
(UUID(), 'John Doe', 'john.doe@example.com', '1990-01-10', 'social', (SELECT id FROM events WHERE title = 'Cloud Computing 2024')),
(UUID(), 'Jane Smith', 'jane.smith@example.com', '1985-06-24', 'myself', (SELECT id FROM events WHERE title = 'Cloud Computing 2024')),
(UUID(), 'Emily Johnson', 'emily.johnson@example.com', '1993-03-15', 'friends', (SELECT id FROM events WHERE title = 'Cloud Computing 2024')),
(UUID(), 'Michael Brown', 'michael.brown@example.com', '1988-12-01', 'social', (SELECT id FROM events WHERE title = 'Cloud Computing 2024')),
(UUID(), 'Olivia Davis', 'olivia.davis@example.com', '1992-09-08', 'friends', (SELECT id FROM events WHERE title = 'Cloud Computing 2024')),

(UUID(), 'Alex Miller', 'alex.miller@example.com', '1991-11-19', 'myself', (SELECT id FROM events WHERE title = 'Mobile App Development Workshop')),
(UUID(), 'Jessica Wilson', 'jessica.wilson@example.com', '1987-05-14', 'friends', (SELECT id FROM events WHERE title = 'Mobile App Development Workshop')),
(UUID(), 'David Martinez', 'david.martinez@example.com', '1989-02-25', 'social', (SELECT id FROM events WHERE title = 'Mobile App Development Workshop')),
(UUID(), 'Sophia Anderson', 'sophia.anderson@example.com', '1994-07-30', 'myself', (SELECT id FROM events WHERE title = 'Mobile App Development Workshop')),

(UUID(), 'Ethan Thomas', 'ethan.thomas@example.com', '1985-09-12', 'friends', (SELECT id FROM events WHERE title = 'Virtual Reality Expo')),
(UUID(), 'Daniel Taylor', 'daniel.taylor@example.com', '1990-04-17', 'social', (SELECT id FROM events WHERE title = 'Virtual Reality Expo')),
(UUID(), 'Ava Lee', 'ava.lee@example.com', '1995-08-03', 'myself', (SELECT id FROM events WHERE title = 'Virtual Reality Expo')),
(UUID(), 'James Harris', 'james.harris@example.com', '1991-01-21', 'friends', (SELECT id FROM events WHERE title = 'Virtual Reality Expo')),

(UUID(), 'Lucas Clark', 'lucas.clark@example.com', '1986-03-22', 'myself', (SELECT id FROM events WHERE title = 'Green Energy Symposium')),
(UUID(), 'Isabella Lewis', 'isabella.lewis@example.com', '1993-10-10', 'friends', (SELECT id FROM events WHERE title = 'Green Energy Symposium')),
(UUID(), 'Matthew Robinson', 'matthew.robinson@example.com', '1988-06-13', 'social', (SELECT id FROM events WHERE title = 'Green Energy Symposium')),

(UUID(), 'Chris White', 'chris.white@example.com', '1992-08-15', 'social', (SELECT id FROM events WHERE title = 'Digital Marketing Strategies')),
(UUID(), 'Laura Evans', 'laura.evans@example.com', '1990-11-05', 'myself', (SELECT id FROM events WHERE title = 'Digital Marketing Strategies')),
(UUID(), 'Mark Green', 'mark.green@example.com', '1991-02-11', 'friends', (SELECT id FROM events WHERE title = 'Digital Marketing Strategies'));

INSERT INTO participants (id, full_name, email, date_of_birth, referral_source, event_id)
VALUES
(UUID(), 'John Doe', 'john.doe@example.com', '1990-01-10', 'social', (SELECT id FROM events WHERE title = 'Cloud Computing 2024')),
(UUID(), 'Jane Smith', 'jane.smith@example.com', '1985-06-24', 'myself', (SELECT id FROM events WHERE title = 'Cloud Computing 2024')),
(UUID(), 'Emily Johnson', 'emily.johnson@example.com', '1993-03-15', 'friends', (SELECT id FROM events WHERE title = 'Cloud Computing 2024')),
(UUID(), 'Michael Brown', 'michael.brown@example.com', '1988-12-01', 'social', (SELECT id FROM events WHERE title = 'Cloud Computing 2024')),
(UUID(), 'Olivia Davis', 'olivia.davis@example.com', '1992-09-08', 'friends', (SELECT id FROM events WHERE title = 'Cloud Computing 2024')),

(UUID(), 'Alex Miller', 'alex.miller@example.com', '1991-11-19', 'myself', (SELECT id FROM events WHERE title = 'Mobile App Development Workshop')),
(UUID(), 'Jessica Wilson', 'jessica.wilson@example.com', '1987-05-14', 'friends', (SELECT id FROM events WHERE title = 'Mobile App Development Workshop')),
(UUID(), 'David Martinez', 'david.martinez@example.com', '1989-02-25', 'social', (SELECT id FROM events WHERE title = 'Mobile App Development Workshop')),
(UUID(), 'Sophia Anderson', 'sophia.anderson@example.com', '1994-07-30', 'myself', (SELECT id FROM events WHERE title = 'Mobile App Development Workshop')),
(UUID(), 'Henry Carter', 'henry.carter@example.com', '1992-01-17', 'social', (SELECT id FROM events WHERE title = 'Mobile App Development Workshop')),

(UUID(), 'Ethan Thomas', 'ethan.thomas@example.com', '1985-09-12', 'friends', (SELECT id FROM events WHERE title = 'Virtual Reality Expo')),
(UUID(), 'Daniel Taylor', 'daniel.taylor@example.com', '1990-04-17', 'social', (SELECT id FROM events WHERE title = 'Virtual Reality Expo')),
(UUID(), 'Ava Lee', 'ava.lee@example.com', '1995-08-03', 'myself', (SELECT id FROM events WHERE title = 'Virtual Reality Expo')),
(UUID(), 'James Harris', 'james.harris@example.com', '1991-01-21', 'friends', (SELECT id FROM events WHERE title = 'Virtual Reality Expo')),
(UUID(), 'Sarah King', 'sarah.king@example.com', '1987-11-09', 'myself', (SELECT id FROM events WHERE title = 'Virtual Reality Expo')),

(UUID(), 'Lucas Clark', 'lucas.clark@example.com', '1986-03-22', 'myself', (SELECT id FROM events WHERE title = 'Green Energy Symposium')),
(UUID(), 'Isabella Lewis', 'isabella.lewis@example.com', '1993-10-10', 'friends', (SELECT id FROM events WHERE title = 'Green Energy Symposium')),
(UUID(), 'Matthew Robinson', 'matthew.robinson@example.com', '1988-06-13', 'social', (SELECT id FROM events WHERE title = 'Green Energy Symposium')),
(UUID(), 'Zoe Adams', 'zoe.adams@example.com', '1990-08-22', 'friends', (SELECT id FROM events WHERE title = 'Green Energy Symposium')),
(UUID(), 'Liam Nelson', 'liam.nelson@example.com', '1994-03-19', 'myself', (SELECT id FROM events WHERE title = 'Green Energy Symposium')),

(UUID(), 'Chris White', 'chris.white@example.com', '1992-08-15', 'social', (SELECT id FROM events WHERE title = 'Digital Marketing Strategies')),
(UUID(), 'Laura Evans', 'laura.evans@example.com', '1990-11-05', 'myself', (SELECT id FROM events WHERE title = 'Digital Marketing Strategies')),
(UUID(), 'Mark Green', 'mark.green@example.com', '1991-02-11', 'friends', (SELECT id FROM events WHERE title = 'Digital Marketing Strategies')),
(UUID(), 'Sophia Jackson', 'sophia.jackson@example.com', '1989-12-27', 'myself', (SELECT id FROM events WHERE title = 'Digital Marketing Strategies')),
(UUID(), 'Ethan Wright', 'ethan.wright@example.com', '1993-05-03', 'social', (SELECT id FROM events WHERE title = 'Digital Marketing Strategies')),

(UUID(), 'Andrew Scott', 'andrew.scott@example.com', '1988-09-06', 'friends', (SELECT id FROM events WHERE title = 'Finance and Investment Forum')),
(UUID(), 'Abigail Hill', 'abigail.hill@example.com', '1990-03-02', 'myself', (SELECT id FROM events WHERE title = 'Finance and Investment Forum')),
(UUID(), 'Grace Mitchell', 'grace.mitchell@example.com', '1995-07-18', 'social', (SELECT id FROM events WHERE title = 'Finance and Investment Forum')),
(UUID(), 'Jacob Ward', 'jacob.ward@example.com', '1992-10-27', 'friends', (SELECT id FROM events WHERE title = 'Finance and Investment Forum')),

(UUID(), 'Mia Carter', 'mia.carter@example.com', '1986-02-15', 'myself', (SELECT id FROM events WHERE title = 'Leadership Skills Workshop')),
(UUID(), 'Charlotte Perry', 'charlotte.perry@example.com', '1993-09-22', 'friends', (SELECT id FROM events WHERE title = 'Leadership Skills Workshop')),
(UUID(), 'Lily Kelly', 'lily.kelly@example.com', '1991-04-07', 'social', (SELECT id FROM events WHERE title = 'Leadership Skills Workshop')),

(UUID(), 'Amelia Cooper', 'amelia.cooper@example.com', '1987-12-17', 'myself', (SELECT id FROM events WHERE title = 'SEO Best Practices')),
(UUID(), 'Jack Morgan', 'jack.morgan@example.com', '1990-05-08', 'social', (SELECT id FROM events WHERE title = 'SEO Best Practices')),
(UUID(), 'Isabella Stewart', 'isabella.stewart@example.com', '1994-08-29', 'friends', (SELECT id FROM events WHERE title = 'SEO Best Practices')),

(UUID(), 'Aiden Sanchez', 'aiden.sanchez@example.com', '1989-03-30', 'social', (SELECT id FROM events WHERE title = 'E-Commerce Growth Strategies')),
(UUID(), 'Samantha Ross', 'samantha.ross@example.com', '1986-06-14', 'myself', (SELECT id FROM events WHERE title = 'E-Commerce Growth Strategies')),
(UUID(), 'Ella Bailey', 'ella.bailey@example.com', '1991-11-19', 'friends', (SELECT id FROM events WHERE title = 'E-Commerce Growth Strategies')),

(UUID(), 'Henry Rivera', 'henry.rivera@example.com', '1992-12-13', 'friends', (SELECT id FROM events WHERE title = 'Machine Learning for Beginners')),
(UUID(), 'Liam Morris', 'liam.morris@example.com', '1988-10-07', 'myself', (SELECT id FROM events WHERE title = 'Machine Learning for Beginners')),
(UUID(), 'Emily Peterson', 'emily.peterson@example.com', '1994-02-28', 'social', (SELECT id FROM events WHERE title = 'Machine Learning for Beginners')),

(UUID(), 'Alex Turner', 'alex.turner@example.com', '1990-03-21', 'myself', (SELECT id FROM events WHERE title = 'Digital Transformation Summit')),
(UUID(), 'Olivia Baker', 'olivia.baker@example.com', '1991-12-12', 'social', (SELECT id FROM events WHERE title = 'Digital Transformation Summit')),
(UUID(), 'James Evans', 'james.evans@example.com', '1987-06-15', 'friends', (SELECT id FROM events WHERE title = 'Digital Transformation Summit')),

(UUID(), 'Sophia Nelson', 'sophia.nelson@example.com', '1995-08-01', 'myself', (SELECT id FROM events WHERE title = 'AI Ethics Seminar')),
(UUID(), 'Liam Wright', 'liam.wright@example.com', '1992-10-20', 'friends', (SELECT id FROM events WHERE title = 'AI Ethics Seminar')),
(UUID(), 'Charlotte Collins', 'charlotte.collins@example.com', '1989-04-25', 'social', (SELECT id FROM events WHERE title = 'AI Ethics Seminar')),
(UUID(), 'Daniel Turner', 'daniel.turner@example.com', '1991-11-13', 'myself', (SELECT id FROM events WHERE title = 'AI Ethics Seminar')),

(UUID(), 'Emily Hall', 'emily.hall@example.com', '1988-05-19', 'friends', (SELECT id FROM events WHERE title = 'Quantum Computing Expo')),
(UUID(), 'Jack Allen', 'jack.allen@example.com', '1993-09-09', 'social', (SELECT id FROM events WHERE title = 'Quantum Computing Expo')),
(UUID(), 'Ella Martinez', 'ella.martinez@example.com', '1991-01-30', 'myself', (SELECT id FROM events WHERE title = 'Quantum Computing Expo')),

(UUID(), 'Noah Parker', 'noah.parker@example.com', '1987-11-02', 'friends', (SELECT id FROM events WHERE title = 'Healthcare Technology Forum')),
(UUID(), 'Ava Reed', 'ava.reed@example.com', '1990-07-28', 'social', (SELECT id FROM events WHERE title = 'Healthcare Technology Forum')),
(UUID(), 'Ethan Cooper', 'ethan.cooper@example.com', '1992-03-14', 'myself', (SELECT id FROM events WHERE title = 'Healthcare Technology Forum')),

(UUID(), 'Chloe Brooks', 'chloe.brooks@example.com', '1989-10-04', 'social', (SELECT id FROM events WHERE title = 'Public Speaking Workshop')),
(UUID(), 'Lily Stewart', 'lily.stewart@example.com', '1995-01-18', 'myself', (SELECT id FROM events WHERE title = 'Public Speaking Workshop')),
(UUID(), 'Mason Reed', 'mason.reed@example.com', '1993-06-22', 'friends', (SELECT id FROM events WHERE title = 'Public Speaking Workshop')),

(UUID(), 'Isabella Clark', 'isabella.clark@example.com', '1994-02-09', 'friends', (SELECT id FROM events WHERE title = 'Social Media Marketing 2024')),
(UUID(), 'Aiden Morris', 'aiden.morris@example.com', '1988-07-17', 'social', (SELECT id FROM events WHERE title = 'Social Media Marketing 2024')),
(UUID(), 'Mia Adams', 'mia.adams@example.com', '1991-08-30', 'myself', (SELECT id FROM events WHERE title = 'Social Media Marketing 2024')),

(UUID(), 'Olivia Rogers', 'olivia.rogers@example.com', '1993-09-07', 'myself', (SELECT id FROM events WHERE title = 'Freelancing for Success')),
(UUID(), 'Lucas Phillips', 'lucas.phillips@example.com', '1990-05-12', 'social', (SELECT id FROM events WHERE title = 'Freelancing for Success')),
(UUID(), 'Grace Barnes', 'grace.barnes@example.com', '1994-11-28', 'friends', (SELECT id FROM events WHERE title = 'Freelancing for Success')),

(UUID(), 'Emily Kelly', 'emily.kelly@example.com', '1987-03-23', 'myself', (SELECT id FROM events WHERE title = 'Video Marketing Workshop')),
(UUID(), 'Henry Bennett', 'henry.bennett@example.com', '1992-09-01', 'social', (SELECT id FROM events WHERE title = 'Video Marketing Workshop')),
(UUID(), 'Amelia Howard', 'amelia.howard@example.com', '1991-12-03', 'friends', (SELECT id FROM events WHERE title = 'Video Marketing Workshop')),

(UUID(), 'Sophia Simmons', 'sophia.simmons@example.com', '1995-02-24', 'myself', (SELECT id FROM events WHERE title = 'UX/UI Design Trends')),
(UUID(), 'James Peterson', 'james.peterson@example.com', '1989-07-11', 'friends', (SELECT id FROM events WHERE title = 'UX/UI Design Trends')),
(UUID(), 'Liam Henderson', 'liam.henderson@example.com', '1993-06-08', 'social', (SELECT id FROM events WHERE title = 'UX/UI Design Trends')),

(UUID(), 'Mason Moore', 'mason.moore@example.com', '1990-04-03', 'myself', (SELECT id FROM events WHERE title = 'Startup Financing Workshop')),
(UUID(), 'Emma Cox', 'emma.cox@example.com', '1988-11-17', 'social', (SELECT id FROM events WHERE title = 'Startup Financing Workshop')),
(UUID(), 'Noah Alexander', 'noah.alexander@example.com', '1995-06-06', 'friends', (SELECT id FROM events WHERE title = 'Startup Financing Workshop')),

(UUID(), 'Aiden Price', 'aiden.price@example.com', '1987-08-25', 'myself', (SELECT id FROM events WHERE title = 'Content Marketing Strategies')),
(UUID(), 'Zoe Hayes', 'zoe.hayes@example.com', '1994-05-04', 'social', (SELECT id FROM events WHERE title = 'Content Marketing Strategies')),
(UUID(), 'Logan Myers', 'logan.myers@example.com', '1993-10-13', 'friends', (SELECT id FROM events WHERE title = 'Content Marketing Strategies')),

(UUID(), 'Liam Russell', 'liam.russell@example.com', '1992-12-10', 'friends', (SELECT id FROM events WHERE title = 'Creative Writing for Beginners')),
(UUID(), 'Chloe Griffin', 'chloe.griffin@example.com', '1989-02-20', 'social', (SELECT id FROM events WHERE title = 'Creative Writing for Beginners')),
(UUID(), 'Ella Sanders', 'ella.sanders@example.com', '1995-03-01', 'myself', (SELECT id FROM events WHERE title = 'Creative Writing for Beginners')),

(UUID(), 'Olivia Bennett', 'olivia.bennett@example.com', '1991-04-05', 'myself', (SELECT id FROM events WHERE title = 'Photography Masterclass')),
(UUID(), 'Aiden Perry', 'aiden.perry@example.com', '1988-09-22', 'social', (SELECT id FROM events WHERE title = 'Photography Masterclass')),
(UUID(), 'James Bryant', 'james.bryant@example.com', '1990-08-29', 'friends', (SELECT id FROM events WHERE title = 'Photography Masterclass')),

(UUID(), 'Sophia Watson', 'sophia.watson@example.com', '1993-07-16', 'social', (SELECT id FROM events WHERE title = 'Digital Illustration Workshop')),
(UUID(), 'Lucas Hughes', 'lucas.hughes@example.com', '1987-11-04', 'myself', (SELECT id FROM events WHERE title = 'Digital Illustration Workshop')),
(UUID(), 'Emma Martin', 'emma.martin@example.com', '1992-02-11', 'friends', (SELECT id FROM events WHERE title = 'Digital Illustration Workshop')),

(UUID(), 'Lily Morris', 'lily.morris@example.com', '1989-05-20', 'myself', (SELECT id FROM events WHERE title = 'Mobile Game Development Workshop')),
(UUID(), 'Henry Clark', 'henry.clark@example.com', '1994-01-27', 'friends', (SELECT id FROM events WHERE title = 'Mobile Game Development Workshop')),
(UUID(), 'Mason Ward', 'mason.ward@example.com', '1990-06-03', 'social', (SELECT id FROM events WHERE title = 'Mobile Game Development Workshop')),

(UUID(), 'Grace Peterson', 'grace.peterson@example.com', '1992-09-29', 'friends', (SELECT id FROM events WHERE title = 'User Experience Research Seminar')),
(UUID(), 'Aiden Gray', 'aiden.gray@example.com', '1988-12-15', 'myself', (SELECT id FROM events WHERE title = 'User Experience Research Seminar')),

-- Add more participants for remaining events

```

# Create user to access DB
```
CREATE USER 'localuser'@'localhost' IDENTIFIED BY 'localpasswd';
GRANT ALL PRIVILEGES ON panel.* TO 'webuser'@'localhost';
FLUSH PRIVILEGES;
```
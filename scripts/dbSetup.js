const mysql = require("mysql2/promise");

async function setupDatabase() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root", // Change this if needed
    password: "your_root_password", // Change this if needed
  });

  await connection.query("CREATE DATABASE IF NOT EXISTS events_app");

  await connection.query(`
    CREATE USER IF NOT EXISTS 'localuser'@'localhost' IDENTIFIED BY 'localpasswd';
  `);
  await connection.query(`
    GRANT ALL PRIVILEGES ON events_app.* TO 'localuser'@'localhost';
  `);
  await connection.query("FLUSH PRIVILEGES;");

  await connection.query("USE events_app");

  await connection.query(`
    CREATE TABLE IF NOT EXISTS organizers (
      id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
      name VARCHAR(255) NOT NULL
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS events (
      id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      event_date DATE NOT NULL,
      organizer_id CHAR(36),
      FOREIGN KEY (organizer_id) REFERENCES organizers(id)
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS participants (
      id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      date_of_birth DATE NOT NULL,
      referral_source VARCHAR(255),
      event_id CHAR(36),
      FOREIGN KEY (event_id) REFERENCES events(id)
    )
  `);

  const organizers = [];
  for (let i = 1; i <= 10; i++) {
    organizers.push(`('Organizer ${i}')`);
  }
  await connection.query(`
    INSERT INTO organizers (name) VALUES ${organizers.join(", ")}
  `);

  const [organizerRows] = await connection.query("SELECT id FROM organizers");
  const organizerIds = organizerRows.map((row) => row.id);

  const events = [];
  for (let i = 1; i <= 50; i++) {
    const randomOrganizerId =
      organizerIds[Math.floor(Math.random() * organizerIds.length)];
    events.push(
      `('Event ${i}', 'Description for Event ${i}', CURDATE() + INTERVAL ${i} DAY, '${randomOrganizerId}')`,
    );
  }
  await connection.query(`
    INSERT INTO events (title, description, event_date, organizer_id) VALUES ${events.join(", ")}
  `);

  const [eventRows] = await connection.query("SELECT id FROM events");
  const eventIds = eventRows.map((row) => row.id);

  const participants = [];
  eventIds.forEach((eventId) => {
    const numParticipants = Math.floor(Math.random() * 3) + 5; // Random between 5 and 7 participants
    for (let i = 1; i <= numParticipants; i++) {
      const fullName = `Participant ${i} for Event ${eventId}`;
      const email = `participant${i}@event${eventId}.com`;
      const dateOfBirth = `1980-${(i % 12) + 1}-15`;
      participants.push(
        `('${fullName}', '${email}', '${dateOfBirth}', 'Referral', '${eventId}')`,
      );
    }
  });
  await connection.query(`
    INSERT INTO participants (full_name, email, date_of_birth, referral_source, event_id)
    VALUES ${participants.join(", ")}
  `);

  console.log("Database, user, tables, and sample data have been set up.");
  await connection.end();
}

setupDatabase();

const pool = require("../config/db");

const findOrCreateContact = async (email, phoneNumber) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { rows: matches } = await client.query(
      `SELECT * FROM contacts 
       WHERE email = $1 OR phone_number = $2`,
      [email, phoneNumber]
    );

    if (matches.length === 0) {
      const { rows } = await client.query(
        `INSERT INTO contacts (email, phone_number, link_precedence)
         VALUES ($1,$2,'primary')
         RETURNING *`,
        [email, phoneNumber]
      );

      await client.query("COMMIT");

      return formatResponse(rows[0], [rows[0]]);
    }

    const ids = matches.map(c => c.id);

    const { rows: allContacts } = await client.query(
      `SELECT * FROM contacts
       WHERE id = ANY($1::int[])
          OR linked_id = ANY($1::int[])`,
      [ids]
    );

    const primary = allContacts
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))[0];

    for (let contact of allContacts) {
      if (
        contact.link_precedence === "primary" &&
        contact.id !== primary.id
      ) {
        await client.query(
          `UPDATE contacts
           SET link_precedence='secondary',
               linked_id=$1,
               updated_at=NOW()
           WHERE id=$2`,
          [primary.id, contact.id]
        );
      }
    }

    const emailExists = allContacts.some(c => c.email === email);
    const phoneExists = allContacts.some(
      c => c.phone_number === phoneNumber
    );

    if (!emailExists || !phoneExists) {
      await client.query(
        `INSERT INTO contacts 
         (email, phone_number, linked_id, link_precedence)
         VALUES ($1,$2,$3,'secondary')`,
        [email, phoneNumber, primary.id]
      );
    }

    const { rows: finalContacts } = await client.query(
      `SELECT * FROM contacts
       WHERE id=$1 OR linked_id=$1`,
      [primary.id]
    );

    await client.query("COMMIT");

    return formatResponse(primary, finalContacts);

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

function formatResponse(primary, contacts) {
  const emails = [...new Set(contacts.map(c => c.email).filter(Boolean))];
  const phones = [...new Set(contacts.map(c => c.phone_number).filter(Boolean))];
  const secondaryIds = contacts
    .filter(c => c.link_precedence === "secondary")
    .map(c => c.id);

  return {
    primaryContactId: primary.id,
    emails,
    phoneNumbers: phones,
    secondaryContactIds: secondaryIds,
  };
}

module.exports = { findOrCreateContact };
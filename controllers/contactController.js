const { findOrCreateContact } = require("../services/contactService");

const identifyContact = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    const result = await findOrCreateContact(email, phoneNumber);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { identifyContact };
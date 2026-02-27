exports.up = (pgm) => {
  pgm.createTable("contacts", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    phone_number: {
      type: "varchar(20)",
    },
    email: {
      type: "varchar(255)",
    },
    linked_id: {
      type: "integer",
      references: "contacts",
      onDelete: "SET NULL",
    },
    link_precedence: {
      type: "varchar(20)",
      notNull: true,
      check: "link_precedence IN ('primary','secondary')",
    },
    created_at: {
      type: "timestamp",
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: "timestamp",
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    deleted_at: {
      type: "timestamp",
    },
  });

  pgm.createIndex("contacts", "email");
  pgm.createIndex("contacts", "phone_number");
  pgm.createIndex("contacts", "linked_id");
};

exports.down = (pgm) => {
  pgm.dropTable("contacts");
};
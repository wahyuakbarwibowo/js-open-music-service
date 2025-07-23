exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('albums', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    name: { type: 'TEXT', notNull: true },
    year: { type: 'INTEGER', notNull: true },
  });

  pgm.createTable('songs', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    title: { type: 'TEXT', notNull: true },
    year: { type: 'INTEGER', notNull: true },
    genre: { type: 'TEXT', notNull: true },
    performer: { type: 'TEXT', notNull: true },
    duration: { type: 'INTEGER' },
    album_id: {
      type: 'VARCHAR(50)',
      references: 'albums',
      onDelete: 'SET NULL',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
  pgm.dropTable('albums');
};

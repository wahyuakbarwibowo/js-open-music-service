exports.up = (pgm) => {
  pgm.createTable('user_album_likes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"albums"',
      onDelete: 'cascade',
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });

  // Unik untuk mencegah like ganda oleh user yang sama pada album yang sama
  pgm.addConstraint('user_album_likes', 'unique_user_album_like', {
    unique: ['user_id', 'album_id'],
  });
};

exports.down = (pgm) => {
  pgm.dropTable('user_album_likes');
};

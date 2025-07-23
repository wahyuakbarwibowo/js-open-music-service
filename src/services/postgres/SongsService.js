const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = `song-${nanoid(16)}`;
    const query = {
      text: `
        INSERT INTO songs (id, title, year, genre, performer, duration, album_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
      `,
      values: [id, title, year, genre, performer, duration, albumId],
    };

    const result = await this._pool.query(query);
    return result.rows[0].id;
  }

  async getSongs({ title, performer }) {
    const query = {
      text: 'SELECT id, title, performer FROM songs',
      values: [],
    };

    const conditions = [];
    if (title) {
      conditions.push(`LOWER(title) LIKE LOWER('%' || $${conditions.length + 1} || '%')`);
      query.values.push(title);
    }
    if (performer) {
      conditions.push(`LOWER(performer) LIKE LOWER('%' || $${conditions.length + 1} || '%')`);
      query.values.push(performer);
    }

    if (conditions.length > 0) {
      query.text += ` WHERE ${conditions.join(' AND ')}`;
    }

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) throw new NotFoundError('Lagu tidak ditemukan');

    return result.rows[0];
  }

  async editSongById(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const query = {
      text: `
        UPDATE songs
        SET title=$1, year=$2, genre=$3, performer=$4, duration=$5, album_id=$6
        WHERE id = $7
        RETURNING id
      `,
      values: [title, year, genre, performer, duration, albumId, id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) throw new NotFoundError('Gagal menghapus lagu. Id tidak ditemukan');
  }

  async getSongsByAlbumId(albumId) {
    const query = {
      text: 'SELECT id, title, performer FROM songs WHERE album_id = $1',
      values: [albumId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = SongsService;

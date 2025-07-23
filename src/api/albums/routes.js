module.exports = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.postAlbum,
  },
  {
    method: 'GET',
    path: '/albums',
    handler: handler.getAlbums,
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getAlbumById,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.putAlbumById,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteAlbumById,
  },
];

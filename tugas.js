const fastify = require('fastify')({
  logger: true
})
const db = require('./db');

// -- params
// -- querystring
// -- payload

// nampilin list buku, bisa search by judul (params)
fastify.get('/buku/:pencarian', async (request, reply) => {
     const buku = await db.query("select id, sku, judul from buku where judul like $1", [
         `%${request.params.pencarian}%`
     ]);
     return buku;
})

// nampilin detail buku (querystring)
fastify.get('/buku/:idBuku', async (request, reply) => {
     const buku = await db.query("select * from buku where id = $1", [
         `%${request.query.pencarian}%`
     ]);
     return buku;
})

// insert buku baru (payload)
 fastify.post('/buku', async (request, reply) => {
     const tambahBuku = request.body;
     const buku = await db.query(`insert into buku (sku,judul,harga,stock) 
     values ('${tambahBuku.sku}','${tambahBuku.judul}','${tambahBuku.harga}','${tambahBuku.stock}');`)
     return ('berhasil ditambahkan');
})

// update buku (params dan payload)
fastify.put('/buku/:idBuku', async (request, reply) => {
     const updateBuku = request.body;
     const buku = await db.query(`update buku set judul = '${updateBuku.judul}' where id = $1`, [
         request.params.idBuku
     ]);
     return ('berhasil diupdate' + request.params.idBuku);
})

// delete buku
fastify.delete('/buku/:pencarian', async (request, reply) => {
     const buku = await db.query(`delete from buku where id = $1`, [
         request.params.pencarian
     ]);
     return ('berhasil dihapus' + request.params.search);
})


const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
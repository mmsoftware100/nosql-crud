# Mongo in the House

## CRUD in NoSQL


```bash
# create project folder
mkdir project
# change directory to project folder
cd project
# initialize npm
npm init
# install required library
npm install express
npm install socket.io
npm install ejs
npm install mongodb
npm install dotenv
```

mongodb://localhost:27017/mydbname


https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application

တိုက်ရိုက်ချိတ်လို့မရ

```json
[Symbol(errorLabels)]: Set(0) {},
  [cause]: MongoNetworkError: 40412BFA01000000:error:0A000438:SSL routines:ssl3_read_bytes:tlsv1 alert internal error:../deps/openssl/openssl/ssl/record/rec_layer_s3.c:1605:SSL alert number 80
  
      at connectionFailureError (/Applications/XAMPP/xamppfiles/htdocs/nosql/node_modules/mongodb/lib/cmap/connect.js:379:20)
      at TLSSocket.<anonymous> (/Applications/XAMPP/xamppfiles/htdocs/nosql/node_modules/mongodb/lib/cmap/connect.js:285:22)
      at Object.onceWrapper (node:events:628:26)
      at TLSSocket.emit (node:events:513:28)
      at emitErrorNT (node:internal/streams/destroy:151:8)
      at emitErrorCloseNT (node:internal/streams/destroy:116:3)
      at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
    [Symbol(errorLabels)]: Set(1) { 'ResetPool' },
    [cause]: [Error: 40412BFA01000000:error:0A000438:SSL routines:ssl3_read_bytes:tlsv1 alert internal error:../deps/openssl/openssl/ssl/record/rec_layer_s3.c:1605:SSL alert number 80
    ] {
      library: 'SSL routines',
      reason: 'tlsv1 alert internal error',
      code: 'ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR'
    }
  }
}
```

another one

```json
Error: querySrv ESERVFAIL _mongodb._tcp.cluster90592.y6zvyrl.mongodb.net
    at QueryReqWrap.onresolve [as oncomplete] (node:internal/dns/promises:251:17) {
  errno: undefined,
  code: 'ESERVFAIL',
  syscall: 'querySrv',
  hostname: '_mongodb._tcp.cluster90592.y6zvyrl.mongodb.net'
}

```
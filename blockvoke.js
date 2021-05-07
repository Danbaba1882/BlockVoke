// Bitcore examples

// Generate a random address

const index = require('./node_modules/bitcore-lib/index')
const bitcore = require('bitcore-lib')
var privateKey = new bitcore.PrivateKey();

var address = privateKey.toAddress();

// Generate a address from a SHA256 hash


var value = Buffer.from('correct horse battery staple');
var hash = bitcore.crypto.Hash.sha256(value);
var bn = bitcore.crypto.BN.fromBuffer(hash);

var address = new bitcore.PrivateKey(bn).toAddress();


// Import an address via WIF


var wif = 'Kxr9tQED9H44gCmp6HAdmemAzU3n84H3dGkuWTKvE23JgHMW8gct';

var address = new bitcore.PrivateKey(wif).toAddress();


// Create a Transaction


var privateKey = new bitcore.PrivateKey('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');
var utxo = {
  "txId" : "115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986",
  "outputIndex" : 0,
  "address" : "17XBj6iFEsf8kzDMGQk5ghZipxX49VXuaV",
  "script" : "76a91447862fe165e6121af80d5dde1ecb478ed170565b88ac",
  "satoshis" : 50000
};

var transaction = new bitcore.Transaction()
  .from(utxo)
  .to('1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK', 15000)
  .sign(privateKey);


// Sign a Bitcoin message
// Create an OP RETURN transaction


var privateKey = new bitcore.PrivateKey('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');
var utxo = {
  "txId" : "115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986",
  "outputIndex" : 0,
  "address" : "17XBj6iFEsf8kzDMGQk5ghZipxX49VXuaV",
  "script" : "76a91447862fe165e6121af80d5dde1ecb478ed170565b88ac",
  "satoshis" : 50000
};

var transactionn = new bitcore.Transaction()
    .from(utxo)
    .addData('bitcore rocks') // Add OP_RETURN data
    .sign(privateKey);
    console.log(transactionn)
var oArray = transactionn.outputs
var oarray1 = oArray[0]
var oarraym = oarray1._script
console.log(oarraym)

// Create a 1-of-2 multisig P2SH address


var publicKeys = [
  '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
  '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9'
];
var requiredSignatures = 1;

var address = new bitcore.Address(publicKeys, requiredSignatures);


// Spend from a 2-of-2 multisig P2SH address


var privateKeys = [
  new bitcore.PrivateKey('91avARGdfge8E4tZfYLoxeJ5sGBdNJQH4kvjJoQFacbgwmaKkrx')
];
var publicKeys = privateKeys.map(bitcore.PublicKey);
var address = new bitcore.Address(publicKeys, 1); // 1 of 2

var utxo = {
  "txId" : "153068cdd81b73ec9d8dcce27f2c77ddda12dee3db424bff5cafdbe9f01c1756",
  "outputIndex" : 0,
  "address" : address.toString(),
  "script" : new bitcore.Script(address).toHex(),
  "satoshis" : 20000
};

var transaction = new bitcore.Transaction()
    .from(utxo, publicKeys, 1)
    .to('mtoKs9V381UAhUia3d7Vb9GNak8Qvmcsme', 20000)
    .sign(privateKeys);

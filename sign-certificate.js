const node_openssl = require('node-openssl-cert');

var options = {
	binpath: 'C:/Program Files/OpenSSL-Win64/bin/openssl.exe'
}

const openssl = new node_openssl(options);

// generating private key and csr
var publickeyAddress = 'xxxxxxxxxxxxxxxxxxxxxxxxxx';

var rsakeyoptions = {
	encryption: {
		password: 'test',
		cipher: 'des3'
	},
	rsa_keygen_bits: 2048,
	rsa_keygen_pubexp: 65537,
	format: 'PKCS8'
}

var csroptions = {
	hash: 'sha512',
	subject: {
		countryName: 'US',
		stateOrProvinceName: 'Louisiana',
		localityName: 'Slidell',
		postalCode: '70458',
		streetAddress: '1001 Gause Blvd.',
		organizationName: 'SMH',
		organizationalUnitName: 'IT',
		commonName: [
			'certificatetools.com',
			'www.certificatetools.com'
		],
		emailAddress: 'lyas.spiehler@slidellmemorial.org'
	},
	extensions: {
		basicConstraints: {
			critical: true,
			CA: true,
			pathlen: 1
            
		},
        
		keyUsage: {
			//critical: false,
			usages: [
				'digitalSignature',
				'keyEncipherment'
                
			]
		},
		extendedKeyUsage: {
			critical: true,
			usages: [
				'serverAuth',
				'clientAuth'
			]	
		},
		SANs: {
			DNS: [
				'usmandanbaba.com',
				'www.usmandanbaba.com',
                publickeyAddress
			]
		}
	}
}


openssl.generateRSAPrivateKey(rsakeyoptions, function(err, key, cmd) {
	console.log(cmd);
	console.log(key);
	openssl.generateCSR(csroptions, key, 'test', function(err, csr, cmd) {
		if(err) {
			console.log(err);
		} else {
			console.log(cmd.command);
			console.log(csr);
			console.log(cmd.files.config);
		}
			
	});
});
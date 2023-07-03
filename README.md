# new-node-service-starter

### Features

* typescript
* eslint
* prettier
* testing
* express
* requestId log
* error handler
* cors, compression

### Whats new

- Upgraded to node 20
- Migrated to node test runner
- Removed node-fetch from base dependency. Lets try node's default fetch.
- Changes to express middlewares structure
- Moved deployment specific files to deployment/* Use whatever meets your environment!
- Became more minimal!
- Removed globals


### Recommended setup

- vscode
- nvm
- yarn (corepack enable)


### How to use HTTPS

1. create a key pair
   ```bash
   set -e

   if [ -z "$1" ]; then
   hostname="$HOSTNAME"
   else
   hostname="$1"
   fi

   local_openssl_config="
   [ req ]
   prompt = no
   distinguished_name = req_distinguished_name
   x509_extensions = san_self_signed
   [ req_distinguished_name ]
   CN=$hostname
   [ san_self_signed ]
   subjectAltName = DNS:$hostname, DNS:localhost, IP:192.168.0.9
   subjectKeyIdentifier = hash
   authorityKeyIdentifier = keyid:always,issuer
   basicConstraints = CA:true
   keyUsage = nonRepudiation, digitalSignature, keyEncipherment, dataEncipherment, keyCertSign, cRLSign
   extendedKeyUsage = serverAuth, clientAuth, timeStamping
   "

   openssl req \
   -newkey rsa:2048 -nodes \
   -keyout "$hostname.key.pem" \
   -x509 -sha256 -days 3650 \
   -config <(echo "$local_openssl_config") \
   -out "$hostname.cert.pem"
   openssl x509 -noout -text -in "$hostname.cert.pem"


   ```
2. set process.env.CERT, process.env.CERT_KEY, process.env.HTTPS_PORT when running the node process.
3. Use this method only for development environment! in production, you'd better have a proxy that handles ssl.

### How to log

```typescript
import { logInfo, logDebug, logError } from '#src/util/log'

/*
	This prints request id inside the entire promise stack of the request.
*/
logInfo(`hello world!`);

```

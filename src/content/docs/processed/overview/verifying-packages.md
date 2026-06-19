How to make sure what you are downloading is legit.

## PGP
We will check the detached signature [PGP](/bin/pucora__amd64_generic-linux.tar.gz.asc) against our package [Pucora](/bin/pucora__amd64_generic-linux.tar.gz).



**Term**

```bash
gpg --verify pucora__amd64_generic-linux.tar.gz.asc pucora__amd64_generic-linux.tar.gz
gpg: Signature made Sun Mar 10 18:17:18 2019 UTC using RSA key ID 
gpg: Can't check signature: public key not found
```


We don't have the packager public key (AB39BEA1) in our system. You need to retrieve the public key from a key server.



**Term**

```bash
gpg --keyserver keyserver.ubuntu.com --recv-key 
gpg: requesting key  from hkp server keyserver.ubuntu.com
gpg: trustdb created
gpg: key : public key "Devops Faith Package Manager <packages@devops.faith>" imported
gpg: Total number processed: 1
gpg: imported: 1	(RSA: 1)
```


Now you can verify the signature of the package:



**Term**

```bash
gpg --verify pucora__amd64_generic-linux.tar.gz.asc pucora__amd64_generic-linux.tar.gz
gpg: Signature made Sun Mar 10 18:17:18 2019 UTC using RSA key ID 
gpg: Good signature from "Devops Faith Package Manager <packages@devops.faith>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg: There is no indication that the signature belongs to the owner.
Primary key fingerprint: 
```


## SHA256

To make sure the binary downloaded matches our SHA256 ensure the next 2 commands produce the same [SHA](/bin/pucora__amd64_generic-linux.tar.gz.sha256) output.



**Term**

```bash
shasum -a 256 -b pucora__amd64_generic-linux.tar.gz
```


Compare it to:


**Term**

```bash
curl /bin/pucora__amd64_generic-linux.tar.gz.sha256
```
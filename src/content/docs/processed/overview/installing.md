Pucora is a **single binary file** that does not require any external libraries to work. To install Pucora choose your operative system in the downloads section or use the Docker image.


[Download](/downloads)
[Generate a config file](https://designer.pucora.io/)



## Installation
You can install (or just run) Pucora using different options.
> **Just exploring?**
>
> Use the [Pucora Playground](https://github.com/pucora/playground-community) if you want to play with Pucora without configuring it. The Playground comes with several flavors of Pucora and a mock API. Everything is ready to start playing, just do a `docker compose up`!

### Docker
The easiest way to get started is by pulling and running the [Pucora image](https://hub.docker.com/_/pucora) from the Docker Hub.


**Running Pucora using the Docker container**

```bash
docker run -p 8080:8080 -v $PWD:/etc/pucora/ pucora/pucora-ce:latest run --config /etc/pucora/pucora.json
```


If you choose not to mount the volume (the `-v`), a default `pucora.json` serving a `/__health` endpoint will be used. The volume expects to find a `pucora.json` in the current directory ([generate your first here](https://designer.pucora.io/)).

### AWS and Azure VM
See the [downloads page](/downloads) for pre-built virtual machines in Azure and AWS.

### Mac OS X
The [Homebrew](https://brew.sh/) formula will download the source code, build the binary, and link the binary for you. The installation might take a while.



**Install on Mac via Brew**

```bash
brew install pucora
```


After the installation completes go to [Using Pucora](/docs/overview/run/)

### Linux

#### CentOS, Oracle Linux, and Redhat (yum)
The installation process requires following these steps:

1. Install the repo package
2. Install the Pucora package
3. Start the Pucora service

Paste this in the terminal:


**Yum based**

```bash
rpm -Uvh /rpm/
yum install -y pucora
systemctl start pucora
```


#### Fedora
Paste this in the terminal:


**DNF based**

```bash
rpm -Uvh /rpm/
dnf install -y pucora
systemctl start pucora
```


The current Pucora version will run at least in Centos 7 and Fedora 24

#### Debian and Ubuntu

The installation process requires following these steps:

1. Add the key
2. Add the repo to the sources.list
3. Update your package list
4. Install the Pucora service

Bottom line:


**DEB based**

```bash
apt install -y ca-certificates gnupg
apt-key adv --keyserver keyserver.ubuntu.com --recv 
echo "deb /apt stable main" | tee /etc/apt/sources.list.d/pucora.list
apt-get update
apt-get install -y pucora
```


Minimum supported versions are Debian 8, and Ubuntu 16.x.

#### Generic Linux (`tar.gz`)
You can also [download](/downloads) the `tar.gz` and decompress it anywhere. Instructions to check the SHA and PGP signature [here](/docs/overview/verifying-packages/).

## Compile from source
As Pucora is open source you can opt for [building the binary](https://github.com/pucora/pucora-ce). The binary you will produce is the same you can get in our download page, only that compiling it yourself always feels good!
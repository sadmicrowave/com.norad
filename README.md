# Norad - Web Services API Server
Norad is a Node.js based web services API engine utilizing standard HTTP RESTful methodologies.

#### Purpose
The purpose of Norad is to provide an implementation method for retrieving git repo stored scripts and functions.  Norad can be utilized to return raw code to the caller or execute raw code on the remote server.  The raw code is  not language dependent, meaning any coding language can be used to create the raw code/function/script and Norad can execute, or return, accordingly.

#### Wireframe
Norad is built for deployment on Ubuntu server 14.04 LTS and implements the standard HTTP Request and Response objects and object properties and incorporates a MongoDB NoSQL database engine for authorized user and usage metric storage.

#### Installation
Norad comes equipped with an installation file to make getting started on a fresh system easy.  `INSTALL.sh` will install node.js, mongodb, along with the node.js package manager (npm) and the mongodb node.js wrapper module.  To install Norad on your Linux Ubuntu 14.04 environment, clone the project from the git repo, then execute the pre-built install file with these simple commands from a bash terminal prompt:
```sh
$ cd norad
$ sudo ./bin/build/INSTALL.sh
```

#### Deployment
After the Node.js package and dependencies are installed (see #Installation above), the Norad server object can be deployed by executing the following command from the root of the project folder:
```sh
$ nodejs server.js
```

#### Usage
Because Norad is built on standard HTTP Request and Response methodologies, any language can be used to send HTTP requests and receive data responses.  The following are implementations of Norad calls utilizing various languages (not inclusive):

###### Python 2.7
```python
>>> import requests
>>> r = requests.get('http://192.168.18.132:4444/search')
``` 

###### Bash
```sh
$ curl http://192.168.18.132:4444/search -XGET
```

###### Ruby
```irb
irb(main):002:0> require 'httpi'
irb(main):001:0> response = HTTPI.get(HTTPI::Request.new("http://192.168.18.132:4444/search"))
```

#### Credits and Support
This script was written and maintained by Corey Farmer [corey.m.farmer@gmail.com].

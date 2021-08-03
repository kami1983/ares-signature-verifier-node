## About
This is a back-end program for verifying private key messages.
To end saving valid data to mysql db.
## Setup 
```
$ yarn install
$ yarn serve
```


## Mysql user
```sql
CREATE USER 'ares_crowdloan_contribute'@'%' IDENTIFIED BY '12345678';
GRANT ALL ON ares_crowdloan_contribute.* TO 'ares_crowdloan_contribute'@'%';
ALTER USER 'ares_crowdloan_contribute'@'%' IDENTIFIED WITH mysql_native_password BY '12345678';
```

## Start with docker 
```angular2html
docker build . -t kami/ares-ethbind-node
```

## run docker 
```angular2html
$ docker run --rm -it --name ares-signature-verifier-node -p 8081:8080 -v /lin/codes/ares-signature-verifier-node:/usr/src/app kami/ares-ethbind-node
```

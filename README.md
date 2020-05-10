1-install mySql.

2-create database.

3-import this .sql file ./api/sql-scripts/database.sql in new database.

4-open file ./api/configFile.txt.

change first line with new database name

change second line with username.

change third line with password.

5-exit mysql.

6-install JDK.

7-run "terminal":

cd ./api

java -jar ./target/transaction-module-system-0.0.1-SNAPSHOT.jar

***now api is running, access it by http://localhost:8080/

8-install node.

9-run"terminal": cd ./website

10-eun"terminal":npm install

11-run"terminal": npm run run //make sure you kill any process use port 8081

**now website is running ,access it by http://localhost:8081/



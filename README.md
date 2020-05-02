1-install mySql.

2-run mysql as root. 

3-run"mysql-root":CREATE USER 'tmsadmin2'@'localhost' IDENTIFIED BY '123412345';

4-run"mysql-root": GRANT ALL PRIVILEGES ON *.* TO 'tmsadmin2'@'localhost';

5-exit mysql.

6-run mysql as tmsadmin2.

7-run"mysql-tmsadmin2": CREATE DATABASE TMS2;

8-open terminal and go to project directory.

9-run"terminal":mysql -h localhost -u tmsadmin2 -p123412345 TMS2 < ./api/sql-scripts/database.sql

10-install JDK

11-install eclipse.

12-open your eclipse and goto help:
	a-select "eclipse MarketPLace":
		>install: spring Tools 3(Standalon editor)
		>install: spring Tools 3 Add-on spring Tool 4 3.9.13.CI
		>install: VMware tc Server integration for Eclipse 3.9.12.RELEASE
	b-select "Install new Software":
		>install: maven

13-run api: click right on project.....run as....maven build....goals=spring-boot:run  //make sure you kill any process use port 8080

***now api is running, access it by http://localhost:8080/

14-install npm

15-run"terminal": cd ../website

16-run"terminal": npm install

17-run"terminal": npm run build //make sure you kill any process use port 8081

18-run"terminal": npm run run //make sure you kill any process use port 8081

**now website is running ,access it by http://localhost:8081/



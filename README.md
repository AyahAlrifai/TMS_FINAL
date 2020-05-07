1-install mySql.

2-create database.

3-import this .sql file ./api/sql-scripts/database.sql in new database.

4-open file ./api/configFile.txt.

change first line with new database name

change second line with username.

change third line with password.

5-exit mysql.

6-install JDK

7-install eclipse.

8-open your eclipse and goto help:
	a-select "eclipse MarketPLace":
		>install: spring Tools 3(Standalon editor)
		>install: spring Tools 3 Add-on spring Tool 4 3.9.13.CI
		>install: VMware tc Server integration for Eclipse 3.9.12.RELEASE
	b-select "Install new Software":
		>install: maven

9-run api: click right on project.....run as....maven build....goals=spring-boot:run  //make sure you kill any process use port 8080

***now api is running, access it by http://localhost:8080/

10-install npm

11-run"terminal": cd ./website

12-run"terminal": npm run run //make sure you kill any process use port 8081

**now website is running ,access it by http://localhost:8081/



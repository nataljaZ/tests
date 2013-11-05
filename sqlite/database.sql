create table test (
id  integer        primary key
,title  TEXT
,description  TEXT
,teacher   TEXT
,status   TEXT
,datefrom  DATE
,dateto  DATE
,lastchanged  DATE
,question  TEXT
,language TEXT
,authentication TEXT
);

create table teacher (
id  integer        primary key
,firstn  TEXT
,lastn  TEXT
,facebookId TEXT
,googleId TEXT
,email TEXT
,password   TEXT
,status   TEXT
);

create table answer (
id  integer        primary key
,test_id integer
,loginMethod TEXT
,loginId TEXT
,loginName TEXT
,loginEmail TEXT
,stfirstn TEXT
,stlastn  TEXT
,stcode   TEXT
,stemail  TEXT
,etime  DATE
,a0 TEXT
,a1 TEXT   
,a2 TEXT
,a3 TEXT
,a4 TEXT
,a5 TEXT
,a6 TEXT
,a7 TEXT
,a8 TEXT
,a9 TEXT
,a10 TEXT
,a11 TEXT   
,a12 TEXT
,a13 TEXT
,a14 TEXT
,a15 TEXT
,a16 TEXT
,a17 TEXT
,a18 TEXT
,a19 TEXT
,a20 TEXT
,a21 TEXT
,a22 TEXT
,a23 TEXT
,a24 TEXT
,a25 TEXT
,a26 TEXT
,a27 TEXT
,a28 TEXT
,a29 TEXT
,a30 TEXT
);
#!/usr/bin/python
import sys
import cgi
import sqlite3 as sqlite
#import cgitb
#cgitb.enable() 

databasefile = '/home/t103931/public_html/cgi-bin/test.db'
fields = ['test_id','loginMethod','loginId','loginName','loginEmail','stcode','stfirstn','stlastn','stemail',
'a0','a1','a2','a3','a4','a5','a6','a7','a8','a9','a10',
'a11','a12','a13','a14','a15','a16','a17','a18','a19','a20','a21','a22','a23','a24','a25','a26','a27','a28','a29','a30']
    
print 'Content-type: text/html'
print
#sys.exit(0)

css="""body {text-align:center}
.msg {font-family:Arial,Helvetica;font-size:12pt;
position:absolute;top:50%;width:100%;text-align:center}"""

css="""
.msg {font-family:Arial,Helvetica;font-size:12pt;
position:absolute;top:50%;width:100%;text-align:center}
.inner {background-color:#ffffff;position:relative;width:50%}
body{ text-align:center 
  background-image: url(blog_background.jpg);
  background-repeat: repeat-x;
  background-position: center 0;
  background-color: #061d2c;
}"""

css="""body {text-align:center}
.msg {font-family:Arial,Helvetica;font-size:12pt;color: #061d2c;
position:absolute;top:50%;width:100%;text-align:center}"""

resheader="<html><header><style type='text/css'>"+css+"</style></header><body><center><div class='msg'><div class='inner'>"
okres="Sinu vastus on salvestatud, ait&auml;h!<p> Vastust enam muuta ei saa." 
badres="""Sinu vastuse salvestamine eba&otilde;nnestus. <p>
V&otilde;ibolla aga j&auml;tsid matriklinumbri, nime v&otilde;i e-posti v&auml;lja t&uuml;hjaks v&otilde;i 
oli s&uuml;steemis ajutine t&otilde;rge:<br> mine tagasi ja proovi uuesti!"""
probres="Sinu vastuses oli puudu matriklinumber v&otilde;i nimi, mine tagasi ja proovi uuesti!"
resfooter="<div></div></center></body></html>"

okres=resheader+okres+resfooter
badres=resheader+badres+resfooter
probres=resheader+probres+resfooter

def escape(s):
  return s.lstrip().rstrip().replace('"', ' ').replace("'", " ").replace("("," ").replace(")"," ").replace("\\"," ").replace("/"," ").replace(";"," ").lower()

try:
  form = cgi.FieldStorage()
  query="insert into answer"
  flds=""
  vals=""  
  for el in fields:
    if form.has_key(el):
      flds=flds+" "+el+","
      vals=vals+" '"+escape(form[el].value)+"',"
  if not flds:
    print badres 
  else:  
    if flds[len(flds)-1]==",":
      flds=flds[0:len(flds)-1]
    if vals[len(vals)-1]==",":
      vals=vals[0:len(vals)-1]    
    query=query+"("+flds+",etime) values ("+vals+",DATETIME('NOW'))"   
    #print query # uncomment for debugging
    con = sqlite.connect(databasefile)
    cur = con.cursor()
    cur.execute(query)
    con.commit()
    print okres 
except Exception, e:
  #print e # uncommment for debugging
  print badres 
  

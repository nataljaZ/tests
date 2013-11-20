#!/usr/bin/python
# -*- coding: iso-8859-1 -*-
import sqlite3 as lite
import sys
import cgi
import string
import random
from string import Template


conn = lite.connect('test.db')
conn.row_factory = lite.Row
c= conn.cursor()


c.execute('SELECT * FROM test')

#print c.fetchall()
  
rows=c.fetchall()
  
print rows
  

for row in rows:
	title=str(row["title"])


qset=1

intro="""<h3>Sissejuhatus infotehnoloogiasse: """+title+"""</h3>
  Seda kontrolltööd saab teha 13 septembrist kuni 19 septembrini (kaasa arvatud).<p/> 
  Vali iga küsimuse järel see vastus, mis paistab olema pakututest kõige õigem.""" 

questions = [
  ["Mis on kahendarvude 110 ja 11 summa?",["1001","1100","11011","1101","10001"]],
  ["Milline vana-kreeka filosoof uuris põhjalikult väidete struktuuri?",
    ["Aristoteles","Platon","Parmenides","Aurelius","Pythagoras"]],  
  ["Mis loogikatehtele vastas Boole loogikas + tehe?",
    ["Või","Ja","Järeldub","Ei","Ekvivalents"]],
  ["Mitmel muutujate väärtuste komplektil annab valem<br/>(A-&gt;B) & (~C v A) väärtuseks 'väär'?",
   ["0","1","2","4","6","8","16","25"]],
  ["Mitu erinevat muutujate väärtuste komplekti on valemil<br/>(B-&gt;C) v A v (D & A)?",
   ["0","1","2","5","8","10","16","20","32"]], 
  ["""Millises loogikakeeles on see avaldis kirjutatud:<br/> 
   Iga x, y, z jaoks: Isa(x,y) & Isa(y,z) =&gt; Vanaisa(x,z)?""", 
   ["lausearvutus","intuitsionistlik loogika","predikaatarvutus","süllogism","hulgateooria"]],
  ["""Sisesta <a href="http://morphett.info/turing/turing.html">Turingi masina simulaatorisse</a> programm<br>0 0 1 r 0<br>0 1 1 r 0<br>0 _ 1 _ halt<br> ja sisend 0100110. Mis ilmub programmi
  töö tulemuseks lindile?""",
    ["0100110","0","1","11111111","00000000","0101010"]],
  ["Kuidas nimetati eriarvutit, mis tegeles salakirja lahtimurdmisega?",
    ["Enigma", "Geheimfernschreiber", "Lorenz", "Colossus", "Norden","Mark I"]],       
  ["Kas see valem<br/>(A v B) v (~(C & A) v C)<br/>annab kõigi muutujate väärtuste korral vastuseks",
   ["alati vale","alati õige","vahel vale, vahel õige","ei see ega teine","oleneb"]],  
  ["Kes ehitas esimese arvuti, mis suutis liita, lahutada, korrutada ja jagada?",
    ["Leibniz","Pascal","Hollerith","Sholes","Boole","Jacquard"]]]
    
  
def norm(s):
  return s.replace("'"," ")
  
def mkqs(n,q):
  qsh=q[1]
  print qsh
  random.shuffle(qsh)
  qarr=[q[0],"<br>\n<select name='f",str(n),"'>\n"] 
  for el in qsh:
    qarr.append("<option value='")
    qarr.append(norm(el))
    qarr.append("'>")
    qarr.append(norm(el))
    qarr.append("</option>\n")
  qarr.append("</select><p>\n")
  return ''.join(qarr)

def main():
  global intro,questions
  print 'Content-type: text/html'
  print
  
  print questions

  qlst=[]
  n=0
  for q in questions:
    qs=mkqs(n,q)
    qlst.append(qs)
    n+=1 
  qstr=''.join(qlst)  
  sdict={"intro": intro, "qset": qset, "questions":qstr}    
  fname="qtemplate.html"
  f=open(fname,"r")
  rs=f.read()
  tmpl=string.Template(rs)  
  out=tmpl.safe_substitute(sdict)
  print out

main()


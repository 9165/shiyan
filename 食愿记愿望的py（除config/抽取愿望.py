#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
import requests
import json
import pymysql
import time
from django import db
from flask import Flask
from flask import request
from flask import jsonify
from gevent import monkey
from flask import Flask, render_template
from werkzeug.debug import DebuggedApplication
from geventwebsocket import WebSocketServer, WebSocketApplication, Resource
DBHOST = 'localhost'
DBUSER = 'root'
DBPASS = '123456'
DBNAME = 'syj'

app = Flask(__name__,static_folder=r"#")
@app.route("#",methods=['POST'])
def _init_(self):
    try:
        self.db = pymysql.connect(DBHOST, DBUSER, DBPASS, DBNAME, charset='utf8mb4')
        print("CONNECTED")
        self.cur = db.cursor()
        self.cur.execute('SELECT * FROM `hope`   WHERE HopeState=0 and id >= (SELECT FLOOR( MAX(id) * RAND()) FROM `hope` )   ORDER BY id LIMIT 1;  ')
        results = cursor.fetchall()
        for row in results:
            IDO=row[0]
            Content=row[1]
            Contact=row[2]
            Extent=row[3]
        args={IDO,Content,Contact,Extent}
        retu = {"errcode": errcode, "ID":IDO, "NEGAI":Content, "Contact":Contact, "Extent":Extent }
        response = requests.post('', json=retu, headers=headers)
        print("CHANGED")
    except pymysql.Error as e:
        print(".." + str(e))
    db.close()

#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

import json
import pymysql
import time
from django import db
from flask import Flask
from flask import request
from flask import jsonify
from gevent import monkey
monkey.patch_all()
from flask import Flask, render_template
from werkzeug.debug import DebuggedApplication
from geventwebsocket import WebSocketServer, WebSocketApplication, Resource
DBHOST = 'localhost'
DBUSER = 'root'
DBPASS = '123456'
DBNAME = 'syj'

app = Flask(__name__,static_folder=r"/workspace_bbt\CC")
@app.route("/workspace_bbt\CC",methods=['POST'])

def getNegai():
    data=request.get_json()
    Tegami=data['Tegami']
    Name=data['Name']
    Contact=data['Contact']
    Description=data['Description']
    Extent=data['Extent']
    HopeState=0  """数据库也要记录愿望的几个状态：未被人接收为0，已被人接收未完成1，已完成未确认2，完成并确认3"""

    rem=False
    if(data['remember']):
        rem=True
    r = requests.get('/workspace_bbt/page4.html')
    print (r.status_code)

args={Tegami,Name,Contact,Description,Extent,HopeState}
def _init_(self):
        self.db = pymysql.connect(DBHOST, DBUSER, DBPASS, DBNAME,charset='utf8mb4')
        print("CONNECTED")
        self.cur = db.cursor()
def uploadNegai(self,Tegami,Name,Contact,Description,Extent,HopeState):
        args=((Tegami,Name,Contact,Description,Extent,HopeState))
        self.cur.execute('Insert into `hope` values("%s","%s","%s","%s","%s","%s")',args)
        self.db.commit()
        print ("添加成功")
        return True
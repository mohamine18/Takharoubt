# Takharoubt Project

## Introduction

This project main goal is to facilitate to a group of people, family or friends to divide the holy Quran between them like we used to do offline especially in mosques. this operation is called (**Takharoubt**) in local language. we will use this word in the upcoming section.

## Technical introduction:

The project is mainly divided to two main entities which are backend written used Nodejs linked to a NoSql database and frontend that is the Meta messenger platform and sooner Viber and WhatsApp.

## How to use the app:

First you need to like and send a message to this [Facebook Page](www.facebook.com/sharingamazing) or by sending a message directly to [Messenger App](http://m.me/sharingAmazing).

After sending (مرحبا) to the page the app will communicate back a link (تنظيم ختمة جماعية) where a user can initiate a **Takharoubt** or (إنضمام إلى ختمة جماعية).

After clicking the link, Messenger will open up a webview where a user must entre two main information which are the division method and the division period and a facultative comment section if any comments is provided to people that will join **Takharoubt**.

After creating a **Takharoubt** Messenger will communicate a code that can be shared with the group of people willing to choose and read a **Takharoubt**.

People having the **Takharoubt** code must send it back to the messenger App (soon Viber and WhatsApp) to provide a link where the user can choose a **Takharoubt**

After choosing a **Takharoubt** the messenger App (soon Viber and WhatsApp) will communicate the section selected and the ending time of the **Takharoubt** and comments if any

## What the app provides:

This project provides 3 ways of dividing the holy Quran which is by:

- Manzil 7 sections
- Juz 30 sections
- Hizb 60 sections

A user is limited to created 5 active divisions, if the number is exceeded the user must wait until his previous created divisions complete the process which is implemented in two ways:

- By provided time
- By number of readers is equal to number of method sections

## Technologies used to code this App:

- Programing language is JavaScript
- Framework used is Express JS on the top of Node JS
- MongoDB as a database and mongoose as ODM
- EJS as a template engine
- Socket.io for realtime picking experience

## UpComing features:

- [ ] Add Viber and WhatsApp for global experience
- [ ] Add spotify if the reader want to listen to his selected division
- [ ] Send **Takharoubt** pictures instead of text using puppeteer

## Basic information

This project is created by @mohamine18
Email Address: mohamine19@gmail.com

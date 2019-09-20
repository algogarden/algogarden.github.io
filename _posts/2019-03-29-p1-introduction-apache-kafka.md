---
layout: post
title: "[Kafka for Dummies - Part 1] Introduction"
description: "That's where this series comes in. To those who know nothing about Kafka or wanna revise quickly, my goal is to supply all the basics you need. At the end of the road, you will get a concise overview and apply Kafka easily."
image: apache-kafka.png
categories: work
---

Big Data is way too hotter than you think. It's gonna get hotter and show no signs of stopping. One of the biggest challenges associated with Big Data is, turn data into meaningful insights. However before diving into that part, the data has to be first collected then is transfered impeccably in purpose of the availability to the end-users. Hadoop, Spark, Scala, ElasticSearch, ... are types of platforms, frameworks and technologies which have emerged to help us handle the ever-growing amount of data over the internet. Among them, Kafka plays an important role. Kafka's not hard to learn but it has many remarkable theories and concepts. That's where this series comes in. To those who know nothing about Kafka or wanna revise quickly, my goal is to supply all the basics you need. At the end of the road, you will get a concise overview and apply Kafka easily.  

________________________________________
<h3> What is Kafka ?</h3>
It is a distributed publish-subscribe messaging system that specifically designed for the high-speed, real-time, scalable and low-latency information processing.

Apache Kafka was originally developed by LinkedIn, and was subsequently open sourced in early 2011. Being open source means that It is essentially free to use and has a large community who contributes towards updates and new features.

________________________________________
<h3> How does Kafka start?</h3>
<u><em>It looks simple at first:</em></u>  When we have only one data source and one target system.
<br><br><br><br>
![Simple process](/assets/img/blog/content/ds1.png)
<br><br><br>
<u><em>Things now became really complicated:</em></u>
<p> Because of new marketing stragety, We need to collect more kind of data and supply for more target systems. It turns out that your project has 4 data sources and 4 target systems. Then we have 16 integrations because they all have to exchange data with one another:</p>
<br><br><br>
 ![Complicated process](/assets/img/blog/content/ds2.png)
<br><br><br><br>
But somewhere down the road, you realize that each integration generate some difficulties:
<ul>
    <li>- Protocol: How the data is transported ( TCP, REST, ....)</li>
    <li>- Data format : How the data is parsed and extracted ( JSON, CSV, Binary, ... )</li>
    <li>- Data schema & evolution : How the data is formed and may change in the future.</li>
    <li>- Each source system will increased load from the connection</li>
</ul>

<br>
<strong>Then, Kafka comes in like the Buddha to solves all the bottlenecks.</strong>

It allows to decouple your entry data streams and systems . Now, the source system will push your data into Kafka. While, the target system will source data straight from Kafka. With Kafka's help, what it enables is really really nice .

<br><br><br>
 ![Complicated process](/assets/img/blog/content/ds3.png)
<br><br><br>

We can have any data sources you can think like SERVER LOG, USER BEHAVIOR, PAYMENT TRANSACTIONS, ... . After that, when data is in Kafka, you could put it into any target systems such as DATABASE, METRIC, AUDIT, ANALYTICS, ... (above image)

________________________________________
<h3> Why would we need to use Apache Kafka ?</h3>
<u>Considering its standout:<u>
<ul>
    <li>-  Distributed, resilient architecture, fault tolerant.</li>
    <li>-  Horizontal scalability: scale to 100s of brokers and scale to millions of messages per second.</li>
    <li>-  High performance (the latency to exchange data from one system to another is usually less than 10ms) and It's realtime.</li>
</ul>

<br>
<u>And its use cases: </u>
<ul>
    <li>-  Messaging System.</li>
    <li>-  Activity Tracking</li>
    <li>-  Gather metrics from many different locations ( IoT devices )</li>
    <li>-  Application Logs gathering</li>
    <li>-  Stream processing ( with the Kafka Stream API or Spark for example )</li>
    <li>-  De-coupling of system dependencies</li>
    <li>-  Integration with Spark, Flink, Storm, Hadoop and many other Big Data technologies.</li>
</ul>
________________________________________
<h3> Can I believe you ? </h3>
Don't believe me. You can believe 2000 plus firms and 35% of the Fortune 500 that uses Kafka as their backbone.
<br>
<u>Concrete example:</u>
<ul>
<li>- Netflix uses Kafka to apply recommendations in real-time while you're watching TV shows.</li>
<li>- Uber uses Kafka to gather user, taxi and trip data in real-time to compute and forecast demand, and compute surge pricing in real-time.</li>
<li>- Linkedin uses Kafka to prevent spam, collect user interactions to make better connection recommendations in real-time.</li>
</ul>
<b>Rememeber that Kafka is only used as transportation mechanism! </b>


// Copyright 2015-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const express = require('express');
const path = require('path');

const app = express();
let html = path.resolve(__dirname + '');

app.use(express.static(html));

// [START hello_world]
// Say hello!
// app.get('/', (req, res) => {
//   res.status(200).sendFile(html);
// });
// // [END hello_world]

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}
// Imports the Google Cloud client library
const PubSub = require(`@google-cloud/pubsub`);
process.env.GCLOUD_PROJECT = 'findthepots';

// [START pubsub_list_topics]
function listTopics () {
  // Instantiates a client
  const pubsub = PubSub();

  // Lists all topics in the current project
  return pubsub.getTopics()
    .then((results) => {
      const topics = results[0];

      console.log('Topics:');
      topics.forEach((topic) => console.log(topic.name));

      return topics;
    }).catch(console.log);
}

listTopics();

let messages = [];
let count = 0;

setInterval(function() {
  messages.push(count++)
},500);

app.get('/message', (req, res) => {
  res.json(messages);
  messages = [];
});

function createSubscription (topicName, subscriptionName) {
  // Instantiates a client
  const pubsub = PubSub();

  // References an existing topic, e.g. "my-topic"
  const topic = pubsub.topic(topicName);

  // Creates a new subscription, e.g. "my-new-subscription"
  return topic.subscribe(subscriptionName)
    .then((results) => {
      const subscription = results[0];
      console.log(`Subscription ${subscription.name} created.`);
      return subscription;
    });
}

createSubscription('accel_data', 'photon_accel');

function pullMessages (subscriptionName) {
  // Instantiates a client
  const pubsub = PubSub();

  // References an existing subscription, e.g. "my-subscription"
  const subscription = pubsub.subscription(subscriptionName);

  // Pulls messages. Set returnImmediately to false to block until messages are
  // received.
  return subscription.pull()
    .then((results) => {
      const messages = results[0];
      //returnImmediately = false;
      console.log(`Received ${messages.length} messages.`);

      messages.forEach((message) => {
        console.log(`* %d %j %j`, message.id, message.data, message.attributes);
      });

      // Acknowledges received messages. If you do not acknowledge, Pub/Sub will
      // redeliver the message.
      return subscription.ack(messages.map((message) => message.ackId));
    }).catch(console.log);
}

pullMessages('photon_accel');
app.get('/updates', (req, res) => {
  res.json(pullMessages('main-sub'));
});
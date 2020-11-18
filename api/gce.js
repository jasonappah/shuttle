// Basically, I'm using a Google Cloud Compute Instance to run a website, which is cool and all, but I power it off when I'm not using it, which means I have to log in to the GCP platform, and turn it on when I want to use it. What this will be is a serverless app where if you hit a certain HTTP endpoint, it will use the Google Cloud Compute API to boot up the instance associated with the endpoint, and then when it is done booting, you will be redirected to the IP of that endpoint. We will use Firestore on the backend to store the status of a given instance in a document (Powered Off, Starting, Running) and on the frontend, we will subscribe to changes in a document to know when we are ready to redirect to the instance.

const Compute = require('@google-cloud/compute')
var base64 = require('base-64')
const fs = require('fs')
require('dotenv').config()

console.log('---\n---\n---')

const PATH = process.env.KEY_PATH || './key.json'
var decodedData = base64.decode(process.env.GCP_KEY)

try {
  if (fs.readFileSync(PATH) != decodedData) {
    fs.writeFileSync(PATH, decodedData)
  }
} catch {
  fs.writeFileSync(PATH, decodedData)
}

const instance = new Compute({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: PATH,
})

function getInstances(res) {
  instance.getVMs().then(function (data) {
    var tmp = data[0]
    var vms = []
    for (var vm in tmp) {
      var tmp2 = tmp[vm]['metadata']['zone'].split('/')
      vms.push({
        id: tmp[vm]['metadata']['id'],
        name: tmp[vm]['metadata']['name'],
        description: tmp[vm]['metadata']['description'],
        status: tmp[vm]['metadata']['status'],
        internalIP: [],
        externalIP: [],
        zone: tmp2[tmp2.length - 1],
        instance: tmp[vm],
      })
      tmp[vm]['metadata']['networkInterfaces'].forEach(i =>
        i['accessConfigs'].forEach(element => vms[vm]['externalIP'].push(element['natIP'])),
      )
      tmp[vm]['metadata']['networkInterfaces'].forEach(ni => vms[vm].internalIP.push(ni.networkIP))
    }
    res.send(vms)
    return vms
  })
}

function powerOn(zone, vm) {
  return instance.zone(zone).vm(vm).start
}

function powerOnInstance(vm) {
  return powerOn(vm.zone, vm.name)
}

module.exports = function (req, res) {
  getInstances(res)
}

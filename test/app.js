var zbc = require('./workers.js');

async function main() {
  try {
    await zbc.deployWorkflow('./sample.bpmn')
    const res = await zbc.createWorkflowInstanceWithResult('process', {
        requestTimeout: 10 * 60 * 1000
    });
    // console.log(JSON.stringify(res, null, 2))
  } catch (e) {
    console.error(e)
  }
}

main()